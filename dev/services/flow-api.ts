"use client"

import { Edge, Node } from "@xyflow/react"

const flowApi = {
    async getBaseComponents() {
        const res = await fetch("https://api-oos.jojonomic.com/27407/effort-calculator/v2/base-components")

        const { data, error, message } = await res.json()

        if (error) throw new Error(message)

        return data as BaseComponent[]
    },
    async getFeatures({ id_component }: { id_component: string }) {
        const url = new URL("https://api-oos.jojonomic.com/27407/effort-calculator/v2/feature-options")
        url.searchParams.append('id_component', id_component)

        const res = await fetch(url.toString())

        const { data, error, message } = await res.json()

        if (error) throw new Error(message)

        return data as BaseComponent[]
    },

    async saveFlow({ id_estimation, payload }: { id_estimation: string, payload: { nodes: Node[]; edges: Edge[] } }) {
        const url = new URL("https://api-oos.jojonomic.com/27407/effort-calculator/v2/save-flow")
        url.searchParams.append('id_estimation', id_estimation)

        const res = await fetch(url.toString(), {
            method: "POST",
            body: JSON.stringify(payload)
        })

        const { data, error, message } = await res.json()

        if (error) throw new Error(message)

        return data as BaseComponent[]
    },
    async getFlow({ id_estimation }: { id_estimation: string }) {
        const url = new URL("https://api-oos.jojonomic.com/27407/effort-calculator/v2/flow")
        url.searchParams.append('id_estimation', id_estimation)

        const res = await fetch(url.toString())

        const { data, error, message } = await res.json()

        if (error) throw new Error(message)

        return data as BaseComponent[]
    },
}

export default flowApi