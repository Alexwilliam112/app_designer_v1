'use client'

import { Background, BackgroundVariant, Node, Panel, ReactFlow } from '@xyflow/react'
import { useCallback } from 'react'
import EntryNode from './nodes/entry-node'
import ComponentNode from './nodes/component-node'
import { useFlowStore } from '@/store/use-store'
import FeaturePanel from './panels/feature-panel'
import ELK from 'elkjs/lib/elk.bundled.js'
import CustomEdge from './edges/edge'
import { Button } from '@/components/ui/button'
import UserFlowEdge from './edges/user-flow-edge'
import ActionPanel from './panels/action-panel'
import DecisionNode from './nodes/decision-node'
import DecisionEdge from './edges/decision-edge'

const elk = new ELK()

const nodeTypes = {
  entryPoint: EntryNode,
  component: ComponentNode,
  decision: DecisionNode,
}

const edgeTypes = {
  customEdge: CustomEdge,
  userFlowEdge: UserFlowEdge,
  decisionEdge: DecisionEdge,
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

      const updatedNodes: GeneralNode[] = nodes.map((node) => {
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
      <ActionPanel />
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
      {selectedNode && <FeaturePanel />}
    </ReactFlow>
  )
}
