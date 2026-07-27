"use server"

import { createClient } from "@/lib/supabase-server"



export async function getKomoditasAktif(){

  const supabase =
    await createClient()



  const {
    data,
    error
  } =
    await supabase
      .from("komoditas")
      .select(
        `
        id,
        kode,
        nama,
        satuan,
        urutan
        `
      )
      .eq(
        "aktif",
        true
      )
      .order(
        "urutan",
        {
          ascending:true
        }
      )



  if(error){

    console.error(error)

    throw new Error(
      "Gagal mengambil data komoditas"
    )

  }


  return data ?? []

}





interface SaveSurveiProps {

  tanggal:string

  catatan?:string

  status:
    "draft"
    |
    "diajukan"


  harga:
    Record<string,string>


  keterangan:
    Record<string,string>

}




export async function saveSurvei(
  payload:SaveSurveiProps
){


  const supabase =
    await createClient()



  const {
    data:user
  } =
    await supabase.auth.getUser()



  if(!user.user){

    throw new Error(
      "User tidak ditemukan"
    )

  }





  /*
    Simpan header survei
  */


  const {
    data:survei,
    error:surveiError
  }
  =
    await supabase
      .from("survei_harian")
      .insert({

        tanggal:
          payload.tanggal,

        status:
          payload.status,

        catatan:
          payload.catatan ?? null,

        created_by:
          user.user.id,

      })
      .select()
      .single()



  if(surveiError){

    throw new Error(
      surveiError.message
    )

  }





  /*
    Buat detail harga
  */


  const detail =
    Object.entries(
      payload.harga
    )
    .filter(
      ([,value]) =>
        value !== ""
    )
    .map(
      ([komoditas_id,value])=>({

        survei_id:
          survei.id,


        komoditas_id,


        harga:
          Number(value),


        keterangan:
          payload.keterangan[
            komoditas_id
          ]
          ??
          null,

      })
    )





  if(detail.length){


    const {
      error:detailError
    }
    =
      await supabase
        .from("survei_detail")
        .insert(
          detail
        )



    if(detailError){

      throw new Error(
        detailError.message
      )

    }

  }




  return {

    success:true,

    id:survei.id

  }


}