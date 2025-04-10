'use client'

import { DataTableColumnHeader } from '@/components/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { Node } from '@xyflow/react'
import ModulesSelect from '../modules-select'

export const moduleMappingColumns: ColumnDef<Node<ComponentNodeData>>[] = [
  {
    id: 'module',
    accessorKey: 'data.component.module.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Module'} className="w-fit" />
    ),
    cell: ({ row }) => (
      <div className="w-fit">
        <ModulesSelect nodeId={row.original.id} />
      </div>
    ),
  },
  {
    id: 'menu',
    accessorKey: 'data.menuName',
    header: ({ column }) => <DataTableColumnHeader column={column} title={'Menu'} />,
  },
  {
    id: 'description',
    accessorKey: 'data.component.description',
    header: ({ column }) => <DataTableColumnHeader column={column} title={'Description'} />,
  },
]
