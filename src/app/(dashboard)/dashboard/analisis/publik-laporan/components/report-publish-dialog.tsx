"use client"


import {
  useState
} from "react"


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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"








interface Props {


open:boolean


onOpenChange:(value:boolean)=>void



onSubmit:(data:{

judul:string

createdBy:string

cover:File

})=>void



loading?:
boolean


}









export function ReportPublishDialog({


open,


onOpenChange,


onSubmit,


loading=false



}:Props){








const [judul,setJudul]=
useState(
"Laporan Perkembangan Harga Barang Kebutuhan Pokok"
)







const [createdBy,setCreatedBy]=
useState("")

const [cover,setCover]=
useState<File | null>(null)


const [preview,setPreview]=
useState("")


const [error,setError]=
useState("")







function handleSubmit(){


setError("")


if(!judul.trim()){

setError(
"Judul laporan wajib diisi."
)

return

}



if(!createdBy.trim()){

setError(
"Dibuat Oleh wajib diisi."
)

return

}



if(!cover){

setError(
"Cover laporan wajib diunggah."
)

return

}



onSubmit({

judul:
judul.trim(),


createdBy:
createdBy.trim(),


cover

})


}









function handleClose(
value:boolean
){



if(!value){


setCreatedBy("")


}



onOpenChange(value)


}









return (


<Dialog


open={open}


onOpenChange={handleClose}



>


<DialogContent>





<DialogHeader>


<DialogTitle>

Publikasikan Laporan

</DialogTitle>


</DialogHeader>









<div className="space-y-4">






<div>


<Label>

Judul Laporan

</Label>



<Input


value={judul}


onChange={(e)=>

setJudul(e.target.value)

}


/>



</div>









<div>


<Label>

Dibuat Oleh

</Label>



<Input


placeholder="Nama penyusun laporan"


value={createdBy}


onChange={(e)=>

setCreatedBy(e.target.value)

}


/>



</div>
<div>

<Label>
Cover Laporan
</Label>


<Input

type="file"

accept="image/png,image/jpeg,image/jpg,image/webp"

onChange={(e)=>{


const file =
e.target.files?.[0]


if(!file) return



if(
file.size > 5 * 1024 * 1024
){

setError(
"Ukuran gambar maksimal 5 MB."
)

return

}



setCover(file)

setPreview(
URL.createObjectURL(file)
)


}}

/>


{
preview &&

<img

src={preview}

alt="Preview Cover"

className="
mt-3
h-48
w-full
rounded-lg
object-cover
border
"

/>

}


</div>








</div>








{
error &&

<div

className="
rounded-md
bg-destructive/10
p-3
text-sm
text-destructive
"

>

{error}

</div>

}
<DialogFooter>





<Button


variant="outline"


onClick={()=>handleClose(false)}


disabled={loading}


>


Batal


</Button>









<Button


onClick={handleSubmit}


disabled={

loading ||

!judul.trim() ||

!createdBy.trim() ||

!cover

}



>


{


loading

?

"Menyimpan..."

:

"Publikasikan"

}



</Button>







</DialogFooter>









</DialogContent>





</Dialog>


)

}