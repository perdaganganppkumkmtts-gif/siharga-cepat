import {
  createClient
} from "@/lib/supabase-server";





export async function getCommodityTrend(){


const supabase =
await createClient();






// ==================================================
// 1. AMBIL TANGGAL SURVEI TERBARU
// ==================================================


const {

data: surveiTerbaru,

error: latestError

}
=
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
)

.limit(1)
.maybeSingle();






if(latestError){


console.error(
"GET LATEST SURVEY ERROR:",
JSON.stringify(
latestError,
null,
2
)
);


throw new Error(
latestError.message
);


}







if(!surveiTerbaru){

return [];

}









// ==================================================
// 2. HITUNG PERIODE 7 HARI TERAKHIR
//    BERDASARKAN DATA TERBARU
// ==================================================


const tanggalAkhir =

new Date(
surveiTerbaru.tanggal
);



const tanggalAwal =

new Date(
tanggalAkhir
);



tanggalAwal.setDate(
tanggalAwal.getDate() - 6
);






const periodeMulai =

tanggalAwal
.toISOString()
.split("T")[0];



const periodeAkhir =

tanggalAkhir
.toISOString()
.split("T")[0];









// ==================================================
// 3. AMBIL DATA SURVEI 7 HARI
// ==================================================


const {

data: survei,

error: surveiError

}
=
await supabase

.from("survei_harian")

.select(`

id,

tanggal

`)

.gte(
"tanggal",
periodeMulai
)

.lte(
"tanggal",
periodeAkhir
)

.order(
"tanggal",
{
ascending:true
}
);






if(surveiError){


console.error(
"GET SURVEY ERROR:",
JSON.stringify(
surveiError,
null,
2
)
);


throw new Error(
surveiError.message
);


}






if(
!survei ||
survei.length===0
){

return [];

}









// ==================================================
// 4. AMBIL DETAIL HARGA KOMODITAS
// ==================================================


const surveiIds =

survei.map(
(item)=>item.id
);






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
surveiIds
);






if(error){


console.error(
"GET DETAIL ERROR:",
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









// ==================================================
// 5. KELOMPOKAN DATA KOMODITAS
// ==================================================


const grouped:any = {};






data?.forEach(

(item:any)=>{


const survey =

survei.find(

(s)=>
s.id === item.survei_id

);





if(
!survey ||
!item.komoditas
){

return;

}





const nama =

item.komoditas.nama;






if(
!grouped[nama]
){


grouped[nama]={


name:nama,


unit:item.komoditas.satuan,


prices:[]


};


}






grouped[nama]
.prices
.push({

tanggal:
survey.tanggal,


value:
Number(item.harga)

});



}

);









// ==================================================
// 6. HITUNG PERUBAHAN HARGA
// ==================================================


const result =


Object.values(grouped)

.map(

(item:any)=>{



const prices =

item.prices.sort(

(a:any,b:any)=>

new Date(a.tanggal).getTime()
-
new Date(b.tanggal).getTime()

);






const first =

prices[0];



const last =

prices[
prices.length - 1
];







const change =

last.value -
first.value;






const percent =

first.value === 0

?

0

:

(change / first.value) * 100;







return {


name:
item.name,


unit:
item.unit,


price:
last.value,


change,


percent,



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

);









// ==================================================
// 7. URUTKAN PALING FLUKTUATIF
// ==================================================


return result

.sort(

(a:any,b:any)=>

Math.abs(
b.percent
)

-

Math.abs(
a.percent
)

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
