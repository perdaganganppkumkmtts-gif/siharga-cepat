import type { Metadata } from "next";

import { LandingPageContent } from "./landing-page-content";

import {
  getCommodityTrend,
  getLatestPublications,
  getLandingStats
} from "./actions";





// ==================================================
// SEO METADATA SIHARGA CEPAT
// ==================================================

export const metadata: Metadata = {


title:
"SIHARGA CEPAT | Informasi Harga Bapok Kabupaten Timor Tengah Selatan",



description:
"Sistem Informasi Harga Barang Kebutuhan Pokok Cepat dan Terpadu (SIHARGA CEPAT) menyediakan informasi harga pangan, harga bapok, dan perkembangan komoditas Kabupaten Timor Tengah Selatan secara cepat, akurat, transparan, dan mudah diakses masyarakat.",



keywords:[

    "SIHARGA CEPAT",

    "harga bapok TTS",

    "harga bahan pokok Timor Tengah Selatan",

    "monitoring harga pangan",

    "informasi harga pasar TTS",

    "harga sembako TTS",

    "harga Pasar Inpres Soe",

    "Pasar Inpres Soe",

    "harga pasar Soe",

    "harga komoditas Soe",

    "Dinas Perdagangan TTS",

    "Dinas ppk dan umkm TTS",

    "harga barang kebutuhan pokok",

    "harga barang penting"

],




authors:[

{

name:
"Dinas Perdagangan, Perindustrian, Koperasi dan UMKM Kabupaten Timor Tengah Selatan"

}

],




creator:

"Dinas Perdagangan, Perindustrian, Koperasi dan UMKM Kabupaten Timor Tengah Selatan",




publisher:

"SIHARGA CEPAT",





category:

"Informasi Harga Barang Kebutuhan Pokok",





alternates:{


canonical:

"https://siharga-cepat.vercel.app/beranda"


},







openGraph:{



title:
"SIHARGA CEPAT | Informasi Harga Bapok TTS",




description:
"Pantau perkembangan harga barang kebutuhan pokok dan barang penting Kabupaten Timor Tengah Selatan melalui SIHARGA CEPAT.",




url:
"https://siharga-cepat.vercel.app/beranda",




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
"SIHARGA CEPAT - Sistem Informasi Harga Barang Kebutuhan Pokok Kabupaten Timor Tengah Selatan"

}

]

},







twitter:{



card:
"summary_large_image",




title:
"SIHARGA CEPAT | Informasi Harga Bapok TTS",




description:
"Pantau harga barang kebutuhan pokok Kabupaten Timor Tengah Selatan secara cepat dan transparan.",




images:[

"/seo-image.png"

]


},







robots:{


index:true,

follow:true


}



};


function WebsiteSchema(){


return (

<script

type="application/ld+json"

dangerouslySetInnerHTML={{


__html:

JSON.stringify({

"@context":

"https://schema.org",



"@type":

"WebSite",



name:

"SIHARGA CEPAT",



url:

"https://siharga-cepat.vercel.app",



description:

"Sistem Informasi Harga Barang Kebutuhan Pokok Cepat dan Terpadu Kabupaten Timor Tengah Selatan.",



publisher:{


"@type":

"Organization",


name:

"Dinas Perdagangan, Perindustrian, Koperasi dan UMKM Kabupaten Timor Tengah Selatan"


}



})


}}

/>


)

}

// ==================================================
// PAGE
// ==================================================

export default async function LandingPage(){



  // Harga komoditas tren 7 hari terakhir

  const commodities =
    await getCommodityTrend();





  // Publikasi berita + laporan terbaru

  const publications =
    await getLatestPublications();





  // Statistik website

  const stats =
    await getLandingStats();





return (

<>

<WebsiteSchema />


<LandingPageContent

commodities={commodities}

publications={publications}

stats={stats}

/>


</>

);


}