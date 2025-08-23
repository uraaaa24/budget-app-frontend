import { flexRender, type HeaderGroup } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'

type DataTableHeaderProps<TData> = {
  headerGroups: HeaderGroup<TData>[]
}

const DataTableHeader = <TData,>({
  headerGroups,
}: DataTableHeaderProps<TData>) => {
  return (
    <TableHeader>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            if (header.isPlaceholder) return <TableHead key={header.id} />

            const canSort = header.column.columnDef.enableSorting === true
            const sorted = header.column.getIsSorted() // 'asc' | 'desc' | false
            const headerDef = header.column.columnDef.header

            if (typeof headerDef === 'string' && canSort) {
              return (
                <TableHead
                  key={header.id}
                  aria-sort={
                    sorted
                      ? sorted === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                  }
                  className="bg-gray-50 py-2 font-semibold text-gray-600"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-gray-700 hover:text-gray-900 hover:bg-transparent cursor-pointer"
                    onClick={() => {
                      if (sorted === 'desc') {
                        header.column.clearSorting()
                      } else {
                        header.column.toggleSorting(sorted === 'asc')
                      }
                    }}
                  >
                    {headerDef}
                    {sorted === 'asc' ? (
                      <ArrowUp className="ml-2 h-4 w-4" />
                    ) : sorted === 'desc' ? (
                      <ArrowDown className="ml-2 h-4 w-4" />
                    ) : (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
              )
            }

            return (
              <TableHead
                key={header.id}
                className="p-6 text-left font-semibold text-gray-600 bg-gray-50"
              >
                {flexRender(headerDef, header.getContext())}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
  )
}

export default DataTableHeader
