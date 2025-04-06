import { Monitor } from 'lucide-react'
import React from 'react'
// import { z } from 'zod'

// const featureSchema = z.object({
//   module,
// })

export default function FeaturePanel() {
  return (
    <div className="flex flex-col p-5 gap-3 bg-muted w-[25vw] 3xl:w-[18vw] shrink-0 h-[90vh] border rounded-xl">
      <header className="flex justify-between pb-3 border-b w-[25vw] shrink-0">
        <div className="flex gap-2">
          {/* Feature Icon and Name */}
          <Monitor />
          <p>Requestor Menu</p>
        </div>
      </header>

      <div className="flex flex-col"></div>
    </div>
  )
}
