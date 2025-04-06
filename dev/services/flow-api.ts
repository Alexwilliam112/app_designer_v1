"use client"

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

    async saveFlow({ id_component }: { id_component: string }) {
        const url = new URL("https://api-oos.jojonomic.com/27407/effort-calculator/v2/save-flow")
        url.searchParams.append('id_component', id_component)

        const res = await fetch(url.toString())

        const { data, error, message } = await res.json()

        if (error) throw new Error(message)

        return data as BaseComponent[]
    },
    async getFlow({ id_component }: { id_component: string }) {
        const url = new URL("https://api-oos.jojonomic.com/27407/effort-calculator/v2/flow")
        url.searchParams.append('id_component', id_component)

        const res = await fetch(url.toString())

        const { data, error, message } = await res.json()

        if (error) throw new Error(message)

        return data as BaseComponent[]
    },
}

export default flowApi