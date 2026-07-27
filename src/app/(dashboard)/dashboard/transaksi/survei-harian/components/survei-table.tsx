"use client"


import {
  DataTable
} from "@/app/(dashboard)/dashboard/components/data-table"



import {
  ColumnDef
} from "@tanstack/react-table"




interface SurveiTableProps<TData,TValue>{


  columns:
  ColumnDef<TData,TValue>[]


  data:TData[]


}






export function SurveiTable<TData,TValue>({

columns,

data,

}:SurveiTableProps<TData,TValue>){



return (

<DataTable


columns={columns}


data={data}


/>

)


}