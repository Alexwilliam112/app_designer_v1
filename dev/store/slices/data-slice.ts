'use client'

import { StateCreator } from "zustand"
import { NodeSlice } from "./node-slice"
import { PanelSlice } from "./panel-slice"
import flowApi from "@/services/flow-api"
import { unknown } from "zod"
import { Monitor, MonitorCog, PieChart, Webhook, Zap } from "lucide-react"

interface FeatureOption {
    error: boolean
    loading: boolean
    message: string
    data: unknown[]
}

export interface DataSlice {
    baseComponentGroup: ComponentGroup[]
    baseComponentsLoading: boolean
    baseComponentsError: boolean
    baseComponentsMessage: string

    featureOptions: Record<string, FeatureOption>

    fetchBaseComponents(): Promise<void>
    fetchFeatures(id_component: string): Promise<void>
}

export const createDataSlice: StateCreator<DataSlice & NodeSlice & PanelSlice, [], [], DataSlice> = (set, get) => ({
    baseComponentGroup: [],
    baseComponentsLoading: true,
    baseComponentsError: false,
    baseComponentsMessage: "",

    featureOptions: {},

    async fetchBaseComponents() {
        try {
            const baseComponentsData = await flowApi.getBaseComponents()

            const groups: ComponentGroup[] = []

            baseComponentsData.forEach(b => {
                const groupId = b.type_of_custom.toLocaleLowerCase().replaceAll(' ', '-')
                const group = groups.find(g => g.id === groupId)
                const componentId = b.name.toLocaleLowerCase().replaceAll(' ', '-')

                if (!group) {
                    const newComponent: ComponentItem = {
                        id_component: b.id_component,
                        id: `${groupId}/${componentId}`,
                        label: b.name,
                        icon: b.type_of_custom === "APP BUILDER"
                            ? Monitor
                            : b.type_of_custom === "LOWCODE"
                                ? MonitorCog
                                : b.type_of_custom === "WORKFLOW"
                                    ? Webhook
                                    : b.type_of_custom === "INTEGRATION"
                                        ? Zap
                                        : b.type_of_custom === "INSIGHT"
                                            ? PieChart
                                            : undefined
                    }

                    const newGroup: ComponentGroup = { id: groupId, items: [newComponent], label: b.type_of_custom }

                    groups.push(newGroup)
                } else {
                    const newComponent: ComponentItem = {
                        id_component: b.id_component,
                        id: `${groupId}/${componentId}`,
                        label: b.name,
                        icon: b.type_of_custom === "APP BUILDER"
                            ? Monitor
                            : b.type_of_custom === "LOWCODE"
                                ? MonitorCog
                                : b.type_of_custom === "WORKFLOW"
                                    ? Webhook
                                    : b.type_of_custom === "INTEGRATION"
                                        ? Zap
                                        : b.type_of_custom === "INSIGHT"
                                            ? PieChart
                                            : undefined
                    }
                    group.items.push(newComponent)
                }

                set({ baseComponentGroup: groups })
            })
        } catch (error: unknown) {
            set({ baseComponentsError: true, baseComponentsMessage: String(unknown) })
        } finally {
            set({ baseComponentsLoading: false })
        }
    },
    async fetchFeatures(id_component) {
        const { featureOptions } = get()

        if (featureOptions[id_component]) return

        const newFeature: FeatureOption = {
            error: false,
            loading: true,
            message: "",
            data: []
        }
    },
}) 