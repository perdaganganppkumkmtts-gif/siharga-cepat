"use client"

import {
  useEffect,
  useState
} from "react"


import {
  PriceChartFilter,
  CommodityOption
} from "./price-chart-filter"


import {
  PriceChart
} from "./price-chart"


import {
  ChartSummary
} from "./chart-summary"


import {
  ChartLegendToggle
} from "./chart-legend-toggle"


import {
  getPriceStatistic
} from "../../actions"





interface PriceAnalysisChartProps {

  commodities:
  CommodityOption[]

}





type Period =

  | "daily"

  | "weekly"

  | "monthly"

  | "quarterly"








interface PriceChartData {


  time:string


  value:number


  nama:string


  het:number | null


  hap:number | null


  hap_bawah:number | null


  hap_atas:number | null


}









export function PriceAnalysisChart({

  commodities

}:PriceAnalysisChartProps){






const [period,setPeriod] =

useState<Period>("daily")







const [commodityId,setCommodityId] =

useState("");








useEffect(()=>{


const berasMedium =


commodities.find(

(item)=>

item.nama

.toLowerCase()

.includes(

"beras medium"

)

)



if(berasMedium){


setCommodityId(

berasMedium.id

)


}



},[commodities])









const selectedCommodity =


commodities.find(

(item)=>

item.id === commodityId

)?.nama

||

"Beras Medium"











const [data,setData] =

useState<PriceChartData[]>([])








const [summary,setSummary] =

useState({

hargaTerakhir:0,

weekly:0,

monthly:0,

quarterly:0,

satuan:""

})








const [loading,setLoading] =

useState(false)








const [showHarga,setShowHarga] =

useState(true)



const [showHET,setShowHET] =

useState(true)



const [showHAP,setShowHAP] =

useState(true)



const [showHAPBawah,setShowHAPBawah] =

useState(true)



const [showHAPAtas,setShowHAPAtas] =

useState(true)












// =====================
// FETCH DATA CHART
// =====================


async function fetchChart(){


try{


setLoading(true)





let url =


`/api/analisis/chart?period=${period}`






if(commodityId !== "all"){


url +=

`&komoditasId=${commodityId}`


}







const response =

await fetch(

url,

{

cache:"no-store"

}

)







if(!response.ok){


const errorText =

await response.text()


throw new Error(

errorText ||

"Gagal mengambil data grafik"

)


}







const result:

PriceChartData[]

=

await response.json()







setData(

result ?? []

)










// =====================
// FETCH SUMMARY
// =====================


const statistic =

await getPriceStatistic(

commodityId !== "all"

?

commodityId

:

undefined

)







setSummary({


hargaTerakhir:

statistic.hargaTerakhir,



weekly:

statistic.weekly,



monthly:

statistic.monthly,



quarterly:

statistic.quarterly,



satuan:

statistic.satuan



})







}

catch(error){


console.error(

"CHART ERROR:",

error

)





setData([])






setSummary({

hargaTerakhir:0,

weekly:0,

monthly:0,

quarterly:0,

satuan:""

})



}

finally{


setLoading(false)


}



}









useEffect(()=>{


fetchChart()


},[

period,

commodityId

])









const hasHET =

data.some(

item =>

item.het !== null

)





const hasHAP =

data.some(

item =>

item.hap !== null

)





const hasHAPBawah =

data.some(

item =>

item.hap_bawah !== null

)





const hasHAPAtas =

data.some(

item =>

item.hap_atas !== null

)













// =====================
// SEO SUMMARY
// =====================


const seoSummary = (()=>{


if(data.length === 0){


return `

Belum tersedia data perkembangan harga ${selectedCommodity}
di Pasar Inpres SoE Kabupaten Timor Tengah Selatan.

`


}





const first =

data[0]



const last =

data[data.length - 1]





const perubahan =

last.value - first.value






const kondisi =


perubahan > 0

?

"mengalami kenaikan"

:

perubahan < 0

?

"mengalami penurunan"

:

"relatif stabil"







return `

Perkembangan harga ${selectedCommodity}
di Pasar Inpres SoE Kabupaten Timor Tengah Selatan
pada periode ${period}
${kondisi}.

Harga terakhir tercatat sebesar Rp
${summary.hargaTerakhir.toLocaleString("id-ID")}
per ${summary.satuan || "satuan"}.

Informasi ini merupakan hasil monitoring harga
barang kebutuhan pokok melalui SIHARGA CEPAT
untuk memberikan informasi pasar yang cepat,
akurat, transparan, dan mudah diakses masyarakat.

`



})()













return (


<section

aria-label="
Grafik perkembangan harga barang kebutuhan pokok
"

className="
space-y-6
"

>








{/* FILTER */}



<PriceChartFilter


period={period}


commodityId={commodityId}


commodities={commodities}



onPeriodChange={

setPeriod

}



onCommodityChange={

setCommodityId

}



/>









{/* LEGEND */}



<ChartLegendToggle


showHarga={showHarga}


showHET={showHET}


showHAP={showHAP}


showHAPBawah={showHAPBawah}


showHAPAtas={showHAPAtas}




hasHET={hasHET}


hasHAP={hasHAP}


hasHAPBawah={hasHAPBawah}


hasHAPAtas={hasHAPAtas}





onShowHarga={

setShowHarga

}


onShowHET={

setShowHET

}


onShowHAP={

setShowHAP

}


onShowHAPBawah={

setShowHAPBawah

}


onShowHAPAtas={

setShowHAPAtas

}



/>









{/* CHART */}



{

loading


?


<div

className="
h-[350px]
flex
items-center
justify-center
text-muted-foreground
"

>

Memuat grafik harga...

</div>



:



<PriceChart


data={data}



showHarga={showHarga}


showHET={showHET}


showHAP={showHAP}


showHAPBawah={showHAPBawah}


showHAPAtas={showHAPAtas}


/>


}









{/* SEO TEXT */}



<div

className="
rounded-xl
border
bg-background/70
p-5
text-sm
leading-relaxed
text-muted-foreground
"

>


<p>

{seoSummary}

</p>


</div>









{/* SUMMARY */}



<ChartSummary


data={data}



lastPrice={summary.hargaTerakhir}



weekly={summary.weekly}



monthly={summary.monthly}



quarterly={summary.quarterly}



satuan={summary.satuan}



period={period}



/>







</section>


)


}