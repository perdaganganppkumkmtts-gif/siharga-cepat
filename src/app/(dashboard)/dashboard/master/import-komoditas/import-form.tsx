"use client"

import {
  useState
} from "react"


import {
  UploadCloud,
  Loader2
} from "lucide-react"



import {
  Card,
  CardContent
} from "@/components/ui/card"


import {
  Button
} from "@/components/ui/button"



import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"



import {
  parseExcelKomoditas,
  type ExcelKomoditas
} from "./excel-parser"



import {
  importKomoditas
} from "./actions"






export function ImportForm(){



const [data,setData] =
useState<ExcelKomoditas[]>([])



const [loading,setLoading] =
useState(false)



const [importing,setImporting] =
useState(false)



const [result,setResult] =
useState<{

inserted:number

updated:number

failed:number

} | null>(null)







async function handleFile(
e:React.ChangeEvent<HTMLInputElement>
){


const file =
e.target.files?.[0]



if(!file)
return



setLoading(true)

setResult(null)



try{


const result =
await parseExcelKomoditas(file)



// sanitasi data agar aman untuk server action

const cleanData =
result.map(
(item)=>({


kode:
String(item.kode),

nama:
String(item.nama),

satuan:
String(item.satuan),

kategori_kode:
String(item.kategori_kode),

urutan:
Number(item.urutan)


})
)



setData(
cleanData
)



}
catch(error){


alert(
"Gagal membaca Excel"
)


}
finally{


setLoading(false)


}



}







async function handleImport(){


if(
data.length===0
)
return




setImporting(true)



try{


const result =
await importKomoditas(
data
)



setResult({

inserted:
result.inserted,

updated:
result.updated,

failed:
result.failed

})



}
catch(error){


alert(

error instanceof Error
?
error.message
:
"Gagal import"

)


}
finally{


setImporting(false)


}



}








return (

<div className="space-y-6">





<Card>


<CardContent className="py-8">


<div className="
flex
flex-col
items-center
gap-4
">


<UploadCloud
className="
h-12
w-12
text-muted-foreground
"
/>



<input

type="file"

accept=".xlsx,.xls"

onChange={handleFile}

/>



{
loading &&

<p className="text-sm">

Membaca file Excel...

</p>

}



<p className="text-sm text-muted-foreground">

Format:
kode, nama, satuan, kategori_kode, urutan

</p>


</div>


</CardContent>


</Card>









{
data.length > 0 && (


<Card>


<CardContent className="p-0">



<div className="p-4">


<h2 className="font-semibold">

Preview Import Komoditas

</h2>


<p className="text-sm text-muted-foreground">

Jumlah data:
{" "}
{data.length}

</p>


</div>







<Table>


<TableHeader>


<TableRow>


<TableHead>
Kode
</TableHead>


<TableHead>
Nama
</TableHead>


<TableHead>
Satuan
</TableHead>


<TableHead>
Kategori
</TableHead>


<TableHead>
Urutan
</TableHead>


</TableRow>


</TableHeader>





<TableBody>


{
data.map(
(item,index)=>(


<TableRow
key={index}
>


<TableCell>

{item.kode}

</TableCell>



<TableCell>

{item.nama}

</TableCell>



<TableCell>

{item.satuan}

</TableCell>



<TableCell>

{item.kategori_kode}

</TableCell>



<TableCell>

{item.urutan}

</TableCell>



</TableRow>


)
)

}


</TableBody>


</Table>







<div className="
p-4
flex
justify-end
">


<Button

onClick={
handleImport
}

disabled={
importing
}


>


{
importing
?

<>

<Loader2
className="
mr-2
h-4
w-4
animate-spin
"
/>

Import...

</>


:

"Import Komoditas"


}



</Button>


</div>







</CardContent>


</Card>


)

}








{
result && (


<Card>


<CardContent className="py-6">


<h2 className="font-semibold mb-3">

Hasil Import

</h2>



<p>

Berhasil ditambahkan:
{" "}
<strong>
{result.inserted}
</strong>

</p>



<p>

Diperbarui:
{" "}
<strong>
{result.updated}
</strong>

</p>



<p>

Gagal:
{" "}
<strong>
{result.failed}
</strong>

</p>



</CardContent>


</Card>


)

}





</div>


)


}