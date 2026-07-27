"use server"

import {
  createClient
} from "@/lib/supabase-server"





export async function getSurveiEdit(
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

survei_detail(

  id,
  harga,
  keterangan,

  komoditas(
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

    console.error(
      error
    )

    throw new Error(
      "Gagal mengambil data survei"
    )

  }



  return data

}







export async function updateSurvei(

  id:string,

  details:{
    id:string
    harga:number
    keterangan?:string|null
  }[]

){


  const supabase =
    await createClient()





  // cek status

  const {
    data:survei,
    error:statusError
  }
  =
  await supabase
    .from("survei_harian")
    .select(
      "status"
    )
    .eq(
      "id",
      id
    )
    .single()



  if(statusError){

    throw new Error(
      statusError.message
    )

  }




  if(
    survei.status !== "draft"
  ){

    throw new Error(
      "Survei hanya dapat diedit saat draft"
    )

  }







  const updateData =
    details.map(
      item=>({

        id:item.id,

        harga:
          Number(
            item.harga
          ),

        keterangan:
          item.keterangan ?? null

      })
    )






  for(
    const item of updateData
  ){


const {
  data,
  error
} =
await supabase
  .from("survei_detail")
  .update({

    harga:item.harga,

    keterangan:item.keterangan

  })
  .eq(
    "id",
    item.id
  )
  .select()



console.log(
  "UPDATE DETAIL:",
  {
    item,
    data,
    error
  }
)



    if(error){

      throw new Error(
        error.message
      )

    }

  }




  return {
    success:true
  }


}