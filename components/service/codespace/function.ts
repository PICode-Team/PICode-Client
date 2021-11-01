import { cloneDeep, throttle } from "lodash";
import React from "react";
import { ISidebarItem } from ".";
import { IChildrenState, ICodeContent, IWraper } from "./types";

export const dragComponent = throttle(
    (e: React.DragEvent<HTMLDivElement>, viewState: IWraper | undefined) => {
        e.preventDefault();
        if (e.currentTarget === null) return;
        let getPosition = e.currentTarget.getBoundingClientRect();
        let drageventer = document.getElementById("dragEventer");
        if (drageventer === null) return;

        if (onlyCenter(viewState)) {
            drageventer.style.left = String(getPosition.left) + "px";
            drageventer.style.top = String(getPosition.top) + "px";
            drageventer.style.width = String(getPosition.width) + "px";
            drageventer.style.height = String(getPosition.height) + "px";
            drageventer.style.background = "rgba(255, 255, 255, 0.4)";
            return;
        }
        if (getPosition.left + getPosition.width / 9 > e.clientX) {
            drageventer.style.left = String(getPosition.left) + "px";
            drageventer.style.top = String(getPosition.top + 30) + "px";
            drageventer.style.width = String(getPosition.width / 2) + "px";
            drageventer.style.height = String(getPosition.height - 30) + "px";
            drageventer.style.background = "rgba(255, 255, 255, 0.4)";
        } else if (getPosition.left + (getPosition.width / 9) * 8 < e.clientX) {
            drageventer.style.left =
                String(getPosition.left + getPosition.width / 2) + "px";
            drageventer.style.top = String(getPosition.top + 30) + "px";
            drageventer.style.width = String(getPosition.width / 2) + "px";
            drageventer.style.height = String(getPosition.height - 30) + "px";
            drageventer.style.background = "rgba(255, 255, 255, 0.4)";
        } else if (getPosition.top + getPosition.height / 9 > e.clientY) {
            drageventer.style.left = String(getPosition.left) + "px";
            drageventer.style.top = String(getPosition.top + 30) + "px";
            drageventer.style.width = String(getPosition.width) + "px";
            drageventer.style.height =
                String(getPosition.height / 2 - 30) + "px";
            drageventer.style.background = "rgba(255, 255, 255, 0.4)";
        } else if (getPosition.top + (getPosition.height / 9) * 8 < e.clientY) {
            drageventer.style.left = String(getPosition.left) + "px";
            drageventer.style.top =
                String(getPosition.top + getPosition.height / 2 + 30) + "px";
            drageventer.style.width = String(getPosition.width) + "px";
            drageventer.style.height =
                String(getPosition.height / 2 - 30) + "px";
            drageventer.style.background = "rgba(255, 255, 255, 0.4)";
        } else {
            drageventer.style.left = String(getPosition.left) + "px";
            drageventer.style.top = String(getPosition.top + 30) + "px";
            drageventer.style.width = String(getPosition.width) + "px";
            drageventer.style.height = String(getPosition.height - 30) + "px";
            drageventer.style.background = "rgba(255, 255, 255, 0.4)";
        }
    },
    200
);

export const dragTopFile = throttle((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.currentTarget === null) return;
    let getPosition = e.currentTarget.getBoundingClientRect();
    let drageventer = document.getElementById("dragEventer");
    if (drageventer === null) return;

    drageventer.style.left = String(getPosition.left) + "px";
    drageventer.style.top = String(getPosition.top) + "px";
    drageventer.style.width = String(getPosition.width) + "px";
    drageventer.style.height = "30px";
    drageventer.style.background = "rgba(255, 255, 255, 0.4)";
}, 200);

