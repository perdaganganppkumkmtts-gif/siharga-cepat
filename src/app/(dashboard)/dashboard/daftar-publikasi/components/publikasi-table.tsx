"use client"

import * as React from "react"

import type { Publikasi } from "../types"
import { columns } from "../columns"
import { PublikasiToolbar } from "./publikasi-toolbar"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Button,
} from "@/components/ui/button"

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface Props {
  data: Publikasi[]
}

export function PublikasiTable({
  data,
}: Props) {

  const [sorting, setSorting] =
    React.useState<SortingState>([])

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([])

  const table = useReactTable({

    data,

    columns,

    state: {
      sorting,
      columnVisibility,
      columnFilters,
    },

    onSortingChange: setSorting,

    onColumnVisibilityChange:
      setColumnVisibility,

    onColumnFiltersChange:
      setColumnFilters,

    getCoreRowModel:
      getCoreRowModel(),

    getFilteredRowModel:
      getFilteredRowModel(),

    getSortedRowModel:
      getSortedRowModel(),

    getPaginationRowModel:
      getPaginationRowModel(),

  })

  return (

  <div className="space-y-4">

    <PublikasiToolbar
        table={table}
    />

    {/* Total Data */}

    <div className="text-sm text-muted-foreground">

      Total data: {table.getFilteredRowModel().rows.length}

    </div>

    <div className="rounded-md border">

  <Table>

    <TableHeader>

      {table.getHeaderGroups().map((headerGroup) => (

        <TableRow key={headerGroup.id}>

          {headerGroup.headers.map((header) => (

            <TableHead key={header.id}>

              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

            </TableHead>

          ))}

        </TableRow>

      ))}

    </TableHeader>

    <TableBody>

      {table.getRowModel().rows.length ? (

        table.getRowModel().rows.map((row) => (

          <TableRow key={row.id}>

            {row.getVisibleCells().map((cell) => (

              <TableCell key={cell.id}>

                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}

              </TableCell>

            ))}

          </TableRow>

        ))

      ) : (

        <TableRow>

          <TableCell
            colSpan={columns.length}
            className="h-24 text-center"
          >

            Tidak ada data.

          </TableCell>

        </TableRow>

      )}

    </TableBody>

  </Table>

</div>

<div className="flex items-center justify-between">

  <div className="text-sm text-muted-foreground">

    Halaman{" "}

    {table.getState().pagination.pageIndex + 1}

    {" "}dari{" "}

    {table.getPageCount()}

  </div>

  <div className="flex items-center gap-2">

    <Button
      variant="outline"
      size="sm"
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
    >

      <ChevronLeft className="h-4 w-4" />

    </Button>

    <Button
      variant="outline"
      size="sm"
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
    >

      <ChevronRight className="h-4 w-4" />

    </Button>

  </div>

</div>

  </div>

)

}