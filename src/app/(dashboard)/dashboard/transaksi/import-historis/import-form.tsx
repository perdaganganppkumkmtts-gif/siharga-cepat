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
  parseExcelHistoris,
  type HistorisTanggal
} from "./excel-parser"



import {
  importHistoris
} from "./actions"

import {
 validateHistoris
} from "./actions"





export function ImportForm(){



const [data,setData] =
useState<HistorisTanggal[]>([])



const [loading,setLoading] =
useState(false)



const [importing,setImporting] =
useState(false)



const [result,setResult] =
useState<any>(null)

const [validation,setValidation] =
useState<any>(null)






async function handleFile(
e:React.ChangeEvent<HTMLInputElement>
){


const file =
e.target.files?.[0]



if(!file)
return




try{


setLoading(true)

setResult(null)



const result =
await parseExcelHistoris(
file
)



setData(
 result
)


const check =
await validateHistoris(
 result
)


setValidation(
 check
)



}
catch(error){


alert(
error instanceof Error
?
error.message
:
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



try{


setImporting(true)



const result =
await importHistoris(
data
)



setResult(
result
)



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







const totalData =
data.reduce(
(total,item)=>
total + item.items.length,
0
)






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

<div className="flex items-center gap-2">

<Loader2
className="animate-spin h-4 w-4"
/>

Membaca Excel...

</div>

}



<p className="text-sm text-muted-foreground">

Format:
kode | tanggal | tanggal | ...

</p>



</div>


</CardContent>


</Card>









{
data.length > 0 && (


<Card>


<CardContent className="space-y-5">



<div>


<h2 className="font-semibold">

Preview Import Harga Historis

</h2>


<div className="text-sm text-muted-foreground">


Jumlah tanggal:
{" "}
<strong>
{data.length}
</strong>


<br/>


Total data harga:
{" "}
<strong>
{totalData}
</strong>


</div>


</div>









<Table>


<TableHeader>

<TableRow>


<TableHead>
Tanggal
</TableHead>


<TableHead>
Jumlah Komoditas
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

{
new Date(
item.tanggal
)
.toLocaleDateString(
"id-ID"
)

}

</TableCell>



<TableCell>

{
item.items.length
}

komoditas


</TableCell>


</TableRow>


)

)

}


</TableBody>


</Table>







<div className="flex justify-end">

{
validation && (

<Card>

<CardContent className="space-y-2">


<h3 className="font-semibold">

Validasi Data

</h3>



<p>

Total data:

{" "}

<strong>
{validation.totalData}
</strong>

</p>



<p className="text-green-600">

Valid:

{" "}

<strong>
{validation.valid}
</strong>

</p>




<p className="text-red-600">

Tidak ditemukan:

{" "}

<strong>
{validation.gagal}
</strong>

</p>




{
validation.kodeTidakDitemukan.length > 0 && (

<div>


<p className="font-medium">

Kode bermasalah:

</p>


<ul className="list-disc ml-5">


{
validation.kodeTidakDitemukan.map(
(kode:string)=>(

<li key={kode}>
{kode}
</li>

)

)

}


</ul>


</div>

)

}



</CardContent>

</Card>

)
}

<Button

onClick={
handleImport
}

disabled={
 importing ||
 validation?.gagal > 0
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

"Import Historis"

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


<CardContent className="py-5 space-y-3">


<h3 className="font-semibold">

Hasil Import

</h3>




<p>

Survei dibuat:

{" "}

<strong>

{result.survei}

</strong>

</p>





<p>

Detail harga masuk:

{" "}

<strong>

{result.detail}

</strong>

</p>





<p>

Data gagal:

{" "}

<strong>

{result.failed}

</strong>

</p>







{
result.kodeTidakDitemukan.length > 0 && (


<div className="
rounded-md
border
p-3
bg-destructive/10
">


<p className="font-semibold">

Kode tidak ditemukan:

</p>




<ul className="list-disc ml-5">


{
result.kodeTidakDitemukan.map(
(kode:string)=>(

<li key={kode}>

{kode}

</li>

)

)

}


</ul>


</div>


)

}



</CardContent>


</Card>


)

}





</div>


)


}