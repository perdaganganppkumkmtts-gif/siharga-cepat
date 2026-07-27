interface SummaryInput {


  total:number


  namaKomoditas?:string[]


  naik:number

  turun:number

  stabil:number


  fluktuasiTinggi:number



  diAtasHAP:number

  diBawahHAP:number

  zonaHAP:number



  diAtasHET:number

  diBawahHET:number

  sesuaiHET:number




  kenaikanTertinggi?:{

    nama:string

    perubahan:number

  }



  penurunanTerbesar?:{

    nama:string

    perubahan:number

  }



  periodeAnalisis?:{

    mulai:string

    sampai:string

  }



  periodePembanding?:{

    mulai:string

    sampai:string

  }


}





function formatPercent(
 value:number
){

return `${Math.abs(value).toFixed(2)}%`

}





function formatTanggal(
 tanggal:string
){

return new Date(
 tanggal
)
.toLocaleDateString(
"id-ID",
{
day:"numeric",
month:"long",
year:"numeric",
}
)

}









export function generateSummaryNarrative(
data:SummaryInput
){


const sentences:string[] = []







/*
============================
PERIODE
============================
*/


if(
data.periodeAnalisis &&
data.periodePembanding
){

sentences.push(

`Analisis perkembangan harga dilakukan pada periode ${formatTanggal(
data.periodeAnalisis.mulai
)} sampai dengan ${formatTanggal(
data.periodeAnalisis.sampai
)} dengan pembanding periode ${formatTanggal(
data.periodePembanding.mulai
)} sampai dengan ${formatTanggal(
data.periodePembanding.sampai
)}.`

)

}










/*
============================
KOMODITAS PANTAUAN
============================
*/


if(
data.namaKomoditas &&
data.namaKomoditas.length > 0
){

sentences.push(

`Komoditas yang dianalisis meliputi ${data.namaKomoditas.join(
", "
)}.`

)

}











/*
============================
KONDISI UMUM
============================
*/


const kondisi:string[]=[]



if(data.naik>0){

kondisi.push(
`${data.naik} komoditas mengalami kenaikan harga`
)

}



if(data.turun>0){

kondisi.push(
`${data.turun} komoditas mengalami penurunan harga`
)

}



if(data.stabil>0){

kondisi.push(
`${data.stabil} komoditas berada dalam kondisi stabil`
)

}





let kecenderungan = ""



if(
data.naik > data.turun
){

kecenderungan =
"menunjukkan kecenderungan peningkatan"

}

else if(
data.turun > data.naik
){

kecenderungan =
"menunjukkan kecenderungan penurunan"

}

else{

kecenderungan =
"menunjukkan pergerakan yang relatif berimbang"

}







sentences.push(

`Berdasarkan hasil analisis terhadap ${data.total} komoditas pantauan, secara umum perkembangan harga ${kecenderungan} dibandingkan periode pembanding sebelumnya. ${
kondisi.length > 0
?
kondisi.join(", ")
:
"tidak terdapat perubahan harga yang signifikan"
}.`

)











/*
============================
KENAIKAN TERTINGGI
============================
*/


if(
data.kenaikanTertinggi
){

sentences.push(

`Komoditas dengan peningkatan harga tertinggi adalah ${data.kenaikanTertinggi.nama} dengan kenaikan sebesar ${formatPercent(
data.kenaikanTertinggi.perubahan
)} dibandingkan periode sebelumnya.`

)

}









/*
============================
PENURUNAN TERBESAR
============================
*/


if(
data.penurunanTerbesar
){

sentences.push(

`Sementara itu, komoditas dengan penurunan harga terbesar adalah ${data.penurunanTerbesar.nama} dengan penurunan sebesar ${formatPercent(
data.penurunanTerbesar.perubahan
)}.`

)

}









/*
============================
FLUKTUASI
============================
*/


if(
data.fluktuasiTinggi > 0
){

sentences.push(

`Dari sisi stabilitas harga, terdapat ${data.fluktuasiTinggi} komoditas dengan tingkat fluktuasi tinggi yang perlu mendapat perhatian dalam pemantauan perkembangan harga.`

)

}

else{

sentences.push(

`Secara umum tingkat fluktuasi harga komoditas berada dalam kondisi terkendali.`

)

}











/*
============================
HAP
============================
*/


if(
data.diAtasHAP > 0
){

sentences.push(

`Berdasarkan parameter Harga Acuan Pemerintah (HAP), terdapat ${data.diAtasHAP} komoditas berada di atas batas HAP sehingga perlu menjadi perhatian dalam pengawasan harga dan distribusi.`

)

}



else{

sentences.push(

`Seluruh komoditas yang dianalisis tidak terdapat indikasi harga di atas batas HAP.`

)

}











/*
============================
HET
============================
*/


if(
data.diAtasHET > 0
){

sentences.push(

`Dari sisi Harga Eceran Tertinggi (HET), terdapat ${data.diAtasHET} komoditas berada di atas ketentuan HET dan perlu dilakukan pemantauan lebih lanjut.`

)

}



else{

sentences.push(

`Berdasarkan hasil pemantauan, tidak terdapat komoditas yang melebihi batas HET.`

)

}








return sentences.join(" ")

}