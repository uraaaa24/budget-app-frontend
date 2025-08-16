'use client'

import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

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
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