export const dropElement = (
    e: React.DragEvent<HTMLDivElement>,
    viewState: IWraper | undefined,
    setViewState: React.Dispatch<React.SetStateAction<IWraper | undefined>>,
    dragId: string | undefined
) => {
    e.preventDefault();
    if (dragId === undefined) return;
    let drageventer = document.getElementById("dragEventer");
    if (drageventer === null) return;
    if (e.currentTarget === null) return;
    drageventer.style.background = "none";
    let getPosition = e.currentTarget.getBoundingClientRect();
    let fileName = dragId.split("/");
    if (viewState === undefined) {
        setViewState({
            width: "100%",
            height: "100%",
            children: [
                {
                    data: "",
                    path: dragId,
                    name: fileName[fileName.length - 1],
                    focus: true,
                },
            ],
        });
        return;
    } else {
        if (getPosition.left + getPosition.width / 10 > e.clientX) {
            let tmpViewState = viewState;
            tmpViewState.wrapper = {
                right: {
                    width: "50%",
                    height: "100%",
                    children: tmpViewState.children,
                },
                left: {
                    width: "50%",
                    height: "100%",
                    children: [
                        {
                            data: "",
                            path: dragId,
                            name: fileName[fileName.length - 1],
                            focus: true,
                        },
                    ],
                },
            };
            tmpViewState.children = undefined;
            setViewState(tmpViewState);
        } else if (
            getPosition.left + (getPosition.width / 10) * 9 <
            e.clientX
        ) {
            let tmpViewState = viewState;
            tmpViewState.wrapper = {
                left: {
                    width: "50%",
                    height: "100%",
                    children: tmpViewState.children,
                },
                right: {
                    width: "50%",
                    height: "100%",
                    children: [
                        {
                            data: "",
                            path: dragId,
                            name: fileName[fileName.length - 1],
                            focus: true,
                        },
                    ],
                },
            };
            tmpViewState.children = undefined;
            setViewState(tmpViewState);
        } else if (getPosition.top + getPosition.height / 10 > e.clientY) {
            let tmpViewState = viewState;
            tmpViewState.wrapper = {
                bottom: {
                    width: "100%",
                    height: "50%",
                    children: tmpViewState.children,
                },
                top: {
                    width: "100%",
                    height: "50%",
                    children: [
                        {
                            data: "",
                            path: dragId,
                            name: fileName[fileName.length - 1],
                            focus: true,
                        },
                    ],
                },
            };
            tmpViewState.children = undefined;
            setViewState(tmpViewState);
        } else if (
            getPosition.top + (getPosition.height / 10) * 9 <
            e.clientY
        ) {
            let tmpViewState = viewState;
            tmpViewState.wrapper = {
                top: {
                    width: "100%",
                    height: "50%",
                    children: tmpViewState.children,
                },
                bottom: {
                    width: "100%",
                    height: "50%",
                    children: [
                        {
                            data: "",
                            path: dragId,
                            name: fileName[fileName.length - 1],
                            focus: true,
                        },
                    ],
                },
            };
            tmpViewState.children = undefined;
            setViewState(tmpViewState);
        } else {
            let tmpViewState = cloneDeep(viewState);
            if (tmpViewState.children === undefined) {
                tmpViewState.children = [
                    {
                        data: "",
                        path: dragId,
                        name: fileName[fileName.length - 1],
                        focus: true,
                    },
                ];
            } else {
                if(!tmpViewState.children.some((v)=>v.path===dragId)){
                    tmpViewState.children!.push({
                        data: "",
                        path: dragId,
                        name: fileName[fileName.length - 1],
                        focus: true,
                    });
                }
            }
            setViewState(tmpViewState);
        }
    }
};

export const onlyCenter = (viewState: IWraper | undefined) => {
    if (viewState === undefined) return true;
    return false;
};

export const checkPointerEvent = (check: boolean) => {
    let codeContent = document.querySelectorAll<HTMLElement>("#codeContent");
    let fileContent = document.querySelectorAll<HTMLElement>("#fileContent");
    if (codeContent !== null && fileContent !== null) {
        codeContent.forEach((v) => {
            v.style.pointerEvents = check ? "auto" : "none";
        });
        fileContent.forEach((v) => {
            v.style.pointerEvents = check ? "auto" : "none";
        });
    }
};

export const dragFileToFolder = throttle(
    (
        e: React.DragEvent<HTMLDivElement>,
        file: ISidebarItem,
        rootPath: string | undefined,
        dragId: string | undefined
    ) => {
        e.preventDefault();
        if (dragId === undefined) return;
        if (file.path.includes(dragId)) {
            return;
        }
        if (file.children === undefined && dragId.includes(file.path)) {
            return;
        }
        if (e.currentTarget === null) return;
        if (file.children !== undefined) {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.4)";
            let container = document.getElementById(`${file.path}scontent`);
            if (container !== null) {
                container.style.background = "rgba(255, 255, 255, 0.4)";
            }
        } else {
            if (rootPath === undefined) {
                return;
            } else {
                let fileRealPath = file.path.split("/");
                                if (fileRealPath.length - rootPath.split("/").length > 0) {
                    let realPath = fileRealPath
                        .splice(0, fileRealPath.length - 1)
                        .join("/");
                    let container = document.getElementById(
                        `${realPath}scontent`
                    );
                    let rootFolder = document.getElementById(`${realPath}`);
                    if (container !== null && rootFolder !== null) {
                        container.style.background = "rgba(255, 255, 255, 0.4)";
                        rootFolder.style.background =
                            "rgba(255, 255, 255, 0.4)";
                    }
                } else {
                    let sideBar = document.getElementById("sidebarContainer");
                    if (sideBar !== null) {
                        sideBar.style.background = "rgba(255, 255, 255, 0.4)";
                    }
                }
            }
        }
    },
    200
);

