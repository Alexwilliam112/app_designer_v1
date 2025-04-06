'use client'

import { Button } from '@/components/ui/button'
import { Monitor, MonitorCog, Network, PieChart, Play, Webhook, Zap } from 'lucide-react'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import { Handle, Position } from '@xyflow/react'
import { useFlowStore } from '@/store/use-store'

interface EntryNodeProps {
  data: {
    id: string
    onCommandSelect: (id: string, entryId: string) => void
  }
}

export const commandItems = [
  {
    id: 'utility',
    label: 'UTILITY',
    items: [
      {
        id: 'utility/decision',
        label: 'Decision',
        icon: Network,
      },
    ],
  },
  {
    id: 'appBuilder',
    label: 'APP BUILDER',
    items: [
      {
        id: 'appBuilder/masterData',
        label: 'Master Data',
        icon: Monitor,
      },
      {
        id: 'appBuilder/configuration',
        label: 'Configuration',
        icon: Monitor,
      },
      {
        id: 'appBuilder/administrator',
        label: 'Administrator',
        icon: Monitor,
      },
      {
        id: 'appBuilder/requestorMenu',
        label: 'Requestor Menu',
        icon: Monitor,
      },
      {
        id: 'appBuilder/approverMenu',
        label: 'Approver Menu',
        icon: Monitor,
      },
      {
        id: 'appBuilder/customUI',
        label: 'Custom UI',
        icon: Monitor,
      },
    ],
  },
  {
    id: 'lowcode',
    label: 'LOWCODE',
    items: [
      {
        id: 'lowcode/dataEntry',
        label: 'Lowcode Data Entry',
        icon: MonitorCog,
      },
      {
        id: 'lowcode/dashboard',
        label: 'Lowcode Dashboard',
        icon: MonitorCog,
      },
      {
        id: 'lowcode/portal',
        label: 'Lowcode Portal',
        icon: MonitorCog,
      },
    ],
  },
  {
    id: 'workflow',
    label: 'WORKFLOW',
    items: [
      {
        id: 'workflow/integrationCoreProduct',
        label: 'Integration Core Product',
        icon: Webhook,
      },
      {
        id: 'workflow/integrationClientSystem',
        label: 'Integration Client System',
        icon: Webhook,
      },
      {
        id: 'workflow/integrationExternalSystem',
        label: 'Integration Ext. System',
        icon: Webhook,
      },
      {
        id: 'workflow/automationBlock',
        label: 'Automation Block',
        icon: Zap,
      },
    ],
  },
  {
    id: 'insight',
    label: 'INSIGHT',
    items: [
      {
        id: 'insight/dashboardBuilder',
        label: 'Dashboard Builder',
        icon: PieChart,
      },
      {
        id: 'insight/customReports',
        label: 'Custom Reports',
        icon: PieChart,
      },
    ],
  },
]

export default function EntryNode({ data: { id } }: EntryNodeProps) {
  const { handleEntryCommandSelect } = useFlowStore()
  const [open, setOpen] = useState(false)

  const handleCommandSelect = (command: string) => {
    console.log(command)
    handleEntryCommandSelect(command, id)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>
          <Button
            variant="outline"
            className="flex flex-col gap-1 font-normal w-20 h-20 rounded-full border justify-center items-center hover:cursor-pointer uppercase"
          >
            <Play />
            <p>Start</p>
          </Button>
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
