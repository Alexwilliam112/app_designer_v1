'use client'

import {
  type Edge,
  type Node,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  NodeChange,
} from '@xyflow/react'
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react'
import { StateCreator } from 'zustand'
import { PanelSlice } from './panel-slice'
import { DataSlice } from './data-slice'
import flowApi from '@/services/flow-api'

export interface NodeSlice {
  nodesLoading: boolean
  nodesError: boolean
  nodesMessage: string
  nodes: GeneralNode[]
  edges: Edge[]

  onNodesChange: OnNodesChange<Node>
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect

  setNodes: (nodes: GeneralNode[]) => void
  setEdges: (edges: Edge[]) => void

  fetchNodes: (id_estimation: string) => Promise<void>

  addFeatureNode(
    featureId: string,
    entryId: string,
    { sourceId, targetId }: { sourceId?: string; targetId?: string },
    edgeLabel?: string
  ): void
  addDecisionNode(
    entryId: string,
    {
      sourceId,
      targetId,
    }: {
      sourceId?: string
      targetId?: string
    }
  ): void
  deleteFeatureNode(id: string): void
}

export const createNodeSlice: StateCreator<
  NodeSlice & PanelSlice & DataSlice,
  [],
  [],
  NodeSlice
> = (set, get) => ({
  nodesLoading: true,
  nodesError: false,
  nodesMessage: '',
  nodes: [],
  edges: [],

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes as NodeChange<GeneralNode>[], get().nodes),
    })
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    })
  },
  onConnect: (connection) => {
    // Create a new edge with default type
    const newEdge: Edge = {
      ...connection,
      id: `edge-${Date.now()}`,
      type: 'userFlowEdge', // Set your desired default edge type here
      // You can also add other default properties
      animated: false,
      style: { stroke: '#555' },
      data: {
        /* any default edge data */
      },
    }

    // Add the new edge to your edges array
    set({
      edges: addEdge(newEdge, get().edges),
    })
  },
  setNodes: (nodes) => {
    set({ nodes })
  },
  setEdges: (edges) => {
    set({ edges })
  },

  async fetchNodes(id_estimation) {
    try {
      const { nodes, edges } = await flowApi.getFlow({ id_estimation })

      set({ nodes, edges })
    } catch (error: unknown) {
      set({ nodesError: true, nodesMessage: String(error) })
    } finally {
      set({ nodesLoading: false })
    }
  },

  addFeatureNode(id: string, entryId: string, { sourceId }, edgeLabel) {
    const { nodes, edges, setNodes, setEdges, baseComponentGroup } = get()

    const ids = id.split('/')
    const group = baseComponentGroup.find((g) => g.id === ids[0])

    if (!group) {
      console.error(`Group with id ${ids[0]} not found`)
      return
    }

    const item = group.items.find((i) => i.id === id) // Fixed: Changed g.id to i.id to match the full path

    if (!item) {
      console.error(`Item with groupId ${group?.id} not found`)
      return
    }

    const sourceNode = nodes.find((n) => n.id === entryId)

    if (!sourceNode) {
      console.error(`Entry node with ID ${entryId} not found`)
      return
    }

    const sourcePosition = sourceId ? sourceId.split('-')[sourceId.split('-').length - 1] : 'right'
    const targetPosition =
      sourcePosition === 'top'
        ? 'bottom'
        : sourcePosition === 'bottom'
        ? 'top'
        : sourcePosition === 'right'
        ? 'left'
        : sourcePosition === 'left'
        ? 'right'
        : ''

    const initialObj = { id: '', name: '' }
    // const component =

    const data: ComponentNodeData = {
      id: '',
      menuName: '',
      targetPosition,
      component: {
        title: '',
        id_component: item.id_component,
        description: '',
        module: initialObj,
        category: group.label,
        type: item.label,
        features: [],
      },
    }

    const position = forceLayout(nodes, calculatePosition(sourceNode, sourcePosition))

    const newNode = {
      id: `component-${Date.now()}`, // Using timestamp to ensure unique IDs
      type: 'component',
      position,
      data,
    }

    newNode.data.id = newNode.id

    setNodes([...nodes, newNode])

    const newEdge: Edge = {
      id: `userflow-${Date.now()}`,
      type: edgeLabel ? 'decisionEdge' : 'userFlowEdge',
      source: entryId,
      target: newNode.id,
      animated: false,
      sourceHandle: sourceId || null,
      targetHandle: `${newNode.id}-${targetPosition}`,
      data: edgeLabel
        ? {
            label: edgeLabel,
          }
        : undefined,
    }

    setEdges([...edges, newEdge])

    get().setSelectedNode(data)
  },
  addDecisionNode(entryId: string, { sourceId }) {
    const { nodes, edges, setNodes, setEdges } = get()

    const sourceNode = nodes.find((n) => n.id === entryId)

    if (!sourceNode) {
      console.error(`Entry node with ID ${entryId} not found`)
      return
    }

    const sourcePosition = sourceId ? sourceId.split('-')[sourceId.split('-').length - 1] : 'right'
    const targetPosition =
      sourcePosition === 'top'
        ? 'bottom'
        : sourcePosition === 'bottom'
        ? 'top'
        : sourcePosition === 'right'
        ? 'left'
        : sourcePosition === 'left'
        ? 'right'
        : ''

    const data: DecisionNodeData = {
      id: '',
      targetPosition,
    }

    const position = forceLayout(nodes, calculatePosition(sourceNode, sourcePosition))

    const newNode = {
      id: `decision-${Date.now()}`, // Using timestamp to ensure unique IDs
      type: 'decision',
      position,
      data,
    }

    newNode.data.id = newNode.id

    setNodes([...nodes, newNode])

    setEdges([
      ...edges,
      {
        id: `userflow-${Date.now()}`,
        type: 'userFlowEdge',
        source: entryId,
        target: newNode.id,
        animated: false,
        sourceHandle: sourceId || null,
        targetHandle: `${newNode.id}-${targetPosition}`,
      },
    ])
  },
  deleteFeatureNode(deletedNodeId: string) {
    try {
      const { id_estimation } = get()
      const { nodes, edges } = get()

      const newNodes = nodes.filter((t) => t.id !== deletedNodeId)
      const newSource = edges.find((e) => e.target === deletedNodeId)

      const newEdges: Edge[] = edges
        .map((e) => {
          if (e.source === deletedNodeId) {
            e.source = newSource?.source || nodes[0].id
            e.sourceHandle = newSource?.sourceHandle || null
          }

          return e
        })
        .filter((e) => e.target !== deletedNodeId)

      flowApi
        .saveFlow({ id_estimation, payload: { nodes: newNodes, edges: newEdges } })
        .then(() => {
          set({ nodes: newNodes })
          set({ edges: newEdges })
        })
    } catch (error) {
      alert('Error deleting node: ' + String(error))
    }
  },
})

