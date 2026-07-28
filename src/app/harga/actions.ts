"use server"

import { createClient } from "@/lib/supabase-server"

// =============================
// HELPER
// =============================

async function getLatestDate() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("survei_harian")
    .select("tanggal")
    .order("tanggal", { ascending: false })
    .limit(1)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return new Date(data.tanggal)
}

function subtractDays(date: Date, days: number) {
  const result = new Date(date)

  result.setDate(result.getDate() - days)

  return result.toISOString().split("T")[0]
}

function getKomoditas(komoditas: any) {
  if (!komoditas) {
    return null
  }

  if (Array.isArray(komoditas)) {
    return komoditas.length ? komoditas[0] : null
  }

  return komoditas
}

function average(values: number[]) {
  if (!values.length) {
    return 0
  }

  return values.reduce((a, b) => a + b, 0) / values.length
}

function getTanggalSurvei(survei_harian: any) {
  if (!survei_harian) {
    return null
  }

  if (Array.isArray(survei_harian)) {
    return survei_harian[0]?.tanggal ?? null
  }

  return survei_harian.tanggal ?? null
}

export async function getAnalysisSummary(){

  const supabase =
    await createClient()



  // ======================
  // TOTAL SURVEI
  // ======================

  const {
    count:totalSurvei,
    error:totalError

  } =
  await supabase
  .from("survei_harian")
  .select(
    "id",
    {
      count:"exact",
      head:true
    }
  )


  if(totalError)
    throw new Error(
      totalError.message
    )





  // ======================
  // SURVEI MINGGU INI
  // ======================

  const latest =
    await getLatestDate()



  const mingguIni =
    subtractDays(
      latest,
      6
    )



  const {
    count:surveiMingguIni,
    error:mingguError

  } =
  await supabase
  .from("survei_harian")
  .select(
    "id",
    {
      count:"exact",
      head:true
    }
  )
  .gte(
    "tanggal",
    mingguIni
  )



  if(mingguError)
    throw new Error(
      mingguError.message
    )








  // ======================
  // TOTAL KOMODITAS
  // ======================


  const {
    count:totalKomoditas,
    error:komoditasError

  } =
  await supabase
  .from("komoditas")
  .select(
    "id",
    {
      count:"exact",
      head:true
    }
  )



  if(komoditasError)
    throw new Error(
      komoditasError.message
    )







  // ======================
  // PERUBAHAN HARGA
  // ======================


  const ranking =
    await getCommodityMovementRanking()



  const hargaNaik =
    ranking.naik.length



  const hargaTurun =
    ranking.turun.length



  const hargaStabil =

    (totalKomoditas ?? 0)
    -
    hargaNaik
    -
    hargaTurun








  return {


    totalSurvei:
      totalSurvei ?? 0,



    surveiMingguIni:
      surveiMingguIni ?? 0,



    totalKomoditas:
      totalKomoditas ?? 0,



    hargaNaik:
      hargaNaik,



    hargaTurun:
      hargaTurun,



    hargaStabil:
      hargaStabil < 0
      ?
      0
      :
      hargaStabil


  }


}

// =============================
// PERGERAKAN MINGGUAN
// =============================

export async function getPriceMovementSummary() {
  const supabase = await createClient()

  const latest = await getLatestDate()
  const mingguIni = subtractDays(latest, 6)
  const mingguLalu = subtractDays(latest, 13)

  const { data, error } = await supabase
    .from("survei_detail")
    .select(`
      harga,
      survei_harian!inner(
        tanggal
      )
    `)
    .gte("survei_harian.tanggal", mingguLalu)

  if (error) {
    throw new Error(error.message)
  }

  const ini: number[] = []
  const lalu: number[] = []

  data?.forEach((item) => {
    const tanggal = getTanggalSurvei(item.survei_harian)

    if (!tanggal) return

    const harga = Number(item.harga)

    if (new Date(tanggal) >= new Date(mingguIni)) {
      ini.push(harga)
    } else {
      lalu.push(harga)
    }
  })

  const rataIni = average(ini)
  const rataLalu = average(lalu)

  const perubahan = rataLalu
    ? ((rataIni - rataLalu) / rataLalu) * 100
    : 0

  return {
    rataIni,
    rataLalu,
    perubahan,
    status:
      perubahan > 0
        ? "Naik"
        : perubahan < 0
          ? "Turun"
          : "Stabil",
  }
}

