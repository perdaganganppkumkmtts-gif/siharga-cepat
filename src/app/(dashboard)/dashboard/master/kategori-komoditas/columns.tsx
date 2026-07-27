"use client"


import { ColumnDef } from "@tanstack/react-table"

import {
  MoreHorizontal,
  Pencil,
  Power,
  Trash2,
} from "lucide-react"


import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import {
  Badge
} from "@/components/ui/badge"


import {
  toast
} from "sonner"



import type {
  KategoriKomoditas
}
from "@/types/kategori"



import {
  deleteKategori,
  toggleKategori,
}
from "./actions"

import {
 KategoriFormDialog
}
from "../components/kategori-form-dialog"



export const columns:
ColumnDef<KategoriKomoditas>[] = [



{
  accessorKey:"kode",
  header:"Kode",
},




{
  accessorKey:"nama",
  header:"Nama Kategori",
},




{
  accessorKey:"deskripsi",
  header:"Deskripsi",
  cell:({row})=>{

    return (
      <span>
        {
          row.original.deskripsi
          ||
          "-"
        }
      </span>
    )

  }
},




{
  accessorKey:"aktif",
  header:"Status",

  cell:({row})=>{

    const aktif =
    row.original.aktif


    return (

      <Badge
        variant={
          aktif
          ?
          "default"
          :
          "secondary"
        }
      >

        {
          aktif
          ?
          "Aktif"
          :
          "Tidak Aktif"
        }

      </Badge>

    )

  }

},




{
  accessorKey:"created_at",

  header:"Dibuat",

  cell:({row})=>{


    return (

      new Date(
        row.original.created_at
      )
      .toLocaleDateString(
        "id-ID"
      )

    )

  }

},






{
id:"actions",

cell:({row})=>{


const kategori =
row.original




async function handleToggle(){


try{


await toggleKategori(
kategori.id,
!kategori.aktif
)



toast.success(
kategori.aktif
?
"Kategori dinonaktifkan"
:
"Kategori diaktifkan"
)



}
catch(error){


toast.error(
"Terjadi kesalahan"
)


}



}





async function handleDelete(){


const confirmDelete =
confirm(
`Hapus kategori ${kategori.nama}?`
)



if(!confirmDelete)
return



try{


await deleteKategori(
kategori.id
)



toast.success(
"Kategori berhasil dihapus"
)


}
catch(error){


toast.error(
"Gagal menghapus kategori"
)


}



}





return (


<DropdownMenu>


<DropdownMenuTrigger
asChild
>


<Button

variant="ghost"

className="h-8 w-8 p-0"

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





<DropdownMenuItem
asChild
>

<KategoriFormDialog

mode="edit"

data={kategori}

trigger={

<div
className="
flex
items-center
w-full
cursor-pointer
"
>

<Pencil
className="mr-2 h-4 w-4"
/>

Edit

</div>

}

/>

</DropdownMenuItem>







<DropdownMenuItem
className="cursor-pointer"
onClick={handleToggle}
>


<Power
className="mr-2 h-4 w-4"
/>


{
kategori.aktif
?
"Nonaktifkan"
:
"Aktifkan"
}


</DropdownMenuItem>







<DropdownMenuSeparator />






<DropdownMenuItem

className="
cursor-pointer
text-red-600
"

onClick={
handleDelete
}

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


}



]