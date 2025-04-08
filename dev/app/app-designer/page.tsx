'use client'

import { useCallback, useEffect } from 'react'
import Flow from './_components/flow'
import { useFlowStore } from '@/store/use-store'
import { useSearchParams } from 'next/navigation'

export default function AppDesignerPage() {
  const setIdEstimation = useFlowStore((state) => state.setIdEstimation)
  const fetchModules = useFlowStore((state) => state.fetchModules)
  const searchParams = useSearchParams()
  const id_estimation = searchParams.get('id_estimation') || ''

  const fetchComponents = useFlowStore((state) => state.fetchBaseComponents)
  const fetchNodes = useFlowStore((state) => state.fetchNodes)

  const fetchCompsCallback = useCallback(async () => {
    await fetchComponents()
  }, [])

  const fetchNodesCallback = useCallback(async () => {
    await fetchNodes(id_estimation)
  }, [id_estimation])

  const fetchModulesCallback = useCallback(async () => {
    await fetchModules()
  }, [])

  useEffect(() => {
    fetchCompsCallback()
  }, [])

  useEffect(() => {
    if (id_estimation) {
      setIdEstimation(id_estimation)
      fetchNodesCallback()
      fetchModulesCallback()
    }
  }, [id_estimation, fetchNodesCallback])

  return <Flow />
}
