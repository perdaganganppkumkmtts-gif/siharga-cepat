"use client"


import {
  useEffect,
  useState
} from "react"



import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"



import {
  PriceChart
} from "./price-chart"



import {
  PriceChartFilter,
  ChartPeriod
} from "./price-chart-filter"





interface Commodity {

  id:string

  nama:string

}





interface PriceChartData {

  time:string

  value:number

  het:number | null

  hap:number | null

  hap_bawah:number | null

  hap_atas:number | null

}





interface Props {

  commodities:Commodity[]

}









export function PriceChartSection({

  commodities

}:Props){





const [period,setPeriod] =

useState<ChartPeriod>(
  "monthly"
)







const [commodityId,setCommodityId] =

useState<string>(
  "all"
)







const [chartData,setChartData] =

useState<PriceChartData[]>([])







const [loading,setLoading] =

useState(false)









async function loadChart(){



try{


setLoading(true)





let url =

`/api/analisis/chart?period=${period}`






if(
commodityId !== "all"
){


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

throw new Error(
"Gagal mengambil data grafik"
)

}







const data =

await response.json()









// pastikan format sesuai PriceChart

const formatted:PriceChartData[] =

data.map(

(item:any)=>(


{

time:
item.time,


value:
Number(item.value),


het:
item.het ?? null,


hap:
item.hap ?? null,


hap_bawah:
item.hap_bawah ?? null,


hap_atas:
item.hap_atas ?? null

}


)

)






setChartData(
formatted
)







}

catch(error){



console.error(

"CHART ERROR:",

error

)



setChartData([])



}

finally{


setLoading(false)


}



}









useEffect(()=>{


loadChart()


},[

period,

commodityId

])









return (


<Card>


<CardHeader>


<CardTitle>

Perkembangan Harga Komoditas

</CardTitle>


</CardHeader>








<CardContent

className="
space-y-6
"

>







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








{

loading

?

(

<div

className="
h-[350px]
flex
items-center
justify-center
text-muted-foreground
"

>

Memuat grafik...

</div>

)


:

(

<PriceChart

              data={chartData} showHarga={false} showHET={false} showHAP={false} showHAPBawah={false} showHAPAtas={false}
/>

)


}








</CardContent>


</Card>


)


}