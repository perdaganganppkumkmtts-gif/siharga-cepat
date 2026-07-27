import {
  PublikasiPageContent
} from "./publikasi-page-content";


import {
  getPublications
} from "./actions";





export const metadata = {


  title:
    "SIHARGA CEPAT | Publikasi",



  description:
    "Laporan, rekomendasi dan berita harga barang kebutuhan pokok Kabupaten Timor Tengah Selatan",



};









export default async function PublikasiPage(){





const publications =

await getPublications();







return (



<PublikasiPageContent


publications={publications}


/>



);



}