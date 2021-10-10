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
import { cloneDeep, method } from "lodash";
import { useRouter } from "next/router";
import { useWs } from "../../context/websocket";
import { fetchSet } from "../../context/fetch";

export interface ISidebarItem {
    path: string;
    children?: ISidebarItem[]
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
    const router = useRouter();
    const [moveCheck, setMoveCheck] = React.useState<boolean>(false);
    const [workspaceId, setWorkspaceId] = React.useState<string>();

    const clickToChildren = (viewState: any, name: string[]) => {
        let tmpViewState: any = cloneDeep(viewState);
        for (let i in tmpViewState.wrapper) {
            if (tmpViewState.wrapper[i].children !== undefined) {
                tmpViewState.wrapper[i].children.push({
                    data: "",
                    path: openId,
                    name: name[name.length - 1],
                    focus: true,
                })
                break;
            } else {
                tmpViewState.wrapper[i] = clickToChildren(tmpViewState.wrapper[i], name);
            }
        }
        return tmpViewState
    }

    useEffect(() => {
        console.log(viewState)
    }, [viewState])

    useEffect(() => {
        if (openId === undefined) return;
        let name = openId.split("\\");
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
                tmpViewState.children?.push({
                    data: "",
                    path: openId,
                    name: name[name.length - 1],
                    focus: true,
                })
                setViewState(tmpViewState)
            } else if (viewState.wrapper !== undefined) {
                let forFunctionState = cloneDeep(viewState)
                setViewState(clickToChildren(forFunctionState, name))

            } else {
                let tmpViewState = cloneDeep(viewState);
                tmpViewState.children = [{
                    data: "",
                    path: openId,
                    name: name[name.length - 1],
                    focus: true,
                }]
                setViewState(tmpViewState)
            }
        }
        setOpenId(undefined);
    }, [openId])

    const getProjectName = async (tmpWorkspaceId: string) => {
        let tmpProjectName = await fetchSet(`/workspace?workspaceId=${tmpWorkspaceId}`, "GET", true).then((res) => res.json());
        if (tmpProjectName.code === 200) {
            setProjectName(tmpProjectName.workspaceList[0].name)
        }
    }

    useEffect(() => {
        const tmpWorkSpaceId = router.query;
        if (tmpWorkSpaceId.workspaceId === undefined) {
            return;
        } else {
            getProjectName(tmpWorkSpaceId.workspaceId as string)
            setWorkspaceId(tmpWorkSpaceId.workspaceId as string)
        }
    }, [])

    const fileWebsocketHanlder = (msg: any) => {
        const message = JSON.parse(msg.data)
        if (message.category === 'code') {
            switch (message.type) {
                case "getAllFilePath": {
                    setFileList(message.data)
                    break;
                }
            }
        }
    }

    useEffect(() => {
        if (workspaceId === undefined) return;
        if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
            ws.addEventListener('message', fileWebsocketHanlder)
            ws.send(
                JSON.stringify({
                    category: 'code',
                    type: 'getAllFilePath',
                    data: {
                        workspaceId: workspaceId
                    }
                })
            )
        }
    }, [ws?.readyState, workspaceId])

    return <div className={classes.codeWrapper}>
        <div className={classes.topMenu}>

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
            <div className={classes.codeConent} id="rootCode"
                onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (dragId !== undefined) {
                        dragComponent(e, viewState)
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
                    e.currentTarget.style.background = "inherit"
                    if (dragId !== undefined) {
                        dropElement(e, viewState, setViewState, dragId)
                    }
                }}>
                {viewState?.wrapper !== undefined && Object.keys(viewState.wrapper).map((v: string) => {
                    if (v === undefined) return;
                    return <ViewSpace
                        setParentState={setViewState}
                        setDragId={setDragId}
                        dragId={dragId}
                        type={v}
                        key={v}
                        moveCheck={moveCheck}
                        setMoveCheck={setMoveCheck}
                        focusId={focusId}
                        parentState={viewState}
                        position={{ width: (viewState.wrapper as any)[v].width, height: (viewState.wrapper as any)[v].height }}
                        // eslint-disable-next-line react/no-children-prop
                        children={(viewState.wrapper as any)[v]}
                        setFocusId={setFocusId}
                    />
                })}
                {viewState?.children !== undefined && <CodeContent
                    setMoveCheck={setMoveCheck}
                    dragId={dragId}
                    setDragId={setDragId}
                    viewState={viewState}
                    focusId={focusId}
                    setParentState={setViewState}
                    setFocusId={setFocusId} />}
            </div>
            <div className={classes.dragEventer} id="dragEventer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => e.preventDefault()} />
        </div>
    </div >
}