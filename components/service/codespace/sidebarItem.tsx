/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { cloneDeep, filter, result } from "lodash";
import { ISidebarItem } from ".";
import { checkPointerEvent, createFileOrDir, dragFileToFolder, dragFileToFolderOut, getQuery, moveFile } from "./function";

export const returnFile = (fileName: string) => {
    let existImage = ["c", "c#", "cpp", "css", "go", "html", "ico", "java", "js", "ts", "json", "py", "md", "svg"]
    let file = fileName.split(".");
    if (fileName === ".eslintrc.json") {
        return "eslint.svg"
    } else if (fileName === ".gitignore") {
        return "git.svg"
    } else if (fileName === ".env") {
        return "setting.svg"
    } else if (fileName === "tsconfig.json") {
        return "tsconfig.svg"
    }
    let type = file[file.length - 1];
    let name = file[file.length - 2];
    if (type === "jpeg" || type === "png" || type === "gif") {
        return "image.svg"
    } else if (type === "tsx") {
        return "ts.svg"
    } else if (type === "jsx") {
        return "js.svg"
    }
    let checkExist = existImage.some((v) => v === type);
    if (checkExist) {
        return `${type}.svg`
    } else {
        return `default.svg`
    }
}

export const expandCollapseMenu = (
    menu: ISidebarItem | undefined,
    openCheck: string[], setOpenCheck: React.Dispatch<React.SetStateAction<string[]>>,
    classes: any,
    setDragId: React.Dispatch<React.SetStateAction<string | undefined>>,
    setOpenId: React.Dispatch<React.SetStateAction<string | undefined>>,
    setSideDragId: React.Dispatch<React.SetStateAction<string | undefined>>,
    setFocusId: React.Dispatch<React.SetStateAction<string | undefined>>,
    focusId: string | undefined,
    rootPath: string | undefined,
    sideDragId: string | undefined,
    ws: any,
    createFile: string | undefined,
    setCreateFile: React.Dispatch<React.SetStateAction<string | undefined>>,
    sideFocusId: string | undefined,
    setSideFocusId: React.Dispatch<React.SetStateAction<string | undefined>>,
    setRightClick: any,
    renameCheck: string | undefined,
    setRenameCheck: React.Dispatch<React.SetStateAction<string | undefined>>,
): JSX.Element[] | undefined => {
    let time: number;

    return (menu && menu.children) && menu.children.sort((a, b) => {
        if (a.children === undefined) {
            return 1
        } else {
            return -1;
        }
    }).map((file) => {
        let fileName = file.path.split("\\");
        if (file.path === renameCheck) {
            return <>
                <input autoFocus style={{ width: `100%` }}
                    defaultValue={fileName[fileName.length - 1]}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            if (e.currentTarget.value === "" || e.currentTarget.value === renameCheck) {
                                setRenameCheck(undefined)
                            } else {
                                let workspaceId = getQuery();
                                let newFileName = cloneDeep(fileName);
                                newFileName[newFileName.length - 1] = e.currentTarget.value;
                                let resultName = newFileName.join("\\");
                                ws.send(
                                    JSON.stringify({
                                        category: "code",
                                        type: "moveFileOrDir",
                                        data: {
                                            workspaceId: workspaceId,
                                            oldPath: file.path,
                                            newPath: resultName,
                                        },
                                    })
                                );
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
                            setRenameCheck(undefined)
                        }
                    }}
                    onBlur={(e) => {
                        e.preventDefault();
                        setRenameCheck(undefined)
                    }} />
            </>
        }
        return <>
            <div
                style={{
                    paddingLeft: `${15 + (fileName.length - 2) * 7}px`,
                    background: focusId === file.path ? "#515C60" : sideFocusId === file.path ? "#569cd6" : "inherit",
                }}
                onContextMenu={(e) => {
                    e.preventDefault();
                    setRightClick({
                        filePath: file.path,
                        position: {
                            x: `${e.clientX - 64}px`,
                            y: `${e.clientY - 110}px`
                        }
                    })
                }}
                key={file.path}
                className={classes.sideFile}
                draggable
                id={file.path}
                onDragStart={(e) => {
                    checkPointerEvent(false);
                    setSideDragId(e.currentTarget.id)
                    if (file.children === undefined) {
                        setDragId(e.currentTarget.id);
                    }
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (sideDragId === undefined) return;
                    dragFileToFolderOut(e, file, rootPath, sideDragId)
                    if (file.children === undefined && sideDragId.includes(file.path)) {
                        return;
                    }
                    moveFile(ws, sideDragId, file)
                }}
                onDragEnd={(e) => {
                    checkPointerEvent(true);
                    setDragId(undefined);
                    setSideDragId(undefined)
                }}
                onMouseOver={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (focusId !== file.path && sideFocusId !== file.path) {
                        e.currentTarget.style.background = "#2C3239"
                    }
                }}
                onMouseOut={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (focusId !== file.path && sideFocusId !== file.path) {
                        e.currentTarget.style.background = "inherit"
                    }
                }}
                onClick={(e) => {
                    if (file.children === undefined) {
                        setFocusId(e.currentTarget.id)
                        setOpenId(e.currentTarget.id)
                    } else {
                        setSideFocusId(e.currentTarget.id)
                        let tmpOpenCheck = cloneDeep(openCheck);
                        let checkConfig = tmpOpenCheck.findIndex((check: string) => check === file.path)
                        if (checkConfig > -1) {
                            tmpOpenCheck.splice(checkConfig, 1);
                        } else {
                            tmpOpenCheck.push(file.path);
                        }
                        setOpenCheck(tmpOpenCheck)
                    }
                }}
                onDragEnter={(e) => {
                    time = Number(e.timeStamp);
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    dragFileToFolderOut(e, file, rootPath, sideDragId)
                    time = Number(e.timeStamp);
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dragFileToFolder(e, file, rootPath, sideDragId)
                    if (sideDragId === undefined) return
                    if (sideDragId.includes(file.path)) {
                        return;
                    }
                    if (Number((((Number(e.timeStamp) - time) % 60000) / 1000).toFixed(0)) > 0.5) {
                        let tmpOpenCheck = cloneDeep(openCheck);
                        let checkConfig = tmpOpenCheck.findIndex((check: string) => check === file.path)
                        if (checkConfig < 0) {
                            tmpOpenCheck.push(file.path);
                        }
                        setOpenCheck(tmpOpenCheck)
                    }
                }}
            >
                <div className={classes.fileImage}>
                    {file.children !== undefined && <img width="15px" height="15px" src={`images/codespace/collapse.svg`}
                        style={{
                            transform: openCheck.some((v) => v === file.path) ? `rotate(0)` : `rotate(-90deg)`
                        }} />}
                    {file.children === undefined && <img width="15px" height="15px" src={`images/language/${returnFile(fileName[fileName.length - 1])}`} />}
                </div>
                <div className={classes.fileName}>
                    {fileName[fileName.length - 1]}
                </div>
            </div>
            <div id={file.path + "scontent"}>
                {openCheck.some((check: string) => check === file.path) && expandCollapseMenu(file, openCheck, setOpenCheck, classes, setDragId, setOpenId, setSideDragId, setFocusId, focusId, rootPath, sideDragId, ws, createFile, setCreateFile, sideFocusId, setSideFocusId, setRightClick, renameCheck, setRenameCheck)}
            </div>
            {((sideFocusId === undefined && focusId === file.path) && createFile !== undefined) && <input
                autoFocus
                onBlur={(e) => {
                    if (e.currentTarget.value !== "") {
                        if (file.children === undefined) {
                            let realFileName = file.path.split("\\");
                            realFileName[realFileName.length - 1] = e.currentTarget.value;
                            createFileOrDir(ws, realFileName.join("\\"), createFile)
                        } else {
                            let realFileName = file.path + "\\" + e.currentTarget.value;
                            createFileOrDir(ws, realFileName, createFile)
                        }
                    }
                    setCreateFile(undefined)
                }}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        if (e.currentTarget.value === "") {
                            setCreateFile(undefined)
                        } else {
                            if (file.children === undefined) {
                                let realFileName = file.path.split("\\");
                                realFileName[realFileName.length - 1] = e.currentTarget.value;
                                createFileOrDir(ws, realFileName.join("\\"), createFile)
                            } else {
                                let realFileName = file.path + "\\" + e.currentTarget.value;
                                createFileOrDir(ws, realFileName, createFile)
                            }
                        }
                        setCreateFile(undefined)
                    }
                }}
                style={{ width: `calc(100% - ${15 + (fileName.length - 2) * 7}px)`, marginLeft: `${15 + (fileName.length - 2) * 7}px`, }}
            />}
            {(sideFocusId === file.path && createFile !== undefined) && <input
                autoFocus
                onBlur={(e) => {
                    if (e.currentTarget.value !== "") {
                        if (file.children === undefined) {
                            let realFileName = file.path.split("\\");
                            realFileName[realFileName.length - 1] = e.currentTarget.value;
                            createFileOrDir(ws, realFileName.join("\\"), createFile)
                        } else {
                            let realFileName = file.path + "\\" + e.currentTarget.value;
                            createFileOrDir(ws, realFileName, createFile)
                        }
                    }
                    setCreateFile(undefined)
                }}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        if (e.currentTarget.value === "") {
                            setCreateFile(undefined)
                        } else {
                            if (file.children === undefined) {
                                let realFileName = file.path.split("\\");
                                realFileName[realFileName.length - 1] = e.currentTarget.value;
                                createFileOrDir(ws, realFileName.join("\\"), createFile)
                            } else {
                                let realFileName = file.path + "\\" + e.currentTarget.value;
                                createFileOrDir(ws, realFileName, createFile)
                            }
                        }
                        setCreateFile(undefined)
                    }
                }}
                style={{ width: `calc(100% - ${15 + (fileName.length - 2) * 7}px)`, marginLeft: `${15 + (fileName.length - 2) * 7}px`, }}
            />}
        </>
    })
}
