"use client"

import {
  useState
} from "react"


import {
  Plus,
  Pencil
} from "lucide-react"


import {
  Button
} from "@/components/ui/button"


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import {
  Input
} from "@/components/ui/input"


import {
  Label
} from "@/components/ui/label"


import {
  Textarea
} from "@/components/ui/textarea"


import {
  toast
} from "sonner"



import {
  createKategori,
  updateKategori
}
from "../kategori-komoditas/actions"



import type {
  KategoriKomoditas
}
from "@/types/kategori"

import {
  ReactNode
} from "react"



interface Props {

  mode?:
  "create"
  |
  "edit"


  data?:
  KategoriKomoditas


  trigger?:
  ReactNode

}






export function KategoriFormDialog({

  mode="create",

  data,

  trigger,

}:Props){



const [open,setOpen]
=
useState(false)



const [loading,setLoading]
=
useState(false)





async function handleSubmit(
e:React.FormEvent<HTMLFormElement>
){


e.preventDefault()



setLoading(true)



try{


const formData =
new FormData(e.currentTarget)



if(mode==="create"){


await createKategori(
formData
)



toast.success(
"Kategori berhasil ditambahkan"
)


}
else{


if(!data?.id)
throw new Error(
"ID kategori tidak ditemukan"
)



await updateKategori(
data.id,
formData
)



toast.success(
"Kategori berhasil diperbarui"
)


}



setOpen(false)



}
catch(error:any){


toast.error(
error.message
||
"Terjadi kesalahan"
)


}
finally{


setLoading(false)


}



}





return (


<Dialog
open={open}
onOpenChange={setOpen}
>


<DialogTrigger asChild>


{

trigger
?

trigger


:

mode==="create"
?

<Button
className="cursor-pointer"
>

<Plus
className="mr-2 h-4 w-4"
/>

Tambah Kategori

</Button>


:

<Button
variant="ghost"
size="icon"
>

<Pencil
className="h-4 w-4"
/>

</Button>


}


</DialogTrigger>






<DialogContent
className="sm:max-w-[500px]"
>


<form
onSubmit={handleSubmit}
>


<DialogHeader>


<DialogTitle>

{
mode==="create"
?
"Tambah Kategori Komoditas"
:
"Edit Kategori Komoditas"
}


</DialogTitle>



<DialogDescription>

Kelola kategori barang kebutuhan pokok

</DialogDescription>


</DialogHeader>






<div className="space-y-4 py-4">





<div
className="space-y-2"
>


<Label
htmlFor="kode"
>

Kode

</Label>


<Input

id="kode"

name="kode"

placeholder="Contoh: BERAS"

defaultValue={
data?.kode
||
""
}

required

/>


</div>









<div
className="space-y-2"
>


<Label
htmlFor="nama"
>

Nama Kategori

</Label>


<Input

id="nama"

name="nama"

placeholder="Contoh: Beras"

defaultValue={
data?.nama
||
""
}

required

/>


</div>









<div
className="space-y-2"
>


<Label
htmlFor="deskripsi"
>

Deskripsi

</Label>


<Textarea

id="deskripsi"

name="deskripsi"

placeholder="Keterangan kategori"

defaultValue={
data?.deskripsi
||
""
}


/>


</div>







</div>








<DialogFooter>


<Button

type="submit"

disabled={loading}

>


{
loading
?
"Menyimpan..."
:
"Simpan"
}


</Button>


</DialogFooter>



</form>



</DialogContent>




</Dialog>


)

}