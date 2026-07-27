"use server"

import { createClient } from "@/lib/supabase-server"

import {
  analyzeCommodityTrend,
  PeriodRange,
} from "./utils/trend-analysis"

import {
  generateTrendNarrative
} from "./utils/trend-narrative"

export async function getCommodityOptions(){

  const supabase =
    await createClient()


  const {
    data,
    error
  } =
  await supabase
    .from("komoditas")
    .select(`
      id,
      nama
    `)
    .order("nama")


  if(error){

    throw new Error(
      error.message
    )

  }


  return data ?? []

}





function getPreviousDateRange(
  startDate:string,
  endDate:string
):PeriodRange{


  const start =
    new Date(startDate)


  const end =
    new Date(endDate)



  const duration =
    end.getTime()
    -
    start.getTime()



  const previousEnd =
    new Date(
      start.getTime()
      -
      86400000
    )



  const previousStart =
    new Date(
      previousEnd.getTime()
      -
      duration
    )



  return {

    mulai:
      previousStart
      .toISOString()
      .split("T")[0],


    sampai:
      previousEnd
      .toISOString()
      .split("T")[0]

  }

}







export async function getTrendAnalysis(
  commodityIds:string[],
  startDate:string,
  endDate:string
){


  const supabase =
    await createClient()



  const previousRange =
    getPreviousDateRange(
      startDate,
      endDate
    )





  async function fetchData(
    start:string,
    end:string
  ){


    let query =
      supabase
      .from("survei_detail")
      .select(`

        harga,

        komoditas_id,


        komoditas(
          nama,
          satuan,
          het,
          hap,
          hap_bawah,
          hap_atas
        ),


        survei_harian!inner(
          tanggal
        )

      `)


      .gte(
        "survei_harian.tanggal",
        start
      )


      .lte(
        "survei_harian.tanggal",
        end
      )


      .order(
        "survei_harian(tanggal)",
        {
          ascending:true
        }
      )





    if(
      commodityIds.length > 0
    ){

      query =
      query.in(
        "komoditas_id",
        commodityIds
      )

    }





    const {
      data,
      error
    }
    =
    await query





    if(error){

      throw new Error(
        error.message
      )

    }



    return data ?? []

  }







  const currentData =
    await fetchData(
      startDate,
      endDate
    )



  const previousData =
    await fetchData(
      previousRange.mulai,
      previousRange.sampai
    )







  const groupedCurrent =
    new Map<string,any[]>()


  const groupedPrevious =
    new Map<string,any[]>()





  currentData.forEach(
    item=>{


      if(
        !groupedCurrent.has(
          item.komoditas_id
        )
      ){

        groupedCurrent.set(
          item.komoditas_id,
          []
        )

      }


      groupedCurrent
      .get(
        item.komoditas_id
      )!
      .push(item)


    }
  )






  previousData.forEach(
    item=>{


      if(
        !groupedPrevious.has(
          item.komoditas_id
        )
      ){

        groupedPrevious.set(
          item.komoditas_id,
          []
        )

      }


      groupedPrevious
      .get(
        item.komoditas_id
      )!
      .push(item)


    }
  )









  const result:any[] = []






  for(
    const [
      commodityId,
      rows
    ]
    of groupedCurrent
  ){



    const previousRows =
      groupedPrevious.get(
        commodityId
      )
      ??
      []





    const historyCurrent =
      rows.map(
        item=>({

          time:
            item
            .survei_harian
            .tanggal,


          value:
            Number(
              item.harga
            ),


          het:
            item.komoditas?.het
            ??
            null,


          hap:
            item.komoditas?.hap
            ??
            null,


          hap_bawah:
            item.komoditas?.hap_bawah
            ??
            null,


          hap_atas:
            item.komoditas?.hap_atas
            ??
            null


        })
      )






    const historyPrevious =
      previousRows.map(
        item=>({

          time:
            item
            .survei_harian
            .tanggal,


          value:
            Number(
              item.harga
            ),


          het:
            item.komoditas?.het
            ??
            null,


          hap:
            item.komoditas?.hap
            ??
            null,


          hap_bawah:
            item.komoditas?.hap_bawah
            ??
            null,


          hap_atas:
            item.komoditas?.hap_atas
            ??
            null


        })
      )







    const commodity =
      rows[0]
      .komoditas






    const analysis =
      analyzeCommodityTrend(

        historyCurrent,

        historyPrevious,


        {

          mulai:startDate,

          sampai:endDate

        },


        previousRange

      )

    const narrative =
        generateTrendNarrative({

            nama:
            commodity.nama,


            satuan:
            commodity.satuan,


            ...analysis

        })





    result.push({

id:
commodityId,

nama:
commodity.nama,

satuan:
commodity.satuan,


history:
historyCurrent,


historyPrevious:
historyPrevious,


analysis,


narrative

})



  }






  return result


}

// =====================================
// PUBLISH LAPORAN PUBLIK
// =====================================


interface PublishLaporanProps {

  judul:string

  createdBy:string

  data:any[]

}








export async function publishLaporan({

judul,

createdBy,

data

}:PublishLaporanProps){





const supabase =
  await createClient()








if(

!data ||

data.length === 0

){

throw new Error(
"Data laporan kosong."
)

}









const first =

data[0]?.analysis









if(

!first

){

throw new Error(
"Struktur analisis tidak ditemukan."
)

}










// =====================================
// BUAT SLUG
// =====================================


const slug =

judul

.toLowerCase()

.trim()

.replace(

/[^a-z0-9]+/g,

"-"

)

.replace(

/^-+|-+$/g,

""

)

+

"-"

+

Date.now()











// =====================================
// INSERT TABEL PUBLIKASI
// =====================================


const {

data:publikasi,

error:publikasiError

}

=

await supabase

.from("publikasi")

.insert({



judul,



slug,



jenis:
"laporan",



ringkasan:
`Laporan perkembangan harga barang kebutuhan pokok periode ${first.periodeAnalisis.mulai} sampai ${first.periodeAnalisis.sampai}`,



created_by:
createdBy,



status:
"published",



published_at:
new Date()
.toISOString()



})



.select()

.single()









if(publikasiError){


console.error(

"Insert publikasi error:",

publikasiError

)


throw new Error(

publikasiError.message

)

}











if(!publikasi){


throw new Error(

"Gagal membuat data publikasi."

)

}












// =====================================
// INSERT DETAIL LAPORAN
// =====================================


const {

error:laporanError

}

=

await supabase

.from("publikasi_laporan")

.insert({





publikasi_id:

publikasi.id,





periode_mulai:

first

.periodeAnalisis

.mulai,





periode_selesai:

first

.periodeAnalisis

.sampai,





data_laporan:

data





})









if(laporanError){


console.error(

"Insert publikasi_laporan error:",

laporanError

)


// rollback manual
await supabase

.from("publikasi")

.delete()

.eq(

"id",

publikasi.id

)



throw new Error(

laporanError.message

)


}









return {

success:true,


id:

publikasi.id,


slug:

publikasi.slug


}



}