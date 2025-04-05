'use client'

import { Button } from '@/components/ui/button'
import { Code2, CurlyBraces, Pencil, Trash2 } from 'lucide-react'
import React, { ReactNode } from 'react'

export interface ComponentNodeData extends Record<string, unknown> {
  featureName: string
  featureIcon: ReactNode
  module: string
  category: string
  type: string
}

interface ComponentNodeProps {
  data: ComponentNodeData
}

export default function ComponentNode({ data }: ComponentNodeProps) {
  return (
    <div className="flex flex-col gap-2 p-2 rounded-md border bg-muted">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          {data.featureIcon} <p>| {data.featureName}</p>
        </div>

        <div className="flex gap-2">
          <Button size={'icon'} variant={'ghost'}>
            <Pencil />
          </Button>
          <Button size={'icon'} variant={'ghost'}>
            <Trash2 className="text-destructive" />
          </Button>
        </div>
      </div>

      <hr />

      <table>
        <tbody>
          <tr>
            <td>Module</td>
            <td className="bg-background rounded">
              <div className="flex gap-2 px-2">
                <CurlyBraces />
                <p>{data.module}</p>
              </div>
            </td>
          </tr>

          <tr>
            <td>Category</td>
            <td className="bg-background rounded">
              <div className="flex gap-2 px-2">
                <CurlyBraces />
                <p>{data.category}</p>
              </div>
            </td>
          </tr>

          <tr>
            <td>Type</td>
            <td className="bg-background rounded">
              <div className="flex gap-2 px-2">
                <Code2 />
                <p>{data.type}</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
