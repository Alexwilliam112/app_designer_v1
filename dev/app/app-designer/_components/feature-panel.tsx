'use client'

import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Search } from '@/components/ui/search'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Monitor } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const featureSchema = z.object({
  module: z.string().optional(),
  name: z.string().min(1),
  description: z.string().min(1),
})

const options = [
  { label: 'Generate PDF Report', isSelected: true },
  { label: 'Send email notification', isSelected: true },
  { label: 'Automate workflow', isSelected: false },
  { label: 'Auto suggest business logic', isSelected: false },
  { label: 'Execute custom business logic', isSelected: false },
]

export default function FeaturePanel() {
  const form = useForm({
    resolver: zodResolver(featureSchema),
  })

  const onSubmit = (values: z.infer<typeof featureSchema>) => {}

  return (
    <div className="flex flex-col p-5 gap-5 bg-muted w-[25vw] 3xl:w-[16vw] shrink-0 h-[96vh] border rounded-xl overflow-hidden">
      <header className="flex justify-between pb-5 border-b border-foreground/30 shrink-0">
        <div className="flex gap-2 items-center">
          {/* Feature Icon and Name */}
          <Monitor className="w-6 h-6" />
          <h1 className="leading-none text-xl font-semibold">Requestor Menu</h1>
        </div>
      </header>

      <Form {...form}>
        <form
          className="flex flex-col gap-3 pb-5 border-b border-foreground/30"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="module"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Module</FormLabel>
                <FormControl>
                  <Input placeholder="Type here" {...field} className="bg-background shadow-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Type here" {...field} className="bg-background shadow-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type here"
                    {...field}
                    className="bg-background shadow-none resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="grid grid-rows-2 gap-5 h-full min-h-0">
        <div className="flex flex-col gap-2 pb-5 border-b border-foreground/30 min-h-0">
          <h2 className="font-semibold text-foreground/80 leading-none">Features</h2>
          <div className="flex flex-col gap-1 overflow-y-auto flex-1 min-h-0">
            {options.map((op) => (
              <div key={op.label} className="flex gap-2 items-center">
                <Checkbox id={op.label} className="w-7 h-7 bg-background shadow-none" />
                <Label className="px-3 py-2 bg-background w-full rounded border">{op.label}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 pb-5 border-foreground/30 min-h-0">
          <div className="space-y-2">
            <h2 className="font-semibold text-foreground/80 leading-none">GET Data From</h2>
            <Search />
          </div>
          <div className="flex flex-col gap-1 overflow-y-auto flex-1 min-h-0">
            {options.map((op) => (
              <div key={op.label} className="flex gap-2 items-center">
                <Checkbox id={op.label} className="w-7 h-7 bg-background shadow-none" />
                <Label className="px-3 py-2 bg-background w-full rounded border">{op.label}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
