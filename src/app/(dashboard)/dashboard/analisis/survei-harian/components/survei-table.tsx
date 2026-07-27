"use client"

import {
  columns,
  SurveiRow,
} from "../columns"


import {
  DataTable
} from "@/app/(dashboard)/dashboard/components/data-table"



interface SurveiTableProps {

  data: SurveiRow[]

}



export function SurveiTable({
  data,
}:SurveiTableProps){


  return (

    <DataTable

      columns={
        columns
      }

      data={
        data
      }

    />

  )

}