function calculatePosition(sourceNode: GeneralNode, sourcePosition: string) {
  const sourceWidth = sourceNode.measured?.width || 0
  const sourceHeight = sourceNode.measured?.height || 0
  const sourceX = sourceNode.position.x
  const sourceY = sourceNode.position.y

  switch (sourcePosition) {
    case 'top':
      return { x: sourceX, y: sourceY - sourceHeight - 100 }

    case 'bottom':
      return { x: sourceX, y: sourceY + sourceHeight + 100 }

    case 'left':
      return { x: sourceX - sourceWidth - 100, y: sourceY }

    case 'right':
      return { x: sourceX + sourceWidth + 100, y: sourceY }

    default:
      return { x: sourceX + sourceWidth + 100, y: sourceY }
  }
}

function forceLayout(nodes: GeneralNode[], newPosition: { x: number; y: number }) {
  const gap = 100 // Gap between nodes
  const step = 10 // Step size for circular search
  let A = {
    x: newPosition.x,
    y: newPosition.y,
    width: 300,
    height: 250,
  }

  let hasCollision = true
  const maxIterations = 100 // Safety limit to prevent infinite loops
  let iterationCount = 0

  while (hasCollision && iterationCount < maxIterations) {
    hasCollision = false
    iterationCount++

    for (const node of nodes) {
      const B = {
        x: node.position.x,
        y: node.position.y,
        width: node.measured!.width,
        height: node.measured!.height,
      }

      const AcenterX = A.x + A.width / 2
      const AcenterY = A.y + A.height / 2
      const BcenterX = B.x + B.width! / 2
      const BcenterY = B.y + B.height! / 2

      const dx = AcenterX - BcenterX
      const dy = AcenterY - BcenterY

      // Include the gap in the overlap calculation
      const px = (A.width + B.width! + gap) / 2 - Math.abs(dx)
      const py = (A.height + B.height! + gap) / 2 - Math.abs(dy)

      if (px > 0 && py > 0) {
        hasCollision = true // Mark that a collision was detected

        // Circular pattern adjustment with randomized starting direction
        const angleStep = Math.PI / 4 // 8 directions (45-degree increments)
        const randomStartAngle = Math.random() * 2 * Math.PI // Randomize starting angle
        let resolved = false

        for (
          let angle = randomStartAngle;
          angle < randomStartAngle + 2 * Math.PI;
          angle += angleStep
        ) {
          const offsetX = Math.cos(angle) * step
          const offsetY = Math.sin(angle) * step

          const testX = A.x + offsetX
          const testY = A.y + offsetY

          // Check if the new position resolves the collision
          const testCenterX = testX + A.width / 2
          const testCenterY = testY + A.height / 2

          const testDx = testCenterX - BcenterX
          const testDy = testCenterY - BcenterY

          const testPx = (A.width + B.width! + gap) / 2 - Math.abs(testDx)
          const testPy = (A.height + B.height! + gap) / 2 - Math.abs(testDy)

          if (testPx <= 0 || testPy <= 0) {
            // No collision at this position
            A.x = testX
            A.y = testY
            resolved = true
            break
          }
        }

        if (!resolved) {
          // Randomize between x and y adjustments, and positive/negative directions
          if (Math.random() > 0.5) {
            A.x += Math.random() > 0.5 ? step : -step
          } else {
            A.y += Math.random() > 0.5 ? step : -step
          }
        }
      }
    }
  }

  if (iterationCount >= maxIterations) {
    console.warn('forceLayout: Maximum iterations reached. Collision resolution may be incomplete.')
  }

  // Recheck layer to ensure no collisions remain
  for (const node of nodes) {
    const B = {
      x: node.position.x,
      y: node.position.y,
      width: node.measured!.width,
      height: node.measured!.height,
    }

    const AcenterX = A.x + A.width / 2
    const AcenterY = A.y + A.height / 2
    const BcenterX = B.x + B.width! / 2
    const BcenterY = B.y + B.height! / 2

    const dx = AcenterX - BcenterX
    const dy = AcenterY - BcenterY

    const px = (A.width + B.width! + gap) / 2 - Math.abs(dx)
    const py = (A.height + B.height! + gap) / 2 - Math.abs(dy)

    if (px > 0 && py > 0) {
      console.warn('forceLayout: Collision detected during recheck. Resolving again.')
      return forceLayout(nodes, { x: A.x + step, y: A.y + step }) // Retry with a slight offset
    }
  }

  return { x: A.x, y: A.y }
}
