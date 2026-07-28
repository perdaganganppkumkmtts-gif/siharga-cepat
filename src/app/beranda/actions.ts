import {
  createClient
} from "@/lib/supabase-server";





export async function getCommodityTrend() {

  const supabase = await createClient();


  // ==================================================
  // 1. AMBIL SEMUA DATA SURVEI TERAKHIR
  // ==================================================

  const {
    data: surveys,
    error: surveyError
  } =
  await supabase

    .from("survei_harian")

    .select(`
      id,
      tanggal
    `)

    .order(
      "tanggal",
      {
        ascending:false
      }
    );


  if(surveyError){

    throw new Error(
      surveyError.message
    );

  }


  if(!surveys || surveys.length === 0){

    return [];

  }



  // ==================================================
  // 2. TANGGAL SURVEI TERBARU
  // ==================================================

  const latestDate =
    new Date(
      surveys[0].tanggal
    );



  // ==================================================
  // 3. TENTUKAN RANGE MINGGU
  // SENIN - MINGGU
  // ==================================================

  function getWeekRange(date:Date){


    const day =
      date.getDay();


    const diff =
      day === 0
      ? -6
      : 1 - day;



    const start =
      new Date(date);

    start.setDate(
      date.getDate() + diff
    );



    const end =
      new Date(start);

    end.setDate(
      start.getDate() + 6
    );



    return {
      start,
      end
    };

  }




  const currentWeek =
    getWeekRange(
      latestDate
    );



  const previousWeekDate =
    new Date(
      currentWeek.start
    );


  previousWeekDate.setDate(
    previousWeekDate.getDate() - 1
  );



  const previousWeek =
    getWeekRange(
      previousWeekDate
    );






  function formatDate(date:Date){

    return date
      .toISOString()
      .split("T")[0];

  }






  // ==================================================
  // 4. KELOMPOKKAN SURVEI MINGGU BERJALAN
  // DAN MINGGU SEBELUMNYA
  // ==================================================


  const currentSurveyIds =
    surveys

      .filter(
        item =>
          new Date(item.tanggal)
          >= currentWeek.start
          &&
          new Date(item.tanggal)
          <= currentWeek.end
      )

      .map(
        item=>item.id
      );




  const previousSurveyIds =
    surveys

      .filter(
        item =>
          new Date(item.tanggal)
          >= previousWeek.start
          &&
          new Date(item.tanggal)
          <= previousWeek.end
      )

      .map(
        item=>item.id
      );






  if(
    currentSurveyIds.length === 0 ||
    previousSurveyIds.length === 0
  ){

    return [];

  }







  // ==================================================
  // 5. AMBIL DETAIL HARGA
  // ==================================================


  const {
    data,
    error
  }

  =
  await supabase

    .from("survei_detail")

    .select(`

      harga,

      survei_id,

      komoditas(
        nama,
        satuan
      )

    `)

    .in(
      "survei_id",
      [
        ...currentSurveyIds,
        ...previousSurveyIds
      ]
    );




  if(error){

    throw new Error(
      error.message
    );

  }







  const surveyMap =
    new Map(

      surveys.map(
        item=>[
          item.id,
          new Date(item.tanggal)
        ]
      )

    );








  // ==================================================
  // 6. GROUP PER KOMODITAS
  // ==================================================


  const grouped:any = {};



  data?.forEach(

    (item:any)=>{


      if(!item.komoditas){

        return;

      }



      const tanggal =
        surveyMap.get(
          item.survei_id
        );



      if(!tanggal){

        return;

      }




      const nama =
        item.komoditas.nama;




      if(!grouped[nama]){


        grouped[nama]={

          name:nama,

          unit:item.komoditas.satuan,

          current:[],

          previous:[]

        };


      }





      const price =
        Number(
          item.harga
        );





      if(
        tanggal >= currentWeek.start &&
        tanggal <= currentWeek.end
      ){

        grouped[nama]
        .current
        .push(price);

      }





      if(
        tanggal >= previousWeek.start &&
        tanggal <= previousWeek.end
      ){

        grouped[nama]
        .previous
        .push(price);

      }



    }

  );







  // ==================================================
  // 7. HITUNG TREND
  // ==================================================


  const result =

  Object.values(grouped)

  .map(

    (item:any)=>{


      if(
        item.current.length === 0 ||
        item.previous.length === 0
      ){

        return null;

      }




      // harga terbaru minggu berjalan

      const latestPrice =
        item.current[
          item.current.length - 1
        ];






      // rata-rata minggu sebelumnya

      const previousAverage =

        item.previous.reduce(

          (
            sum:number,
            value:number
          )=>

            sum + value,

          0

        )

        /

        item.previous.length;







      const change =

        latestPrice -
        previousAverage;






      const percent =

        previousAverage === 0

        ?

        0

        :

        (
          change /
          previousAverage
        )

        *

        100;







      return {

        name:item.name,

        unit:item.unit,

        price:
          Math.round(
            latestPrice
          ),

        change:
          Number(
            change.toFixed(2)
          ),

        percent:
          Number(
            percent.toFixed(2)
          ),

        status:

          change > 0

          ?

          "up"

          :

          change < 0

          ?

          "down"

          :

          "flat"

      };


    }

  )

  .filter(Boolean);







  // ==================================================
  // 8. URUTKAN FLUKTUASI TERBESAR
  // ==================================================


  return result

    .sort(

      (a:any,b:any)=>

        Math.abs(b.percent)

        -

        Math.abs(a.percent)

    )

    .slice(
      0,
      10
    );


}

