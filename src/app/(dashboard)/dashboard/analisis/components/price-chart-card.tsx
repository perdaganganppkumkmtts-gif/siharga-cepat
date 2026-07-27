import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import {
  PriceChart
} from "./price-chart"





interface PriceChartData {

  time:string

  value:number

  het:number | null

  hap:number | null

  hap_bawah:number | null

  hap_atas:number | null

}





interface Props {

  title:string

  data:PriceChartData[]

}








export function PriceChartCard({

  title,

  data

}:Props){



return (

<Card>


<CardHeader>

<CardTitle>

{title}

</CardTitle>


</CardHeader>




<CardContent>


<PriceChart

        data={data} showHarga={false} showHET={false} showHAP={false} showHAPBawah={false} showHAPAtas={false}
/>


</CardContent>


</Card>


)

}