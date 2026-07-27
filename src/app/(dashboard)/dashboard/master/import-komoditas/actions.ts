"use server"

import {
  createClient
} from "@/lib/supabase-server"


import {
  revalidatePath
} from "next/cache"





export interface ImportKomoditasData {

  kode:string

  nama:string

  satuan:string

  kategori_kode:string

  urutan:number

}







export async function importKomoditas(
data:ImportKomoditasData[]
){


const supabase =
await createClient()





let inserted = 0

let updated = 0

let failed = 0







for(
const item of data
){


try{



// ============================
// Cari kategori
// ============================


const {
data:kategori,
error:kategoriError
}
=
await supabase
.from(
"kategori_komoditas"
)
.select(
"id"
)
.eq(
"kode",
item.kategori_kode
)
.single()



if(kategoriError || !kategori){


throw new Error(
`Kategori ${item.kategori_kode} tidak ditemukan`
)


}







// ============================
// Cek komoditas
// ============================


const {
data:existing,
error:checkError
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



if(checkError){

throw checkError

}







// ============================
// UPDATE
// ============================


if(existing){



const {
error
}
=
await supabase
.from(
"komoditas"
)
.update({

kategori_id:
kategori.id,

nama:
item.nama,

satuan:
item.satuan,

urutan:
Number(
item.urutan ?? 1
),


aktif:true,

is_publik:true


})
.eq(
"id",
existing.id
)




if(error){

throw error

}



updated++



}






// ============================
// INSERT
// ============================


else{



const {
error
}
=
await supabase
.from(
"komoditas"
)
.insert({


kategori_id:
kategori.id,


kode:
item.kode,


nama:
item.nama,


satuan:
item.satuan,


urutan:
Number(
item.urutan ?? 1
),


aktif:true,


is_publik:true


})




if(error){

throw error

}



inserted++



}




}
catch(error){


console.error(

"Import komoditas gagal:",

item,

error

)



failed++



}



}







revalidatePath(
"/dashboard/master/komoditas"
)



return {


success:true,


inserted,


updated,


failed


}



}