// =============================
// RANKING KOMODITAS
// =============================

export async function getCommodityMovementRanking() {

  const supabase = await createClient()


  // ===============================
  // 1. TANGGAL TERBARU
  // ===============================

  const latest =
    await getLatestDate()



  if(!latest){

    return {
      naik:[],
      turun:[]
    }

  }



  const latestDate =
    new Date(latest)



  // ===============================
  // 2. RANGE MINGGU KALENDER
  // SENIN - MINGGU
  // ===============================


  function getWeekRange(date:Date){


    const day =
      date.getDay()


    const diff =
      day === 0
      ? -6
      : 1 - day



    const start =
      new Date(date)


    start.setDate(
      date.getDate() + diff
    )



    const end =
      new Date(start)


    end.setDate(
      start.getDate() + 6
    )



    return {
      start,
      end
    }

  }





  const currentWeek =
    getWeekRange(
      latestDate
    )



  const previousWeekEnd =
    new Date(
      currentWeek.start
    )


  previousWeekEnd.setDate(
    previousWeekEnd.getDate() - 1
  )



  const previousWeek =
    getWeekRange(
      previousWeekEnd
    )







  // ===============================
  // 3. AMBIL DATA
  // ===============================


  const {
    data,
    error
  }

  =
  await supabase

    .from("survei_detail")

    .select(`

      harga,

      komoditas(
        id,
        nama,
        satuan
      ),

      survei_harian!inner(
        tanggal
      )

    `)

    .gte(
      "survei_harian.tanggal",
      previousWeek.start.toISOString().split("T")[0]
    )






  if(error){

    throw new Error(
      error.message
    )

  }






  // ===============================
  // 4. KELOMPOKKAN KOMODITAS
  // ===============================


  const grouped:any = {}




  data?.forEach(

    (item:any)=>{


      const tanggal =
        getTanggalSurvei(
          item.survei_harian
        )


      if(!tanggal)
        return




      const komoditas =
        getKomoditas(
          item.komoditas
        )



      if(!komoditas)
        return




      const id =
        komoditas.id





      if(!grouped[id]){


        grouped[id]={

          nama:
          komoditas.nama,

          satuan:
          komoditas.satuan,


          hargaTerbaru:null,


          mingguLalu:[]

        }


      }






      const harga =
        Number(
          item.harga
        )



      const tanggalData =
        new Date(
          tanggal
        )






      // ===============================
      // MINGGU SEBELUMNYA
      // ===============================

      if(

        tanggalData >= previousWeek.start

        &&

        tanggalData <= previousWeek.end

      ){

        grouped[id]
        .mingguLalu
        .push(harga)

      }






      // ===============================
      // HARGA TERBARU
      // ===============================

      if(

        tanggalData >= currentWeek.start

        &&

        tanggalData <= currentWeek.end

      ){


        if(
          grouped[id].hargaTerbaru === null
          ||

          tanggalData >
          grouped[id].hargaTerbaru.tanggal

        ){

          grouped[id].hargaTerbaru={

            tanggal:tanggalData,

            harga

          }

        }


      }



    }

  )







  // ===============================
  // 5. HITUNG PERSENTASE
  // ===============================


  const result =

  Object.values(grouped)

  .map(

    (item:any)=>{


      if(

        !item.hargaTerbaru

        ||

        item.mingguLalu.length === 0

      ){

        return null

      }





      const rataMingguLalu =

        average(
          item.mingguLalu
        )





      const hargaSekarang =

        item.hargaTerbaru.harga






      const perubahan =

        rataMingguLalu === 0

        ?

        0

        :

        (
          (
            hargaSekarang -
            rataMingguLalu
          )

          /

          rataMingguLalu

        )

        *

        100






      return {

        nama:
        item.nama,


        satuan:
        item.satuan,


        rataIni:
        hargaSekarang,


        rataLalu:
        rataMingguLalu,


        perubahan:
        Number(
          perubahan.toFixed(2)
        )

      }


    }

  )

  .filter(Boolean)







  // ===============================
  // 6. RETURN
  // ===============================


  return {


    naik:

      result

      .filter(
        (item:any)=>
          item.perubahan > 0
      )

      .sort(
        (a:any,b:any)=>
          b.perubahan -
          a.perubahan
      )

      .slice(
        0,
        5
      ),





    turun:

      result

      .filter(
        (item:any)=>
          item.perubahan < 0
      )

      .sort(
        (a:any,b:any)=>
          a.perubahan -
          b.perubahan
      )

      .slice(
        0,
        5
      )

  }


}

