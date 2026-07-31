"use client"

import { Table } from "@tanstack/react-table"

import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props<TData> {
  table: Table<TData>
}

export function PublikasiToolbar<TData>({
  table,
}: Props<TData>) {
  return (
    <div className="flex items-center justify-between gap-4">

      <div className="flex flex-1 flex-wrap items-center gap-3">

        <div className="relative w-[320px]">

          <Search
            className="
              absolute
              left-3
              top-1/2
              h-4
              w-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            placeholder="Cari judul publikasi..."
            value={
              (table
                .getColumn("judul")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn("judul")
                ?.setFilterValue(
                  event.target.value
                )
            }
            className="pl-9"
          />

        </div>
        <Select
            value={
                (table
                .getColumn("jenis")
                ?.getFilterValue() as string) ?? "all"
            }
            onValueChange={(value) =>
                table
                .getColumn("jenis")
                ?.setFilterValue(
                    value === "all"
                    ? undefined
                    : value
                )
            }
            >

            <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Semua Jenis" />
            </SelectTrigger>

            <SelectContent>

                <SelectItem value="all">
                Semua Jenis
                </SelectItem>

                <SelectItem value="berita">
                Berita
                </SelectItem>

                <SelectItem value="laporan">
                Laporan
                </SelectItem>

            </SelectContent>

        </Select>
        <Select
            value={
                (table
                .getColumn("status")
                ?.getFilterValue() as string) ?? "all"
            }
            onValueChange={(value) =>
                table
                .getColumn("status")
                ?.setFilterValue(
                    value === "all"
                    ? undefined
                    : value
                )
            }
            >

            <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Semua Status" />
            </SelectTrigger>

            <SelectContent>

                <SelectItem value="all">
                Semua Status
                </SelectItem>

                <SelectItem value="published">
                Published
                </SelectItem>

                <SelectItem value="draft">
                Draft
                </SelectItem>

            </SelectContent>

        </Select>
        <Button
            variant="ghost"
            onClick={() => {

                table
                .getColumn("judul")
                ?.setFilterValue("")

                table
                .getColumn("jenis")
                ?.setFilterValue(undefined)

                table
                .getColumn("status")
                ?.setFilterValue(undefined)

            }}
            >

            Reset

        </Button>

      </div>

    </div>
  )
}