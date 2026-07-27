"use server"

import { createClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"


export async function logout() {
  const supabase = await createClient()

  await supabase.auth.signOut()

  redirect("/beranda")
}

export async function login(
email:string,
password:string
){

const supabase = await createClient()



const {
data,
error
}=await supabase.auth.signInWithPassword({

email,

password

})



if(error){

return {
error:error.message
}

}



if(!data.user){

return {
error:"User tidak ditemukan"
}

}



// ambil profile

const {

data:profile,

error:profileError

}=await supabase

.from("profiles")

.select("*")

.eq(
"id",
data.user.id
)

.single()



if(profileError || !profile){

return {

error:
"Profile pengguna tidak ditemukan"

}

}



if(!profile.aktif){

return {

error:
"Akun belum aktif"

}

}



// redirect berdasarkan role


switch(profile.role){


case "admin":

redirect("/dashboard")


case "kabid":

redirect("/dashboard")


case "kadis":

redirect("/dashboard")


case "analis":

redirect("/dashboard")


case "surveyor":

redirect("/dashboard")


default:

redirect("/auth/sign-in")


}


}