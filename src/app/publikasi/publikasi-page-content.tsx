"use client";


import {
  useState
} from "react";


import {
  LandingNavbar
} from "@/components/landing/navbar";


import {
  LandingFooter
} from "@/components/landing/footer";


import {
  Badge
} from "@/components/ui/badge";


import {
  DotPattern
} from "@/components/dot-pattern";


import {
  Newspaper
} from "lucide-react";


import {
  PublicationFilter
} from "./components/publication-filter";


import {
  PublicationList
} from "./components/publication-list";









interface Publication {


  id:string;


  jenis:
  "laporan"
  |
  "berita";


  judul:string;


  ringkasan:string|null;


  gambar:string|null;


  slug:string;


  created_by:string|null;


  published_at:string;



}








interface Props {


  publications:
  Publication[];



}









export function PublikasiPageContent({

  publications

}:Props){






const [

category,

setCategory

]=

useState("Semua");









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









{/* =========================
HEADER
========================= */}





<section

className="
pt-28
pb-14
text-center
"

>







<Badge


variant="outline"


className="
mb-5
border-green-600/30
text-green-700
dark:text-green-400
"

>





<Newspaper


className="
mr-2
h-4
w-4
"

/>





Publikasi




</Badge>









<h1

className="
text-4xl
font-bold
tracking-tight
sm:text-5xl
"

>





Informasi dan Publikasi







<span

className="
block
bg-gradient-to-r
from-green-600
via-green-500
to-red-500
bg-clip-text
text-transparent
"

>





Harga Barang Kebutuhan Pokok




</span>






</h1>









<p

className="
mx-auto
mt-5
max-w-3xl
text-muted-foreground
"

>





Akses laporan harga dan berita terbaru
perkembangan harga barang kebutuhan pokok
Kabupaten Timor Tengah Selatan.






</p>






</section>












{/* =========================
CONTENT
========================= */}





<section

className="
pb-20
space-y-10
"

>







<PublicationFilter



activeCategory={category}



setActiveCategory={setCategory}



/>









{

publications.length > 0

?

<PublicationList


publications={publications}


category={category}


/>


:





<div

className="
rounded-xl
border
p-10
text-center
text-muted-foreground
"

>



Belum ada publikasi.



</div>





}









</section>









</div>









</section>









</main>









<LandingFooter />









</div>





);



}