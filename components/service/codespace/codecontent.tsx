/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { IconButton } from "@material-ui/core";
import { CloseOutlined } from "@material-ui/icons";
import Editor, { useMonaco } from "@monaco-editor/react";
import { cloneDeep, debounce, throttle } from "lodash";
import React, { useEffect, useRef } from "react"
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
    const isRunning = React.useRef<boolean>(false);
    const monaco = useMonaco();
    const beforeData = useRef<any>();
    const onlyCursor = useRef<boolean>(false);
    const serverLineRef = useRef<number>();
    const lineRef = useRef<{ lineNumber: number, column: number }>({ lineNumber: 0, column: 0 })
    const editorRef = useRef<any>(null);

    useEffect(() => {
        let target = props.viewState!.children!.length;
        if (selectFile === undefined) {
            setSelectFile(props.viewState!.children![target - 1])
        }
    }, [props.viewState])

    function handleEditorDidMount(editor: any, monaco: any) {
        // here is the editor instance
        // you can store it in `useRef` for further usage
        editorRef.current = editor;

        editor.onDidChangeCursorPosition((e: any) => {
            if (e.source !== "modelChange") {
                lineRef.current = e.position
            }
        })

    }

    const fileWebsocketHanlder = (msg: any) => {
        const message = JSON.parse(msg.data)
        if (message.category === 'code') {
            switch (message.type) {
                case "getCode": {
                    if (message.data.rowInfo !== undefined) {
                        let userId = localStorage.getItem("userId");
                        for (let i in message.data.rowInfo) {
                            if (i === userId) {
                                serverLineRef.current = message.data.rowInfo[i]
                                break;
                            }
                            let alreadyHaveOwner = document.querySelectorAll(".line-numbers");
                            console.log(alreadyHaveOwner)
                        }
                    }
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
        return () => {
            clearInterval(timer);
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
        let tmpOriginData = cloneDeep(originData);
        if (fileData !== undefined && !focusIdChange) {
            let defaultLine = lineRef.current.lineNumber;
            if (defaultLine > 0 && onlyCursor.current) {
                let tmpArrData = tmpOriginData.split("\n")
                let tmpFileData = fileData.split("\n");
                let toHigh = defaultLine - 1;
                let toLow = tmpFileData.length + 1 - defaultLine;
                let maxValue = Math.max(toHigh, toLow);
                if (serverLineRef.current !== undefined) {
                    tmpArrData[serverLineRef.current - 1] = tmpFileData[lineRef.current.lineNumber - 1];
                    lineRef.current.lineNumber = serverLineRef.current;
                }
                tmpOriginData = tmpArrData.join('\n');
            }
        }
        beforeData.current = originData;
        setFileData(tmpOriginData)
    }, [originData, props.focusId])

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
        if (editorRef.current !== null) {
            editorRef.current.setPosition(lineRef.current)
            editorRef.current.focus()
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
                onMount={handleEditorDidMount}
                onChange={(v, e) => {
                    if (e.changes?.[0]?.forceMoveMarkers ?? true) {
                        return;
                    }
                    let tmpText = v?.split("\n");

                    if (e.changes[0].range.startLineNumber !== e.changes[0].range.endLineNumber) {
                        onlyCursor.current = true;
                        lineRef.current = {
                            lineNumber: e.changes[0].range.startLineNumber,
                            column: tmpText !== undefined ? tmpText[e.changes[0].range.startLineNumber]?.length ?? 0 : 0
                        }
                    }
                    else if (e.changes[0].text === "\r\n" || e.changes[0].text === "\n") {
                        onlyCursor.current = true;
                        lineRef.current = {
                            lineNumber: e.changes[0].range.endLineNumber,
                            column: lineRef.current.column > 0 ? 0 : lineRef.current.column
                        }
                    }
                    else if (e.changes[0].text === "") {
                        onlyCursor.current = true;
                        lineRef.current = {
                            lineNumber: e.changes[0].range.endLineNumber,
                            column: e.changes[0].range.endColumn - e.changes[0].rangeLength
                        }
                    } else if (e.changes[0].text.length !== 1) {
                        onlyCursor.current = true;
                        lineRef.current = {
                            lineNumber: e.changes[0].range.endLineNumber,
                            column: lineRef.current.column + e.changes[0].text.length
                        }
                    } else {
                        lineRef.current = {
                            lineNumber: e.changes[0].range.endLineNumber,
                            column: e.changes[0].range.endColumn + 1
                        }
                    }
                    let enterLine = e.changes[0].text.split("\n").length;

                    const payload = {
                        category: "code",
                        type: "updateCode",
                        data: {
                            workspaceId: getQuery(),
                            updateContent: {
                                path: selectFile.path,
                                content: (e.changes ?? []).map((v: any) => {
                                    const range = v.range;
                                    return {
                                        startRow: range.startLineNumber,
                                        endRow: range.endLineNumber,
                                        startCol: range.startColumn,
                                        endCol: range.endColumn,
                                        data: v.text,
                                        rowInfo: {
                                            isUpdate: onlyCursor.current,
                                            lineNumber: lineRef.current.lineNumber + (enterLine - 1)
                                        }
                                    }
                                })
                            }
                        }
                    }
                    if (openWs < 0) {
                        ws.send(JSON.stringify(payload));
                    }
                    onlyCursor.current = false;
                    setFileData(v);
                }}
            />
        </div>
    </div>
}

