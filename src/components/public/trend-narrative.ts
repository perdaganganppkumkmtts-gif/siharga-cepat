import {
  CommodityAnalysisResult
} from "./trend-analysis"


interface NarrativeInput
extends CommodityAnalysisResult {

  nama:string

  satuan:string

}


function rupiah(
  value:number
){

  return `Rp${Math.round(value).toLocaleString("id-ID")}`

}


function formatTanggal(
  tanggal:string
){

  return new Date(
    tanggal
  ).toLocaleDateString(
    "id-ID",
    {
      day:"numeric",
      month:"long",
      year:"numeric",
    }
  )

}


function formatPersen(
  value:number
){

  return Math.abs(value)
  .toFixed(2)

}



export function generateTrendNarrative(
  data:NarrativeInput
){

const sentences:string[]=[]



// =============================
// PERKEMBANGAN HARGA
// =============================


sentences.push(

`Harga ${data.nama} pada periode ${formatTanggal(
data.periodeAnalisis.mulai
)}
sampai
${formatTanggal(
data.periodeAnalisis.sampai
)}
memiliki rata-rata harga sebesar
${rupiah(
data.perkembangan.rataRata
)}/${data.satuan}.`

)





// =============================
// PERBANDINGAN PERIODE
// =============================


if(
data.perbandingan.trend==="Naik"
){

sentences.push(

`Dibandingkan dengan periode sebelumnya yaitu ${formatTanggal(
data.periodePembanding.mulai
)}
sampai
${formatTanggal(
data.periodePembanding.sampai
)},
harga ${data.nama} mengalami kenaikan sebesar
${formatPersen(
data.perbandingan.perubahanPersen
)}%.`

)

}



if(
data.perbandingan.trend==="Turun"
){

sentences.push(

`Dibandingkan dengan periode sebelumnya yaitu ${formatTanggal(
data.periodePembanding.mulai
)}
sampai
${formatTanggal(
data.periodePembanding.sampai
)},
harga ${data.nama} mengalami penurunan sebesar
${formatPersen(
data.perbandingan.perubahanPersen
)}%.`

)

}



if(
data.perbandingan.trend==="Stabil"
){

sentences.push(

`Dibandingkan dengan periode sebelumnya yaitu ${formatTanggal(
data.periodePembanding.mulai
)}
sampai
${formatTanggal(
data.periodePembanding.sampai
)},
harga ${data.nama} relatif stabil.`

)

}




// =============================
// PERKEMBANGAN NILAI HARGA
// =============================


sentences.push(

`Harga tertinggi selama periode analisis mencapai ${rupiah(
data.perkembangan.hargaTertinggi
)}/${data.satuan},
sedangkan harga terendah sebesar ${rupiah(
data.perkembangan.hargaTerendah
)}/${data.satuan}.`

)





// =============================
// FLUKTUASI
// =============================


sentences.push(

`Pergerakan harga ${data.nama} memiliki tingkat fluktuasi ${data.fluktuasi.kategori.toLowerCase()} dengan koefisien variasi sebesar ${data.fluktuasi.koefisienVariasi.toFixed(2)}%.`

)





// =============================
// HAP
// =============================


if(
data.statusHAP==="Dalam zona HAP"
){

sentences.push(

`Harga ${data.nama} berada dalam zona HAP yang telah ditetapkan.`

)

}


if(
data.statusHAP==="Di atas HAP"
){

sentences.push(

`Harga ${data.nama} berada di atas batas HAP sebesar ${data.selisihHAP?.toFixed(2)}%.`

)

}


if(
data.statusHAP==="Di bawah HAP"
){

sentences.push(

`Harga ${data.nama} berada di bawah batas HAP sebesar ${data.selisihHAP?.toFixed(2)}%.`

)

}





// =============================
// HET
// =============================


if(
data.statusHET==="Sesuai HET"
){

sentences.push(

`Harga ${data.nama} masih sesuai dengan HET yang telah ditetapkan.`

)

}


if(
data.statusHET==="Di atas HET"
){

sentences.push(

`Harga ${data.nama} berada di atas HET sebesar ${data.selisihHET?.toFixed(2)}%.`

)

}


if(
data.statusHET==="Di bawah HET"
){

sentences.push(

`Harga ${data.nama} berada di bawah HET sebesar ${data.selisihHET?.toFixed(2)}%.`

)

}



return sentences.join(" ")

}