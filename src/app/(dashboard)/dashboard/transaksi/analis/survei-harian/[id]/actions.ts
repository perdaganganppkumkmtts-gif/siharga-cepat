"use server"

import {
  createClient
} from "@/lib/supabase-server"



export async function getSurveiDetail(
  id:string
){


  const supabase =
    await createClient()



  const {
    data,
    error
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
      .eq(
        "id",
        id
      )
      .single()



  if(error){

    throw new Error(
      error.message
    )

  }



  return data as any

}

export async function approveSurvei(
  id:string
){


  const supabase =
    await createClient()



  const {
    error
  } =
    await supabase
      .from("survei_harian")
      .update({

        status:"disetujui"

      })
      .eq(
        "id",
        id
      )



  if(error){

    throw new Error(
      error.message
    )

  }



  return {
    success:true
  }


}

export async function rejectSurvei(
  id:string
){


  const supabase =
    await createClient()



  const {
    error
  } =
    await supabase
      .from("survei_harian")
      .update({

        status:"ditolak"

      })
      .eq(
        "id",
        id
      )



  if(error){

    throw new Error(
      error.message
    )

  }



  return {
    success:true
  }


}