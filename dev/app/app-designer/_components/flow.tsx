'use client'

import {
  Background,
  BackgroundVariant,
  ControlButton,
  Controls,
  Edge,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react'
import { Play } from 'lucide-react'
import { useCallback } from 'react'
import EntryNode from './nodes/entry-node'

const nodeTypes = {
  entryPoint: EntryNode,
}

export default function Flow() {
  const [nodes, setNodes] = useNodesState<Node>([])
  const [edges, setEdges] = useEdgesState<Edge>([])

  const addNode = useCallback(() => {
    const startNode = {
      id: (nodes.length + 1).toString(),
      type: 'entryPoint', // Use "default" or your custom node type
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {},
    }
    setNodes((nds) => [...nds, startNode])
  }, [nodes, setNodes])

  return (
    <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
      <Background gap={60} variant={BackgroundVariant.Dots} />
      <Controls position="top-left" orientation="horizontal" style={{ backgroundColor: 'black' }}>
        <ControlButton onClick={addNode}>
          <Play />
        </ControlButton>
      </Controls>
    </ReactFlow>
  )
}
