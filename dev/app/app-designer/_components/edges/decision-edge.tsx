import { EdgeProps } from '@xyflow/react'
import { memo } from 'react'
import { EdgeWithChild } from '@/components/button-edge'
import { useFlowStore } from '@/store/use-store'

const DecisionEdge = memo((props: EdgeProps) => {
  const edges = useFlowStore((state) => state.edges)
  const setEdges = useFlowStore((state) => state.setEdges)

  //   const onEdgeClick = () => {
  //     const filtered = edges.filter((edge) => edge.id !== props.id)
  //     setEdges(filtered)
  //   }

  return (
    <EdgeWithChild {...props}>
      <p className="bg-muted border rounded px-2 py-1">{(props.data?.label as string) || ''}</p>
    </EdgeWithChild>
  )
})

export default DecisionEdge
