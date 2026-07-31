"use client"

import type { ColumnDef } from "@tanstack/react-table"

import type { Publikasi } from "./types"

import Image from "next/image"

import {
  Badge,
} from "@/components/ui/badge"

import {
  Button,
} from "@/components/ui/button"

import {
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  deletePublikasi,
} from "./actions"


export const columns: ColumnDef<Publikasi>[] = [

  {
    accessorKey: "gambar",

    header: "Cover",

    enableSorting: false,

    cell: ({ row }) => (

      row.original.gambar ? (

        <Image
          src={row.original.gambar}
          alt={row.original.judul}
          width={60}
          height={60}
          className="rounded-md object-cover"
        />

      ) : (

        <div
          className="
            h-14
            w-14
            rounded-md
            bg-muted
          "
        />

      )

    ),

  },


  {
    accessorKey: "judul",

    header: ({ column }) => (

      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc"
          )
        }
      >

        Judul

        <ArrowUpDown
          className="ml-2 h-4 w-4"
        />

      </Button>

    ),


    cell: ({ row }) => (

      <div className="space-y-1">

        <div className="font-medium">

          {row.original.judul}

        </div>


        <div
          className="
            text-xs
            text-muted-foreground
          "
        >

          {row.original.slug}

        </div>

      </div>

    ),

  },


  {
    accessorKey: "jenis",

    header: "Jenis",

    cell: ({ row }) => (

      <Badge
        variant={
          row.original.jenis === "berita"
            ? "default"
            : "secondary"
        }
      >

        {row.original.jenis}

      </Badge>

    ),

  },


  {
    accessorKey: "status",

    header: "Status",

    cell: ({ row }) => (

      <Badge
        variant={
          row.original.status === "published"
            ? "default"
            : "outline"
        }
      >

        {row.original.status}

      </Badge>

    ),

  },


  {
    accessorKey: "published_at",

    header: "Dipublikasikan",

    cell: ({ row }) =>

      row.original.published_at
        ? new Date(
            row.original.published_at
          ).toLocaleDateString("id-ID")
        : "-",


  },


  {

    id: "actions",

    enableHiding: false,


    cell: ({ row }) => {


      const publikasi = row.original



      async function handleDelete(){


        const yakin =
          window.confirm(
            `Hapus "${publikasi.judul}"?`
          )


        if(!yakin){
          return
        }


        await deletePublikasi(
          publikasi.id
        )


        window.location.reload()


      }



      return (

        <DropdownMenu>


          <DropdownMenuTrigger asChild>

            <Button
              variant="ghost"
              size="icon"
            >

              <MoreHorizontal
                className="h-4 w-4"
              />

            </Button>

          </DropdownMenuTrigger>



          <DropdownMenuContent
            align="end"
          >


            <DropdownMenuItem>

              Lihat

            </DropdownMenuItem>



            <DropdownMenuItem>

              Edit

            </DropdownMenuItem>



            <DropdownMenuItem
              onClick={handleDelete}
              className="text-red-600"
            >

              Hapus

            </DropdownMenuItem>


          </DropdownMenuContent>


        </DropdownMenu>

      )

    },

  },

]