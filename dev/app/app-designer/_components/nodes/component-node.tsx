'use client'

import { Button } from '@/components/ui/button'
import { Handle, NodeProps, Position, useUpdateNodeInternals } from '@xyflow/react'
import {
  Code2,
  CurlyBraces,
  Monitor,
  MonitorCog,
  Pencil,
  PieChart,
  Plus,
  Trash2,
  Webhook,
  Zap,
} from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import React, { useEffect, useState } from 'react'
import { useFlowStore } from '@/store/use-store'

interface ComponentNodeProps extends NodeProps {
  data: ComponentNodeData
}

const positioning = {
  top: Position.Top,
  bottom: Position.Bottom,
  right: Position.Right,
  left: Position.Left,
}

export default function ComponentNode(props: ComponentNodeProps) {
  const { data } = props

  const setSelectedNode = useFlowStore((state) => state.setSelectedNode)
  const deleteNode = useFlowStore((state) => state.deleteFeatureNode)

  const sourceHandleKeys = Object.keys(positioning).filter((p) => p !== data.targetPosition)
  const featureIcon =
    data.component.category === 'APP BUILDER' ? (
      <Monitor className="shrink-0" />
    ) : data.component.category === 'LOWCODE' ? (
      <MonitorCog className="shrink-0" />
    ) : data.component.category === 'WORKFLOW' ? (
      <Webhook className="shrink-0" />
    ) : data.component.category === 'INTEGRATION' ? (
      <Zap className="shrink-0" />
    ) : data.component.category === 'INSIGHT' ? (
      <PieChart className="shrink-0" />
    ) : undefined

  return (
    <>
      <Handle
        type={'target'}
        position={data.targetPosition ? positioning[data.targetPosition] : Position.Left}
        id={`${data.id}-${data.targetPosition}`}
      />
      {data.menuName &&
        sourceHandleKeys.map((p: string) => {
          return (
            <AddNodeHandle
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

      <div className="flex flex-col gap-1 py-2 px-4 rounded-md border bg-muted text-sm w-72 overflow-hidden">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3 min-w-0">
            {featureIcon}
            <p className="pl-3 border-l border-foreground truncate">{data.component.title}</p>
          </div>

          <div className="flex gap-1 w-fit">
            <Button
              size={'icon'}
              variant={'ghost'}
              className="hover:cursor-pointer hover:border hover:bg-background"
              onClick={() => setSelectedNode(data)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              size={'icon'}
              variant={'ghost'}
              className="hover:cursor-pointer hover:border hover:bg-destructive text-destructive hover:text-white"
              onClick={() => deleteNode(props.id)}
            >
              <Trash2 className="w-4 h-4" />
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
                  <p>{data.component.module.name}</p>
                </div>
              </td>
            </tr>

            <tr>
              <td className="py-2">Category</td>
              <td>
                <div className="flex gap-2 py-1 px-2 bg-background rounded">
                  <CurlyBraces className="w-4 h-4" />
                  <p>{data.component.category}</p>
                </div>
              </td>
            </tr>

            <tr>
              <td className="py-2">Type</td>
              <td>
                <div className="flex gap-2 py-1 px-2 bg-background rounded">
                  <Code2 className="w-4 h-4" />
                  <p>{data.component.type}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

interface AddNodeProps {
  data: {
    id: string
    position: 'top' | 'bottom' | 'left' | 'right'
    handlePosition: Position
    isSource: boolean
  }
}

function AddNodeHandle({ data: { id, position, handlePosition, isSource } }: AddNodeProps) {
  const group = useFlowStore((state) => state.baseComponentGroup)
  const loading = useFlowStore((state) => state.baseComponentsLoading)
  const error = useFlowStore((state) => state.baseComponentsError)
  const message = useFlowStore((state) => state.baseComponentsMessage)
  const addFeatureNode = useFlowStore((state) => state.addFeatureNode)
  const [open, setOpen] = useState(false)

  const handleCommandSelect = (command: string) => {
    addFeatureNode(command, id, { sourceId: `${id}-${position}` })
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Handle
          id={`${id}-${position}`}
          type={isSource ? 'source' : 'target'}
          position={handlePosition}
          className="!bg-foreground !border-none !p-0 !m-0"
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
