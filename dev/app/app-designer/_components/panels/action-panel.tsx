'use client'

import { Node, Panel } from '@xyflow/react'
import {
  Banknote,
  ChartPie,
  Database,
  FileDown,
  Monitor,
  MonitorCog,
  Play,
  Webhook,
  Zap,
} from 'lucide-react'
import { ReactNode, useCallback, useState } from 'react'
import { useFlowStore } from '@/store/use-store'
import ModulesOverlay from './modules-overlay'
import EstimationDrawer from './estimation-drawer'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'

export default function ActionPanel() {
  const nodes = useFlowStore((state) => state.nodes)
  const setNodes = useFlowStore((state) => state.setNodes)

  const addStartPoint = useCallback(() => {
    const startNode: Node = {
      id: `entry-${Date.now()}`,
      type: 'entryPoint',
      position: { x: 0, y: 0 + nodes.length * 50 },
      data: {
        id: `entry-${Date.now()}`,
      },
    }

    setNodes([...nodes, startNode as Node<ComponentNodeData>])
  }, [nodes, setNodes])

  return (
    <Panel position="top-left" className="flex gap-2 text-[0.5rem]">
      <div className="relative flex p-1 gap-3 bg-muted border rounded-md uppercase">
        <FeaturePopover groupName="INSIGHT">
          <div className="flex flex-col gap-1 items-center justify-center p-1 rounded hover:bg-muted-foreground/10 hover:cursor-pointer transition-colors duration-200 h-14 w-14 overflow-visible">
            <ChartPie className="text-primary w-5 h-5 shrink-0" />
            <p className="text-nowrap">Insight</p>
          </div>
        </FeaturePopover>

        <FeaturePopover groupName="WORKFLOW">
          <div className="flex flex-col gap-1 items-center justify-center p-1 rounded hover:bg-muted-foreground/10 hover:cursor-pointer transition-colors duration-200 h-14 w-14 overflow-visible">
            <Zap className="text-primary w-5 h-5 shrink-0" />
            <p className="text-nowrap">Workflow</p>
          </div>
        </FeaturePopover>

        <FeaturePopover groupName="INTEGRATION">
          <div className="flex flex-col gap-1 items-center justify-center p-1 rounded hover:bg-muted-foreground/10 hover:cursor-pointer transition-colors duration-200 h-14 w-14 overflow-visible">
            <Webhook className="text-primary w-5 h-5 shrink-0" />
            <p className="text-nowrap">Integration</p>
          </div>
        </FeaturePopover>

        <FeaturePopover groupName="LOWCODE">
          <div className="flex flex-col gap-1 items-center justify-center p-1 rounded hover:bg-muted-foreground/10 hover:cursor-pointer transition-colors duration-200 h-14 w-14 overflow-visible">
            <MonitorCog className="text-primary w-5 h-5 shrink-0" />
            <p className="text-nowrap">Lowcode</p>
          </div>
        </FeaturePopover>

        <FeaturePopover groupName="APP BUILDER">
          <div className="flex flex-col gap-1 items-center justify-center p-1 rounded hover:bg-muted-foreground/10 hover:cursor-pointer transition-colors duration-200 h-14 w-14 overflow-visible">
            <Monitor className="text-primary w-5 h-5 shrink-0" />
            <p className="text-nowrap">App Builder</p>
          </div>
        </FeaturePopover>

        <div className="flex flex-col gap-1 items-center justify-center p-1 rounded hover:bg-muted-foreground/10 hover:cursor-pointer transition-colors duration-200 h-14 w-14 overflow-visible">
          <Database className="text-primary w-5 h-5 shrink-0" />
          <p className="text-nowrap">Database</p>
        </div>

        <div
          onClick={addStartPoint}
          className="flex flex-col gap-1 items-center justify-center p-1 rounded hover:bg-muted-foreground/10 hover:cursor-pointer transition-colors duration-200 h-14 w-14 overflow-visible"
        >
          <Play className="text-primary w-5 h-5 shrink-0" />
          <p className="text-nowrap">Start Point</p>
        </div>
      </div>

      <div className="relative flex p-1 gap-3 bg-muted border rounded-md uppercase">
        <ModulesOverlay />

        <EstimationDrawer />

        <div className="flex flex-col gap-1 items-center justify-center p-1 rounded hover:bg-muted-foreground/10 hover:cursor-pointer transition-colors duration-200 h-14 w-14 overflow-visible">
          <Banknote className="text-primary w-5 h-5 shrink-0" />
          <p className="text-nowrap">Pricing</p>
        </div>

        <div className="flex flex-col gap-1 items-center justify-center p-1 rounded hover:bg-muted-foreground/10 hover:cursor-pointer transition-colors duration-200 h-14 w-14 overflow-visible">
          <FileDown className="text-primary w-5 h-5 shrink-0" />
          <p className="text-nowrap">Export</p>
        </div>
      </div>
    </Panel>
  )
}

function FeaturePopover({ children, groupName }: { children: ReactNode; groupName: string }) {
  const [open, setOpen] = useState(false)

  const group = useFlowStore((state) => state.baseComponentGroup)
  const items = group.find((g) => g.label === groupName)?.items || []
  const addFeatureNode = useFlowStore((state) => state.addFeatureNodeRaw)

  const handleCommandSelect = (command: string) => {
    addFeatureNode(command)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-64 p-0 mx-4" align="center" side="bottom">
        <Command>
          <CommandInput placeholder="Search a feature..." />
          <CommandList>
            <CommandEmpty>No features found.</CommandEmpty>
            <CommandGroup>
              {items.map((i) => (
                <CommandItem key={i.id} onSelect={() => handleCommandSelect(i.id)}>
                  <i.icon className="text-primary" /> {i.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
