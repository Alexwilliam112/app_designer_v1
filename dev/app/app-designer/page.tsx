'use client'

import { ReactFlowProvider } from '@xyflow/react'
import Flow from './_components/flow'

export default function AppDesignerPage() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  )
}
