import {
  LaporanContent
} from "../publik-laporan/laporan-content"



import {
  getCommodityOptions
} from "../publik-laporan/actions"






export const metadata = {

title:
"Laporan Analisis Harga Komoditas"



}







export default async function LaporanDinasPage(){



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

Penyusunan laporan perkembangan harga untuk kebutuhan internal Dinas.

</p>


</div>









<LaporanContent


commodities={commodities}


mode="publik"


/>





</div>

)

}