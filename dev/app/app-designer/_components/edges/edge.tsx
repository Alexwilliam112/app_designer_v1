import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath, // Import getSmoothStepPath
  type EdgeProps,
} from "@xyflow/react";
import { useFlowStore } from "@/store/use-store";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd = "url(#arrowhead)", // Use the updated arrowhead marker
}: EdgeProps) {
  const setEdges = useFlowStore((state) => state.setEdges);
  const edges = useFlowStore((state) => state.edges);

  // Use getSmoothStepPath to calculate the smoothstep path
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 20, // Adjust the curve radius (optional)
  });

  const onEdgeClick = () => {
    const filtered = edges.filter((edge) => edge.id !== id);
    setEdges(filtered);
  };

  return (
    <>
      <svg>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="30"
            markerHeight="15"
            refX="15"
            refY="7.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L30,7.5 L0,15 Z" fill="#000" />
          </marker>
        </defs>
      </svg>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          className="button-edge__label nodrag nopan"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          <button className="button-edge__button" onClick={onEdgeClick}>
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}