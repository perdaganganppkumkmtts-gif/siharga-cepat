"use server"


import {
  createClient
} from "@/lib/supabase-server"


import {
  revalidatePath
} from "next/cache"



// ============================
// GET DATA KOMODITAS
// ============================

export async function getKomoditas(){


  const supabase =
    await createClient()



  const {
    data,
    error
  }
  =
  await supabase

  .from("komoditas")

  .select(`
    *,
    kategori_komoditas(
      nama
    )
  `)

  .order(
    "urutan",
    {
      ascending:true
    }
  )



  if(error){

    throw new Error(
      error.message
    )

  }



  return data ?? []

}









// ============================
// TAMBAH KOMODITAS
// ============================


export async function createKomoditas(
  formData:FormData
){


  const supabase =
    await createClient()



  const {

    data:{
      user
    }

  }
  =
  await supabase.auth.getUser()



  if(!user){

    throw new Error(
      "Unauthorized"
    )

  }






  const kategori_id =
    formData.get(
      "kategori_id"
    ) as string



  const kode =
    formData.get(
      "kode"
    ) as string



  const nama =
    formData.get(
      "nama"
    ) as string



  const satuan =
    formData.get(
      "satuan"
    ) as string



  const urutan =
    Number(
      formData.get(
        "urutan"
      )
    )





  const aktif =
    formData.get(
      "aktif"
    )
    ===
    "true"




  const is_publik =
    formData.get(
      "is_publik"
    )
    ===
    "true"







  // ============================
  // HARGA ACUAN
  // ============================


  const het =
    formData.get("het")
    ?
    Number(
      formData.get("het")
    )
    :
    null



  const hap =
    formData.get("hap")
    ?
    Number(
      formData.get("hap")
    )
    :
    null



  const hap_bawah =
    formData.get("hap_bawah")
    ?
    Number(
      formData.get("hap_bawah")
    )
    :
    null



  const hap_atas =
    formData.get("hap_atas")
    ?
    Number(
      formData.get("hap_atas")
    )
    :
    null







  const {
    error
  }
  =
  await supabase

  .from("komoditas")

  .insert({

    kategori_id,

    kode,

    nama,

    satuan,

    urutan,

    aktif,

    is_publik,


    // harga acuan

    het,

    hap,

    hap_bawah,

    hap_atas

  })







  if(error){

    throw new Error(
      error.message
    )

  }






  revalidatePath(

    "/dashboard/master/komoditas"

  )


}












// ============================
// UPDATE KOMODITAS
// ============================


export async function updateKomoditas(

  id:string,

  formData:FormData

){



  const supabase =
    await createClient()







  const dataUpdate = {


    kategori_id:

      formData.get(
        "kategori_id"
      ),



    kode:

      formData.get(
        "kode"
      ),



    nama:

      formData.get(
        "nama"
      ),



    satuan:

      formData.get(
        "satuan"
      ),



    urutan:

      Number(
        formData.get(
          "urutan"
        )
      ),



    aktif:

      formData.get(
        "aktif"
      )
      ===
      "true",




    is_publik:

      formData.get(
        "is_publik"
      )
      ===
      "true",





    // ====================
    // HARGA ACUAN
    // ====================


    het:

      formData.get("het")
      ?
      Number(
        formData.get("het")
      )
      :
      null,



    hap:

      formData.get("hap")
      ?
      Number(
        formData.get("hap")
      )
      :
      null,



    hap_bawah:

      formData.get("hap_bawah")
      ?
      Number(
        formData.get("hap_bawah")
      )
      :
      null,



    hap_atas:

      formData.get("hap_atas")
      ?
      Number(
        formData.get("hap_atas")
      )
      :
      null,


  }








  const {
    error
  }
  =
  await supabase

  .from("komoditas")

  .update(
    dataUpdate
  )

  .eq(
    "id",
    id
  )







  if(error){

    throw new Error(
      error.message
    )

  }







  revalidatePath(

    "/dashboard/master/komoditas"

  )


}











// ============================
// DELETE KOMODITAS
// ============================


export async function deleteKomoditas(

  id:string

){



  const supabase =
    await createClient()






  const {
    error
  }
  =
  await supabase

  .from("komoditas")

  .delete()

  .eq(
    "id",
    id
  )







  if(error){

    throw new Error(
      error.message
    )

  }






  revalidatePath(

    "/dashboard/master/komoditas"

  )


}