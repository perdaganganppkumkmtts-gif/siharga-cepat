"use client"

import Link from "next/link"
import { ArrowRight, BarChart3, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DotPattern } from "@/components/dot-pattern"


export function HeroSection() {

return (

<section
id="hero"
className="
relative
overflow-hidden
py-16
sm:py-20
"
>


{/* Background Gradient Sama */}

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



{/* Background Pattern */}

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
px-4
sm:px-6
lg:px-8
relative
"
>


<div
className="
mx-auto
max-w-5xl
text-center
"
>





{/* Badge */}

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
    w-fit
    max-w-full
    items-start
    gap-2
    px-3
    py-2
    sm:px-5
    sm:py-2.5
    border-green-600/40
    text-green-700
    dark:text-green-400
    bg-background/40
    backdrop-blur
    text-xs
    sm:text-sm
    leading-relaxed
    whitespace-normal
  "
>

  <BarChart3
    className="
      mt-0.5
      h-4
      w-4
      shrink-0
      sm:h-5
      sm:w-5
    "
  />

  <span className="text-left">
    Monitoring Harga Barang Pokok oleh Dinas Perdagangan,
    Perindustrian, Koperasi dan UMKM Kab. Timor Tengah Selatan
  </span>

</Badge>



</div>







{/* Headline */}

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


Pantau Harga Barang Kebutuhan Pokok


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

Cepat, Terpadu dan Transparan

</span>


</h1>







{/* Description */}

<p

className="
mx-auto
max-w-3xl
mb-10
text-lg
text-muted-foreground
sm:text-xl
"

>


SIHARGA CEPAT Kabupaten Timor Tengah Selatan
menyediakan informasi harga barang kebutuhan pokok secara berkala untuk mendukung
monitoring pasar, analisis perdagangan,
serta pengambilan kebijakan daerah.


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
text-base
cursor-pointer
bg-green-600
hover:bg-green-700
shadow-lg
"

asChild

>


<Link
href="/harga"
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