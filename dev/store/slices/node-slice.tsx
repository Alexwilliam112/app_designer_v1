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

    function forceLayout(nodes, newPosition) {
      const gap = 100; // Gap between nodes
      const step = 10; // Step size for circular search
      let A = {
        x: newPosition.x,
        y: newPosition.y,
        width: 300,
        height: 250,
      };
    
      let hasCollision = true;
      const maxIterations = 100; // Safety limit to prevent infinite loops
      let iterationCount = 0;
    
      while (hasCollision && iterationCount < maxIterations) {
        hasCollision = false;
        iterationCount++;
    
        for (const node of nodes) {
          const B = {
            x: node.position.x,
            y: node.position.y,
            width: node.measured.width,
            height: node.measured.height,
          };
    
          const AcenterX = A.x + A.width / 2;
          const AcenterY = A.y + A.height / 2;
          const BcenterX = B.x + B.width / 2;
          const BcenterY = B.y + B.height / 2;
    
          const dx = AcenterX - BcenterX;
          const dy = AcenterY - BcenterY;
    
          // Include the gap in the overlap calculation
          const px = (A.width + B.width + gap) / 2 - Math.abs(dx);
          const py = (A.height + B.height + gap) / 2 - Math.abs(dy);
    
          if (px > 0 && py > 0) {
            hasCollision = true; // Mark that a collision was detected
    
            // Circular pattern adjustment with randomized starting direction
            const angleStep = Math.PI / 4; // 8 directions (45-degree increments)
            const randomStartAngle = Math.random() * 2 * Math.PI; // Randomize starting angle
            let resolved = false;
    
            for (let angle = randomStartAngle; angle < randomStartAngle + 2 * Math.PI; angle += angleStep) {
              const offsetX = Math.cos(angle) * step;
              const offsetY = Math.sin(angle) * step;
    
              const testX = A.x + offsetX;
              const testY = A.y + offsetY;
    
              // Check if the new position resolves the collision
              const testCenterX = testX + A.width / 2;
              const testCenterY = testY + A.height / 2;
    
              const testDx = testCenterX - BcenterX;
              const testDy = testCenterY - BcenterY;
    
              const testPx = (A.width + B.width + gap) / 2 - Math.abs(testDx);
              const testPy = (A.height + B.height + gap) / 2 - Math.abs(testDy);
    
              if (testPx <= 0 || testPy <= 0) {
                // No collision at this position
                A.x = testX;
                A.y = testY;
                resolved = true;
                break;
              }
            }
    
            if (!resolved) {
              // Randomize between x and y adjustments, and positive/negative directions
              if (Math.random() > 0.5) {
                A.x += Math.random() > 0.5 ? step : -step;
              } else {
                A.y += Math.random() > 0.5 ? step : -step;
              }
            }
          }
        }
      }
    
      if (iterationCount >= maxIterations) {
        console.warn("forceLayout: Maximum iterations reached. Collision resolution may be incomplete.");
      }
    
      // Recheck layer to ensure no collisions remain
      for (const node of nodes) {
        const B = {
          x: node.position.x,
          y: node.position.y,
          width: node.measured.width,
          height: node.measured.height,
        };
    
        const AcenterX = A.x + A.width / 2;
        const AcenterY = A.y + A.height / 2;
        const BcenterX = B.x + B.width / 2;
        const BcenterY = B.y + B.height / 2;
    
        const dx = AcenterX - BcenterX;
        const dy = AcenterY - BcenterY;
    
        const px = (A.width + B.width + gap) / 2 - Math.abs(dx);
        const py = (A.height + B.height + gap) / 2 - Math.abs(dy);
    
        if (px > 0 && py > 0) {
          console.warn("forceLayout: Collision detected during recheck. Resolving again.");
          return forceLayout(nodes, { x: A.x + step, y: A.y + step }); // Retry with a slight offset
        }
      }
    
      return { x: A.x, y: A.y };
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
