import type { Metadata } from "next";

import { HargaPageContent } from "./harga-page-content";


import {
  getAnalysisSummary,
  getPriceMovementSummary,
  getCommodityMovementRanking,
  getCommodityList,
} from "./actions";



// SEO Metadata Halaman Harga SIHARGA CEPAT

export const metadata: Metadata = {

  title:
    "SIHARGA CEPAT | Harga Bapok Kab. Timor Tengah Selatan Hari Ini ",


  description:
    "Pantau harga terbaru barang kebutuhan pokok dan barang penting Kabupaten Timor Tengah Selatan melalui SIHARGA CEPAT. Menyajikan informasi harga komoditas pangan secara cepat, akurat, dan transparan.",


  keywords: [

    "harga bapok TTS hari ini",

    "harga sembako TTS",

    "harga pasar Soe",

    "harga pangan Timor Tengah Selatan",

    "harga beras TTS",

    "harga cabai TTS",

    "harga bawang TTS",

    "monitoring harga pasar",

    "SIHARGA CEPAT",

    "Dinas Perdagangan TTS"

  ],


  authors: [

    {
      name:
      "Dinas Perdagangan, Perindustrian, Koperasi dan UMKM Kabupaten Timor Tengah Selatan"
    }

  ],


  creator:
    "SIHARGA CEPAT",


  publisher:
    "Dinas Perdagangan, Perindustrian, Koperasi dan UMKM Kabupaten Timor Tengah Selatan",


  openGraph: {

    title:
      "Harga Barang Kebutuhan Pokok Kabupaten Timor Tengah Selatan | SIHARGA CEPAT",

    description:
      "Informasi perkembangan harga barang kebutuhan pokok dan barang penting Kabupaten Timor Tengah Selatan secara berkala.",

    type:
      "website",

    locale:
      "id_ID",

    siteName:
      "SIHARGA CEPAT",

    images: [

      {

        url:
          "/siharga-light.svg",

        width:
          1200,

        height:
          630,

        alt:
          "SIHARGA CEPAT Monitoring Harga Bapok TTS"

      }

    ]

  },


  twitter: {

    card:
      "summary_large_image",

    title:
      "Harga Bapok TTS Hari Ini | SIHARGA CEPAT",

    description:
      "Cek perkembangan harga barang kebutuhan pokok dan barang penting Kabupaten Timor Tengah Selatan.",

    images:
      [
        "/siharga-light.svg"
      ]

  },


  robots: {

    index:
      true,

    follow:
      true

  }

};





export default async function HargaPage() {



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


      summary={
        summary
      }


      movement={
        movement
      }


      ranking={
        ranking
      }


      commodities={
        commodities
      }


    />


  );


}