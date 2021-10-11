import IconButton from "@material-ui/core/IconButton/IconButton";
import React from "react";
import NodeContainer from "./nodecontainer";
import PowerOutlinedIcon from "@material-ui/icons/PowerOutlined";
import PowerOffOutlinedIcon from "@material-ui/icons/PowerOffOutlined";
import SettingsBackupRestoreOutlinedIcon from "@material-ui/icons/SettingsBackupRestoreOutlined";
import { visualizerStyle } from "../../../../styles/service/dockerspace/visualspace";


export default function ContainerNode(data: any) {
    const classes = visualizerStyle();
    const getDockerData = async () => {
        let data = await fetch(`/api/docker/visualization`, {
            method: "GET"
        }).then((res) => res.json())
        // setDockerData(data.dockerVisualInfo);
    };
    let contextInformation = data.data
    return <NodeContainer data={data}>
        <div style={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
            {data.data.status === "exited" && (
                <IconButton
                    className={classes.iconButton}
                    onClick={async (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        // let payload = {
                        //     containerId: contextInformation.containerId,
                        //     dockerCommand: "start",
                        // };
                        // let data = await fetch(
                        //     `http://localhost:8000/api/docker`,
                        //     {
                        //         method: "POST",
                        //         mode: "cors",
                        //         headers: {
                        //             "Content-Type": "application/json",
                        //         },
                        //         body: JSON.stringify(payload),
                        //     }
                        // ).then((res) => res.json());
                        // if (data.code === 200) {
                        //     getDockerData();
                        // }
                    }}
                >
                    <PowerOutlinedIcon />
                </IconButton>
            )}
            {data.data.status === "running" && (
                <IconButton
                    className={classes.iconButton}
                    onClick={async (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        // let payload = {
                        //     containerId: contextInformation.containerId,
                        //     dockerCommand: "stop",
                        // };
                        // let data = await fetch(
                        //     `http://localhost:8000/api/docker`,
                        //     {
                        //         method: "POST",
                        //         mode: "cors",
                        //         headers: {
                        //             "Content-Type": "application/json",
                        //         },
                        //         body: JSON.stringify(payload),
                        //     }
                        // ).then((res) => res.json());
                        // if (data.code === 200) {
                        //     getDockerData();
                        // }
                    }}
                >
                    <PowerOffOutlinedIcon />
                </IconButton>
            )}
            <IconButton
                className={classes.iconButton}
                style={{ zIndex: 99 }}
                onClick={async (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    // let payload = {
                    //     containerId: contextInformation.containerId,
                    //     dockerCommand: "restart",
                    // };
                    // let data = await fetch(
                    //     `http://localhost:8000/api/docker`,
                    //     {
                    //         method: "POST",
                    //         mode: "cors",
                    //         headers: {
                    //             "Content-Type": "application/json",
                    //         },
                    //         body: JSON.stringify(payload),
                    //     }
                    // ).then((res) => res.json());
                    // if (data.code === 200) {
                    //     getDockerData();
                    // }
                }}
            >
                <SettingsBackupRestoreOutlinedIcon />
            </IconButton>
        </div>
    </NodeContainer>
}