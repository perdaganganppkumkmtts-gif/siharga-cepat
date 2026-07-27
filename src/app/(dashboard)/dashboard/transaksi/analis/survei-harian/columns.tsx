"use client"

import {
  ColumnDef,
} from "@tanstack/react-table"


import {
  ActionCell,
} from "./components/action-cell"


import {
  StatusBadge,
} from "@/components/survei/status-badge"



export interface SurveiRow {

  id:string

  tanggal:string

  status:string

  catatan?:string | null

  created_at:string

  updated_at?:string | null


  survei_detail: {

    id:string

    harga:number

    keterangan?:string | null


    komoditas: {

      id:string

      kode:string

      nama:string

      satuan:string

    }[]

  }[]

}







export const columns:
ColumnDef<SurveiRow>[] = [



  {
    accessorKey:"tanggal",

    header:"Tanggal",

    cell:({
      row
    })=>{


      return new Date(
        row.original.tanggal
      )
      .toLocaleDateString(
        "id-ID",
        {
          day:"2-digit",
          month:"long",
          year:"numeric",
        }
      )


    }

  },






  {

    id:"jumlah",

    header:"Jumlah Komoditas",

    cell:({
      row
    })=>{


      return (

        <span>

          {
            row.original
              .survei_detail
              .length
          }

          {" "}
          Komoditas

        </span>

      )


    }

  },








  {

    accessorKey:"status",

    header:"Status",

    cell:({
      row
    })=>{


      return (

        <StatusBadge

          status={
            row.original.status
          }

        />

      )


    }

  },








  {

    accessorKey:"created_at",

    header:"Dibuat",

    cell:({
      row
    })=>{


      return new Date(
        row.original.created_at
      )
      .toLocaleDateString(
        "id-ID"
      )


    }

  },







  {

    id:"actions",

    header:"",

    cell:({
      row
    })=>{


      return (

        <ActionCell

          data={
            row.original
          }

        />

      )


    }

  }





]