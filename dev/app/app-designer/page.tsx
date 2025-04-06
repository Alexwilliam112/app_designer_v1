'use client'

import { useCallback, useEffect } from 'react'
import Flow from './_components/flow'
import { useFlowStore } from '@/store/use-store'

export default function AppDesignerPage() {
  const fetchComponents = useFlowStore((state) => state.fetchBaseComponents)
  const fetchCallback = useCallback(async () => {
    await fetchComponents()
  }, [])

  useEffect(() => {
    fetchCallback()
  }, [])

  return <Flow />
}
