/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Handle, Position } from "react-flow-renderer";
import { visualizerStyle } from "../../../../styles/service/dockerspace/visualspace";

export default function NodeContainer(props: any) {
    const classes = visualizerStyle();
    const handleType: Record<string, JSX.Element[]> = {
        port: [<Handle key={"containerSource"} type="target" position={Position.Bottom} onConnect={(params) => { }} />],
        network: [<Handle key={"containerTarget"} type="target" position={Position.Top} onConnect={(params) => { }} />],
        container: [
            <Handle key={"containerTarget"} type="source" position={Position.Top} onConnect={(params) => { }} />,
            <Handle key={"containerSource"} type="source" position={Position.Bottom} onConnect={(params) => { }} />
        ]
    }
    const typeColor: Record<string, { background: string, border: string }> = {
        port: { background: "#318ce7", border: "5px solid #22386a" },
        network: { background: "#766ec8", border: "5px solid #22386a" },
        container: { background: "#2b3f5c", border: "5px solid #22386a" }
    }

    const imageType = (type: string, imageType?: string) => {
        if (imageType === undefined) {
            return type === "port" ? "/images/port.svg" : "/images/network.svg";
        } else {
            let dataType: { [key: string]: string } = {
                ubuntu: "/images/serverImage/ubuntu.png",
                centos: "/images/serverImage/centos.png",
            };
            let result = dataType[imageType];
            return result === undefined ? "/images/serverImage/computer.svg" : result;
        }
    };

    const getName: Record<string, string> = {
        port: "outBound",
        network: "name",
        container: "containerName"
    }

    const getStauts: Record<string, string> = {
        port: "onContainer",
        container: "status",
    }

    const checkStatus = (type: string) => {
        const getstate = getStauts[type];
        if (getstate) {
            let realState = props.data.data[getStauts[type]]
            if (type === "port") {
                if (realState === "") {
                    return typeColor[type].border
                }
                return "5px solid green"
            }
            if (type === "container") {
                if (realState === "running") {
                    return "5px solid green"
                } else {
                    return "5px solid red"
                }
            }
        } else {
            return typeColor[type].border
        }
    }

    const checkHighLight = () => {
        if (props.data.data.clickNode === undefined) {
            return true;
        } else {
            if (props.data.id === props.data.data.clickNode) {
                return true;
            }
            let onlyEdge = props.data.data.elements.filter((v: any) => v.type === "smoothstep")
            if (onlyEdge.some((v: any) => {
                if (v.target === props.data.id && v.source === props.data.data.clickNode || ((v.source === props.data.id && v.target === props.data.data.clickNode))) {
                    return true;
                }
            })) {
                return true
            }
        }
        return false;
    }

    const type = props.data.type;

    const image = props.data.data.image;

    return <div className={classes.nodeContainer} id={props.data.id}

        onClick={() => {
            if (props.data.data.clickNode === props.data.id) {
                props.data.data.setClickNode(undefined)
            } else {
                props.data.data.setClickNode(props.data.id)
            }
        }}
        style={{
            ...typeColor[type],
            border: checkStatus(type),
            height: type === "container" ? "150px" : "100px",
            width: type === "container" ? "150px" : "100px",
            opacity: checkHighLight() ? 1 : 0.3
        }}
    >
        {handleType[type].map((v) => v)}
        <div style={{ width: "100%", height: type === "container" ? "60%" : "55px", padding: "0 0 10px 0", display: "flex", justifyContent: "center" }}>
            <img
                draggable={false}
                src={type === 'container' ? imageType(type, image) : imageType(type)} />
        </div>
        <div style={{ width: "100%", height: "25px", display: "flex", justifyContent: "center" }}>
            {props.data.data[getName[type]]}
        </div>
        {props.children}
    </div>
}