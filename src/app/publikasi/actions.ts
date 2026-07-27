"use server"

import { createClient } from "@/lib/supabase-server"



export interface Publication {


  id:string;


  judul:string;


  slug:string;


  jenis:
  "laporan"
  |
  "berita";



  ringkasan:string|null;


  gambar:string|null;


  created_by:string|null;


  published_at:string;



  konten:string|null;



  publikasi_laporan?:{

    id:string;

    periode_mulai:string;

    periode_selesai:string;


  }[];



}











export async function getPublications(){


const supabase =
await createClient();



const {

data,

error

}

=

await supabase

.from("publikasi")

.select(`

id,

judul,

slug,

jenis,

ringkasan,

gambar,

created_by,

published_at,

konten

`)


.eq(

"status",

"published"

)


.order(

"published_at",

{

ascending:false

}

);





if(error){


console.error(
"GET PUBLICATION ERROR:",
JSON.stringify(error,null,2)
);


throw new Error(error.message);


}



return data ?? [];


}

export async function getPublicationBySlug(
  slug:string
){

const supabase =
await createClient();




const {
data,
error
}

=

await supabase

.from("publikasi")

.select(`

id,

judul,

slug,

jenis,

ringkasan,

konten,

gambar,

created_by,

published_at,


publikasi_laporan(

id,

periode_mulai,

periode_selesai,

data_laporan

)


`)

.eq(
"slug",
slug
)

.eq(
"status",
"published"
)

.single();






if(error){

console.error(
"GET PUBLICATION BY SLUG ERROR:",
error
);


return null;


}





return data;


}