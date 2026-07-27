import type { Metadata } from "next";


import {
  PublikasiPageContent
} from "./publikasi-page-content";


import {
  getPublications
} from "./actions";





export const metadata: Metadata = {


title:

"Publikasi Harga Bapok | SIHARGA CEPAT Kabupaten Timor Tengah Selatan",




description:

"Kumpulan laporan, rekomendasi dan berita perkembangan harga barang kebutuhan pokok Kabupaten Timor Tengah Selatan melalui SIHARGA CEPAT.",





keywords:[


"publikasi harga bapok TTS",


"laporan harga TTS",


"harga barang kebutuhan pokok",


"harga komoditas Timor Tengah Selatan",


"SIHARGA CEPAT",


"informasi pangan TTS"


],





alternates:{


canonical:"/publikasi"


},





openGraph:{


title:

"Publikasi Harga Bapok | SIHARGA CEPAT",




description:

"Kumpulan laporan perkembangan harga barang kebutuhan pokok Kabupaten Timor Tengah Selatan.",




url:"/publikasi",



siteName:

"SIHARGA CEPAT",



locale:

"id_ID",



type:

"website",



images:[


{

url:"/seo-image.png",

width:1200,

height:630,

alt:
"Publikasi SIHARGA CEPAT Kabupaten Timor Tengah Selatan"

}


]


},





twitter:{


card:

"summary_large_image",



title:

"Publikasi Harga Bapok | SIHARGA CEPAT",



description:

"Kumpulan laporan perkembangan harga barang kebutuhan pokok Kabupaten Timor Tengah Selatan.",



images:[

"/seo-image.png"

]


}



};







function PublicationSchema(){


return (


<script

type="application/ld+json"

dangerouslySetInnerHTML={{

__html:

JSON.stringify({

"@context":

"https://schema.org",



"@type":

"CollectionPage",



name:

"Publikasi Harga Bapok SIHARGA CEPAT",



description:

"Kumpulan laporan dan berita perkembangan harga barang kebutuhan pokok Kabupaten Timor Tengah Selatan.",



publisher:{


"@type":

"Organization",



name:

"SIHARGA CEPAT"


}



})


}}

/>


)


}









export default async function PublikasiPage(){





const publications =

await getPublications();







return (


<>


<PublicationSchema />





<PublikasiPageContent


publications={publications}


/>



</>


);



}