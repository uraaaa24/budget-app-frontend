'use client'

import {
  type ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Table } from '@/components/ui/table'
import DataTableBody from './table-body'
import DataTableHeader from './table-header'

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  error?: Error
}

const DataTable = <TData, TValue>({
  columns,
  data,
  isLoading = false,
  error = undefined,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const columnsWithSelection = useMemo<ColumnDef<TData, TValue>[]>(() => {
    const selectionCol: ColumnDef<TData, TValue> = {
      id: '__select__',
      size: 36,
      enableSorting: false,
      enableHiding: false,
      header: ({ table }) => {
        const all = table.getIsAllPageRowsSelected()
        const some = table.getIsSomePageRowsSelected()
        return (
          <div className="flex items-center justify-center px-2">
            <Checkbox
              aria-label="Select all"
              checked={all ? true : some ? 'indeterminate' : false}
              onCheckedChange={() => table.toggleAllPageRowsSelected(!all)}
              className="cursor-pointer"
            />
          </div>
        )
      },
      cell: ({ row }) => (
        <div className="flex items-center justify-center px-2">
          <Checkbox
            aria-label="Select row"
            checked={row.getIsSelected()}
            onCheckedChange={(checked: boolean | 'indeterminate') =>
              row.toggleSelected(checked === true)
            }
            className="cursor-pointer"
          />
        </div>
      ),
    }
    return [selectionCol, ...columns]
  }, [columns])

  const table = useReactTable({
    data,
    columns: columnsWithSelection,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  })

  return (
    <div className="overflow-hidden rounded-md border-2 border-gray-200 bg-white">
      <Table>
        {/* Header */}
        <DataTableHeader headerGroups={table.getHeaderGroups()} />

        {/* Body */}
        <DataTableBody
          rows={table.getRowModel().rows}
          columns={columns}
          isLoading={isLoading}
          error={error}
        />

        {/* Footer */}
        {/* <TableFooter /> */}
      </Table>
    </div>
  )
}

export default DataTable
