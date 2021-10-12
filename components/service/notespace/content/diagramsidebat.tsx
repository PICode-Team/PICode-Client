import { IconButton } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';
import React from 'react';
import { diagrmStyle } from '../../../../styles/service/notespace/diagram';

export default function DiagramSidebar() {
    const [open, setOpen] = React.useState<boolean>(false);
    const classes = diagrmStyle();

    const onDragStart = (event: any, nodeType: any) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <React.Fragment>
            <IconButton
                onClick={() => {
                    setOpen(!open);
                }}
                style={{ position: "absolute", right: 0, top: 0, zIndex: 99, color: "#fff" }}>
                <AddCircleOutline />
            </IconButton>
            {open && <div
                className={classes.panelWrapper}>
                <div className={classes.nodeContainer} onDragStart={(event) => onDragStart(event, 'input')} draggable>
                    Input Node
                </div>
                <div className={classes.nodeContainer} onDragStart={(event) => onDragStart(event, 'default')} draggable>
                    Default Node
                </div>
                <div className={classes.nodeContainer} onDragStart={(event) => onDragStart(event, 'output')} draggable>
                    Output Node
                </div>
            </div>}
        </React.Fragment>
    );
}