'use client'

import { Handle, Position } from '@xyflow/react'
import { Network, Plus } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import React, { useState } from 'react'
import { useFlowStore } from '@/store/use-store'

interface AddNodeProps {
  data: {
    id: string
    position: 'top' | 'bottom' | 'left' | 'right'
    handlePosition: Position
    isSource: boolean
  }
}

export function AddNodeHandle({ data: { id, position, handlePosition, isSource } }: AddNodeProps) {
  const group = useFlowStore((state) => state.baseComponentGroup)
  const loading = useFlowStore((state) => state.baseComponentsLoading)
  const error = useFlowStore((state) => state.baseComponentsError)
  const message = useFlowStore((state) => state.baseComponentsMessage)
  const addFeatureNode = useFlowStore((state) => state.addFeatureNode)
  const addDecisionNode = useFlowStore((state) => state.addDecisionNode)
  const [open, setOpen] = useState(false)

  const onAddFeature = (featureId: string) => {
    addFeatureNode(featureId, id, { sourceId: `${id}-${position}` })
    setOpen(false)
  }

  const onAddDecision = () => {
    addDecisionNode(id, { sourceId: `${id}-${position}` })
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Handle
          id={`${id}-${position}`}
          type={isSource ? 'source' : 'target'}
          position={handlePosition}
          className="!bg-foreground !border-none !p-0 !m-0 !z-10"
          style={{
            width: '1rem',
            height: '1rem',
            borderRadius: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Plus size={'0.75rem'} className="text-white" />
        </Handle>
      </PopoverTrigger>
      <PopoverContent className="mx-8 w-64 p-0" align="center" side="right">
        <Command>
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandEmpty>No commands found.</CommandEmpty>
            <CommandGroup heading="UTILITY">
              <CommandItem onSelect={() => onAddDecision()}>
                <Network className="text-primary" />
                Decision
              </CommandItem>
            </CommandGroup>
            {group.map((com) => (
              <CommandGroup heading={com.label} key={com.id}>
                {com.items.map((i) => (
                  <CommandItem key={i.id} onSelect={() => onAddFeature(i.id)}>
                    <i.icon className="text-primary" /> {i.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
