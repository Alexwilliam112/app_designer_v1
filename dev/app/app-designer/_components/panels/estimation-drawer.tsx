'use client'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { ChartAreaIcon } from 'lucide-react'

export default function EstimationDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="flex flex-col gap-1 items-center justify-center p-1 rounded hover:bg-muted-foreground/10 hover:cursor-pointer transition-colors duration-200 h-14 w-14 overflow-visible">
          <ChartAreaIcon className="text-primary w-5 h-5 shrink-0" />
          <p className="text-nowrap">Estimation</p>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="border-b">
          <DrawerTitle>Estimation Breakdown</DrawerTitle>
        </DrawerHeader>

        <div></div>
      </DrawerContent>
    </Drawer>
  )
}
