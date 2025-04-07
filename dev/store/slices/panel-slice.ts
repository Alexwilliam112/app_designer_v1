'use client'

import { StateCreator } from 'zustand'
import { NodeSlice } from './node-slice'
import flowApi from '@/services/flow-api'
import { DataSlice } from './data-slice'

export interface PanelSlice {
  selectedNode: ComponentNodeData | undefined
  setSelectedNode(selected: ComponentNodeData | undefined): void
  updateComponent(component: ComponentNodeData): Promise<void>
}

export const createPanelSlice: StateCreator<PanelSlice & NodeSlice & DataSlice, [], [], PanelSlice> = (
  set,
  get
) => ({
  selectedNode: undefined,
  setSelectedNode(selected) {
    set({ selectedNode: selected })
  },
  async updateComponent(component) {
    try {
      const { nodes, edges, id_estimation, setNodes } = get()

      const updated = nodes.slice()
      const updateIndex = updated.findIndex(n => n.id === component.id)

      if (updateIndex < 0) {
        console.error(`Error updating node: Nodes with id ${component.id} not found`)
        return
      }

      // Create a new node object with updated data
      updated[updateIndex] = {
        ...updated[updateIndex],
        data: {
          ...updated[updateIndex].data,
          ...component
        }
      }

      await flowApi.saveFlow({ id_estimation, payload: { nodes: updated, edges: edges.slice() } })

      // This will properly trigger ReactFlow updates
      setNodes(updated)
    } catch (error: unknown) {
      alert("Error saving flow:" + String(error))
    }
  },
})
