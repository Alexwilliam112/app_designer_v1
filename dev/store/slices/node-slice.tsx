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
  handleEntryCommandSelect(id: string, entryId: string): void
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

  handleEntryCommandSelect(id: string, entryId: string) {
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

    const entryNode = nodes.find((n) => n.id === entryId)

    if (!entryNode) {
      console.error(`Entry node with ID ${entryId} not found`)
      return
    }

    const data: ComponentNodeData = {
      id: '',
      featureName: item?.label || '',
      featureIcon: <item.icon className="w-4 h-4" />,
      module: group?.label || '',
      category: '',
      type: '',
    }

    const { position } = entryNode

    const newNode = {
      id: `component-${Date.now()}`, // Using timestamp to ensure unique IDs
      type: 'component',
      position: { x: position.x + 100, y: position.y },
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
        sourceHandle: null,
        targetHandle: null,
      },
    ])
  },
})
