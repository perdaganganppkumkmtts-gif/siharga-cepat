"use client"

import Link from "next/link"

import {
  MoreHorizontal,
  Eye,
  Check,
  X,
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
  approveSurvei,
  rejectSurvei,
} from "../actions"


import type {
  SurveiRow
} from "@/components/survei/types"



interface ActionCellProps {

  data: SurveiRow

}




export function ActionCell({

  data,

}:ActionCellProps){



  async function handleApprove(){


    const confirmApprove =
      confirm(
        "Setujui survei ini?"
      )


    if(!confirmApprove)
      return



    try{


      await approveSurvei(
        data.id
      )


      alert(
        "Survei berhasil disetujui"
      )


      window.location.reload()


    }
    catch(error){

      console.error(error)

      alert(
        "Gagal menyetujui survei"
      )

    }


  }






  async function handleReject(){


    const confirmReject =
      confirm(
        "Tolak survei ini?"
      )


    if(!confirmReject)
      return



    try{


      await rejectSurvei(
        data.id
      )


      alert(
        "Survei berhasil ditolak"
      )


      window.location.reload()


    }
    catch(error){

      console.error(error)

      alert(
        "Gagal menolak survei"
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





        {/* DETAIL */}

        <DropdownMenuItem asChild>


          <Link

            href={
              `/dashboard/transaksi/analis/survei-harian/${data.id}`
            }

          >

            <Eye
              className="
              mr-2
              h-4
              w-4
              "
            />

            Detail


          </Link>


        </DropdownMenuItem>







        {/* APPROVE */}


        {
          data.status === "diajukan" && (


            <DropdownMenuItem

              onClick={
                handleApprove
              }

            >

              <Check
                className="
                mr-2
                h-4
                w-4
                text-green-600
                "
              />


              Setujui


            </DropdownMenuItem>


          )
        }








        {/* REJECT */}


        {
          data.status === "diajukan" && (


            <DropdownMenuItem

              onClick={
                handleReject
              }

              className="
              text-red-600
              "

            >

              <X
                className="
                mr-2
                h-4
                w-4
                "
              />


              Tolak


            </DropdownMenuItem>


          )
        }





      </DropdownMenuContent>


    </DropdownMenu>


  )

}