'use client'

import { Button } from '@/components/ui/button'
import { Handle, Position } from '@xyflow/react'
import { Code2, CurlyBraces, Pencil, Plus, Trash2 } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import React, { ReactNode, useState } from 'react'
import { useFlowStore } from '@/store/use-store'
import { commandItems } from './entry-node'

export interface ComponentNodeData extends Record<string, unknown> {
  id: string
  featureName: string
  featureIcon: ReactNode
  module: string
  category: string
  type: string
}

interface ComponentNodeProps {
  data: ComponentNodeData
}

export default function ComponentNode({ data }: ComponentNodeProps) {
  return (
    <>
      <Handle type={'target'} position={Position.Left} />
      <Handle type={'source'} position={Position.Right} />
      <div className="flex flex-col gap-1 py-2 px-4 rounded-md border bg-muted text-sm w-72 shrink-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {data.featureIcon} <p className="pl-3 border-l border-foreground">{data.featureName}</p>
          </div>

          <div className="flex">
            <Button size={'icon'} variant={'ghost'}>
              <Pencil className="w-4 h-4" />
            </Button>
            <Button size={'icon'} variant={'ghost'}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        </div>

        <hr className="text-foreground" />

        <table className="text-xs">
          <tbody>
            <tr>
              <td className="py-2">Module</td>
              <td>
                <div className="flex gap-2 py-1 px-2 bg-background rounded">
                  <CurlyBraces className="w-4 h-4" />
                  <p>{data.module}</p>
                </div>
              </td>
            </tr>

            <tr>
              <td className="py-2">Category</td>
              <td>
                <div className="flex gap-2 py-1 px-2 bg-background rounded">
                  <CurlyBraces className="w-4 h-4" />
                  <p>{data.category}</p>
                </div>
              </td>
            </tr>

            <tr>
              <td className="py-2">Type</td>
              <td>
                <div className="flex gap-2 py-1 px-2 bg-background rounded">
                  <Code2 className="w-4 h-4" />
                  <p>{data.type}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <AddNode data={{ id: data.id }} />
      </div>
    </>
  )
}

interface AddNodeProps {
  data: {
    id: string
  }
}

function AddNode({ data: { id } }: AddNodeProps) {
  const { handleEntryCommandSelect } = useFlowStore()
  const [open, setOpen] = useState(false)

  const handleCommandSelect = (command: string) => {
    handleEntryCommandSelect(command, id)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>
          <button className="absolute right-0 -mr-2 top-[46%] bg-foreground text-background rounded-full p-[0.125rem] w-fit h-auto aspect-square hover:cursor-pointer hover:bg-foreground/90">
            <Plus className="w-3 h-3" />
          </button>
          <Handle type="source" position={Position.Right} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="center" side="right">
        <Command>
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandEmpty>No commands found.</CommandEmpty>
            {commandItems.map((com) => (
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
