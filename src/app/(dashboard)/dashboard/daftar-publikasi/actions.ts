"use server"

import { createClient } from "@/lib/supabase-server"
import type { Publikasi } from "./types"

export async function getPublikasi(): Promise<Publikasi[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("publikasi")
    .select(`
      id,
      judul,
      slug,
      jenis,
      ringkasan,
      gambar,
      konten,
      status,
      created_by,
      created_at,
      published_at
    `)
    .order("published_at", {
      ascending: false,
      nullsFirst: false,
    })
    .order("created_at", {
      ascending: false,
    })

  if (error) {
    console.error(error)
    throw new Error("Gagal mengambil data publikasi.")
  }

  return (data ?? []) as Publikasi[]
}

export async function getPublikasiById(
  id:string
){

  const supabase =
    await createClient()


  const { data, error } =
    await supabase
      .from("publikasi")
      .select(`
        *,
        publikasi_laporan (
          id,
          periode_mulai,
          periode_selesai,
          data_laporan,
          status,
          published_at
        )
      `)
      .eq("id", id)
      .single()



  if(error){

    console.error(error)

    throw new Error(
      "Gagal mengambil detail publikasi"
    )

  }


  return data

}

export async function deletePublikasi(
  id:string
){

  const supabase =
    await createClient()


  const { error } =
    await supabase
      .from("publikasi")
      .delete()
      .eq(
        "id",
        id
      )


  if(error){

    console.error(error)

    throw new Error(
      "Gagal menghapus publikasi"
    )

  }


  return {
    success:true
  }

}



export async function createBerita(data: {
  judul: string
  slug: string
  ringkasan?: string
  gambar?: string
  konten?: string
  status: string
  created_by: string
}) {

  const supabase = await createClient()


  const { error } = await supabase
    .from("publikasi")
    .insert({

      judul: data.judul,

      slug: data.slug,

      jenis: "berita",

      ringkasan: data.ringkasan,

      gambar: data.gambar,

      konten: data.konten,

      status: data.status,

      created_by: data.created_by,

    })


  if (error) {

    console.error(
      "CREATE BERITA ERROR:",
      error
    )

    throw new Error(
      "Gagal membuat berita."
    )

  }


  return {
    success: true
  }

}

export async function getPublikasiDetail(
  id:string
){

  const supabase =
    await createClient()


  const { data,error } =
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
        status,
        published_at,
        created_at,
        konten,

        publikasi_laporan (
          id,
          periode_mulai,
          periode_selesai,
          data_laporan,
          status,
          published_at
        )
      `)
      .eq(
        "id",
        id
      )
      .single()



  if(error){

    console.error(error)

    throw new Error(
      "Gagal mengambil detail publikasi"
    )

  }


  return data

}