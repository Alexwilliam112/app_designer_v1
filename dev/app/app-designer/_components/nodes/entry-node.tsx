import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
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

interface EntryNodeProps {
  data: unknown
  onCommandSelect?: (command: string) => void
}

export default function EntryNode({ data, onCommandSelect }: EntryNodeProps) {
  const [open, setOpen] = useState(false)

  const handleCommandSelect = (command: string) => {
    if (onCommandSelect) {
      onCommandSelect(command)
    }
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex flex-col gap-1 font-normal w-20 h-20 rounded-full border justify-center items-center hover:cursor-pointer uppercase"
        >
          <Play />
          <p>Start</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="center" side="right">
        <Command>
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandEmpty>No commands found.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => handleCommandSelect('fetch-data')}>
                Fetch Data
              </CommandItem>
              <CommandItem onSelect={() => handleCommandSelect('process')}>Process</CommandItem>
              <CommandItem onSelect={() => handleCommandSelect('analyze')}>Analyze</CommandItem>
              <CommandItem onSelect={() => handleCommandSelect('export')}>Export</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
