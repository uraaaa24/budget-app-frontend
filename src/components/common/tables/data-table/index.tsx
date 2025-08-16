'use client'

import {
  type ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { Table, TableFooter } from '@/components/ui/table'
import DataTableBody from './table-body'
import DataTableHeader from './table-header'

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const DataTable = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        {/* Header */}
        <DataTableHeader headerGroups={table.getHeaderGroups()} />

        {/* Body */}
        <DataTableBody rows={table.getRowModel().rows} columns={columns} />

        {/* Footer */}
        <TableFooter />
      </Table>
    </div>
  )
}

export default DataTable