export const dragFileToFolderOut = (
    e: React.DragEvent<HTMLDivElement>,
    file: ISidebarItem,
    rootPath: string | undefined,
    dragId: string | undefined
) => {
    if (file.children !== undefined) {
        e.currentTarget.style.background = "inherit";
        let container = document.getElementById(`${file.path}scontent`);
        if (container !== null) {
            container.style.background = "inherit";
        }
    } else {
        if (rootPath === undefined) {
            return;
        } else {
            let fileRealPath = file.path.split("/");
            if (fileRealPath.length - rootPath.split("/").length > 0) {
                let realPath = fileRealPath
                    .splice(0, fileRealPath.length - 1)
                    .join("/");
                let container = document.getElementById(`${realPath}scontent`);
                let rootFolder = document.getElementById(`${realPath}`);
                if (container !== null && rootFolder !== null) {
                    container.style.background = "inherit";
                    rootFolder.style.background = "inherit";
                }
            } else {
                let sideBar = document.getElementById("sidebarContainer");
                if (sideBar !== null) {
                    sideBar.style.background = "inherit";
                }
            }
        }
    }
};

export const getQuery = () => {
    let query = window.location.search.substr(1).split("&");
    let tmpQuery: { [key: string]: string } = {};
    for (let i of query) {
        let tmpKey = i.split("=");
        tmpQuery[tmpKey[0]] = tmpKey[1];
    }
    let tmpWorkSpaceId = tmpQuery?.workspaceId;
    return tmpWorkSpaceId;
};

export const moveFile = (ws: any, filePath: string, newPath: ISidebarItem) => {
    let query = window.location.search.substr(1).split("&");
    let tmpQuery: { [key: string]: string } = {};
    for (let i of query) {
        let tmpKey = i.split("=");
        tmpQuery[tmpKey[0]] = tmpKey[1];
    }
    let tmpWorkSpaceId = tmpQuery?.workspaceId;
    let fileName = filePath.split("/");
    if (tmpWorkSpaceId === undefined) return;
    if (newPath.children !== undefined) {
        ws.send(
            JSON.stringify({
                category: "code",
                type: "moveFileOrDir",
                data: {
                    workspaceId: tmpWorkSpaceId,
                    oldPath: filePath,
                    newPath: newPath.path + "/" + fileName[fileName.length - 1],
                },
            })
        );
    } else {
        let parentPathSplit = newPath.path.split("/");
        parentPathSplit = parentPathSplit.splice(0, parentPathSplit.length - 1);
        let parentPath = parentPathSplit.join("/");
        ws.send(
            JSON.stringify({
                category: "code",
                type: "moveFileOrDir",
                data: {
                    workspaceId: tmpWorkSpaceId,
                    oldPath: filePath,
                    newPath: parentPath + "/" + fileName[fileName.length - 1],
                },
            })
        );
    }
    ws.send(
        JSON.stringify({
            category: "code",
            type: "getAllFilePath",
            data: {
                workspaceId: tmpWorkSpaceId,
            },
        })
    );
};

export const createFileOrDir = (ws: any, filePath: string, type: string) => {
    let query = window.location.search.substr(1).split("&");
    let tmpQuery: { [key: string]: string } = {};
    for (let i of query) {
        let tmpKey = i.split("=");
        tmpQuery[tmpKey[0]] = tmpKey[1];
    }
    let tmpWorkSpaceId = tmpQuery?.workspaceId;
    if (tmpWorkSpaceId === undefined) return;
    let payload: {
        category: string;
        type: string;
        data: {
            workspaceId: string;
            filePath?: string;
            dirPath?: string;
        };
    } = {
        category: "code",
        type: type === "file" ? "createFile" : "createDir",
        data: {
            workspaceId: tmpWorkSpaceId,
        },
    };
    type === "file"
        ? (payload.data.filePath = filePath)
        : (payload.data.dirPath = filePath);
    ws.send(JSON.stringify(payload));
    ws.send(
        JSON.stringify({
            category: "code",
            type: "getAllFilePath",
            data: {
                workspaceId: tmpWorkSpaceId,
            },
        })
    );
};
