"use client"

import {
  useState
} from "react"


import {
  BarChart3
} from "lucide-react"


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

<div className="min-h-screen bg-background">


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





<div className="relative">



{/* HEADER */}


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


Informasi Harga



</Badge>







<h1

className="
text-4xl
font-bold
tracking-tight
sm:text-5xl
"

>


Informasi Harga


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


Barang Kebutuhan Pokok


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


Pantau perkembangan harga barang kebutuhan pokok
dan barang penting Kabupaten Timor Tengah Selatan, berdasarkan harga di Pasar Inpres SoE.


</p>



</div>


</section>







{/* CONTENT */}


<section

className="
container
mx-auto
px-4
pb-20
space-y-10
"

>









{/* RANKING */}



<Card>





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
Harga Bapok Naik Seminggu Terakhir
"

data={
ranking?.naik ?? []
}


/>





<CommodityRanking

title="
Harga Bapok Turun Seminggu Terakhir
"

data={
ranking?.turun ?? []
}


/>


</div>


</CardContent>


</Card>









{/* GRAFIK */}

<Card>

<CardHeader>

<CardTitle>

Perkembangan Harga Bapok Pasar Inpres SoE

</CardTitle>

</CardHeader>


<CardContent>

<PriceAnalysisChart

commodities={
commodities
}

/>

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