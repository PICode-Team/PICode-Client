/* eslint-disable react-hooks/exhaustive-deps */
import { cloneDeep } from "lodash";
import React, { useEffect } from "react";
import { codeStyle } from "../../../styles/service/codespace/code";
import CodeContent from "./codecontent";
import { dragComponent, dropElement } from "./function";
import { ICodeChildState, IWraper } from "./types";

interface IViewSpace {
    moveCheck: boolean,
    setMoveCheck: React.Dispatch<React.SetStateAction<boolean>>,
    dragId: string | undefined,
    setDragId: React.Dispatch<React.SetStateAction<string | undefined>>,
    parentState: IWraper, type: string,
    setParentState: React.Dispatch<React.SetStateAction<IWraper | undefined>>,
    children: IWraper,
    position: { width: string, height: string },
    setFocusId: React.Dispatch<React.SetStateAction<string | undefined>>,
    focusId: string | undefined
}

export default function ViewSpace({ position, children, setParentState,
    setDragId, setMoveCheck, moveCheck,
    type, parentState, dragId, setFocusId, focusId }: IViewSpace) {
    const classes = codeStyle();
    const [viewState, setViewState] = React.useState<IWraper | undefined>(cloneDeep(children));

    useEffect(() => {
        if ((children.wrapper === undefined && viewState?.wrapper !== undefined) || (children.wrapper !== undefined && viewState?.wrapper === undefined)) {
            let tmpParent: any = cloneDeep(parentState);
            tmpParent.wrapper[type] = viewState
            setParentState(tmpParent)
        } else if (children.children?.length !== viewState?.children?.length) {
            if (viewState?.wrapper === undefined) {
                let tmpParent: any = cloneDeep(parentState);
                tmpParent.wrapper[type].children = viewState?.children
                setParentState(tmpParent)
            }
        }

        if (dragId === undefined && viewState?.children === undefined) {
            let tmpParent: IWraper = cloneDeep(parentState);
            if (type === "left") {
                tmpParent.children = tmpParent.wrapper!.right?.children
                tmpParent.wrapper = undefined;
            } else if (type === "right") {
                tmpParent.children = tmpParent.wrapper!.left?.children
                tmpParent.wrapper = undefined;
            } else if (type === "top") {
                tmpParent.children = tmpParent.wrapper!.bottom?.children
                tmpParent.wrapper = undefined;
            } else if (type === "bottom") {
                tmpParent.children = tmpParent.wrapper!.top?.children
                tmpParent.wrapper = undefined;
            }
            setParentState(tmpParent)
        }

    }, [viewState, moveCheck])

    useEffect(() => {
        let tmpViewState: any = cloneDeep(parentState);
        setViewState(tmpViewState.wrapper[type])
    }, [parentState])

    return <div className={classes.positionWrapper}
        style={{ width: position.width, height: position.height }}
        onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dragComponent(e, viewState)
        }}
        onDragLeave={(e) => {
            let drageventer = document.getElementById("dragEventer");
            if (drageventer === null) return;
            drageventer.style.background = "none";
        }}
        onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(2)
            e.currentTarget.style.background = "inherit"
            if (dragId !== undefined) {
                dropElement(e, viewState, setViewState, dragId)
            }
            console.log(2)
            setMoveCheck(true);
        }}>
        {viewState?.children !== undefined && <CodeContent
            dragId={dragId}
            setMoveCheck={setMoveCheck}
            setFocusId={setFocusId}
            focusId={focusId}
            setDragId={setDragId} viewState={viewState} setParentState={setViewState} />}
        {viewState?.wrapper !== undefined && Object.keys(viewState.wrapper).map((v: string) => {
            if (v === undefined) return;
            return <ViewSpace
                key={v}
                setDragId={setDragId}
                dragId={dragId}
                type={v}
                setMoveCheck={setMoveCheck}
                moveCheck={moveCheck}
                parentState={viewState}
                setFocusId={setFocusId}
                focusId={focusId}
                setParentState={setViewState}
                position={{ width: (viewState.wrapper as any)[v].width, height: (viewState.wrapper as any)[v].height }}
                // eslint-disable-next-line react/no-children-prop
                children={(viewState.wrapper as any)[v]}
            />
        })}
    </div>
}