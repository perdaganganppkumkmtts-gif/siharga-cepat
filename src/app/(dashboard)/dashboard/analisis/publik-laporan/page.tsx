import {
  LaporanContent
} from "./laporan-content"


import {
  getCommodityOptions
} from "./actions"




export const metadata = {

  title:
    "Publikasi Laporan Harga Komoditas",

  description:
    "Publikasi laporan perkembangan harga barang kebutuhan pokok SIHARGA CEPAT"

}







export default async function PublikLaporanPage(){



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

Publikasi Laporan Harga Komoditas

</h1>




<p

className="
text-sm
text-muted-foreground
"

>

Sistem Informasi Harga Barang Kebutuhan Pokok Cepat dan Terpadu

</p>


</div>







<LaporanContent


commodities={commodities}


mode="dinas"


/>





</div>

)


}