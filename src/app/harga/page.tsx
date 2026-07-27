import type { Metadata } from "next";


import { HargaPageContent } from "./harga-page-content";


import {
  getAnalysisSummary,
  getPriceMovementSummary,
  getCommodityMovementRanking,
  getCommodityList,
} from "./actions";







// ==================================================
// SEO METADATA HALAMAN HARGA
// ==================================================


export const metadata: Metadata = {



title:
"Harga Bapok TTS Hari Ini | SIHARGA CEPAT",






description:

"Pantau harga barang kebutuhan pokok Kabupaten Timor Tengah Selatan hari ini melalui SIHARGA CEPAT. Informasi harga beras, cabai, bawang, minyak goreng, gula dan komoditas pangan lainnya dari Pasar Inpres Soe.",







keywords:[



"harga bapok TTS",


"harga bapok TTS hari ini",


"harga sembako TTS",


"harga pasar Soe",


"harga Pasar Inpres Soe",


"harga komoditas TTS",


"harga pangan Timor Tengah Selatan",


"harga beras TTS",


"harga cabai TTS",


"harga bawang TTS",


"monitoring harga pasar",


"SIHARGA CEPAT"



],








authors:[


{

name:

"Dinas Perdagangan, Perindustrian, Koperasi dan UMKM Kabupaten Timor Tengah Selatan"


}


],








creator:

"SIHARGA CEPAT",






publisher:

"Dinas Perdagangan, Perindustrian, Koperasi dan UMKM Kabupaten Timor Tengah Selatan",







category:

"Informasi Harga Barang Kebutuhan Pokok",







robots:{


index:true,


follow:true



},








alternates:{


canonical:

"/harga"



},










// ==================================================
// OPEN GRAPH
// ==================================================


openGraph:{



title:

"Harga Barang Kebutuhan Pokok TTS Hari Ini | SIHARGA CEPAT",





description:

"Informasi perkembangan harga barang kebutuhan pokok dan barang penting Kabupaten Timor Tengah Selatan berdasarkan pemantauan harga pasar.",





url:

"/harga",





siteName:

"SIHARGA CEPAT",





locale:

"id_ID",





type:

"website",





images:[


{

url:

"/seo-image.png",


width:

1200,


height:

630,


alt:

"SIHARGA CEPAT Monitoring Harga Bapok Kabupaten Timor Tengah Selatan"


}


]



},









// ==================================================
// TWITTER CARD
// ==================================================


twitter:{


card:

"summary_large_image",



title:

"Harga Bapok TTS Hari Ini | SIHARGA CEPAT",



description:

"Cek perkembangan harga barang kebutuhan pokok Kabupaten Timor Tengah Selatan secara cepat dan transparan.",



images:[

"/seo-image.png"

]





}



};













// ==================================================
// PAGE
// ==================================================


export default async function HargaPage(){





const [


summary,


movement,


ranking,


commodities



] = await Promise.all([



getAnalysisSummary(),



getPriceMovementSummary(),



getCommodityMovementRanking(),



getCommodityList()



]);








return (


<HargaPageContent



summary={summary}



movement={movement}



ranking={ranking}



commodities={commodities}



/>


);


}