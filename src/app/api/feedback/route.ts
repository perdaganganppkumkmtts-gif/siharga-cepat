import { NextResponse } from "next/server"

import {
  createClient
} from "@/lib/supabase-server"



export async function POST(
  request: Request
) {


try{


const body =
await request.json()



const {
  nama,
  whatsapp,
  rating,
  pesan,
  website,
} = body





// =========================
// ANTI BOT HONEYPOT
// =========================
//
// Field website tidak terlihat oleh manusia.
// Jika terisi berarti kemungkinan bot.
//

if(website){

return NextResponse.json(
{
message:
"Pengiriman tidak valid."
},
{
status:400
}
)

}







// =========================
// VALIDASI WAJIB ISI
// =========================


if (
  !nama?.trim() ||
  !whatsapp?.trim() ||
  !pesan?.trim() ||
  !rating
) {


return NextResponse.json(
{
message:
"Nama, No. WhatsApp, rating, dan pesan wajib diisi."
},
{
status:400
}
)

}







// =========================
// VALIDASI PANJANG DATA
// =========================


if(
nama.trim().length > 100
){

return NextResponse.json(
{
message:
"Nama maksimal 100 karakter."
},
{
status:400
}
)

}




if(
pesan.trim().length > 1000
){

return NextResponse.json(
{
message:
"Saran atau masukan maksimal 1000 karakter."
},
{
status:400
}
)

}







// =========================
// VALIDASI WHATSAPP
// =========================


const nomorWA =
whatsapp.trim()



if(
!/^08\d{8,11}$/.test(nomorWA)
){

return NextResponse.json(
{
message:
"Nomor WhatsApp tidak valid."
},
{
status:400
}
)

}






// =========================
// VALIDASI RATING
// =========================


if(
rating < 1 ||
rating > 5
){

return NextResponse.json(
{
message:
"Rating harus antara 1 sampai 5."
},
{
status:400
}
)

}







// =========================
// SUPABASE INSERT
// =========================


const supabase =
await createClient()






const {
error

}

=
await supabase

.from("feedback")

.insert({

nama:
nama.trim(),

whatsapp:
nomorWA,

rating,

pesan:
pesan.trim(),

})








if(error){

throw error

}







return NextResponse.json(
{

success:true

}
)






}
catch(error){


console.error(
error
)



return NextResponse.json(

{
message:
"Gagal menyimpan feedback"
},

{
status:500
}

)


}



}