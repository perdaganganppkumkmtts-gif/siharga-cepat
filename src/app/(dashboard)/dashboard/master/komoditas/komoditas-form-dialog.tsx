"use client"


import {
  useState
} from "react"


import {
  useRouter
} from "next/navigation"


import {
  Plus,
  Pencil
} from "lucide-react"


import {
  Button
} from "@/components/ui/button"


import {
  Input
} from "@/components/ui/input"


import {
  Label
} from "@/components/ui/label"


import {
  Switch
} from "@/components/ui/switch"


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"


import {
  createKomoditas,
  updateKomoditas
} from "./actions"


import type {
  Komoditas
} from "@/types/komoditas"




interface Props {


  data?:Komoditas


  kategori:
  {
    id:string
    nama:string
  }[]


}




export function KomoditasFormDialog({

data,

kategori

}:Props){



const router =
useRouter()



const [open,setOpen]
=
useState(false)



const [loading,setLoading]
=
useState(false)



const [aktif,setAktif]
=
useState(
data?.aktif ?? true
)



const [publik,setPublik]
=
useState(
data?.is_publik ?? true
)





async function handleSubmit(
e:React.FormEvent<HTMLFormElement>
){


e.preventDefault()



setLoading(true)



const formData =
new FormData(
e.currentTarget
)




try{


if(data){


await updateKomoditas(
data.id,
formData
)


}
else{


await createKomoditas(
formData
)


}



setOpen(false)


router.refresh()



}
catch(error){


alert(
(error as Error).message
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


<Button
className="cursor-pointer"
>


{
data
?
<>
<Pencil className="mr-2 h-4 w-4"/>
Edit
</>
:
<>
<Plus className="mr-2 h-4 w-4"/>
Tambah Komoditas
</>
}


</Button>


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
data
?
"Edit Komoditas"
:
"Tambah Komoditas"
}

</DialogTitle>



<DialogDescription>

Kelola data barang kebutuhan pokok

</DialogDescription>


</DialogHeader>







<div className="space-y-4 py-4">





{/* KATEGORI */}

<div
className="space-y-2"
>


<Label>
Kategori
</Label>



<Select

name="kategori_id"

defaultValue={
data?.kategori_id
}

required

>


<SelectTrigger>


<SelectValue
placeholder="Pilih kategori"
/>


</SelectTrigger>


<SelectContent>


{
kategori.map((item)=>(


<SelectItem
key={item.id}
value={item.id}
>


{item.nama}


</SelectItem>


))

}


</SelectContent>



</Select>


</div>








{/* KODE */}

<div
className="space-y-2"
>


<Label>
Kode
</Label>


<Input

name="kode"

defaultValue={
data?.kode
}

placeholder="Contoh: BR001"

required

/>


</div>








{/* NAMA */}

<div
className="space-y-2"
>


<Label>
Nama Komoditas
</Label>


<Input

name="nama"

defaultValue={
data?.nama
}

placeholder="Contoh: Beras Premium"

required

/>


</div>








{/* SATUAN */}

<div
className="space-y-2"
>


<Label>
Satuan
</Label>


<Input

name="satuan"

defaultValue={
data?.satuan
}

placeholder="kg / liter / buah"

required

/>


</div>





{/* HET */}

<div
className="space-y-2"
>

<Label>
HET
</Label>


<Input

type="number"

name="het"

defaultValue={
  data?.het ?? ""
}

placeholder="Contoh: 15000"

/>


<p className="text-xs text-muted-foreground">
Harga Eceran Tertinggi (jika ada)
</p>


</div>









{/* HAP */}

<div
className="space-y-2"
>

<Label>
HAP
</Label>


<Input

type="number"

name="hap"

defaultValue={
  data?.hap ?? ""
}

placeholder="Contoh: 14000"

/>


<p className="text-xs text-muted-foreground">
Harga Acuan Pemerintah tunggal (jika ada)
</p>


</div>









{/* HAP RANGE */}

<div
className="
grid
grid-cols-2
gap-4
"
>


<div
className="space-y-2"
>


<Label>
HAP Bawah
</Label>


<Input

type="number"

name="hap_bawah"

defaultValue={
  data?.hap_bawah ?? ""
}

placeholder="Batas bawah"

/>


</div>







<div
className="space-y-2"
>


<Label>
HAP Atas
</Label>


<Input

type="number"

name="hap_atas"

defaultValue={
  data?.hap_atas ?? ""
}

placeholder="Batas atas"

/>


</div>




</div>

{/* URUTAN */}

<div
className="space-y-2"
>


<Label>
Urutan
</Label>


<Input

type="number"

name="urutan"

defaultValue={
data?.urutan ?? 1
}

/>


</div>









{/* STATUS */}


<div
className="flex items-center justify-between"
>


<div>

<Label>
Aktif
</Label>

<p className="text-sm text-muted-foreground">
Tampilkan sebagai data aktif
</p>

</div>


<Switch

checked={aktif}

onCheckedChange={
(value)=>{

setAktif(value)

}

}


/>


<input

type="hidden"

name="aktif"

value={
String(aktif)
}

/>


</div>









{/* PUBLIK */}


<div
className="flex items-center justify-between"
>


<div>

<Label>
Publik
</Label>

<p className="text-sm text-muted-foreground">
Tampilkan di halaman publik
</p>

</div>


<Switch

checked={publik}

onCheckedChange={
(value)=>{

setPublik(value)

}

}


/>


<input

type="hidden"

name="is_publik"

value={
String(publik)
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