/* eslint-disable react-hooks/exhaustive-deps */
import { IconButton } from "@material-ui/core";
import { AddBoxOutlined, CreateNewFolderOutlined, CreateOutlined, FolderOpenOutlined, FolderSpecialOutlined } from "@material-ui/icons";
import { cloneDeep } from "lodash";
import React, { useEffect } from "react";
import { ISidebarItem } from ".";
import { codeStyle } from "../../../styles/service/codespace/code";
import { useWs } from "../../context/websocket";
import { createFileOrDir, getQuery } from "./function";
import { expandCollapseMenu } from "./sidebarItem";

export default function CodeSideBar({ setDragId, setOpenId, projectName, fileList, focusId, setFocusId }: { setDragId: React.Dispatch<React.SetStateAction<string | undefined>>, setOpenId: React.Dispatch<React.SetStateAction<string | undefined>>, projectName: string | undefined, fileList: ISidebarItem | undefined, focusId: string | undefined, setFocusId: React.Dispatch<React.SetStateAction<string | undefined>> }) {
    const classes = codeStyle();
    const [openCheck, setOpenCheck] = React.useState<string[]>([]);
    const [sideDragId, setSideDragId] = React.useState<string>();
    const [createFile, setCreateFile] = React.useState<string>();
    const [sideFocusId, setSideFocusId] = React.useState<string>();
    const [rightClick, setRightClick] = React.useState<any>();
    const [renameCheck, setRenameCheck] = React.useState<string>();
    const ws: any = useWs();

    let rootPath = fileList?.path;

    useEffect(() => {
        if (rightClick === undefined) {
            let contextMenu = document.getElementById("contextMenu");
            if (contextMenu !== null) {
                contextMenu.style.display = "none"
            }
        } else {
            let contextMenu = document.getElementById("contextMenu");
            let rootCode = document.getElementById("rootCode");
            if (contextMenu !== null && rootCode !== null) {
                contextMenu.style.display = "block"
                contextMenu.style.left = rightClick.position.x;
                contextMenu.style.top = rightClick.position.y;
                rootCode.onmousedown = (e) => {
                    e.preventDefault();
                    setRightClick(undefined)
                    setCreateFile(undefined)
                }
            }
        }
    }, [rightClick])

    useEffect(() => {
        if (focusId !== undefined) {
            let path = focusId.split("\\");
            path = path.splice(0, path.length - 1)
            let tmpOpenCheck = cloneDeep(openCheck);
            let tmpCheck = "";
            if (path.length > 1) {
                for (let i of path) {
                    if (i !== "") {
                        tmpCheck += ("\\" + i);
                        if (!tmpOpenCheck.some((v) => v === tmpCheck)) {
                            tmpOpenCheck.push(tmpCheck);
                        }
                    }
                }
            }
            if (tmpOpenCheck.length !== openCheck.length) {
                setOpenCheck(tmpOpenCheck)
            }
            setSideFocusId(focusId)
        }
    }, [focusId])

    return <div className={classes.sidebar}
        onClick={(e) => {
            e.preventDefault();
            if (rightClick !== undefined) {
                setRightClick(undefined)
            }
        }}>
        <div className={classes.projectNameContainer}
            onMouseOverCapture={(e) => {
                e.preventDefault();
                let topMenu = document.getElementById("topMenu")
                let projectName = document.getElementById("projectName")
                if (topMenu !== null && projectName !== null) {
                    projectName.style.width = "calc(100% - 55px)"
                    topMenu.style.display = "block"
                }
            }}
            onMouseOutCapture={(e) => {
                e.preventDefault();
                let topMenu = document.getElementById("topMenu")
                let projectName = document.getElementById("projectName")
                if (topMenu !== null && projectName !== null) {
                    projectName.style.width = "100%"
                    topMenu.style.display = "none"
                }
            }}
        >
            <div className={classes.projectName} id="projectName">
                {projectName}
            </div>
            <div className={classes.topMenuContainer} id="topMenu">
                <IconButton className={classes.topButton} onClick={() => {
                    setCreateFile("folder")
                }}>
                    <CreateNewFolderOutlined className={classes.topIconSize} />
                </IconButton>
                <IconButton className={classes.topButton} onClick={() => {
                    setCreateFile("file")
                }}>
                    <AddBoxOutlined className={classes.topIconSize} />
                </IconButton>
            </div>
        </div>
        <div className={classes.itemContainer} id="sidebarContainer">
            {(fileList !== undefined && fileList.children !== undefined) && expandCollapseMenu(fileList, openCheck, setOpenCheck, classes, setDragId, setOpenId, setSideDragId, setFocusId, focusId, fileList.path, sideDragId, ws, createFile, setCreateFile, sideFocusId, setSideFocusId, setRightClick, renameCheck, setRenameCheck)}
            {((focusId === undefined && sideFocusId === undefined) && createFile !== undefined) && <input
                autoFocus
                onBlur={(e) => {
                    if (e.currentTarget.value !== "") {
                        let newFileName = (rootPath ?? "") + e.currentTarget.value;
                        createFileOrDir(ws, newFileName, createFile)
                    }
                    setCreateFile(undefined)
                }}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        if (e.currentTarget.value === "") {
                            setCreateFile(undefined)
                        } else {
                            let newFileName = (rootPath ?? "") + e.currentTarget.value;
                            createFileOrDir(ws, newFileName, createFile)
                        }
                        setCreateFile(undefined)
                    }
                }}
                style={{ width: `100%` }}
            />}
        </div>
        <div className={classes.sidebarItemContainer} id="contextMenu">
            <div className={classes.sidebarItem} onClick={() => {
                let tmpOpenCheck = cloneDeep(openCheck);
                if (!tmpOpenCheck.some((v) => v === rightClick.filePath)) {
                    tmpOpenCheck.push(rightClick.filePath)
                    setOpenCheck(tmpOpenCheck)
                    setSideFocusId(rightClick.filePath)
                }
                setCreateFile("file")
            }}>
                New File
            </div>
            <div className={classes.sidebarItem} onClick={() => {
                let tmpOpenCheck = cloneDeep(openCheck);
                if (!tmpOpenCheck.some((v) => v === rightClick.filePath)) {
                    tmpOpenCheck.push(rightClick.filePath)
                    setOpenCheck(tmpOpenCheck)
                    setSideFocusId(rightClick.filePath)
                }
                setCreateFile("folder")
            }}>
                New Folder
            </div>
            <div className={classes.sidebarItem} onClick={(e) => {
                e.preventDefault();
                setRenameCheck(rightClick.filePath)
            }}>
                Rename
            </div>
            <div className={classes.sidebarItem} onClick={() => {
                if (rightClick === undefined || rightClick.filePath === undefined) return;
                let workspaceId = getQuery();
                if (workspaceId === undefined) return;
                if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
                    ws.send(
                        JSON.stringify({
                            category: 'code',
                            type: 'deleteFileOrDir',
                            data: {
                                workspaceId: workspaceId,
                                deletePath: rightClick.filePath,
                                recursive: true
                            }
                        })
                    );
                    ws.send(
                        JSON.stringify({
                            category: 'code',
                            type: 'getAllFilePath',
                            data: {
                                workspaceId: workspaceId,
                            }
                        })
                    );
                }
            }}>
                Delete
            </div>
        </div>
    </div >
}