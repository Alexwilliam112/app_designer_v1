import { Button } from '@/components/ui/button'
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
import { Group, Trash2 } from 'lucide-react'

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
      <DialogContent className="flex flex-col lg:max-w-[95vw] h-[90vh]">
        <DialogHeader className="pb-3">
          <DialogTitle>Modules And Grouping</DialogTitle>
        </DialogHeader>
        <div className="grid grid-rows-2 h-full overflow-hidden">
          <div className="space-y-2 h-full">
            <h2 className="font-bold">Module Mapping</h2>

            <Table>
              <TableHeader>
                <TableHead className="w-[25%]">Module Name</TableHead>
                <TableHead className="w-[25%]">Menu Name</TableHead>
                <TableHead className="w-full">Description</TableHead>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="border-t">Select Module</TableCell>
                  <TableCell className="border-t">Menu Name</TableCell>
                  <TableCell className="border-t">Menu Name</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="space-y-2 h-full">
            <h2 className="font-bold">Modules</h2>

            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Module Name</TableCell>
                  <TableCell className="flex justify-end text-destructive">
                    <Button
                      size={'icon'}
                      variant={'ghost'}
                      className="hover:bg-destructive hover:text-white"
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