export async function getLatestPublications(){


const supabase =
await createClient();




const {

data,

error

}

=
await supabase

.from("publikasi")

.select(`

id,

judul,

slug,

jenis,

ringkasan,

gambar,

published_at

`)

.eq(
"status",
"published"
)

.order(
"published_at",
{
ascending:false
}
)

.limit(3);







if(error){


console.error(
"GET PUBLICATIONS ERROR:",
JSON.stringify(
error,
null,
2
)
);


throw new Error(
error.message
);


}







return data ?? [];



}

export async function submitFeedback({

  nama,

  whatsapp,

  rating,

  pesan,

}:{

  nama:string

  whatsapp:string

  rating:number

  pesan:string

}){


const supabase =
await createClient();



const {

error

}
=
await supabase

.from("feedback")

.insert({

nama,

whatsapp,

rating,

pesan

});





if(error){

console.error(
"SUBMIT FEEDBACK ERROR:",
error
);


throw new Error(
error.message
);


}




return {

success:true

};



}

export async function getLandingStats() {


  const supabase =
    await createClient()





  // ==============================
  // TANGGAL
  // ==============================


  const today =
    new Date()


  const todayString =
    today
      .toISOString()
      .split("T")[0]




  const sevenDaysAgo =
    new Date(today)


  sevenDaysAgo.setDate(
    sevenDaysAgo.getDate() - 6
  )



  const sevenDaysString =
    sevenDaysAgo
      .toISOString()
      .split("T")[0]








  // ==============================
  // AMBIL DATA VISITOR
  // ==============================


  const {
    data: visits,
    error: visitError
  } = await supabase

  .from("website_visits")

  .select(
    "session_id, visit_date"
  )







  if(visitError){

    console.error(
      "VISITOR STAT ERROR:",
      visitError
    )

  }









  // ==============================
  // HITUNG UNIQUE VISITOR
  // ==============================


  const todayVisitor =
    new Set<string>()



  const weekVisitor =
    new Set<string>()



  const totalVisitor =
    new Set<string>()






  visits?.forEach((item)=>{


    if(!item.session_id){

      return

    }




    // TOTAL SEMUA WAKTU

    totalVisitor.add(
      item.session_id
    )







    // HARI INI

    if(
      item.visit_date === todayString
    ){

      todayVisitor.add(
        item.session_id
      )

    }







    // 7 HARI TERAKHIR

    if(
      item.visit_date >= sevenDaysString
      &&
      item.visit_date <= todayString
    ){

      weekVisitor.add(
        item.session_id
      )

    }




  })









  // ==============================
  // RATING
  // ==============================


  const {
    data:feedback
  } =
  await supabase

  .from("feedback")

  .select(
    "rating"
  )







  let averageRating = 0






  if(
    feedback &&
    feedback.length > 0
  ){


    averageRating =

      feedback.reduce(

        (
          total,
          item
        ) =>

        total +
        Number(item.rating),

        0

      )

      /

      feedback.length



  }









  // ==============================
  // RETURN
  // ==============================


  return {


    todayVisitor:
      todayVisitor.size,



    weekVisitor:
      weekVisitor.size,



    totalVisitor:
      totalVisitor.size,



    averageRating:
      Number(
        averageRating.toFixed(1)
      )


  }



}
