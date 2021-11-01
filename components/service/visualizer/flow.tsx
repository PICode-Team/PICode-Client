/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Container, IconButton } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import ReactFlow, { Controls, updateEdge, addEdge, getMarkerEnd, MiniMap } from 'react-flow-renderer';
import BridgeNode from "./node/bridge";
import CustomLine from "./line/connectionLine";
import ContainerNode from "./node/container";
import PortNode from "./node/port";
import { visualizerStyle } from "../../../styles/service/dockerspace/visualspace";
import VisualizerModal from "./modal";

const UpdatableEdge = () => {
    const [elements, setElements] = useState<any>([]);
    const [dockerData, setDockerData] = useState<any>();
    const [clickNode, setClickNode] = useState<string>();
    const classes = visualizerStyle();
    const [reactflowInstance, setReactflowInstance] = useState<any>(null);
    const [highLightNode, setHighLightNode] = useState<string[]>();
    const [modal, setModal] = React.useState<boolean>(false);
    const [createType, setCreateType] = React.useState<boolean>(false);
    const [connectEdge, setConnectEdge] = React.useState<{
        new: any,
        old?: any
    }>({
        new: undefined,
        old: undefined
    });

    const getDockerData = async () => {
        let data = await fetch(`/api/docker/visualization`, {
            method: "GET"
        }).then((res) => res.json())
        setDockerData(data.dockerVisualInfo);
    };

    const nodeStyle = {
        port: PortNode,
        container: ContainerNode,
        network: BridgeNode,
    }

    const makeVisualization = () => {
        if (dockerData === undefined) return;
        let nodeData: any[] = [];
        let lineData: any[] = [];
        let maximumLength = dockerData["container"].length;

        for (let i in dockerData) {
            if (dockerData[i].length > maximumLength) {
                maximumLength = dockerData[i].length
            }
        }

        const containerPosition: any = {};
        const portPosition: any = {};

        for (let i in dockerData) {
            let idx = 0;
            for (let j of dockerData[i]) {
                let dataLength = dockerData[i].length
                if (i === "container") {
                    nodeData.push({
                        id: j.containerId,
                        type: i,
                        data: {
                            ...j,
                            setDockerData: setDockerData,
                            elements: elements,
                            clickNode: clickNode,
                            setClickNode: setClickNode
                        },
                        position: {
                            x: maximumLength / (dataLength + 1) * (idx + 1) * 200,
                            y: 300
                        }
                    })
                    containerPosition[j.containerId] = maximumLength / (dataLength + 1) * (idx + 1) * 200
                    for (let link of j.parent) {
                        lineData.push({
                            id: `${j.containerId}:${link}`,
                            target: link,
                            source: j.containerId,
                            type: "smoothstep",
                            animated: true
                        })
                    }
                } else if (i === "port") {
                    let middleSum = 0;
                    for (let link of j.connectedContainers) {
                        lineData.push({
                            id: `${j.outBound}:${link}`,
                            target: `${j.outBound}`,
                            source: link,
                            arrowHeadType: "Arrow",
                            type: "smoothstep",
                            animated: true,
                        })
                        middleSum += containerPosition[link]
                    }
                    nodeData.push({
                        id: String(j.outBound),
                        type: i,
                        data: {
                            ...j,
                            setDockerData: setDockerData,
                            clickNode: clickNode,
                            setClickNode: setClickNode,
                            elements: elements
                        },
                        position: {
                            x: maximumLength / (dataLength + 1) * (idx + 1) * 210,
                            y: 0
                        }
                    })
                } else {
                    nodeData.push({
                        id: j.networkId,
                        type: i,
                        data: {
                            ...j,
                            setDockerData: setDockerData,
                            clickNode: clickNode,
                            setClickNode: setClickNode,
                            elements: elements
                        },
                        position: {
                            x: maximumLength / (dataLength + 1) * (idx + 1) * 210,
                            y: 700
                        }
                    })
                    for (let link of j.containers) {
                        lineData.push({
                            id: `${j.networkId}:${link}`,
                            target: j.networkId,
                            source: link,
                            type: "smoothstep",
                            animated: true
                        })
                    }
                }
                idx++;
            }
        }

        let result = nodeData.concat(lineData);

        setElements(result)
    }

    useEffect(() => {
        if (connectEdge.new == undefined) return;
        setCreateType(false)
        setModal(true);
    }, [connectEdge])

    useEffect(() => {
        getDockerData();
    }, [])

    useEffect(() => {
        if (!modal) {
            const timer = setInterval(() => {
                getDockerData();
            }, 30000);
            return () => {
                clearInterval(timer);
            };
        }
    }, [modal])

    useEffect(() => {
        makeVisualization();
    }, [dockerData])

    useEffect(() => {
        makeVisualization();
    }, [clickNode])

    useEffect(() => {
        if (reactflowInstance && elements.length > 0) {
            reactflowInstance.fitView();
        }
    }, [reactflowInstance]);

    const onLoad = useCallback(
        (rfi) => {
            if (!reactflowInstance) {
                setReactflowInstance(rfi);
            }
        },
        [reactflowInstance, clickNode]
    );

    // gets called after end of edge gets dragged to another source or target
    const onEdgeUpdate = (oldEdge: any, newConnection: any) => {
        setConnectEdge({ new: newConnection, old: oldEdge });
    };

    const onConnect = (params: any) => setElements((els: any) => {
        params.type = "smoothstep"
        params.animated = true
        if (dockerData.container.some(((v: any) => v.containerId === params.source || v.containerId === params.target))) {
            if (dockerData.container.some(((v: any) => v.containerId === params.source)) && dockerData.container.some(((v: any) => v.containerId === params.target))) {
                return els;
            }
            params.id = params.source + params.target;
            setConnectEdge({
                new: params
            });
        }

        return els
    });

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Button
                    className={classes.buttonHolder}
                    onClick={() => {
                        setModal(true);
                        setCreateType(true);
                    }}
                >
                    Create Network
                    <AddOutlinedIcon />
                </Button>
                <ReactFlow
                    elements={elements}
                    onLoad={onLoad}
                    nodeTypes={nodeStyle}
                    connectionLineComponent={CustomLine}
                    onElementClick={(event, element) => {
                        //
                    }}
                    snapToGrid
                    onEdgeUpdate={onEdgeUpdate}
                    onConnect={onConnect}
                >
                    <Controls />
                    <MiniMap
                        nodeColor={(node: any) => {
                            switch (node.type) {
                                case 'port':
                                    return '#318ce7';
                                case 'network':
                                    return '#766ec8';
                                case 'container':
                                    return '#2b3f5c';
                                default:
                                    return '#eee';
                            }
                        }}
                        style={{ background: "#2C3239" }}
                        nodeStrokeWidth={3}
                        maskColor={"rgba(0,0,0,0.8)"}
                    />
                </ReactFlow>
            </div>
            {modal && <VisualizerModal
                setModal={setModal}
                modal={modal}
                dockerData={dockerData}
                createType={createType}
                connectEdge={connectEdge}
            />}
        </div>
    );
};

export default UpdatableEdge;