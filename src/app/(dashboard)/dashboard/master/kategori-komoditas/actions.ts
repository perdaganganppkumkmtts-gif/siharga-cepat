"use server"

import { createClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"


const PATH =
  "/dashboard/master/kategori-komoditas"


// ============================
// GET DATA
// ============================

export async function getKategoriKomoditas() {

  const supabase = await createClient()


  const { data, error } = await supabase
    .from("kategori_komoditas")
    .select("*")
    .order("urutan", {
      ascending: true
    })


  if (error) {
    throw new Error(error.message)
  }


  return data ?? []

}



// ============================
// CREATE
// ============================

export async function createKategori(
  formData: FormData
) {


  const supabase =
    await createClient()



  const {
    data: {
      user
    }
  } = await supabase.auth.getUser()



  if (!user) {
    throw new Error(
      "Unauthorized"
    )
  }



  const kode =
    formData.get("kode")?.toString()


  const nama =
    formData.get("nama")?.toString()


  const deskripsi =
    formData.get("deskripsi")?.toString()
    || null



  if (!kode || !nama) {
    throw new Error(
      "Kode dan nama kategori wajib diisi"
    )
  }



  const { error } =
    await supabase
      .from("kategori_komoditas")
      .insert({

        kode,

        nama,

        deskripsi,

        aktif: true,

        urutan: 0,

      })



  if (error) {

    throw new Error(
      error.message
    )

  }



  revalidatePath(PATH)

}



// ============================
// UPDATE
// ============================

export async function updateKategori(
  id: string,
  formData: FormData
) {


  const supabase =
    await createClient()



  const kode =
    formData.get("kode")?.toString()


  const nama =
    formData.get("nama")?.toString()


  const deskripsi =
    formData.get("deskripsi")?.toString()
    || null



  if (!kode || !nama) {
    throw new Error(
      "Kode dan nama kategori wajib diisi"
    )
  }



  const { error } =
    await supabase
      .from("kategori_komoditas")
      .update({

        kode,

        nama,

        deskripsi,

      })
      .eq(
        "id",
        id
      )



  if (error) {

    throw new Error(
      error.message
    )

  }



  revalidatePath(PATH)

}



// ============================
// TOGGLE AKTIF / NON AKTIF
// ============================

export async function toggleKategori(
  id:string,
  aktif:boolean
) {


  const supabase =
    await createClient()



  const { error } =
    await supabase
      .from("kategori_komoditas")
      .update({

        aktif,

      })
      .eq(
        "id",
        id
      )



  if (error) {

    throw new Error(
      error.message
    )

  }



  revalidatePath(PATH)

}



// ============================
// DELETE
// ============================

export async function deleteKategori(
  id:string
) {


  const supabase =
    await createClient()



  const { error } =
    await supabase
      .from("kategori_komoditas")
      .delete()
      .eq(
        "id",
        id
      )



  if (error) {

    throw new Error(
      error.message
    )

  }



  revalidatePath(PATH)

}