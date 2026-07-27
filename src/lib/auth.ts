import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase-server"


export async function requireAuth() {


  const supabase = await createClient()


  const {
    data: {
      user
    }
  } = await supabase.auth.getUser()



  // belum login
  if (!user) {

    redirect("/auth/sign-in")

  }



  const {
    data: profile,
    error
  } = await supabase

    .from("profiles")

    .select(
      `
      id,
      nama,
      email,
      no_hp,
      role,
      aktif,
      created_at
      `
    )

    .eq(
      "id",
      user.id
    )

    .single()



  // profile tidak ditemukan
  if (
    error ||
    !profile
  ) {

    redirect(
      "/auth/sign-in?error=profile"
    )

  }



  // akun dinonaktifkan

  if (
    !profile.aktif
  ) {

    await supabase.auth.signOut()

    redirect(
      "/auth/sign-in?error=inactive"
    )

  }



  return profile


}