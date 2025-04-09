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
      <DialogContent className="flex flex-1 flex-col lg:max-w-[95vw] h-[90vh] overflow-hidden">
        <DialogHeader className="pb-3">
          <DialogTitle>Modules And Grouping</DialogTitle>
        </DialogHeader>
        <div className="grid grid-rows-2 gap-2 h-full relative min-h-0">
          <div className="flex flex-col gap-2 h-full min-h-0">
            <h2 className="font-bold">Module Mapping</h2>
            <div className="border rounded-md overflow-hidden flex flex-col h-full">
              <div className="flex shrink relative h-full">
                <Table>
                  <TableHeader className="sticky top-0 z-10 bg-muted">
                    <TableRow>
                      <TableHead className="w-[25%]">Module Name</TableHead>
                      <TableHead className="w-[25%]">Menu Name</TableHead>
                      <TableHead className="w-full">Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modules.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell>Select Module</TableCell>
                        <TableCell>Menu Name</TableCell>
                        <TableCell>Menu Name</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2 h-full min-h-0">
            <h2 className="font-bold">Modules</h2>
            <div className="border rounded-md overflow-hidden flex flex-col h-full">
              <div className="flex shrink relative h-full">
                <Table>
                  <TableHeader className="sticky top-0 bg-muted z-10">
                    <TableRow>
                      <TableHead>Module Name</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
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
                    </TableRow>{' '}
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
                    </TableRow>{' '}
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
                    </TableRow>{' '}
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
                    </TableRow>{' '}
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
                    </TableRow>{' '}
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
