'use client'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useState } from 'react'
import { useFlowStore } from '@/store/use-store'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUpdateNodeInternals } from '@xyflow/react'

export default function ModulesSelect({ nodeId }: { nodeId: string }) {
  const modules = useFlowStore((state) => state.modulesData)
  const nodes = useFlowStore((state) => state.nodes)
  const updateComponent = useFlowStore((state) => state.updateComponent)

  const updateNodeInternals = useUpdateNodeInternals()

  const node = nodes.find((n) => n.id === nodeId)!

  const [value, setValue] = useState(node.data.component.module.id)
  const [open, setOpen] = useState(false)

  const onSelect = async (moduleId: string) => {
    const updated = node

    node.data.component.module = modules.find((m) => m.id === moduleId)!

    await updateComponent(updated.data)

    setValue(moduleId)
    updateNodeInternals(node.id)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'text-start justify-start w-full font-normal text-sm',
            !value && 'text-muted-foreground'
          )}
        >
          <ChevronsUpDown />
          {modules.find((m) => m.id === value)?.name || 'Select module...'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0 border-none shadow-none z-50" side="right">
        <Command className="rounded-lg border shadow-md md:min-w-[400px]">
          <CommandInput placeholder="Search module..." />
          <CommandList className="overflow-auto">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {modules.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => {
                    onSelect(item.id)
                  }}
                >
                  <Check
                    className={cn('mr-2 h-4 w-4', item.id === value ? 'opacity-100' : 'opacity-0')}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
