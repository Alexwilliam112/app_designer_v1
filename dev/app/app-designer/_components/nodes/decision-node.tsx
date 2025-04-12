'use client'

import { positioning } from '@/lib/constants'
import { Handle, Position } from '@xyflow/react'
import React from 'react'
import { AddNodeHandle } from './add-node-handle'
import { Network } from 'lucide-react'
import { AddDecisionHandle } from './add-decision-handle'

interface DecisionNodeProps {
  data: DecisionNodeData
}

export default function DecisionNode(props: DecisionNodeProps) {
  const { data } = props
  const sourceHandleKeys = Object.keys(positioning).filter((p) => p !== data.targetPosition)

  return (
    <>
      <Handle
        type={'target'}
        position={data.targetPosition ? positioning[data.targetPosition] : Position.Left}
        id={`${data.id}-${data.targetPosition}`}
        className="!z-10"
      />
      {sourceHandleKeys.map((p: string) => {
        return (
          <AddDecisionHandle
            key={p}
            data={{
              handlePosition: positioning[p as keyof typeof positioning],
              id: data.id,
              isSource: true,
              position: p as keyof typeof positioning,
            }}
          />
        )
      })}
      <div
        className="w-32 h-[calc(8rem/100*80)] aspect-square clip bg-muted border z-0"
        style={{
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        }}
      >
        <div className="relative flex flex-col gap-1 items-center justify-center text-center my-auto w-full h-full pb-1">
          <Network className="w-4 h-4" />
          <p className="text-xs">DECISION</p>
        </div>
      </div>
    </>
  )
}
