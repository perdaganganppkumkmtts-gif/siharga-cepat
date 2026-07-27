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
    "SIHARGA CEPAT | Informasi Harga Barang Kebutuhan Pokok Kabupaten Timor Tengah Selatan",


  description:
    "SIHARGA CEPAT (Sistem Informasi Harga Barang Kebutuhan Pokok Cepat dan Terpadu) menyediakan informasi harga terbaru barang kebutuhan pokok dan barang penting Kabupaten Timor Tengah Selatan secara cepat, akurat, transparan, dan mudah diakses masyarakat.",


  keywords:[

    "SIHARGA CEPAT",

    "harga bapok TTS",

    "harga bahan pokok Timor Tengah Selatan",

    "monitoring harga pangan",

    "informasi harga pasar TTS",

    "harga sembako TTS",

    "Dinas Perdagangan TTS",

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



  openGraph:{


    title:
      "SIHARGA CEPAT | Informasi Harga Bapok Kabupaten Timor Tengah Selatan",



    description:
      "Pantau perkembangan harga barang kebutuhan pokok dan barang penting Kabupaten Timor Tengah Selatan melalui SIHARGA CEPAT.",



    type:
      "website",



    locale:
      "id_ID",



    siteName:
      "SIHARGA CEPAT",



    images:[

      {

        url:
          "/siharga-light.svg",

        width:
          1200,

        height:
          630,


        alt:
          "SIHARGA CEPAT Kabupaten Timor Tengah Selatan"

      }

    ]

  },



  twitter:{


    card:
      "summary_large_image",



    title:
      "SIHARGA CEPAT | Informasi Harga Bapok TTS",



    description:
      "Sistem informasi monitoring harga barang kebutuhan pokok dan barang penting Kabupaten Timor Tengah Selatan.",



    images:[

      "/siharga-light.svg"

    ]

  },



  robots:{


    index:true,

    follow:true

  }

};







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


    <LandingPageContent


      commodities={
        commodities
      }



      publications={
        publications
      }



      stats={
        stats
      }


    />


  );


}