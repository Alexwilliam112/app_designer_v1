'use client'

import { ComponentNodeData } from '@/app/app-designer/_components/nodes/component-node'
import { commandItems } from '@/app/app-designer/_components/nodes/entry-node'
import {
  type Edge,
  type Node,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from '@xyflow/react'
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react'
import { StateCreator } from 'zustand'

export interface NodeSlice {
  nodes: Node[]
  edges: Edge[]
  onNodesChange: OnNodesChange<Node>
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void
  addFeatureNode(
    featureId: string,
    entryId: string,
    { sourceId, targetId }: { sourceId?: string; targetId?: string }
  ): void
}

export const createNodeSlice: StateCreator<NodeSlice, [], [], NodeSlice> = (set, get) => ({
  nodes: [],
  edges: [],

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    })
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    })
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    })
  },
  setNodes: (nodes) => {
    set({ nodes })
  },
  setEdges: (edges) => {
    set({ edges })
  },

  addFeatureNode(id: string, entryId: string, { sourceId }) {
    const { nodes, edges, setNodes, setEdges } = get()

    const ids = id.split('/')
    const group = commandItems.find((g) => g.id === ids[0])

    if (!group) {
      console.error(`Group with id ${ids[0]} not found`)
      return
    }

    const item = group?.items.find((i) => i.id === id) // Fixed: Changed g.id to i.id to match the full path

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

    function calculatePosition() {
      if (!sourceNode) {
        console.error(`Entry node with ID ${entryId} not found`)
        return { x: 0, y: 0 }
      }

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

    const data: ComponentNodeData = {
      id: '',
      featureName: item?.label || '',
      featureIcon: <item.icon className="w-4 h-4" />,
      module: group?.label || '',
      category: '',
      type: '',
      targetPosition,
    }

    const position = calculatePosition()

    const newNode = {
      id: `component-${Date.now()}`, // Using timestamp to ensure unique IDs
      type: 'component',
      position,
      data,
    }

    newNode.data.id = newNode.id

    setNodes([...nodes, newNode])

    setEdges([
      ...edges,
      {
        id: `edge-${Date.now()}`,
        source: entryId,
        target: newNode.id,
        sourceHandle: sourceId || null,
        targetHandle: `${newNode.id}-${targetPosition}`,
      },
    ])
  },
})
