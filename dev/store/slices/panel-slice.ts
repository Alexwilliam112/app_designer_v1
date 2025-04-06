'use client'

import { StateCreator } from 'zustand'
import { NodeSlice } from './node-slice'

export interface PanelSlice {
  selectedNode: ComponentNodeData | undefined
  setSelectedNode(selected: ComponentNodeData | undefined): void
  updateComponent(component: ComponentNodeData): void
}

export const createPanelSlice: StateCreator<PanelSlice & NodeSlice, [], [], PanelSlice> = (
  set,
  get
) => ({
  selectedNode: undefined,
  setSelectedNode(selected) {
    set({ selectedNode: selected })
  },
  updateComponent(component) {
    const { nodes } = get()

    const updated = nodes.slice()
    const updateIndex = updated.findIndex(n => n.id === component.id)

    if (updateIndex < 0) {
      console.error(`Error updating node: Nodes with id ${component.id} not found`)
      return
    }

    set({})
  },
})
