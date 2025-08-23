import { flexRender, type Row } from '@tanstack/react-table'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'

type DataTableBodyProps<TData> = {
  rows: Row<TData>[]
  columns: { length: number }
}

const DataTableBody = <TData,>({
  rows,
  columns,
}: DataTableBodyProps<TData>) => {
  return (
    <TableBody>
      {rows?.length ? (
        rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="p-6">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}

export default DataTableBody
