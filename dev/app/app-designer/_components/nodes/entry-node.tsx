'use client'

import { Button } from '@/components/ui/button'
import { Monitor, MonitorCog, Network, PieChart, Play, Webhook, Zap } from 'lucide-react'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import { Handle, Position } from '@xyflow/react'
import { useFlowStore } from '@/store/use-store'

interface EntryNodeProps {
  data: {
    id: string
    onCommandSelect: (id: string, entryId: string) => void
  }
}

export default function EntryNode({ data: { id } }: EntryNodeProps) {
  const group = useFlowStore((state) => state.baseComponentGroup)
  const loading = useFlowStore((state) => state.baseComponentsLoading)
  const error = useFlowStore((state) => state.baseComponentsError)
  const message = useFlowStore((state) => state.baseComponentsMessage)

  const edges = useFlowStore((state) => state.edges)
  const addFeatureNode = useFlowStore((state) => state.addFeatureNode)

  const [open, setOpen] = useState(false)

  const handleCommandSelect = (command: string) => {
    addFeatureNode(command, id, {})
    setOpen(false)
  }

  const isSource = edges.find((e) => e.source === id) !== undefined

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>
          <Button
            disabled={loading}
            variant="outline"
            className="flex flex-col gap-1 font-normal w-20 h-20 rounded-full border justify-center items-center hover:cursor-pointer uppercase"
          >
            <Play />
            <p>Start</p>
          </Button>
          <Handle type="source" style={{ opacity: isSource ? 100 : 0 }} position={Position.Right} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0 mx-4" align="center" side="right">
        <Command>
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandEmpty>No commands found.</CommandEmpty>
            {group.map((com) => (
              <CommandGroup heading={com.label} key={com.id}>
                {com.items.map((i) => (
                  <CommandItem key={i.id} onSelect={() => handleCommandSelect(i.id)}>
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
