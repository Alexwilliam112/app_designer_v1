"use client"

import { create } from "zustand";
import { createNodeSlice, NodeSlice } from "./slices/node-slice";
import { devtools } from "zustand/middleware";
import { createPanelSlice, PanelSlice } from "./slices/panel-slice";
import { createDataSlice, DataSlice } from "./slices/data-slice";

export const useFlowStore = create<NodeSlice & PanelSlice & DataSlice>()(
    devtools(
        (...args) => ({
            ...createNodeSlice(...args),
            ...createPanelSlice(...args),
            ...createDataSlice(...args)
        })
    )
)