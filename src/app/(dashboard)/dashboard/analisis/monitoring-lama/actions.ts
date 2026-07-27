"use server"

import { createClient } from "@/lib/supabase-server"





function getTanggalHariIni(){

  return new Date()
    .toISOString()
    .slice(0,10)

}




function getTanggalKemarin(){

  const tanggal = new Date()

  tanggal.setDate(
    tanggal.getDate() - 1
  )


  return tanggal
    .toISOString()
    .slice(0,10)

}








export async function getMonitoringHarga(

  tanggalSebelum?: string,

  tanggalSesudah?: string

){



const supabase =
await createClient()






// =============================
// Default tanggal
// =============================


const tanggalAwal =

tanggalSebelum
??

getTanggalKemarin()





const tanggalAkhir =

tanggalSesudah
??

getTanggalHariIni()







// =============================
// Ambil data survei
// =============================


const {

data: survei,

error: surveiError

}

=

await supabase

.from("survei_harian")

.select(
`
id,
tanggal
`
)

.in(

"tanggal",

[
 tanggalAwal,
 tanggalAkhir
]

)






if(surveiError){

throw new Error(
surveiError.message
)

}






if(
!survei ||
survei.length < 2
){

return []

}








const surveiSebelum =

survei.find(

(item)=>

item.tanggal === tanggalAwal

)







const surveiSesudah =

survei.find(

(item)=>

item.tanggal === tanggalAkhir

)








if(

!surveiSebelum ||
!surveiSesudah

){

return []

}









// =============================
// Ambil detail harga
// =============================


const {

data,

error

}

=

await supabase

.from("survei_detail")

.select(

`
harga,
survei_id,

komoditas(
kode,
nama,
satuan,
urutan
)

`

)

.in(

"survei_id",

[

surveiSebelum.id,

surveiSesudah.id

]

)







if(error){

throw new Error(
error.message
)

}








const dataSebelum =

data.filter(

(item)=>

item.survei_id === surveiSebelum.id

)







const dataSesudah =

data.filter(

(item)=>

item.survei_id === surveiSesudah.id

)








const hasil:any[] = []








dataSesudah.forEach(

(item)=>{



// validasi relasi komoditas

if(

!item.komoditas ||

item.komoditas.length === 0

){

return

}






const komoditas =

item.komoditas[0]








const hargaSebelum =

dataSebelum.find(

(x)=>

x.komoditas?.[0]?.kode ===

komoditas.kode

)









const hargaAwal =

hargaSebelum?.harga ?? 0







const selisih =

item.harga - hargaAwal









hasil.push({


kode:
komoditas.kode,


nama:
komoditas.nama,



satuan:
komoditas.satuan,



urutan:
komoditas.urutan,



harga_sebelum:
hargaAwal,



harga_sesudah:
item.harga,



selisih,



status:


selisih > 0

?

"Naik"

:

selisih < 0

?

"Turun"

:

"Stabil"



})



}

)








return hasil.sort(

(a,b)=>

a.urutan - b.urutan

)



}