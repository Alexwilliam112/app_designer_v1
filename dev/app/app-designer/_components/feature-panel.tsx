'use client'

import { Button } from '@/components/ui/button'
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
import { Search } from '@/components/ui/search'
import { Textarea } from '@/components/ui/textarea'
import flowApi from '@/services/flow-api'
import { useFlowStore } from '@/store/use-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateNodeInternals } from '@xyflow/react'
import { Monitor, X, MonitorCog, Webhook, Zap, PieChart, ChevronsUpDown, Check } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
  CommandGroup,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const featureSchema = z.object({
  module: z.string().optional(),
  name: z.string().min(1),
  description: z.string().min(1),
  data_flows: z.array(z.string()),
  features: z.array(z.string()),
})

export default function FeaturePanel() {
  const nodes = useFlowStore((state) => state.nodes)
  const edges = useFlowStore((state) => state.edges)
  const selectedNode = useFlowStore((state) => state.selectedNode)
  const modulesData = useFlowStore((state) => state.modulesData)
  const id_estimation = useFlowStore((state) => state.id_estimation)
  const setNodes = useFlowStore((state) => state.setNodes)
  const setEdges = useFlowStore((state) => state.setEdges)
  const saveModule = useFlowStore((state) => state.saveModule)
  const fetchModules = useFlowStore((state) => state.fetchModules)

  const updateNodeInternals = useUpdateNodeInternals()

  const [featureOptions, setFeatureOptions] = useState<ForeignObj[]>([])
  const [moduleInput, setModuleInput] = useState<string | undefined>()
  const [addingModule, setAddingModule] = useState(false)

  const setSelectedNode = useFlowStore((state) => state.setSelectedNode)
  const save = useFlowStore((state) => state.updateComponent)

  const defaultValues = {
    module: selectedNode?.component.module.id || '',
    name: selectedNode?.component.title || '',
    description: selectedNode?.component.description || '',
    features: selectedNode?.component.features?.map((d) => d.id) || [],
    data_flows: [],
  }

  const form = useForm({
    resolver: zodResolver(featureSchema),
    defaultValues,
  })

  const onSubmit = async (values: z.infer<typeof featureSchema>) => {
    if (!selectedNode) {
      console.error('No selected node available')
      return
    }

    const updated = selectedNode

    updated.component.module = modulesData.find((m) => m.id === values.module) || {
      id: '',
      name: '',
    }
    updated.menuName = values.name
    updated.component.title = values.name
    updated.component.description = values.description
    updated.component.features = featureOptions
      .slice()
      .filter((f) => values.features.includes(f.id))

    await save(updated)

    setSelectedNode(undefined)

    updateNodeInternals(updated.id)
  }

  const fetchFeatureCallback = useCallback(async () => {
    if (!selectedNode) {
      console.error('No selected node available')
      return
    }

    const id_component = selectedNode.component.id_component
    const data = await flowApi.getFeatures({ id_component })

    setFeatureOptions(data)
  }, [selectedNode])

  useEffect(() => {
    if (selectedNode) {
      fetchFeatureCallback()
    }
  }, [fetchFeatureCallback])

  const onClose = () => {
    if (selectedNode) {
      if (!selectedNode.menuName || !selectedNode.component.description) {
        setNodes(nodes.filter((n) => n.id !== selectedNode.id))
        setEdges(edges.filter((e) => e.source !== selectedNode.id && e.target !== selectedNode.id))
      }

      setSelectedNode(undefined)
    }
  }

  const onAddModule = async () => {
    try {
      setAddingModule(true)

      if (!id_estimation) {
        console.error('id_estimation is required as params')
        return
      }

      if (!moduleInput) {
        console.error('Modulename is required')
        return
      }

      await saveModule({ id_estimation, name: moduleInput })

      await fetchModules()
    } catch (error: unknown) {
      console.error(String(error))
    } finally {
      setAddingModule(false)
    }
  }

  useEffect(
    () => () => {
      console.log(form.watch())
      console.log(selectedNode)
    },
    [form.formState]
  )

  const featureIcon =
    selectedNode?.component.category === 'APP BUILDER' ? (
      <Monitor />
    ) : selectedNode?.component.category === 'LOWCODE' ? (
      <MonitorCog />
    ) : selectedNode?.component.category === 'WORKFLOW' ? (
      <Webhook />
    ) : selectedNode?.component.category === 'INTEGRATION' ? (
      <Zap />
    ) : selectedNode?.component.category === 'INSIGHT' ? (
      <PieChart />
    ) : undefined

  return (
    <Form {...form}>
      <form
        className="flex flex-col p-5 gap-5 bg-muted w-[25vw] 3xl:w-[16vw] shrink-0 h-[96vh] border rounded-xl overflow-hidden"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <header className="flex justify-between pb-5 border-b border-foreground/30 shrink-0">
          <div className="flex gap-2 items-center">
            {featureIcon}
            <h1 className="leading-none text-xl font-semibold">
              {selectedNode?.component.category}
            </h1>
          </div>

          <Button
            variant={'ghost'}
            size={'icon'}
            type="button"
            className="hover:cursor-pointer hover:border"
            onClick={onClose}
          >
            <X />
          </Button>
        </header>

        <div className="flex flex-col gap-3 pb-5 border-b border-foreground/30">
          <FormField
            control={form.control}
            name="module"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Module</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'w-full justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? modulesData.find((item) => item.id === field.value)?.name
                          : 'Select or create a module...'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        value={moduleInput}
                        onValueChange={setModuleInput}
                        placeholder="Search fruit..."
                      />
                      <CommandList className="min-w-[22vw]">
                        <CommandEmpty>
                          <Button
                            variant={'ghost'}
                            className="w-full mx-1"
                            onClick={onAddModule}
                            disabled={addingModule}
                          >
                            {addingModule
                              ? `Creating '${moduleInput}'...`
                              : `Create '${moduleInput}'`}
                          </Button>
                        </CommandEmpty>
                        <CommandGroup>
                          {modulesData.map((item) => (
                            <CommandItem
                              key={item.id}
                              value={item.name}
                              onSelect={() => {
                                form.setValue('module', item.id)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  item.id === field.value ? 'opacity-100' : 'opacity-0'
                                )}
                              />
                              {item.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                  <Input
                    required
                    placeholder="Type here"
                    {...field}
                    className="bg-background shadow-none"
                  />
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
                    required
                    placeholder="Type here"
                    {...field}
                    className="bg-background shadow-none resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-rows-2 gap-5 h-full min-h-0">
          <div className="flex flex-col gap-2 pb-5 border-foreground/30 min-h-0">
            <h2 className="font-semibold text-foreground/80 leading-none">Featues</h2>
            <div className="flex flex-col gap-1 overflow-y-auto flex-1 min-h-0">
              <Command className="border">
                <CommandInput placeholder="Search data source component" />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {featureOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="features"
                        render={({ field }) => {
                          const isChecked = field.value?.includes(item.id)
                          return (
                            <CommandItem key={item.id} className="flex items-center gap-2 p-0">
                              <FormItem
                                key={item.id}
                                className="flex gap-2 items-center w-full p-2"
                              >
                                <FormControl>
                                  <div className="items-center flex h-7 w-7">
                                    <Checkbox
                                      className="w-7 h-7 bg-background shadow-none"
                                      checked={isChecked}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, item.id])
                                          : field.onChange(
                                              field.value?.filter((value) => value !== item.id)
                                            )
                                      }}
                                    />
                                  </div>
                                </FormControl>
                                <FormLabel className="px-3 py-2 bg-background w-full rounded border">
                                  {item.name}
                                </FormLabel>
                              </FormItem>
                            </CommandItem>
                          )
                        }}
                      />
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>

          <div className="flex flex-col gap-2 pb-5 border-foreground/30 min-h-0">
            <h2 className="font-semibold text-foreground/80 leading-none">GET Data From</h2>
            <div className="flex flex-col gap-1 overflow-y-auto flex-1 min-h-0">
              <Command className="border">
                <CommandInput placeholder="Search data source component" />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {nodes
                      .slice()
                      .filter((n) => !n.id.includes('entry') && n.id !== selectedNode?.id)
                      .map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="data_flows"
                          render={({ field }) => {
                            const isChecked = field.value?.includes(item.id)
                            return (
                              <CommandItem key={item.id} className="flex items-center gap-2 p-0">
                                <FormItem
                                  key={item.id}
                                  className="flex gap-2 items-center w-full p-2"
                                >
                                  <FormControl>
                                    <div className="items-center flex h-7 w-7">
                                      <Checkbox
                                        className="w-7 h-7 bg-background shadow-none"
                                        checked={isChecked}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, item.id])
                                            : field.onChange(
                                                field.value?.filter((value) => value !== item.id)
                                              )
                                        }}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormLabel className="px-3 py-2 bg-background w-full rounded border">
                                    {item.data.menuName}
                                  </FormLabel>
                                </FormItem>
                              </CommandItem>
                            )
                          }}
                        />
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>
        </div>

        <Button type={'submit'}>Save</Button>
      </form>
    </Form>
  )
}
