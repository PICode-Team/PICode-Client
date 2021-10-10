import React from 'react';
import { getMarkerEnd, getSmoothStepPath } from 'react-flow-renderer';

export default function CustomLine({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    connectionLineType,
    connectionLineStyle,
}: any) {
    let path = getSmoothStepPath({
        sourceX: sourceX,
        sourceY: sourceY,
        targetX: targetX,
        targetY: targetY,
        borderRadius: 5,

    })
    return (
        <g>
            <path
                fill="none"
                stroke="#fff"
                strokeWidth={1.5}
                className="animated"
                d={`${path}`}
                markerWidth={10}
                markerHeight={10}
                markerEnd={"url(#triangle)"}
            />
            <marker id="triangle" viewBox="0 0 10 10"
                refX="1" refY="5"
                markerUnits="strokeWidth"
                markerWidth="5" markerHeight="5"
                orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#fff" />
            </marker>
        </g>
    );
};