"use client"

import { create } from "zustand";
import { createNodeSlice, NodeSlice } from "./slices/node-slice";
import { devtools } from "zustand/middleware";

export const useFlowStore = create<NodeSlice>()(
    devtools(
        (...args) => ({
            ...createNodeSlice(...args)
        })
    )
)