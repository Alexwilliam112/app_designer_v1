'use client'

import { DataTable } from '@/components/data-table'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { ChartAreaIcon } from 'lucide-react'
import { estimationColumns } from './estimation-columns'
import { useCallback, useEffect, useState } from 'react'
import flowApi from '@/services/flow-api'
import { useFlowStore } from '@/store/use-store'

export default function EstimationDrawer() {
  const id_estimation = useFlowStore((state) => state.id_estimation)
  const [data, setData] = useState<EstimationData[]>([])
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchCallback = useCallback(async () => {
    try {
      const res = await flowApi.getEstimationBreakdown({ id_estimation })
      setData(res)
    } catch (error: unknown) {
      setError(true)
      setMessage(String(error))
    } finally {
      setLoading(false)
    }
  }, [id_estimation])

  useEffect(() => {
    if (id_estimation) {
      fetchCallback()
    }
  }, [fetchCallback])
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

        <div className="flex p-6 overflow-hidden">
          <DataTable columns={estimationColumns} data={data} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
