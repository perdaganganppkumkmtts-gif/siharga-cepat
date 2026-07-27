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

    console.log(
  "DETAIL SURVEI ERROR:",
  JSON.stringify(
    error,
    null,
    2
  )
)


    throw new Error(
      error.message
    )

  }



  return data as any


}

export async function submitSurvei(
  id:string
){

  const supabase =
    await createClient()


  console.log(
    "SUBMIT ID:",
    id
  )


  const {
    data,
    error
  } =
    await supabase
      .from("survei_harian")
      .update({
        status:"diajukan"
      })
      .eq(
        "id",
        id
      )
      .select()



  console.log(
    "UPDATE RESULT:",
    data
  )


  console.log(
    "UPDATE ERROR:",
    error
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