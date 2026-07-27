"use client"


import Link from "next/link"

import {
  ArrowRight,
  BarChart3,
  Search
} from "lucide-react"


import {
  Button
} from "@/components/ui/button"


import {
  Badge
} from "@/components/ui/badge"


import {
  DotPattern
} from "@/components/dot-pattern"





export function HeroSection() {


return (


<section

id="hero"

aria-label="SIHARGA CEPAT informasi harga barang kebutuhan pokok Kabupaten Timor Tengah Selatan"

className="
relative
overflow-hidden
py-16
sm:py-20
"

>





<div

className="
absolute
inset-0
bg-gradient-to-r
from-green-500/10
via-transparent
to-red-500/10
"

/>





<div

className="
absolute
inset-0
"

>


<DotPattern

className="opacity-40"

size="md"

fadeStyle="ellipse"

/>


</div>









<div

className="
container
mx-auto
relative
px-4
sm:px-6
lg:px-8
"

>


<div

className="
mx-auto
max-w-5xl
text-center
"

>









{/* BADGE */}



<div

className="
mb-8
flex
justify-center
"

>


<Badge
  variant="outline"
  className="
    flex
    w-full
    sm:w-fit
    items-start
    sm:items-center
    gap-2
    px-4
    py-2
    border-green-600/40
    text-green-700
    dark:text-green-400
    bg-background/40
    backdrop-blur
    whitespace-normal
    text-center
    sm:text-left
  "
>
  <BarChart3
    className="
      h-4
      w-4
      mt-0.5
      sm:mt-0
      shrink-0
    "
  />

  <span
    className="
      text-sm
      leading-relaxed
    "
  >
    Sistem Informasi Harga Barang Kebutuhan Pokok Kabupaten Timor Tengah Selatan
  </span>
</Badge>



</div>












{/* H1 SEO */}



<h1

className="
mb-6
text-4xl
font-bold
tracking-tight
sm:text-6xl
lg:text-7xl
"

>


SIHARGA CEPAT


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


Informasi Harga Barang Kebutuhan Pokok TTS


</span>


</h1>












{/* DESCRIPTION */}



<p

className="
mx-auto
mb-10
max-w-3xl
text-lg
text-muted-foreground
sm:text-xl
"

>


SIHARGA CEPAT merupakan Sistem Informasi Harga Barang Kebutuhan Pokok Cepat dan Terpadu yang menyediakan informasi harga pangan, harga komoditas, dan perkembangan pasar Kabupaten Timor Tengah Selatan secara cepat, akurat, transparan, dan mudah diakses masyarakat.


</p>












{/* CTA */}



<div

className="
flex
flex-col
gap-4
sm:flex-row
sm:justify-center
"

>


<Button

size="lg"

className="
cursor-pointer
bg-green-600
text-base
shadow-lg
hover:bg-green-700
"

asChild

>


<Link

href="/harga"

aria-label="Lihat harga barang kebutuhan pokok hari ini"

>


<Search

className="
mr-2
h-5
w-5
"

/>



Lihat Harga Hari Ini



<ArrowRight

className="
ml-2
h-4
w-4
"

/>



</Link>



</Button>






</div>








</div>


</div>





</section>


)


}