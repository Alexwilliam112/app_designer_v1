'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useFlowStore } from '@/store/use-store'
import { Group, Plus } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import { moduleMappingColumns } from './module-mapping-columns'
import { modulesColumns } from './modules-columns'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function ModulesOverlay() {
  const nodes = useFlowStore((state) => state.nodes)
  const modules = useFlowStore((state) => state.modulesData)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col gap-1 items-center justify-center p-1 rounded hover:bg-muted-foreground/10 hover:cursor-pointer transition-colors duration-200 h-14 w-14 overflow-visible">
          <Group className="text-primary w-5 h-5 shrink-0" />
          <p className="text-nowrap">Modules</p>
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-1 flex-col lg:max-w-[95vw] h-[90vh] overflow-hidden">
        <DialogHeader className="pb-3">
          <DialogTitle>Modules And Grouping</DialogTitle>
        </DialogHeader>
        <div className="grid grid-rows-2 gap-3 h-full relative min-h-0">
          <div className="flex flex-col gap-2 h-full min-h-0">
            <h2 className="font-bold">Module Mapping</h2>
            <div className="overflow-hidden flex w-full h-full">
              <div className="flex shrink relative h-full w-full">
                <DataTable
                  columns={moduleMappingColumns}
                  data={nodes.filter((n) => n.type === 'component')}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2 h-full min-h-0 w-full">
            <div className="flex justify-between">
              <h2 className="font-bold">Modules</h2>
              <CreateModuleOverlay />
            </div>
            <div className="overflow-hidden flex w-full h-full">
              <div className="flex shrink relative h-full w-full">
                <DataTable data={modules} columns={modulesColumns} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const addModuleSchema = z.object({
  name: z.string().min(1),
})

function CreateModuleOverlay() {
  const id_estimation = useFlowStore((state) => state.id_estimation)
  const saveModule = useFlowStore((state) => state.saveModule)
  const fetchModules = useFlowStore((state) => state.fetchModules)

  const [addingModule, setAddingModule] = useState(false)
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof addModuleSchema>>({
    resolver: zodResolver(addModuleSchema),
  })

  const onSubmit = async (values: z.infer<typeof addModuleSchema>) => {
    try {
      setAddingModule(true)

      if (!id_estimation) {
        console.error('id_estimation is required as params')
        return
      }

      const { name } = values
      await saveModule({ id_estimation, name })

      await fetchModules()

      setOpen(false)
      toast('Module added successfully')
    } catch (error: unknown) {
      console.error(String(error))
    } finally {
      setAddingModule(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-6 h-6" size={'icon'} variant={'outline'}>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Module</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Module name"
                      {...field}
                      className="bg-background shadow-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={addingModule}>
              {addingModule ? 'Adding...' : 'Add'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
