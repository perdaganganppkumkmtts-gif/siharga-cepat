"use client"

import Link from "next/link"

import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"


import {
  Button
} from "@/components/ui/button"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import {
  deleteSurvei
} from "../actions"


import type {
  SurveiRow
} from "../columns"



interface ActionCellProps {

  data: SurveiRow

}



export function ActionCell({
  data,
}:ActionCellProps){



  async function handleDelete(){

    const confirmDelete =
      confirm(
        `Apakah Anda yakin ingin menghapus survei tanggal ${data.tanggal}?`
      )


    if(!confirmDelete)
      return



    try{


      await deleteSurvei(
        data.id
      )



      alert(
        "Survei berhasil dihapus"
      )



      window.location.reload()



    }
    catch(error){


      console.error(error)



      alert(
        "Gagal menghapus survei"
      )


    }


  }





  return (

    <DropdownMenu>


      <DropdownMenuTrigger asChild>


        <Button

          variant="ghost"

          size="icon"

          className="h-8 w-8"

        >

          <MoreHorizontal
            className="h-4 w-4"
          />

        </Button>


      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
      >

        <DropdownMenuLabel>
          Aksi
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Detail */}

        <DropdownMenuItem asChild>


          <Link
            href={
              `/dashboard/transaksi/survei-harian/${data.id}`
            }
          >

            <Eye
              className="mr-2 h-4 w-4"
            />

            Detail


          </Link>


        </DropdownMenuItem>

        {/* Edit Draft */}

        {
          data.status === "draft" && (


            <DropdownMenuItem asChild>


              <Link
                href={
                  `/dashboard/transaksi/survei-harian/${data.id}/edit`
                }
              >

                <Edit
                  className="mr-2 h-4 w-4"
                />

                Edit


              </Link>


            </DropdownMenuItem>


          )
        }

        {/* Delete */}

        <DropdownMenuItem

          onClick={
            handleDelete
          }

          className="
          cursor-pointer
          text-red-600
          "

        >

          <Trash2
            className="mr-2 h-4 w-4"
          />

          Hapus


        </DropdownMenuItem>

      </DropdownMenuContent>


    </DropdownMenu>

  )

}