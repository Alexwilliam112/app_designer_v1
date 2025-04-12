'use client'

import { Handle, Position } from '@xyflow/react'
import { Check, Network, Plus } from 'lucide-react'
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface AddNodeProps {
  data: {
    id: string
    position: 'top' | 'bottom' | 'left' | 'right'
    handlePosition: Position
    isSource: boolean
  }
}

const addDecisionSchema = z.object({
  decision: z.string().min(1), // Decision label which will appear on the edge
  featureId: z.string().min(1),
})

export function AddDecisionHandle({
  data: { id, position, handlePosition, isSource },
}: AddNodeProps) {
  const group = useFlowStore((state) => state.baseComponentGroup)
  const loading = useFlowStore((state) => state.baseComponentsLoading)
  const error = useFlowStore((state) => state.baseComponentsError)
  const message = useFlowStore((state) => state.baseComponentsMessage)
  const addFeatureNode = useFlowStore((state) => state.addFeatureNode)
  const addDecisionNode = useFlowStore((state) => state.addDecisionNode)
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof addDecisionSchema>>({
    resolver: zodResolver(addDecisionSchema),
  })

  const onAddFeature = (featureId: string) => {
    addFeatureNode(featureId, id, { sourceId: `${id}-${position}` })

    setOpen(false)
  }

  const onAddDecision = () => {
    addDecisionNode(id, { sourceId: `${id}-${position}` })

    setOpen(false)
  }

  const onSubmit = (values: z.infer<typeof addDecisionSchema>) => {
    setOpen(false)
    addFeatureNode(values.featureId, id, { sourceId: `${id}-${position}` }, values.decision)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
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
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Decision Branch</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="decision"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Decision Label</FormLabel>
                  <FormControl>
                    <Input placeholder="Label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featureId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feature</FormLabel>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="featureId"
                      render={({ field }) => (
                        <Command className="border aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive">
                          <CommandInput placeholder="Search a feature..." />
                          <CommandList>
                            <CommandEmpty>No feature found.</CommandEmpty>
                            {/* <CommandGroup heading="UTILITY">
                              <CommandItem
                                value="Decision"
                                onSelect={() => field.onChange('decision')}
                              >
                                <Network className="text-primary" />
                                Decision
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    field.value === 'decision' ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            </CommandGroup> */}
                            {group.map((com) => (
                              <CommandGroup heading={com.label} key={com.id}>
                                {com.items.map((i) => (
                                  <CommandItem
                                    key={i.id}
                                    value={i.label}
                                    onSelect={() => field.onChange(i.id)}
                                  >
                                    <i.icon className="text-primary" /> {i.label}
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        field.value === i.id ? 'opacity-100' : 'opacity-0'
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            ))}
                          </CommandList>
                        </Command>
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className="mt-4" type="submit">
              Add Node
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
