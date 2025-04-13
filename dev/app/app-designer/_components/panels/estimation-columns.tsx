'use client'

import { DataTableColumnHeader } from '@/components/data-table'
import { ColumnDef } from '@tanstack/react-table'

export const estimationColumns: ColumnDef<EstimationData>[] = [
  {
    accessorKey: 'module',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Module" />,
  },
  {
    accessorKey: 'menu',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Menu" />,
  },
  {
    accessorKey: 'feature',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
  },
  {
    accessorKey: 'component_type',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Component Type" />,
  },
  {
    accessorKey: 'component_name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Component Name" />,
  },
  {
    accessorKey: 'total_md',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total MD" />,
  },
  {
    accessorKey: 'md_pm',
    header: ({ column }) => <DataTableColumnHeader column={column} title="MD PM" />,
  },
  {
    accessorKey: 'md_sa',
    header: ({ column }) => <DataTableColumnHeader column={column} title="MD SA" />,
  },
  {
    accessorKey: 'md_se',
    header: ({ column }) => <DataTableColumnHeader column={column} title="MD SE" />,
  },
  {
    accessorKey: 'md_ui',
    header: ({ column }) => <DataTableColumnHeader column={column} title="MD UI" />,
  },
  {
    accessorKey: 'md_qa',
    header: ({ column }) => <DataTableColumnHeader column={column} title="MD QA" />,
  },
  {
    accessorKey: 'effort',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Effort" />,
  },
  {
    accessorKey: 'base_mh',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Base MH" />,
  },
  {
    accessorKey: 'fixing_mh',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fixing MH" />,
  },
  {
    accessorKey: 'likelihood',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Likelihood" />,
    cell: ({ row }) => `${row.original.likelihood}%`,
  },
  {
    accessorKey: 'risk',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Risk" />,
    cell: ({ row }) => `${row.original.risk}%`,
  },
  {
    accessorKey: 'issue_mh',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Issue MH" />,
  },
  {
    accessorKey: 'baseline_mh',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Baseline MH" />,
  },
]
