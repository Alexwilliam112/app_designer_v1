'use client'

import React, { useCallback } from 'react'
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Controls,
  ControlButton,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { MagicWandIcon } from '@radix-ui/react-icons'

const nodeTypes = {}

export default function MainFrame() {
  const [nodes, setNodes] = useNodesState([])
  const [edges, setEdges] = useEdgesState([])

  const addNode = useCallback(() => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: 'default', // Use "default" or your custom node type
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Node ${nodes.length + 1}` },
    }
    setNodes((nds) => [...nds, newNode])
  }, [nodes, setNodes])

  return (
    <ReactFlowProvider>
      <div style={{ width: '100vw', height: '80vh', backgroundColor: '#101013' }}>
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
          <Background color="#E5E5E5" gap={60} variant={BackgroundVariant.Dots} />
          <Controls position="top-left" orientation="horizontal">
            <ControlButton onClick={addNode}>
          <Background
            color="#E5E5E5"
            gap={60}
            variant={BackgroundVariant.Dots}
          />
          <Controls position="top-left" orientation="horizontal" style={{ color: "#ffffff", background: "#000000" }}>
            <ControlButton onClick={addNode} style={{ background: "#000000", color: "#ffffff" }}>
              <MagicWandIcon />
            </ControlButton>
          </Controls>
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  )
}

