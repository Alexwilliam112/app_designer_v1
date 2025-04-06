'use client'

import { Background, BackgroundVariant, Node, Panel, ReactFlow } from '@xyflow/react'
import { ChartPie, Database, Monitor, MonitorCog, Play, Webhook, Zap } from 'lucide-react'
import { useCallback } from 'react'
import EntryNode from './nodes/entry-node'
import ComponentNode from './nodes/component-node'
import { useFlowStore } from '@/store/use-store'

const nodeTypes = {
  entryPoint: EntryNode,
  component: ComponentNode,
}

export default function Flow() {
  const nodes = useFlowStore((state) => state.nodes)
  const edges = useFlowStore((state) => state.edges)
  const setNodes = useFlowStore((state) => state.setNodes)
  const onEdgesChange = useFlowStore((state) => state.onEdgesChange)
  const onNodesChange = useFlowStore((state) => state.onNodesChange)
  const onConnect = useFlowStore((state) => state.onConnect)

  const addStartPoint = useCallback(() => {
    const startNode: Node = {
      // Changed from NodeChange to Node
      id: `entry-${Date.now()}`,
      type: 'entryPoint',
      position: { x: 100, y: 100 + nodes.length * 50 },
      data: {
        id: `entry-${Date.now()}`,
      },
    }

    // Directly add the node to the store
    setNodes([...nodes, startNode])
  }, [nodes, setNodes]) // Added dependencies
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background gap={60} variant={BackgroundVariant.Dots} />
      <Panel position="top-left">
        <div className="relative flex p-1 gap-3 bg-muted border rounded-md uppercase text-[0.4rem]">
          <div className="flex flex-col gap-1 items-center justify-center p-1 rounded hover:bg-muted-foreground/10 hover:cursor-pointer transition-colors duration-200 h-12 w-12">
            <ChartPie className="text-primary w-3 h-3" />
            <p>Insight</p>
          </div>

          <div className="flex flex-col gap-1 items-center justify-center p-1 rounded hover:bg-muted-foreground/10 hover:cursor-pointer transition-colors duration-200 h-12 w-12">
            <Zap className="text-primary w-3 h-3" />
            <p>Workflow</p>
          </div>

          <div className="flex flex-col gap-1 items-center justify-center p-1 rounded hover:bg-muted-foreground/10 hover:cursor-pointer transition-colors duration-200 h-12 w-12">
            <Webhook className="text-primary w-3 h-3" />
            <p>Integrations</p>
          </div>

          <div className="flex flex-col gap-1 items-center justify-center p-1 rounded hover:bg-muted-foreground/10 hover:cursor-pointer transition-colors duration-200 h-12 w-12">
            <MonitorCog className="text-primary w-3 h-3" />
            <p>Lowcode</p>
          </div>

          <div className="flex flex-col gap-1 items-center justify-center p-1 rounded hover:bg-muted-foreground/10 hover:cursor-pointer transition-colors duration-200 h-12 w-12">
            <Monitor className="text-primary w-3 h-3" />
            <p>App Builder</p>
          </div>

          <div className="flex flex-col gap-1 items-center justify-center p-1 rounded hover:bg-muted-foreground/10 hover:cursor-pointer transition-colors duration-200 h-12 w-12">
            <Database className="text-primary w-3 h-3" />
            <p>Database</p>
          </div>

          <div
            onClick={addStartPoint}
            className="flex flex-col gap-1 items-center justify-center p-1 rounded hover:bg-muted-foreground/10 hover:cursor-pointer transition-colors duration-200 h-12 w-12"
          >
            <Play className="text-primary w-3 h-3" />
            <p>Start Point</p>
          </div>
        </div>
      </Panel>
    </ReactFlow>
  )
}
