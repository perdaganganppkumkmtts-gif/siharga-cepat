import {
  notFound
} from "next/navigation";


import type {
  Metadata
} from "next";


import Image from "next/image";


import {
  BackButton
} from "@/components/public/back-button";


import {
  ShareButton
} from "@/components/public/share-button";


import {
  getPublicationBySlug
} from "../../actions";


import {
  ReportPreview
} from "@/components/public/report-preview";


import {
  LandingNavbar
} from "@/components/landing/navbar";


import {
  LandingFooter
} from "@/components/landing/footer";





interface Props {

params:
Promise<{
slug:string
}>;

}









export async function generateMetadata({

params

}: Props): Promise<Metadata> {



const {
slug
} = await params;




const publication =

await getPublicationBySlug(slug);





if(!publication){


return {


title:
"Laporan Tidak Ditemukan | SIHARGA CEPAT",


description:
"Laporan perkembangan harga barang kebutuhan pokok."

};


}






const title =

`${publication.judul} | SIHARGA CEPAT`;





const description =

publication.ringkasan ??

"Laporan perkembangan harga barang kebutuhan pokok dari Sistem Informasi Harga Barang Kebutuhan Pokok Cepat dan Terpadu.";




const image =

publication.gambar ??

`${process.env.NEXT_PUBLIC_SITE_URL}/seo-image.png`;





const url =

`${process.env.NEXT_PUBLIC_SITE_URL}/publikasi/${slug}/laporan`;







return {



title,


description,



keywords:[

"SIHARGA CEPAT",

"harga barang kebutuhan pokok",

"harga bapok",

"harga komoditas",

"laporan harga",

"Timor Tengah Selatan",

"TTS"

],




robots:{

index:true,

follow:true

},




alternates:{

canonical:url

},





openGraph:{


title,


description,


url,


siteName:

"SIHARGA CEPAT",


locale:

"id_ID",


type:

"article",


publishedTime:

publication.published_at,



images:[

{

url:image,

width:1200,

height:630,

alt:

`${publication.judul} - SIHARGA CEPAT`

}

]


},





twitter:{


card:

"summary_large_image",


title,


description,


images:[image]


}



};


}









function ReportSchema({

publication

}:{

publication:any

}){


return (

<script

type="application/ld+json"

dangerouslySetInnerHTML={{

__html:

JSON.stringify({


"@context":

"https://schema.org",



"@type":

"Article",



headline:

publication.judul,



description:

publication.ringkasan,



image:

publication.gambar ??

`${process.env.NEXT_PUBLIC_SITE_URL}/seo-image.png`,



author:{


"@type":

"Organization",


name:

publication.created_by ??

"SIHARGA CEPAT"


},




publisher:{


"@type":

"Organization",


name:

"SIHARGA CEPAT",


logo:{


"@type":

"ImageObject",


url:

`${process.env.NEXT_PUBLIC_SITE_URL}/images/siharga-dark.svg`


}


},




datePublished:

publication.published_at,



mainEntityOfPage:{


"@type":

"WebPage",


"@id":

`${process.env.NEXT_PUBLIC_SITE_URL}/publikasi/${publication.slug}/laporan`


}



})


}}

/>


)

}

function DatasetSchema({

publication

}:{

publication:any

}){


return (

<script

type="application/ld+json"

dangerouslySetInnerHTML={{


__html:

JSON.stringify({


"@context":

"https://schema.org",



"@type":

"Dataset",



name:

publication.judul,



description:

publication.ringkasan,



creator:{


"@type":

"Organization",


name:

"SIHARGA CEPAT"


},



temporalCoverage:

publication.published_at



})


}}

/>

)

}









export default async function PublicReportPage({

params

}:Props){





const {

slug

}= await params;





const publication =

await getPublicationBySlug(slug);






if(!publication){

notFound();

}







if(publication.jenis !== "laporan"){

notFound();

}







const laporan =

publication.publikasi_laporan as unknown as {

id:string;

periode_mulai:string;

periode_selesai:string;

data_laporan:any[];

};








if(

!laporan ||

!laporan.data_laporan ||

!Array.isArray(laporan.data_laporan)

){

notFound();

}









return (

<>





<ReportSchema
publication={publication}
/>


<DatasetSchema
publication={publication}
/>






<div

className="
min-h-screen
bg-background
"

>





<LandingNavbar />







<main>


<section

className="
container
mx-auto
px-4
py-16
"

>






<div

className="
mb-8
flex
items-center
justify-between
"

>


<BackButton />



<ShareButton

title={publication.judul}

/>


</div>









<div

className="
mb-8
space-y-6
"

>





{

publication.gambar && (


<div

className="
overflow-hidden
rounded-xl
border
"

>


<Image


src={publication.gambar}


alt={publication.judul}


width={1200}


height={630}


priority


className="
h-[320px]
w-full
object-cover
"


/>


</div>


)

}








<div>


<h1

className="
text-3xl
font-bold
"

>

{publication.judul}

</h1>






<p

className="
mt-3
text-sm
text-muted-foreground
"

>

Dibuat oleh:

{" "}

<span className="font-medium">

{publication.created_by}

</span>


</p>







<p

className="
text-sm
text-muted-foreground
"

>

Dipublikasikan:

{" "}

{

new Date(

publication.published_at

).toLocaleDateString(

"id-ID"

)

}


</p>



</div>





</div>









<ReportPreview


data={laporan.data_laporan}


mode="publik"


/>








</section>


</main>









<LandingFooter />






</div>






</>

);


}