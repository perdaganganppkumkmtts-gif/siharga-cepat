import {
  LaporanContent
} from "./laporan-content"


import {
  getCommodityOptions
} from "../trend-fluktuasi/actions"





export const metadata = {

  title:
    "Laporan Analisis Harga Komoditas",

  description:
    "Laporan perkembangan harga barang kebutuhan pokok"

}







export default async function LaporanPage(){





const commodities =
await getCommodityOptions()







return (

<div

className="
space-y-6
p-6
"

>





<div>

<h1

className="
text-2xl
font-bold
"

>

Laporan Analisis Harga Komoditas

</h1>




<p

className="
text-sm
text-muted-foreground
"

>

Penyusunan laporan perkembangan harga berdasarkan periode analisis dan perbandingan periode sebelumnya.

</p>


</div>









<LaporanContent

commodities={
commodities
}

/>






</div>


)


}