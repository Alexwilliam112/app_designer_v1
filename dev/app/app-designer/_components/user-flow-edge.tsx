import { EdgeProps } from '@xyflow/react'
import { memo } from 'react'
import { ButtonEdge } from '@/components/button-edge'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useFlowStore } from '@/store/use-store'

const UserFlowEdge = memo((props: EdgeProps) => {
  const edges = useFlowStore((state) => state.edges)
  const setEdges = useFlowStore((state) => state.setEdges)

  const onEdgeClick = () => {
    const filtered = edges.filter((edge) => edge.id !== props.id)
    setEdges(filtered)
  }

  return (
    <ButtonEdge {...props}>
      <Button
        variant={'ghost'}
        size={'icon'}
        className="w-6 h-6 text-transparent hover:text-foreground hover:bg-destructive/50 hover:cursor-pointer"
        onClick={onEdgeClick}
      >
        <X className="w-1 h-1" />
      </Button>
    </ButtonEdge>
  )
})

export default UserFlowEdge
