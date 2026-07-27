"use server"

import { createClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"



export interface ImportKategoriData {

  kode:string

  nama:string

  deskripsi:string

  urutan:number

}





export async function importKategoriKomoditas(
data: {
kode:string
nama:string
deskripsi:string
urutan:number
}[]
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



let inserted = 0

let updated = 0

let failed = 0





for(const item of data){


try{


const kode =
item.kode
.trim()
.toUpperCase()



// cek kode

const {
data:existing,
error:checkError
}
=
await supabase
.from("kategori_komoditas")
.select("id")
.eq(
"kode",
kode
)
.maybeSingle()



if(checkError){

throw checkError

}




// ======================
// UPDATE
// ======================

if(existing){


const {
error
}
=
await supabase
.from("kategori_komoditas")
.update({

nama:
item.nama,

deskripsi:
item.deskripsi || null,

urutan:
Number(item.urutan ?? 0),


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




// ======================
// INSERT
// ======================

else{


const {
error
}
=
await supabase
.from("kategori_komoditas")
.insert({

kode,

nama:
item.nama,

deskripsi:
item.deskripsi || null,

urutan:
Number(item.urutan ?? 0),

aktif:true


})



if(error){

throw error

}



inserted++


}



}
catch(error){


console.error(
"Import kategori gagal",
item,
error
)


failed++


}


}




revalidatePath(
"/dashboard/master/kategori-komoditas"
)



return {

success:true,

inserted,

updated,

failed

}


}