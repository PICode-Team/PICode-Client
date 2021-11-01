/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { codeStyle } from "../../../styles/service/codespace/code";
import { checkPointerEvent, dragComponent, dropElement } from "./function";
import { IChildrenState, ICodeChildState, ICodeContent, IWraper } from "./types";
import CodeSideBar from "./sidebar";
import ViewSpace from "./viewspace";
import CodeContent from "./codecontent";
import wrapper from "../../../stores";
import WebAssetIcon from "@material-ui/icons/WebAsset";
import { cloneDeep, first, method, templateSettings } from "lodash";
import { useRouter } from "next/router";
import { useWs } from "../../context/websocket";
import { fetchSet } from "../../context/fetch";
import TerminalContent from "./terminal";
import { IconButton } from "@material-ui/core";

export interface ISidebarItem {
    path: string;
    children?: ISidebarItem[];
}

export default function CodeSpace() {
    const classes = codeStyle();
    const ws: any = useWs();
    const [viewState, setViewState] = React.useState<IWraper>();
    const [fileList, setFileList] = React.useState<ISidebarItem>();
    const [projectName, setProjectName] = React.useState<string>();
    const [dragId, setDragId] = React.useState<string>();
    const [openId, setOpenId] = React.useState<string>();
    const [focusId, setFocusId] = React.useState<string>();
    const [height, setHeight] = React.useState<number>(300);
    const router = useRouter();
    const [firstSocket, setFirstSocket] = React.useState<boolean>(false);
    const [moveCheck, setMoveCheck] = React.useState<boolean>(false);
    const [workspaceId, setWorkspaceId] = React.useState<string>();
    const [test, setTest] = React.useState<number>(0);
    const terminalUuid = React.useRef<string[]>([])
    const [openTerminalCount, setOpenTerminalCount] = React.useState<number>(0);
    const tmpTerminalTest = React.useRef<Record<string, string[]>>({});
    const [termialUpdate, setTerminalUpdate] = React.useState<number>(0);

    const clickToChildren = (viewState: any, name: string[]) => {
        let tmpViewState: any = cloneDeep(viewState);
        for (let i in tmpViewState.wrapper) {
            if (tmpViewState.wrapper[i].children !== undefined) {
                if (!tmpViewState.wrapper[i].children.some((v: any) => v.path === name.join("/"))) {
                    tmpViewState.wrapper[i].children.push({
                        data: "",
                        path: openId,
                        name: name[name.length - 1],
                        focus: true,
                    });
                    break;
                }
            } else {
                tmpViewState.wrapper[i] = clickToChildren(tmpViewState.wrapper[i], name);
            }
        }
        return tmpViewState;
    };

    useEffect(() => {
        if (openId === undefined) return;
        let name = openId.split("/");
        if (viewState === undefined) {
            setViewState({
                width: "100%",
                height: "100%",
                children: [
                    {
                        data: "",
                        path: openId,
                        name: name[name.length - 1],
                        focus: true,
                    },
                ],
            });
        } else {
            if (viewState.children !== undefined) {
                let tmpViewState = cloneDeep(viewState);
                if (!tmpViewState.children?.some((v) => v.path === openId)) {
                    tmpViewState.children?.push({
                        data: "",
                        path: openId,
                        name: name[name.length - 1],
                        focus: true,
                    });
                    setViewState(tmpViewState);
                }
            } else if (viewState.wrapper !== undefined) {
                let forFunctionState = cloneDeep(viewState);
                setViewState(clickToChildren(forFunctionState, name));
            } else {
                let tmpViewState = cloneDeep(viewState);
                tmpViewState.children = [
                    {
                        data: "",
                        path: openId,
                        name: name[name.length - 1],
                        focus: true,
                    },
                ];
                setViewState(tmpViewState);
            }
        }
        setOpenId(undefined);
    }, [openId]);

    const getProjectName = async (tmpWorkspaceId: string) => {
        let tmpProjectName = await fetchSet(`/workspace?workspaceId=${tmpWorkspaceId}`, "GET", true).then((res) => res.json());
        if (tmpProjectName.code === 200) {
            setProjectName(tmpProjectName.workspaceList[0].name);
        }
    };

    useEffect(() => {
        const tmpWorkSpaceId = router.query;
        if (tmpWorkSpaceId.workspaceId === undefined) {
            return;
        } else {
            getProjectName(tmpWorkSpaceId.workspaceId as string);
            setWorkspaceId(tmpWorkSpaceId.workspaceId as string);
        }
    }, []);

    const fileWebsocketHanlder = (msg: any) => {
        const message = JSON.parse(msg.data);
        if (message.category === "code") {
            switch (message.type) {
                case "getAllFilePath": {
                    setFileList(message.data);
                    break;
                }
            }
        } else if (message.category === "terminal") {
            switch (message.type) {
                case "createTerminal": {
                    let tmp = [];
                    let tmpTerminal = cloneDeep(terminalUuid);
                    for (let i of terminalUuid.current) {
                        tmp.push(i);
                    }
                    if (!terminalUuid.current.some((v) => v === message.data.uuid)) {
                        tmp.push(message.data.uuid);
                    }
                    terminalUuid.current = tmp
                    setOpenTerminalCount(openTerminalCount + 1);
                    break;
                }
                case "commandTerminal": {
                    let tmpContent = cloneDeep(tmpTerminalTest.current);
                    if (tmpContent[message.data.uuid as string] === undefined) {
                        tmpContent[message.data.uuid as string] = [message.data.message];
                        tmpTerminalTest.current = tmpContent
                    } else {
                        tmpContent[message.data.uuid as string].push(message.data.message);
                        tmpTerminalTest.current = tmpContent
                    }
                    setTerminalUpdate(termialUpdate + 1);
                    break;
                }
                case "deleteTerminal": {
                    let tmp = [];
                    for (let i of terminalUuid.current) {
                        if (i !== message.data.uuid) {
                            tmp.push(i);
                        }
                    }
                    setOpenTerminalCount(tmp.length);
                    terminalUuid.current = tmp;
                    break;
                }
            }
        }
    };

    useEffect(() => {
        if (workspaceId === undefined) return;
        if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
            ws.addEventListener("message", fileWebsocketHanlder);
            setTest(-1);
        } else {
            setTest(test + 1);
        }
    }, [workspaceId, test]);

    useEffect(() => {
        if (test < 0) {
            ws.send(
                JSON.stringify({
                    category: "code",
                    type: "getAllFilePath",
                    data: {
                        workspaceId: workspaceId,
                    },
                })
            );
        }
        const timer = setInterval(() => {
            if (test < 0) {
                ws.send(
                    JSON.stringify({
                        category: "code",
                        type: "getAllFilePath",
                        data: {
                            workspaceId: workspaceId,
                        },
                    })
                );
            }
        }, 5000);
        return () => {
            clearInterval(timer);
        };
    }, [test])

    return (
        <div className={classes.codeWrapper}>
            <div className={classes.topMenu}>
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation();
                        if (test < 0 && openTerminalCount < 1) {
                            let payload = {
                                category: "terminal",
                                type: "createTerminal",
                                data: {
                                    workspaceId: workspaceId,
                                    size: {
                                        cols: 150,
                                        rows: 100,
                                    }
                                }
                            }
                            ws.send(JSON.stringify(payload))
                        }
                    }}
                    style={{
                        position: "absolute",
                        left: "5px",
                        top: 0,
                        padding: 0,
                    }}
                >
                    <WebAssetIcon style={{ width: "20px", height: "20px", color: "#fff" }} />
                </IconButton>
            </div>
            <div className={classes.contentWrapper}>
                <CodeSideBar
                    setDragId={setDragId}
                    setOpenId={setOpenId}
                    projectName={projectName}
                    fileList={fileList}
                    focusId={focusId}
                    setFocusId={setFocusId}
                />
                <div style={{ width: "100%", height: "100%" }}>
                    <div style={{ width: "100%", height: openTerminalCount > 0 ? `calc(100% - ${height}px)` : "100%" }}>
                        <div
                            className={classes.codeConent}
                            id="rootCode"
                            onDragOver={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (dragId !== undefined) {
                                    dragComponent(e, viewState);
                                }
                            }}
                            onDragLeave={(e) => {
                                let drageventer = document.getElementById("dragEventer");
                                if (drageventer === null) return;
                                drageventer.style.background = "none";
                            }}
                            onDrop={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                e.currentTarget.style.background = "inherit";
                                if (dragId !== undefined) {
                                    dropElement(e, viewState, setViewState, dragId);
                                }
                            }}
                        >
                            {viewState?.wrapper !== undefined &&
                                Object.keys(viewState.wrapper).map((v: string) => {
                                    if (v === undefined) return;
                                    return (
                                        <ViewSpace
                                            setParentState={setViewState}
                                            setDragId={setDragId}
                                            dragId={dragId}
                                            type={v}
                                            key={v}
                                            moveCheck={moveCheck}
                                            setMoveCheck={setMoveCheck}
                                            focusId={focusId}
                                            parentState={viewState}
                                            position={{
                                                width: (viewState.wrapper as any)[v].width,
                                                height: (viewState.wrapper as any)[v].height,
                                            }}
                                            // eslint-disable-next-line react/no-children-prop
                                            children={(viewState.wrapper as any)[v]}
                                            setFocusId={setFocusId}
                                        />
                                    );
                                })}
                            {viewState?.children !== undefined && (
                                <CodeContent
                                    setMoveCheck={setMoveCheck}
                                    dragId={dragId}
                                    setDragId={setDragId}
                                    viewState={viewState}
                                    focusId={focusId}
                                    setParentState={setViewState}
                                    setFocusId={setFocusId}
                                />
                            )}
                        </div>
                        <div
                            className={classes.dragEventer}
                            id="dragEventer"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => e.preventDefault()}
                        />
                    </div>
                    {openTerminalCount > 0 && (
                        <TerminalContent
                            openTerminalCount={openTerminalCount}
                            content={tmpTerminalTest.current}
                            height={height}
                            uuid={terminalUuid.current}
                            ws={ws}
                            setHeight={setHeight}
                            projectName={projectName}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
