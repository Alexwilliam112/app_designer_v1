'use client'

import { DataTableColumnHeader } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'

export const modulesColumns: ColumnDef<ForeignObj>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Module" />,
  },
  {
    id: 'delete',
    header: 'Action',
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button
          variant={'ghost'}
          size={'icon'}
          className="text-destructive hover:text-white hover:bg-destructive"
        >
          <Trash2 />
        </Button>
      </div>
    ),
  },
]