// =============================
// PRICE CHART
// =============================

export async function getPriceTrend(
  period:
    | "daily"
    | "weekly"
    | "monthly"
    | "quarterly",
  komoditasId?: string
) {

  const supabase = await createClient()


  let query = supabase

    .from("survei_detail")

    .select(`

      harga,

      komoditas_id,

      komoditas(

        nama,

        het,

        hap,

        hap_bawah,

        hap_atas

      ),

      survei_harian!inner(

        tanggal

      )

    `)



  if(komoditasId){

    query =
      query.eq(
        "komoditas_id",
        komoditasId
      )

  }



  const {
    data,
    error
  } =
  await query.order(
    "survei_harian(tanggal)",
    {
      ascending:true
    }
  )



  if(error){

    throw new Error(
      error.message
    )

  }



  type TrendPoint = {

    time:string

    value:number

    nama:string

    het:number|null

    hap:number|null

    hap_bawah:number|null

    hap_atas:number|null

  }



  function getLimitData(
    item:any
  ){

    return {

      nama:
        item.komoditas?.nama
        ??
        "",


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

    }

  }




// =====================================
// DATA HARIAN
// =====================================


  const daily:

  Record<

    string,

    {

      harga:number[]

      nama:string

      het:number|null

      hap:number|null

      hap_bawah:number|null

      hap_atas:number|null

    }

  >

  = {}





  data?.forEach(

    (item:any)=>{


      const tanggal =
        getTanggalSurvei(
          item.survei_harian
        )



      if(!tanggal)
      return




      if(!daily[tanggal]){


        daily[tanggal]={

          harga:[],

          ...getLimitData(item)

        }


      }



      daily[tanggal]
        .harga
        .push(
          Number(item.harga)
        )


    }

  )






  const dailyResult:TrendPoint[] =


  Object.entries(
    daily
  )

  .sort(
    (a,b)=>
      a[0]
      .localeCompare(
        b[0]
      )
  )


  .map(
    ([tanggal,item])=>({

      time:tanggal,

      value:
        Math.round(
          average(
            item.harga
          )
        ),


      nama:item.nama,

      het:item.het,

      hap:item.hap,

      hap_bawah:item.hap_bawah,

      hap_atas:item.hap_atas

    })
  )





// =====================================
// HARIAN
// =====================================


  if(
    period==="daily"
  ){

    return dailyResult

  }







// =====================================
// MINGGUAN
// =====================================


if(
  period==="weekly"
){


const weekly:

Record<

string,

{

value:number[]

nama:string

het:number|null

hap:number|null

hap_bawah:number|null

hap_atas:number|null

}

>

={}





dailyResult.forEach(

(item)=>{


const date =
new Date(
  item.time
)



const day =
date.getDay()



const diff =
day===0
?
-6
:
1-day



const monday =
new Date(date)



monday.setDate(
  date.getDate()+diff
)



const key =
monday
.toISOString()
.split("T")[0]





if(!weekly[key]){


weekly[key]={

value:[],

nama:item.nama,

het:item.het,

hap:item.hap,

hap_bawah:item.hap_bawah,

hap_atas:item.hap_atas

}


}




weekly[key]
.value
.push(
 item.value
)



}

)






return Object.entries(

weekly

)

.map(

([tanggal,item])=>({


time:tanggal,


value:
Math.round(
 average(
   item.value
 )
),


nama:item.nama,

het:item.het,

hap:item.hap,

hap_bawah:item.hap_bawah,

hap_atas:item.hap_atas


})

)



}








// =====================================
// BULANAN
// =====================================


if(
 period==="monthly"
){


const monthly:

Record<

string,

{

value:number[]

nama:string

het:number|null

hap:number|null

hap_bawah:number|null

hap_atas:number|null

}

>

={}





dailyResult.forEach(

(item)=>{


const date =
new Date(
 item.time
)



const key =

`${date.getFullYear()}-${

String(
date.getMonth()+1
)
.padStart(
2,
"0"
)

}-01`





if(!monthly[key]){


monthly[key]={

value:[],

nama:item.nama,

het:item.het,

hap:item.hap,

hap_bawah:item.hap_bawah,

hap_atas:item.hap_atas

}


}





monthly[key]
.value
.push(
 item.value
)



}

)







return Object.entries(

monthly

)

.map(

([tanggal,item])=>({


time:tanggal,


value:
Math.round(
 average(
  item.value
 )
),


nama:item.nama,

het:item.het,

hap:item.hap,

hap_bawah:item.hap_bawah,

hap_atas:item.hap_atas


})

)



}








// =====================================
// TRIWULAN
// =====================================


const quarterly:

Record<

string,

{

value:number[]

nama:string

het:number|null

hap:number|null

hap_bawah:number|null

hap_atas:number|null

}

>

={}





dailyResult.forEach(

(item)=>{


const date =
new Date(
 item.time
)



const year =
date.getFullYear()



const month =
date.getMonth()



let quarterMonth=0




if(
 month>=3 &&
 month<=5
){

 quarterMonth=3

}

else if(
 month>=6 &&
 month<=8
){

 quarterMonth=6

}

else if(
 month>=9
){

 quarterMonth=9

}







const key =

`${year}-${
String(
quarterMonth+1
)
.padStart(
2,
"0"
)
}-01`





if(!quarterly[key]){


quarterly[key]={

value:[],

nama:item.nama,

het:item.het,

hap:item.hap,

hap_bawah:item.hap_bawah,

hap_atas:item.hap_atas

}


}





quarterly[key]
.value
.push(
 item.value
)



}

)







return Object.entries(

quarterly

)

.map(

([tanggal,item])=>({


time:tanggal,


value:
Math.round(
 average(
  item.value
 )
),


nama:item.nama,

het:item.het,

hap:item.hap,

hap_bawah:item.hap_bawah,

hap_atas:item.hap_atas


})

)



}

