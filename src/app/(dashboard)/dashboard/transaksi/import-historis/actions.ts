"use server"

import {
  createClient
} from "@/lib/supabase-server"


import {
  revalidatePath
} from "next/cache"



import type {
  HistorisTanggal
} from "./excel-parser"


// =====================================
// VALIDASI EXCEL HISTORIS
// =====================================

export async function validateHistoris(
data:HistorisTanggal[]
){


const supabase =
await createClient()



const {
data:komoditas
}
=
await supabase
.from("komoditas")
.select(`
kode,
nama
`)
.eq(
"aktif",
true
)





const kodeDatabase =
new Set(
komoditas?.map(
(item)=>
item.kode
)
)





let totalData = 0

let valid = 0

let gagal = 0


const kodeTidakDitemukan:string[]=[]





for(
const tanggal of data
){


for(
const item of tanggal.items
){


totalData++



if(
kodeDatabase.has(
item.kode
)
){


valid++


}
else{


gagal++


if(
!kodeTidakDitemukan.includes(
item.kode
)
){

kodeTidakDitemukan.push(
item.kode
)

}


}



}


}






return {


tanggal:
data.length,


totalData,


valid,


gagal,


kodeTidakDitemukan


}



}



export async function importHistoris(
data:HistorisTanggal[]
){


const supabase =
await createClient()






const {
data:{
user
}
}
=
await supabase.auth.getUser()



if(!user){

throw new Error(
"User belum login"
)

}







let jumlahSurvei = 0

let jumlahDetail = 0

let gagal = 0

let kodeTidakDitemukan:string[] = []







for(
const tanggalData of data
){



try{





// ===========================
// cek survei tanggal
// ===========================


let {
data:survei
}
=
await supabase
.from(
"survei_harian"
)
.select(
"id"
)
.eq(
"tanggal",
tanggalData.tanggal
)
.maybeSingle()







// ===========================
// buat survei jika belum ada
// ===========================


if(!survei){



const {
data:newSurvei,
error
}
=
await supabase
.from(
"survei_harian"
)
.insert({

tanggal:
tanggalData.tanggal,

status:
"draft",

created_by:
user.id

})
.select(
"id"
)
.single()



if(error){

throw error

}



survei =
newSurvei



jumlahSurvei++



}







// ===========================
// proses detail
// ===========================


const detailInsert:any[] = []





for(
const item of tanggalData.items
){





// cari komoditas

const {
data:komoditas,
error
}
=
await supabase
.from(
"komoditas"
)
.select(
"id"
)
.eq(
"kode",
item.kode
)
.maybeSingle()






if(error || !komoditas){


console.error(
"Kode tidak ditemukan",
item.kode
)



gagal++



if(
!kodeTidakDitemukan.includes(
item.kode
)
){

kodeTidakDitemukan.push(
item.kode
)

}



continue


}








detailInsert.push({


survei_id:
survei.id,


komoditas_id:
komoditas.id,


harga:
item.harga,


keterangan:
"Import historis"


})





}








if(
detailInsert.length > 0
){



const {
error
}
=
await supabase
.from(
"survei_detail"
)
.upsert(
detailInsert,
{

onConflict:
"survei_id,komoditas_id"

}

)



if(error){

throw error

}




jumlahDetail +=
detailInsert.length




}





}
catch(error){


console.error(
"Import gagal tanggal",
tanggalData.tanggal,
error
)


}






}








revalidatePath(

"/dashboard/transaksi/survei-harian"

)





return {

survei:
jumlahSurvei,


detail:
jumlahDetail,


failed:
gagal,


kodeTidakDitemukan

}



}