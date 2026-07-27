import {
  ColumnDef
} from "@tanstack/react-table"


import {
  Badge
} from "@/components/ui/badge"


import type {
  Komoditas
} from "@/types/komoditas"


import KomoditasActionCell
from "./komoditas-action-cell"





function formatRupiah(
  value:number | null | undefined
){

  if(
    value === null
    ||
    value === undefined
  ){

    return "-"

  }


  return new Intl.NumberFormat(
    "id-ID"
  )
  .format(value)

}







export function columns(

kategori:{
  id:string
  nama:string
}[]

):ColumnDef<Komoditas>[] {


return [



{
accessorKey:"kode",
header:"Kode"
},





{
accessorKey:"nama",
header:"Nama"
},





{
header:"Kategori",

cell:({row})=>(

  row.original.kategori_komoditas?.nama ?? "-"

)

},





{
accessorKey:"satuan",
header:"Satuan"
},







// =======================
// HET
// =======================


{
header:"HET",

cell:({row})=>(


row.original.het

?

`Rp ${formatRupiah(
  row.original.het
)}`

:

"-"


)

},







// =======================
// HAP
// =======================


{
header:"HAP",

cell:({row})=>{


const data =
row.original



if(
  data.hap_bawah
  &&
  data.hap_atas
){

return (

<>
Rp {formatRupiah(
  data.hap_bawah
)}

{" - "}

Rp {formatRupiah(
  data.hap_atas
)}

</>

)

}





if(data.hap){

return (

<>
Rp {formatRupiah(
  data.hap
)}

</>

)

}





return "-"



}

},







{
header:"Status",

cell:({row})=>(

<Badge>

{
row.original.aktif
?
"Aktif"
:
"Tidak Aktif"
}

</Badge>

)

},







{
header:"Publik",

cell:({row})=>(

<Badge variant="secondary">

{
row.original.is_publik
?
"Ya"
:
"Tidak"
}

</Badge>

)

},









{
id:"actions",

cell:({row})=>(


<KomoditasActionCell

data={row.original}

kategori={kategori}

/>


)

}



]


}