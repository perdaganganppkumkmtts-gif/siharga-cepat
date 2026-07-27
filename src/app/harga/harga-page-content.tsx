"use client"

import {
  BarChart3,
  FileText
} from "lucide-react"


import Link from "next/link"


import {
  LandingNavbar
} from "@/components/landing/navbar"


import {
  LandingFooter
} from "@/components/landing/footer"


import {
  Badge
} from "@/components/ui/badge"


import {
  DotPattern
} from "@/components/dot-pattern"


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"


import {
  CommodityRanking
} from "./components/pakai/commodity-ranking"


import {
  PriceAnalysisChart
} from "./components/pakai/price-analysis-chart"





interface Props {

  summary:any

  movement:any

  ranking:any

  commodities:any[]

}









export function HargaPageContent({


  summary,

  movement,

  ranking,

  commodities


}:Props){





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
"

>






{/* =========================
HERO SEO
========================= */}


<section

className="
pt-28
pb-14
"

>


<div

className="
container
mx-auto
px-4
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


<BarChart3

className="
mr-2
h-4
w-4
"

/>


Monitoring Harga Pasar Inpres SoE



</Badge>









<h1

className="
text-4xl
font-bold
tracking-tight
sm:text-5xl
"

>


Harga Barang Kebutuhan Pokok


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


Kabupaten Timor Tengah Selatan


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


Pantau perkembangan harga barang kebutuhan pokok dan barang penting
Kabupaten Timor Tengah Selatan melalui SIHARGA CEPAT.
Data harga bersumber dari pemantauan komoditas di
Pasar Inpres SoE untuk menyediakan informasi harga yang cepat,
akurat, transparan, dan mudah diakses masyarakat.



</p>






</div>


</section>









{/* =========================
CONTENT
========================= */}


<section

className="
container
mx-auto
space-y-10
px-4
pb-20
"

>










{/* DESKRIPSI SEO */}


<section

className="
rounded-xl
border
bg-background/70
p-6
"

>


<h2

className="
text-xl
font-semibold
"

>

Monitoring Harga Bapok Pasar Inpres SoE


</h2>





<p

className="
mt-3
text-sm
leading-relaxed
text-muted-foreground
"

>


SIHARGA CEPAT menyajikan informasi perkembangan harga
beras, cabai, bawang, telur, minyak goreng, dan komoditas
barang kebutuhan pokok lainnya di Kabupaten Timor Tengah Selatan.
Data ini digunakan untuk membantu masyarakat, pelaku usaha,
dan pemerintah daerah dalam memantau perubahan harga pasar.



</p>


</section>









{/* =========================
RANKING
========================= */}



<Card>


<CardHeader>


<CardTitle>

Perubahan Harga Komoditas Minggu Terakhir


</CardTitle>


</CardHeader>





<CardContent>


<div

className="
grid
gap-4
md:grid-cols-2
"

>


<CommodityRanking


title="
Harga Bapok Mengalami Kenaikan
"


data={

ranking?.naik ?? []

}


/>







<CommodityRanking


title="
Harga Bapok Mengalami Penurunan
"


data={

ranking?.turun ?? []

}


/>





</div>


</CardContent>


</Card>














{/* =========================
CHART
========================= */}




<Card>


<CardHeader>


<CardTitle>

Perkembangan Harga Bapok Pasar Inpres SoE


</CardTitle>


</CardHeader>





<CardContent>



<PriceAnalysisChart


commodities={commodities}


/>



</CardContent>


</Card>














{/* =========================
CTA PUBLIKASI
========================= */}





<Card>


<CardContent

className="
p-8
text-center
"

>


<FileText

className="
mx-auto
mb-4
h-10
w-10
text-green-600
"

/>





<h2

className="
text-xl
font-semibold
"

>


Laporan Analisis Harga Barang Kebutuhan Pokok


</h2>






<p

className="
mx-auto
mt-3
max-w-xl
text-sm
text-muted-foreground
"

>


Lihat laporan perkembangan harga dan analisis komoditas
Kabupaten Timor Tengah Selatan melalui halaman publikasi
SIHARGA CEPAT.


</p>







<Link

href="/publikasi"

className="
mt-5
inline-flex
rounded-md
bg-green-600
px-5
py-2
text-sm
font-medium
text-white
transition
hover:bg-green-700
"

>


Lihat Publikasi


</Link>





</CardContent>


</Card>









</section>







</div>






</section>





</main>







<LandingFooter />





</div>



)


}