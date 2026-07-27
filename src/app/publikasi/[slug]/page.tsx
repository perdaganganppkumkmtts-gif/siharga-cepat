import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";


import {
  ArrowLeft,
  CalendarDays,
  FileText,
  Newspaper,
} from "lucide-react";



import {
  FadeUp
} from "@/components/animations/fade-up";


import {
  LandingNavbar
} from "@/components/landing/navbar";


import {
  LandingFooter
} from "@/components/landing/footer";


import {
  DotPattern
} from "@/components/dot-pattern";


import {
  Badge
} from "@/components/ui/badge";


import {
  Button
} from "@/components/ui/button";


import {
  getPublicationBySlug
} from "../actions";









function formatTanggal(

tanggal:string

){


return new Date(

tanggal

)

.toLocaleDateString(

"id-ID",

{

day:"numeric",

month:"long",

year:"numeric"

}

);


}











export async function generateMetadata({

params,

}:{

params:
Promise<{
slug:string
}>

}):Promise<Metadata>{





const {

slug

}=

await params;





const publication =

await getPublicationBySlug(

slug

);







if(!publication){


return {


title:
"Publikasi Tidak Ditemukan",


description:
"Informasi publikasi SIHARGA CEPAT"


};


}








return {


title:

`${publication.judul} | SIHARGA CEPAT`,




description:

publication.ringkasan ??

"Publikasi harga barang kebutuhan pokok",






openGraph:{


title:

publication.judul,



description:

publication.ringkasan ?? "",



type:

"article",



images:

publication.gambar

?

[

{

url:
publication.gambar,

width:1200,

height:630,

alt:publication.judul

}

]

:

[]

}






};


}













export default async function PublicationDetailPage({


params,


}:{

params:
Promise<{
slug:string
}>

}){






const {

slug

}=

await params;






const publication =

await getPublicationBySlug(

slug

);






if(!publication){

notFound();

}






const isLaporan =

publication.jenis === "laporan";






const laporan =

publication.publikasi_laporan?.[0];









return (



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
relative
overflow-hidden
bg-gradient-to-br
from-green-500/10
via-background
to-red-500/10
"

>





<DotPattern

className="
absolute
inset-0
opacity-40
"

size="md"

fadeStyle="ellipse"

/>








<div

className="
relative
container
mx-auto
px-4
"

>





<FadeUp>





<article

className="
mx-auto
max-w-4xl
pt-28
pb-20
"

>







<Button

variant="ghost"

asChild

className="mb-8"

>


<Link

href="/publikasi"

>


<ArrowLeft

className="
mr-2
h-4
w-4
"

/>


Kembali ke Publikasi


</Link>


</Button>









<Badge

variant="outline"

className="
border-green-600/30
text-green-700
dark:text-green-400
"

>


{

isLaporan

?

<FileText className="mr-1 h-3 w-3"/>

:

<Newspaper className="mr-1 h-3 w-3"/>

}



{

isLaporan

?

"Laporan"

:

"Berita"

}



</Badge>











<h1

className="
mt-5
text-3xl
font-bold
tracking-tight
sm:text-5xl
"

>

{publication.judul}


</h1>










<div

className="
mt-5
flex
items-center
gap-2
text-sm
text-muted-foreground
"

>


<CalendarDays

className="h-4 w-4"

/>


{

formatTanggal(

publication.published_at

)

}


</div>









<div

className="
relative
mt-10
aspect-video
overflow-hidden
rounded-2xl
border
shadow-lg
"

>



<Image


src={

publication.gambar ??

"/placeholder-report.png"

}



alt={publication.judul}



fill



priority



className="
object-cover
"



/>


</div>














{/* RINGKASAN */}



{

publication.ringkasan &&


<p

className="
mt-10
text-lg
font-medium
leading-8
"

>


{publication.ringkasan}


</p>


}















{/* LAPORAN */}



{

isLaporan && laporan && (



<div

className="
mt-10
rounded-xl
border
p-6
space-y-4
"

>


<h2

className="
font-bold
text-xl
"

>

Periode Analisis


</h2>





<p

className="
text-muted-foreground
"

>


{

formatTanggal(

laporan.periode_mulai

)

}


{" - "}


{

formatTanggal(

laporan.periode_selesai

)

}


</p>





<Button

asChild

>


<Link

href={`/publikasi/${publication.slug}/laporan`}

>


<FileText

className="
mr-2
h-4
w-4
"

/>


Lihat Detail Analisis


</Link>


</Button>




</div>



)

}













{/* BERITA */}



{


!isLaporan && publication.konten && (



<div

className="
mt-10
space-y-6
leading-8
text-muted-foreground
"

>


{

publication.konten

.split("\n\n")

.map(

(paragraph:string,index:number)=>(


<p

key={index}

>

{paragraph}


</p>


)

)

}



</div>


)


}












</article>







</FadeUp>






</div>






</section>





</main>







<LandingFooter />









<Script

id="publication-schema"

type="application/ld+json"

>

{

JSON.stringify({


"@context":

"https://schema.org",



"@type":

isLaporan

?

"Report"

:

"NewsArticle",



"headline":

publication.judul,



"description":

publication.ringkasan,



"datePublished":

publication.published_at,



"author":{

"@type":

"Organization",

"name":

publication.created_by ??

"SIHARGA CEPAT"

},



"publisher":{

"@type":

"Organization",

"name":

"SIHARGA CEPAT"

}



})

}


</Script>







</div>



);


}