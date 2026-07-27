"use client"


import {
  ColumnDef,
} from "@tanstack/react-table"


import {
  StatusBadge
} from "@/components/survei/status-badge"


import {
  ActionCell
} from "@/components/survei/action-cell"


import {
  SurveiRow
} from "./types"


import {
  SurveiRole
} from "@/lib/constants/survei-role"





interface CreateColumnsProps {

  role: SurveiRole


  onApprove?:
  (
    id:string
  )=>void


  onReject?:
  (
    id:string
  )=>void

}







export function createSurveiColumns({

  role,

  onApprove,

  onReject,

}:CreateColumnsProps):

ColumnDef<SurveiRow>[] {



return [



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

year:"numeric"

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
})=>(


<StatusBadge

status={
row.original.status
}

/>


)


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
})=>(


<ActionCell


data={
row.original
}



role={
role
}



onApprove={
onApprove
}



onReject={
onReject
}



/>


)


}



]


}