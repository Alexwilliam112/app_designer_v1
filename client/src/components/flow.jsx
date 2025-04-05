"use client";

import React, { useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls, 
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from './customNode';
const nodeTypes = {
  customNode: CustomNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'customNode',
    position: { x: 100, y: 100 },
    data: {
      systemName: 'My System',
      moduleName: 'Module A',
      category: 'Category X',
      type: 'Type Y',
    },
  },
  {
    id: '2',
    type: 'customNode',
    position: { x: 100, y: 500 },
    data: {
      systemName: 'My System',
      moduleName: 'Module A',
      category: 'Category X',
      type: 'Type Y',
    },
  },
];

const initialEdges = [];

export default function Flow() {
  return (
    <ReactFlowProvider>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} />
      </div>
    </ReactFlowProvider>
  );
}