"use client"

import {
  Input
} from "@/components/ui/input"

import {
  Button
} from "@/components/ui/button"

import {
  useRouter,
  useSearchParams
} from "next/navigation"

import {
  Search,
  RotateCcw
} from "lucide-react"



function getTanggalKemarin(){

  const date = new Date()

  date.setDate(
    date.getDate() - 1
  )

  return date
    .toISOString()
    .slice(0,10)

}



function getTanggalHariIni(){

  return new Date()
    .toISOString()
    .slice(0,10)

}





export function MonitoringFilter(){


const router =
useRouter()


const params =
useSearchParams()





const tanggalSebelum =

params.get(
"tanggalSebelum"
)
??
getTanggalKemarin()





const tanggalSesudah =

params.get(
"tanggalSesudah"
)
??
getTanggalHariIni()







function handleSubmit(
formData:FormData
){


const sebelum =
formData.get(
"tanggalSebelum"
)


const sesudah =
formData.get(
"tanggalSesudah"
)





router.push(

`/dashboard/analisis/monitoring?tanggalSebelum=${sebelum}&tanggalSesudah=${sesudah}`

)


}








function reset(){


router.push(
"/dashboard/analisis/monitoring"
)


}






return (

<form

action={handleSubmit}

className="space-y-4"

>


<div>


<h2 className="text-sm font-semibold">

Filter Monitoring Harga

</h2>


<p className="text-sm text-muted-foreground">

Pilih dua periode untuk membandingkan perubahan harga.
Klik Cari untuk menampilkan hasil analisis.

</p>


</div>







<div className="grid gap-4 md:grid-cols-4">





<div className="space-y-2">


<label className="text-sm">

Tanggal Pantauan Sebelum

</label>


<Input

type="date"

name="tanggalSebelum"

defaultValue={
tanggalSebelum
}

/>


</div>







<div className="space-y-2">


<label className="text-sm">

Tanggal Pantauan Sesudah

</label>


<Input

type="date"

name="tanggalSesudah"

defaultValue={
tanggalSesudah
}

/>


</div>







<div className="flex items-end gap-2">


<Button

type="submit"

>

<Search className="mr-2 h-4 w-4"/>

Cari

</Button>





<Button

type="button"

variant="outline"

onClick={reset}

>


<RotateCcw className="mr-2 h-4 w-4"/>

Reset


</Button>



</div>




</div>





</form>

)

}