export async function getPriceStatistic(

komoditasId?:string

){


const supabase =
await createClient()



const latest =
await getLatestDate()



const date7 =
subtractDays(
latest,
6
)


const date30 =
subtractDays(
latest,
29
)


const date90 =
subtractDays(
latest,
89
)





let query =

supabase
.from("survei_detail")
.select(
`
harga,

komoditas(
satuan
),

survei_harian!inner(
tanggal
)

`
)

.gte(
"survei_harian.tanggal",
date90
)





if(
komoditasId
){

query =
query.eq(
"komoditas_id",
komoditasId
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






const daily:

Record<string,number[]>

={}



let satuan=""






data?.forEach(

(item:any)=>{


const tanggal =
getTanggalSurvei(
item.survei_harian
)


if(!tanggal)
return





if(!daily[tanggal]){

daily[tanggal]=[]

}



daily[tanggal].push(

Number(item.harga)

)





if(
item.komoditas?.satuan
){

satuan =
item.komoditas.satuan

}



}

)








const dailyAverage =

Object.entries(daily)

.map(

([tanggal,harga])=>({

tanggal,

value:
average(harga)

})

)

.sort(

(a,b)=>

new Date(a.tanggal).getTime()

-

new Date(b.tanggal).getTime()

)









const getPeriodAverage = (

days:number

)=>{


const start =

subtractDays(
latest,
days-1
)





const values =

dailyAverage

.filter(

item=>

new Date(item.tanggal)

>=

new Date(start)

)

.map(

item=>

item.value

)





return Math.round(

average(values)

)

}








return {


hargaTerakhir:

Math.round(

dailyAverage[dailyAverage.length - 1]?.value ?? 0

),



weekly:

getPeriodAverage(7),



monthly:

getPeriodAverage(30),



quarterly:

getPeriodAverage(90),



satuan


}



}

// =============================
// DROPDOWN KOMODITAS
// =============================

export async function getCommodityList() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("komoditas")
    .select(`
      id,
      nama,
      satuan
    `)
    .order("nama", { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data ?? []
}