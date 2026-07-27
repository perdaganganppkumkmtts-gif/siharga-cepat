"use server"

import {
  createClient
} from "@/lib/supabase-server"

// ===============================
// GET SURVEI UNTUK ANALIS
// ===============================

export async function getSurveiHarian(){


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
      .in(
        "status",
        [
          "diajukan",
          "disetujui",
          "ditolak"
        ]
      )
      .order(
        "tanggal",
        {
          ascending:false
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

// ===============================
// SETUJUI SURVEI
// ===============================

export async function approveSurvei(
  id:string
){


  const supabase =
    await createClient()



  const {
    error
  }
  =
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

// ===============================
// TOLAK SURVEI
// ===============================

export async function rejectSurvei(
  id:string
){


  const supabase =
    await createClient()



  const {
    error
  }
  =
  await supabase
    .from("survei_harian")
    .update({

      status:"draft"

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