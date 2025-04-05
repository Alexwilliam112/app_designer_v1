'use client'

import {
  Background,
  BackgroundVariant,
  ControlButton,
  Controls,
  Edge,
  Node,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react'
import { ChartPie, Database, Monitor, MonitorCog, Play, Webhook, Zap } from 'lucide-react'
import { useCallback } from 'react'
import EntryNode from './nodes/entry-node'
import { Button } from '@/components/ui/button'

const nodeTypes = {
  entryPoint: EntryNode,
}

export default function Flow() {
  const [nodes, setNodes] = useNodesState<Node>([])
  const [edges, setEdges] = useEdgesState<Edge>([])

  const addStartPoint = useCallback(() => {
    const startNode = {
      id: (nodes.length + 1).toString(),
      type: 'entryPoint', // Use "default" or your custom node type
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {},
    }
    setNodes((nds) => [...nds, startNode])
  }, [nodes, setNodes])

  return (
    <>
      <div></div>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
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
    </>
  )
}
