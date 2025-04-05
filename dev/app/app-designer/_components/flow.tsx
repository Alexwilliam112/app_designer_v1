/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Background, BackgroundVariant, Panel, ReactFlow } from '@xyflow/react'
import { ChartPie, Database, Monitor, MonitorCog, Play, Webhook, Zap } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import EntryNode, { commandItems } from './nodes/entry-node'
import ComponentNode, { ComponentNodeData } from './nodes/component-node'
import { useFlowStore } from '@/store/use-store'

const nodeTypes = {
  entryPoint: EntryNode,
  component: ComponentNode,
}

export default function Flow() {
  const { nodes, edges, setNodes, setEdges } = useFlowStore()

  const handleEntryCommandSelect = (id: string, entryId: string) => {
    const ids = id.split('/')
    const group = commandItems.find((g) => g.id === ids[0])
    const item = group?.items.find((i) => i.id === id) // Fixed: Changed g.id to i.id to match the full path

    // Find the current node directly from state
    console.log({ nodes })
    // const entryNode = nodes.find((n) => n.id === entryId)

    // if (!entryNode) {
    //   console.error(`Entry node with ID ${entryId} not found`)
    //   return
    // }

    const data: ComponentNodeData = {
      featureName: item?.label || '',
      featureIcon: item ? <item.icon /> : undefined,
      module: group?.label || '',
      category: '',
      type: '',
    }

    // const { position } = entryNode

    const newNode = {
      id: `component-${Date.now()}`, // Using timestamp to ensure unique IDs
      type: 'component',
      position: { x: 200, y: 100 },
      data,
    }

    setNodes([...nodes, newNode])

    // setEdges([
    //   ...edges,
    //   {
    //     id: `edge-${Date.now()}`,
    //     source: entryId,
    //     target: newNode.id,
    //     sourceHandle: null,
    //     targetHandle: null,
    //   },
    // ])
  }

  const addStartPoint = useCallback(() => {
    const startNode = {
      id: `entry-${Date.now()}`, // Using timestamp for unique IDs
      type: 'entryPoint',
      position: { x: 100, y: 100 + nodes.length * 50 }, // More predictable positioning
      data: {
        id: `entry-${Date.now()}`,
        onCommandSelect: handleEntryCommandSelect,
      },
    }

    setNodes([...nodes, startNode])
  }, [handleEntryCommandSelect, setNodes])

  useEffect(() => {
    console.log({ nodes })
  }, [nodes])

  return (
    <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
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
