"use client"

import {
 MoreHorizontal,
 Trash2
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
 DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"


import {
 deleteKomoditas
} from "./actions"


import {
 KomoditasFormDialog
} from "./komoditas-form-dialog"



import type {
 Komoditas
} from "@/types/komoditas"




export default function KomoditasActionCell({

data,

kategori

}:{

data:Komoditas

kategori:{
id:string
nama:string
}[]

}){


async function handleDelete(){


const confirmDelete =
confirm(
`Hapus ${data.nama}?`
)


if(!confirmDelete)
return


await deleteKomoditas(
data.id
)


}



return (

<DropdownMenu>


<DropdownMenuTrigger asChild>

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

<KomoditasFormDialog

data={data}

kategori={kategori}

/>

</DropdownMenuItem>




<DropdownMenuItem

className="text-red-600 cursor-pointer"

onClick={handleDelete}

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