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
  parseExcelKategori,
  type ExcelKategori
} from "./excel-parser"



import {
  importKategoriKomoditas
} from "./actions"



export function ImportForm(){


const [data,setData] =
useState<ExcelKategori[]>([])



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
await parseExcelKategori(file)



const cleanData =
result.map((item)=>({

kode:
String(item.kode ?? ""),

nama:
String(item.nama ?? ""),

deskripsi:
String(item.deskripsi ?? ""),

urutan:
Number(item.urutan ?? 0),

}))



setData(cleanData)



}
finally{


setLoading(false)


}


}







async function handleImport(){


if(data.length===0)
return



setImporting(true)



try{


const result =
await importKategoriKomoditas(
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
className="h-12 w-12 text-muted-foreground"
/>



<input

type="file"

accept=".xlsx,.xls"

onChange={handleFile}

/>




{
loading && (

<p className="text-sm">

Membaca file...

</p>

)

}



<p className="text-sm text-muted-foreground">

Upload Excel kategori komoditas

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

Preview Import Kategori

</h2>


<p className="text-sm text-muted-foreground">

Jumlah data :
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
Deskripsi
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

{item.deskripsi}

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

onClick={handleImport}

disabled={importing}

>


{
importing
?
(
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
)

:

"Import Kategori"


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


<div className="space-y-1 text-sm">


<p>

Berhasil ditambahkan :
{" "}
<strong>
{result.inserted}
</strong>

</p>



<p>

Diperbarui :
{" "}
<strong>
{result.updated}
</strong>

</p>



<p>

Gagal :
{" "}
<strong>
{result.failed}
</strong>

</p>



</div>


</CardContent>


</Card>



)

}







</div>

)


}