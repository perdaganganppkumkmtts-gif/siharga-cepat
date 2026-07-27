import type { MetadataRoute } from "next";

import {
  getPublications
} from "@/app/publikasi/actions";



export default async function sitemap()
: Promise<MetadataRoute.Sitemap> {



const baseUrl =
process.env.NEXT_PUBLIC_SITE_URL
??
"https://sihargacepat-ppkumkmtts.vercel.app";





// =============================
// HALAMAN STATIS
// =============================

const staticPages = [

{
url: `${baseUrl}`,
lastModified: new Date(),
changeFrequency:
"daily" as const,
priority: 1,
},


{
url:
`${baseUrl}/harga`,

lastModified:
new Date(),

changeFrequency:
"daily" as const,

priority:
0.9,

},


{
url:
`${baseUrl}/publikasi`,

lastModified:
new Date(),

changeFrequency:
"weekly" as const,

priority:
0.8,

},


];







// =============================
// AMBIL PUBLIKASI
// =============================


const publications =
await getPublications();







// =============================
// DETAIL PUBLIKASI
// =============================


const publicationPages =

publications.map((item)=>{


const url =

item.jenis === "laporan"

?

`${baseUrl}/publikasi/${item.slug}/laporan`

:

`${baseUrl}/publikasi/${item.slug}`;



return {


url,


lastModified:
new Date(
item.published_at
),


changeFrequency:
"monthly" as const,


priority:
0.7,


};


});








return [

...staticPages,


...publicationPages,


];


}