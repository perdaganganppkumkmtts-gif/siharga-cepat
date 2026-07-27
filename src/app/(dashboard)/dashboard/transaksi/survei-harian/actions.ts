"use server"

import { createClient } from "@/lib/supabase-server"


export async function getSurveiHarian() {

  const supabase =
    await createClient()


  const {
    data,
    error,
  } =
    await supabase
      .from("survei_harian")
      .select(
        `
        id,
        tanggal,
        status,
        catatan,
        created_at,
        updated_at,

        survei_detail (
          id,
          harga,
          keterangan,

          komoditas (
            id,
            kode,
            nama,
            satuan
          )
        )
        `
      )
      .order(
        "tanggal",
        {
          ascending: false,
        }
      )


  if(error){

    console.error(error)

    throw new Error(
      error.message
    )

  }


  return data ?? []

}





export async function deleteSurvei(
  id:string
){

  const supabase =
    await createClient()



  const {
    error
  } =
    await supabase
      .from("survei_harian")
      .delete()
      .eq(
        "id",
        id
      )



  if(error){

    console.error(error)

    throw new Error(
      error.message
    )

  }



  return {
    success:true
  }

}