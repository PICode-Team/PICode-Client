/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { IconButton } from "@material-ui/core";
import { CloseOutlined } from "@material-ui/icons";
import Editor from "@monaco-editor/react";
import { cloneDeep, debounce, throttle } from "lodash";
import React, { useEffect } from "react"
import { codeStyle } from "../../../styles/service/codespace/code";
import { ICodeContent, IWraper } from "./types";
import clsx from "clsx"
import { checkPointerEvent, dragTopFile, getQuery } from "./function";
import { returnFile } from "./sidebarItem";
import { useWs } from "../../context/websocket";
import { useRouter } from "next/router";


interface TQueueItem {
    line: number;
    updateContent: string | undefined;
}


export default function CodeContent(props: {
    viewState: IWraper | undefined,
    dragId: string | undefined,
    setMoveCheck: React.Dispatch<React.SetStateAction<boolean>>
    setParentState: React.Dispatch<React.SetStateAction<IWraper | undefined>>
    setDragId: React.Dispatch<React.SetStateAction<string | undefined>>
    setFocusId: React.Dispatch<React.SetStateAction<string | undefined>>
    focusId: string | undefined
}) {
    const ws: any = useWs();
    const classes = codeStyle();
    const router = useRouter();
    const [selectFile, setSelectFile] = React.useState<ICodeContent | undefined>();
    const [originData, setOriginData] = React.useState<string>();
    const [fileData, setFileData] = React.useState<string>();
    const [focusIdChange, setFocusIdChange] = React.useState<boolean>(false);
    const [onlyChange, setOnlyChange] = React.useState<boolean>(false);
    const [openWs, setOpenWs] = React.useState<number>(0);
    const [changeValue, setChangeValue] = React.useState<boolean>(false);
    const [editLine, setEditLine] = React.useState<number>(0);
    const isRunning = React.useRef<boolean>(false);

    const test = React.useRef<any>();

    const tmpQueue = React.useRef<TQueueItem[]>([]);

    useEffect(() => {
        let target = props.viewState!.children!.length;
        if (selectFile === undefined) {
            setSelectFile(props.viewState!.children![target - 1])
        }
    }, [props.viewState])

    const fileWebsocketHanlder = (msg: any) => {
        const message = JSON.parse(msg.data)
        if (message.category === 'code') {
            switch (message.type) {
                case "getCode": {
                    setOriginData(message.data.fileContent)
                    break;
                }
            }
        }
    }

    useEffect(() => {
        if (selectFile === undefined) {
            return;
        }
        const timer = setInterval(() => {
            const tmpWorkSpaceId = router.query.workspaceId;
            if (selectFile === undefined) return;
            if (tmpWorkSpaceId === undefined) return;
            if (openWs < 0) {
                ws.send(
                    JSON.stringify({
                        category: 'code',
                        type: 'getCode',
                        data: {
                            workspaceId: tmpWorkSpaceId,
                            filePath: selectFile.path
                        }
                    })
                );
            }
        }, 1000);
        const changer = setInterval(() => {
            if (isRunning.current) { return; };
            isRunning.current = true;
            const queue = tmpQueue.current;
            if (queue.length === 0) {
                isRunning.current = false;
                return;
            }

            if (selectFile === undefined) return;

            const updateContent: TQueueItem[] = []

            while (queue.length > 0) {
                const data = queue.shift()!;
                const updateData = updateContent.find(v => v.line === data.line);

                if (updateData === undefined) {
                    updateContent.push(data);
                } else {
                    updateData.updateContent = data.updateContent;
                }
            }

            const payload = {
                category: "code",
                type: "updateCode",
                data: {
                    workspaceId: getQuery(),
                    updateContent: {
                        path: selectFile.path,
                        content: updateContent
                    }
                }
            }
            if (openWs < 0) {
                ws.send(JSON.stringify(payload));
            }
            isRunning.current = false;
        }, 1000)
        return () => {
            clearInterval(timer);
            clearInterval(changer);
        };
    }, [selectFile])

    useEffect(() => {
        if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
            ws.addEventListener("message", fileWebsocketHanlder)
            setOpenWs(-1)
        } else {
            setOpenWs(openWs + 1)
        }
    }, [openWs, ws?.readyState])

    useEffect(() => {
        const tmpWorkSpaceId = router.query.workspaceId;
        if (selectFile === undefined) {
            return;
        }
        if (openWs < 0) {
            ws.send(
                JSON.stringify({
                    category: 'code',
                    type: 'getCode',
                    data: {
                        workspaceId: tmpWorkSpaceId,
                        filePath: selectFile.path
                    }
                })
            );
        }
        props.setFocusId(selectFile?.path)
    }, [selectFile, openWs])

    useEffect(() => {
        setFocusIdChange(true);
    }, [props.focusId])

    useEffect(() => {
        if (originData === undefined) {
            return;
        }
        setFileData(originData)

    }, [originData])

    useEffect(() => {
        if (changeValue) {
            const tmpWorkSpaceId = router.query.workspaceId;
            if (selectFile === undefined) {
                return;
            }
            ws.send(
                JSON.stringify({
                    category: 'code',
                    type: 'getCode',
                    data: {
                        workspaceId: tmpWorkSpaceId,
                        filePath: selectFile.path
                    }
                })
            );
            setOnlyChange(false);
            setChangeValue(false);
        }
    }, [changeValue])

    useEffect(() => {
        if (fileData === undefined) {
            return;
        }
        if (focusIdChange) {
            setFocusIdChange(false);
            return;
        }
        if (originData !== fileData) {
            setOnlyChange(true);
        } else {
            setOnlyChange(false)
        }
    }, [fileData])



    if (selectFile === undefined) {
        return <></>
    }

    return <div className={classes.codeConent} onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (selectFile === undefined) {
            return;
        } else {
            props.setFocusId(selectFile.path)
        }
    }}>
        <div className={classes.topFileView}
            onWheel={(e) => {
                e.preventDefault();
                e.currentTarget.scrollLeft += e.deltaY;
            }}
            onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation();
                dragTopFile(e)
            }}
            onDragLeave={(e) => {
                let drageventer = document.getElementById("dragEventer");
                if (drageventer === null) return;
                drageventer.style.background = "none";
            }}
            onDrop={(e) => {
                e.preventDefault()
                e.stopPropagation();
                let drageventer = document.getElementById("dragEventer");
                if (drageventer === null) return;
                drageventer.style.background = "none";
                let tmpViewState = cloneDeep(props.viewState)
                if (tmpViewState?.children === undefined) {
                    return;
                }
                if (tmpViewState.children.some((v) => v.name === props.dragId)) {
                    return;
                } else {
                    if (props.dragId === undefined) {
                        return;
                    }
                    let tmpPath = props.dragId.split("/");
                    tmpViewState?.children.push({
                        data: "",
                        name: tmpPath[tmpPath.length - 1],
                        path: props.dragId,
                        focus: true
                    })
                    props.setParentState(tmpViewState)
                }
            }}>
            {props.viewState?.children?.map((v, idx) => {
                let fileType = v.path.split("/");
                return <div key={v.path}
                    draggable
                    className={clsx(classes.topFile, selectFile.name === v.name && classes.activeTopFile)}
                    onClick={() => {
                        setSelectFile(v)
                    }}
                    onDragStart={(e) => {
                        checkPointerEvent(false);
                        props.setDragId(v.name)
                    }}
                    onDragEnd={async (e) => {
                        checkPointerEvent(true);
                        let tmpViewState = cloneDeep(props.viewState)
                        if (tmpViewState?.children === undefined) {
                            return;
                        }
                        let checkNumber = tmpViewState.children.findIndex((v) => v.path === props.dragId);
                        tmpViewState.children.splice(checkNumber, 1);
                        if (tmpViewState.children.length === 0) {
                            tmpViewState.children = undefined
                        }
                        props.setParentState(tmpViewState)
                        props.setDragId(undefined)
                    }}
                >
                    <div className={classes.topFileImage}>
                        {<img width="15px" height="15px" src={`images/language/${returnFile(fileType[fileType.length - 1])}`} />}
                    </div>
                    <div style={{ paddingLeft: "20px", display: "inline-block" }}>
                        {v.name}
                    </div>
                    <IconButton id="fileContent" style={{ width: "30px", height: "30px", position: "absolute", right: "5px" }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            let tmpParent = cloneDeep(props.viewState?.children);
                            tmpParent?.splice(idx, 1);
                            if (tmpParent?.length === 0) {
                                tmpParent = undefined;
                            }
                            let tmpParentData = cloneDeep(props.viewState);
                            tmpParentData!.children = tmpParent
                            props.setParentState(tmpParentData)
                            props.setFocusId(undefined)
                            props.setMoveCheck(true);
                        }}>
                        <CloseOutlined style={{ width: "20px", height: "20px", color: "#fff" }} />
                    </IconButton>
                </div>
            })}
        </div>
        <div className={classes.realCode} id="codeContent">
            <Editor
                height="100%"
                saveViewState={true}
                defaultLanguage="typescript"
                theme="vs-dark"
                path={selectFile.path}
                options={{ selectOnLineNumbers: true }}
                defaultValue={fileData === undefined ? "" : fileData}
                value={fileData === undefined ? "" : fileData}
                onChange={(v, e) => {
                    let lineNum = 0;
                    let isDel = false;
                    if (originData !== undefined && v !== undefined) {
                        let divideOriginContent: string[] = originData?.split("\n");
                        let divideNewContent: string[] | undefined = v?.split("\n");
                        for (let i = 0; i < Math.max(divideOriginContent.length, divideNewContent.length); i++) {
                            if (divideOriginContent?.[i] !== divideNewContent?.[i]) {
                                lineNum = i;

                                if (divideNewContent.length < divideOriginContent.length) {
                                    isDel = true;
                                }
                                break;
                            }
                        }
                    }

                    setEditLine(lineNum)

                    tmpQueue.current.push({
                        line: lineNum + 1,
                        updateContent: isDel ? undefined : (v?.split('\n')?.[lineNum] ?? '')
                    });

                    setFileData(v);
                }}
            />
        </div>
    </div>
}

