import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useFlowStore } from '@/store/use-store'
import { Group } from 'lucide-react'
import ModulesSelect from '../modules-select'
import {
  Command,
  CommandItem,
  CommandList,
  CommandGroup,
  CommandInput,
} from '@/components/ui/command'
import { DataTable } from '@/components/data-table'
import { moduleMappingColumns } from './module-mapping-columns'

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
        <div className="grid grid-rows-2 gap-2 h-full relative min-h-0">
          <div className="flex flex-col gap-2 h-full min-h-0">
            <h2 className="font-bold">Module Mapping</h2>
            <div className="flex shrink relative h-full">
              <DataTable
                columns={moduleMappingColumns}
                data={nodes.filter((n) => n.type === 'component')}
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2 h-full min-h-0">
            <h2 className="font-bold">Modules</h2>
            <div className="border rounded-md overflow-hidden flex flex-col h-full">
              <div className="flex shrink relative h-full">
                <Command>
                  <CommandInput placeholder="Search modules" />
                  <CommandList className="overflow-auto">
                    <CommandGroup>
                      {modules.map((item) => (
                        <CommandItem key={item.id} value={item.name}>
                          {item.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
