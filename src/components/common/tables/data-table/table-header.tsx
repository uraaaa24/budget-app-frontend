import { flexRender, type HeaderGroup } from '@tanstack/react-table'
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
            return (
              <TableHead
                key={header.id}
                className="p-6 text-left font-semibold text-gray-600 bg-gray-50"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
  )
}

export default DataTableHeader
