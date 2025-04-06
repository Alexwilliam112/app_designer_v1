'use client'

import { useCallback, useEffect } from 'react'
import Flow from './_components/flow'
import { useFlowStore } from '@/store/use-store'
import { useSearchParams } from 'next/navigation'

export default function AppDesignerPage() {
  const setIdEstimation = useFlowStore((state) => state.setIdEstimation)
  const searchParams = useSearchParams()
  const id_estimation = searchParams.get('id_estimation') || ''

  const fetchComponents = useFlowStore((state) => state.fetchBaseComponents)
  const fetchCallback = useCallback(async () => {
    await fetchComponents()
  }, [])

  useEffect(() => {
    fetchCallback()
  }, [])

  useEffect(() => {
    if (id_estimation) {
      setIdEstimation(id_estimation)
    }
  }, [id_estimation])

  return <Flow />
}
