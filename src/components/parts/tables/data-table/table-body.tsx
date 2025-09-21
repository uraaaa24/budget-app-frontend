import { flexRender, type Row } from '@tanstack/react-table'
import { AlertCircle, Database } from 'lucide-react'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'

type DataTableBodyProps<TData> = {
  rows: Row<TData>[]
  columns: { length: number }
  isLoading: boolean
  error: Error | undefined
}

const DataTableBody = <TData,>({
  rows,
  columns,
  isLoading,
  error,
}: DataTableBodyProps<TData>) => {
  const columnCount = columns.length + 1

  if (isLoading) {
    return (
      <TableBody>
        {Array.from({ length: 10 }, () => {
          const rowId = crypto.randomUUID()
          return (
            <TableRow key={rowId}>
              {Array.from({ length: columnCount }, () => {
                const cellId = crypto.randomUUID()
                return (
                  <TableCell key={cellId} className="p-4">
                    <div className="h-9 bg-muted animate-pulse rounded-md" />
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    )
  }

  if (error) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={columnCount} className="h-32">
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="flex items-center space-x-2 text-destructive">
                <AlertCircle className="h-6 w-6" />
                <span className="text-lg font-medium">Failed to load data</span>
              </div>
              <div className="text-sm text-muted-foreground text-center max-w-md">
                {error.message}
              </div>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  return (
    <TableBody>
      {rows?.length ? (
        rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
            className="transition-colors hover:bg-muted/50"
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="p-6">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columnCount} className="h-32">
            <div className="flex flex-col items-center justify-center space-y-3">
              <Database className="h-12 w-12 text-muted-foreground/50" />
              <div className="text-lg font-medium text-muted-foreground">
                No data found
              </div>
              <div className="text-sm text-muted-foreground">
                Try adjusting your search or filter to find what you&apos;re
                looking
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}

export default DataTableBody
