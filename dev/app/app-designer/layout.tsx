import { ReactFlowProvider } from '@xyflow/react'
import React, { ReactNode } from 'react'
import '@xyflow/react/dist/style.css'

export default function AppDesignerLayout({ children }: { children: ReactNode }) {
  return (
    <ReactFlowProvider>
      <main style={{ width: '100vw', height: '100vh' }}>{children}</main>
    </ReactFlowProvider>
  )
}
