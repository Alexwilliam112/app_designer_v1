'use client'

import { Background, BackgroundVariant, Node, Panel, ReactFlow } from '@xyflow/react'
import { ChartPie, Database, Monitor, MonitorCog, Play, Webhook, Zap } from 'lucide-react'
import { useCallback } from 'react'
import EntryNode from './nodes/entry-node'
import ComponentNode from './nodes/component-node'
import { useFlowStore } from '@/store/use-store'
import FeaturePanel from './feature-panel'
import ELK from 'elkjs/lib/elk.bundled.js'
import CustomEdge from './edge'
import { Button } from '@/components/ui/button'
import UserFlowEdge from './user-flow-edge'

const elk = new ELK()

const nodeTypes = {
  entryPoint: EntryNode,
  component: ComponentNode,
}

const edgeTypes = {
  customEdge: CustomEdge,
  userFlowEdge: UserFlowEdge,
}

const defaultEdgeOptions = {
  animated: true,
  type: 'entryPoint',
}

const proOptions = { hideAttribution: true }

export default function Flow() {
  const nodes = useFlowStore((state) => state.nodes)
  const edges = useFlowStore((state) => state.edges)
  const setNodes = useFlowStore((state) => state.setNodes)
  const onEdgesChange = useFlowStore((state) => state.onEdgesChange)
  const onNodesChange = useFlowStore((state) => state.onNodesChange)
  const onConnect = useFlowStore((state) => state.onConnect)
  const selectedNode = useFlowStore((state) => state.selectedNode)

  const addStartPoint = useCallback(() => {
    const startNode: Node = {
      id: `entry-${Date.now()}`,
      type: 'entryPoint',
      position: { x: 0, y: 0 + nodes.length * 50 },
      data: {
        id: `entry-${Date.now()}`,
      },
    }

    setNodes([...nodes, startNode as Node<ComponentNodeData>])
  }, [nodes, setNodes])

  const applyLayout = useCallback(
    async (layoutOptions: any) => {
      const graph = {
        id: 'root',
        layoutOptions: layoutOptions,
        children: nodes.map((node) => ({
          id: node.id,
          width: 400, // Default width if not measured
          height: 350, // Default height if not measured
        })),
        edges: edges.map((edge) => ({
          id: edge.id,
          sources: [edge.source],
          targets: [edge.target],
        })),
      }

      const result = await elk.layout(graph)

      const updatedNodes: Node<ComponentNodeData>[] = nodes.map((node) => {
        const layoutNode = result.children?.find((n) => n.id === node.id)
        return layoutNode
          ? {
              ...node,
              position: { x: layoutNode.x!, y: layoutNode.y! },
              positionAbsolute: { x: layoutNode.x, y: layoutNode.y },
            }
          : { ...node } // Ensure immutability
      })

      setNodes([...updatedNodes]) // Create a new array to update state immutably
    },
    [nodes, edges, setNodes]
  )

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      proOptions={proOptions}
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
      <Panel position="top-right">
        <div className="flex gap-2">
          <Button
            size={'sm'}
            variant={'outline'}
            onClick={() =>
              applyLayout({
                'elk.algorithm': 'layered',
                'elk.direction': 'DOWN',
              })
            }
          >
            Vertical Layout
          </Button>
          <Button
            size={'sm'}
            variant={'outline'}
            onClick={() =>
              applyLayout({
                'elk.algorithm': 'layered',
                'elk.direction': 'RIGHT',
              })
            }
          >
            Horizontal Layout
          </Button>
        </div>
      </Panel>

      {selectedNode && (
        <Panel position="top-right" className="w-fit">
          <FeaturePanel />
        </Panel>
      )}
    </ReactFlow>
  )
}
