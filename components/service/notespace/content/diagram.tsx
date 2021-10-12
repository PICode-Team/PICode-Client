/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from "react";
import ReactFlow, { addEdge, Controls, ReactFlowProvider, removeElements } from "react-flow-renderer";
import { diagrmStyle } from "../../../../styles/service/notespace/diagram";
import { IFileView } from "../../../../types/note.types";
import DiagramSidebar from "./diagramsidebat";


export default function DrawDiagram({ selectFile }: { selectFile: IFileView }) {
    const initialElements = [
        {
            id: '1',
            type: 'input',
            data: { label: 'input node' },
            position: { x: 250, y: 5 },
        },
    ];

    const classes = diagrmStyle()
    const reactFlowWrapper = React.useRef<any>(null);
    const [reactFlowInstance, setReactFlowInstance] = React.useState<any>(null);
    const [elements, setElements] = React.useState<any>(initialElements);
    const [id, setId] = React.useState<number>(0);
    const onConnect = (params: any) => setElements((els: any) => addEdge(params, els));
    const onElementsRemove = (elementsToRemove: any) =>
        setElements((els: any) => removeElements(elementsToRemove, els));

    const onLoad = (_reactFlowInstance: any) =>
        setReactFlowInstance(_reactFlowInstance);

    const onDragOver = (event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };


    const onDrop = useCallback((event: any) => {
        event.preventDefault();

        if (reactFlowInstance === null) {
            return
        }

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });

        const newNode = [{
            id: `${elements.length + 1}`,
            type,
            position,
            data: { label: `${type} node` },
        }];

        setElements((es: any) => es.concat(newNode));
    }, [id, elements])

    return <React.Fragment>
        <ReactFlowProvider>
            <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: "100%", height: "100%", position: "relative" }}>
                <ReactFlow
                    elements={elements}
                    onConnect={onConnect}
                    onElementsRemove={onElementsRemove}
                    onLoad={onLoad}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                >
                    <Controls />
                </ReactFlow>
                <DiagramSidebar />
            </div>
        </ReactFlowProvider>
    </React.Fragment>
}