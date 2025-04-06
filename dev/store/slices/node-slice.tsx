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

    // function forceLayout(nodes: Node[], newPosition: { x: number; y: number }) {
    //   const gap = 100 // Gap between nodes
    //   const A = {
    //     x: newPosition.x,
    //     y: newPosition.y,
    //     width: 288,
    //     height: 200,
    //   }

    //   let hasCollision = true

    //   let iterationCount = 0
    //   const maxIteration = 100

    //   while (hasCollision && iterationCount < maxIteration) {
    //     hasCollision = false
    //     iterationCount++

    //     for (const node of nodes) {
    //       const B = {
    //         x: node.position.x,
    //         y: node.position.y,
    //         width: node.measured!.width,
    //         height: node.measured!.height,
    //       }

    //       const AcenterX = A.x + A.width / 2
    //       const AcenterY = A.y + A.height / 2
    //       const BcenterX = B.x + B.width! / 2
    //       const BcenterY = B.y + B.height! / 2

    //       const dx = AcenterX - BcenterX
    //       const dy = AcenterY - BcenterY

    //       // Include the gap in the overlap calculation
    //       const px = (A.width + B.width! + gap) / 2 - Math.abs(dx)
    //       const py = (A.height + B.height! + gap) / 2 - Math.abs(dy)

    //       if (px > 0 && py > 0) {
    //         hasCollision = true // Mark that a collision was detected
    //         if (px < py) {
    //           A.x += dx > 0 ? px : -px
    //         } else {
    //           A.y += dy > 0 ? py : -py
    //         }
    //       }
    //     }
    //   }

    //   return { x: A.x, y: A.y }
    // }

    function forceLayout(nodes, newPosition) {
      const gap = 100
      const A = {
        x: newPosition.x,
        y: newPosition.y,
        width: 288,
        height: 200,
      }

      let hasCollision = true
      const maxIterations = 100
      let iterationCount = 0

      while (hasCollision && iterationCount < maxIterations) {
        hasCollision = false
        iterationCount++

        for (const node of nodes) {
          const B = {
            x: node.position.x,
            y: node.position.y,
            width: node.measured.width,
            height: node.measured.height,
          }

          const AcenterX = A.x + A.width / 2
          const AcenterY = A.y + A.height / 2
          const BcenterX = B.x + B.width / 2
          const BcenterY = B.y + B.height / 2

          const dx = AcenterX - BcenterX
          const dy = AcenterY - BcenterY

          // Include the gap in the overlap calculation
          const px = (A.width + B.width + gap) / 2 - Math.abs(dx)
          const py = (A.height + B.height + gap) / 2 - Math.abs(dy)

          if (px > 0 && py > 0) {
            hasCollision = true // Mark that a collision was detected

            // Adjust position based on overlap direction
            if (px < py) {
              A.x += dx > 0 ? px : -px
            } else if (py < px) {
              A.y += dy > 0 ? py : -py
            } else {
              // If px and py are equal, alternate between x and y adjustments
              if (iterationCount % 2 === 0) {
                A.x += dx > 0 ? px : -px
              } else {
                A.y += dy > 0 ? py : -py
              }
            }
          }
        }
      }

      if (iterationCount >= maxIterations) {
        console.warn(
          'forceLayout: Maximum iterations reached. Collision resolution may be incomplete.'
        )
      }

      return { x: A.x, y: A.y }
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

    const position = forceLayout(nodes, calculatePosition())

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
