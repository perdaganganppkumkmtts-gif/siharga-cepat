"use client"

import Link from "next/link"

import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
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
  deleteSurvei
} from "@/app/(dashboard)/dashboard/transaksi/survei-harian/actions"


import {
  SURVEI_ROLE,
  SurveiRole
} from "@/lib/constants/survei-role"



import type {
  SurveiRow
} from "./types"




interface ActionCellProps {

  data:SurveiRow

  role:SurveiRole


  onApprove?:
  (
    id:string
  )=>void


  onReject?:
  (
    id:string
  )=>void

}





export function ActionCell({

data,

role,

onApprove,

onReject,

}:ActionCellProps){





async function handleDelete(){


const confirmDelete =
confirm(
`Hapus survei tanggal ${data.tanggal}?`
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





{/* DETAIL */}


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







{/* ======================
SURVEYOR
====================== */}


{

role === SURVEI_ROLE.SURVEYOR && (


<>


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



</>


)

}









{/* ======================
ANALIS
====================== */}



{

role === SURVEI_ROLE.ANALIS && (


<>


{

data.status === "diajukan" && (


<>


<DropdownMenuItem

onClick={()=>


onApprove?.(
data.id
)


}

>


<Check

className="mr-2 h-4 w-4"

/>


Setujui


</DropdownMenuItem>




<DropdownMenuItem

onClick={()=>


onReject?.(
data.id
)


}

className="
text-red-600
"

>


<X

className="mr-2 h-4 w-4"

/>


Tolak


</DropdownMenuItem>


</>


)

}



</>


)

}



</DropdownMenuContent>


</DropdownMenu>

)


}