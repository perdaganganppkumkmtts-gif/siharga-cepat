import {
  NextRequest,
  NextResponse
} from "next/server"


import {
  createClient
} from "@/lib/supabase-server"





export async function POST(
request:NextRequest
){


try{


const body =
await request.json()





const {
  sessionId,
  page,
  userAgent,
  referrer
} = body





// validasi session

if(!sessionId){

return NextResponse.json(

{
success:false,
message:
"Session ID tidak ditemukan"
},

{
status:400
}

)

}






const supabase =
await createClient()







// ==============================
// CEK SESSION SUDAH ADA
// ==============================


const {

data:existing,

error:checkError

}

=

await supabase

.from("website_visits")

.select("id")

.eq(
"session_id",
sessionId
)
.eq(
"visit_date",
new Date().toISOString().split("T")[0]
)

.maybeSingle()





if(checkError){

throw checkError

}







// Jika sudah pernah tercatat

if(existing){


return NextResponse.json({

success:true,

message:
"Visitor sudah tercatat"

})


}









// ==============================
// SIMPAN VISITOR BARU
// ==============================


const {

error

}

=

await supabase

.from("website_visits")

.insert({

  session_id:
  sessionId,

  page:
  page || "/",


  user_agent:
  userAgent || null,


  referrer:
  referrer || null,


  visit_date:
  new Date()
  .toISOString()
  .split("T")[0]

})







if(error){

throw error

}







return NextResponse.json({

success:true,

message:
"Visitor berhasil dicatat"

})





}

catch(error){


console.error(
"VISITOR ERROR:",
error
)




return NextResponse.json(

{

success:false,

message:
"Gagal mencatat visitor"

},

{

status:500

}

)


}


}