"use client"

import Link from "next/link"
import Image from "next/image"

import {
  ArrowRight,
  CalendarDays,
} from "lucide-react"


import {
  Card,
  CardContent,
} from "@/components/ui/card"


import {
  Badge
} from "@/components/ui/badge"


import {
  Button
} from "@/components/ui/button"


import {
  DotPattern
} from "@/components/dot-pattern"





interface Publication {

  id:string

  judul:string

  slug:string

  jenis:
    "laporan"
    |
    "berita"

  ringkasan:string | null

  gambar:string | null

  published_at:string

}






interface Props {

  publications:Publication[]

}









function formatTanggal(
  tanggal:string
){

return new Date(tanggal)
.toLocaleDateString(
"id-ID",
{
day:"numeric",
month:"long",
year:"numeric"
}
)

}









export function PublicationSection({

publications

}:Props){



return (

<section

id="publikasi"

className="
relative
overflow-hidden
py-2
sm:py-32
"

>


{/* BACKGROUND */}

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



<DotPattern

className="
absolute
inset-0
opacity-50
"

size="md"

fadeStyle="circle"

/>






<div

className="
relative
container
mx-auto
px-4
sm:px-6
lg:px-8
"

>





{/* HEADER */}

<div

className="
mx-auto
max-w-3xl
text-center
mb-16
"

>


<Badge

variant="outline"

className="
mb-4
border-green-600/40
text-green-700
dark:text-green-400
"

>

Publikasi SIHARGA CEPAT

</Badge>






<h2

className="
text-3xl
font-bold
tracking-tight
sm:text-4xl
mb-4
"

>

Informasi dan Publikasi Harga

</h2>






<p

className="
text-lg
text-muted-foreground
"

>

Informasi terbaru mengenai laporan harga,
hasil monitoring, dan perkembangan perdagangan
Kabupaten Timor Tengah Selatan.

</p>


</div>









{/* CARD */}

<div

className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
gap-6
"

>


{

publications.map((item)=>(


<Card

key={item.id}

className="
overflow-hidden
group
py-0
border-border/50
bg-background/60
backdrop-blur-md
"

>


<CardContent

className="
p-0
"

>


{/* IMAGE */}

<div

className="
aspect-video
overflow-hidden
"

>


<Image

src={

item.gambar
?
item.gambar
:
"/placeholder-publication.jpg"

}

alt={
  item.judul ?? "Publikasi SIHARGA CEPAT"
}

width={600}

height={340}

className="
h-full
w-full
object-cover
transition-transform
duration-500
group-hover:scale-105
"

/>


</div>









<div

className="
space-y-4
p-6
"

>





<Badge

variant="secondary"

>

{
item.jenis === "laporan"
?
"Laporan"
:
"Berita"
}

</Badge>








<h3

className="
text-xl
font-bold
leading-tight
transition-colors
group-hover:text-primary
line-clamp-2
"

>

{item.judul}

</h3>









<div

className="
flex
items-center
gap-2
text-sm
text-muted-foreground
"

>


<CalendarDays

className="
size-4
"

/>


Dipublikasikan {formatTanggal(item.published_at)}



</div>









<p

className="
text-muted-foreground
line-clamp-3
"

>

{
item.ringkasan
}

</p>









<Link

href={

item.jenis === "laporan"

?

`/publikasi/${item.slug}/laporan`

:

`/publikasi/${item.slug}`

}

className="
inline-flex
items-center
gap-2
font-medium
text-primary
hover:underline
"

>

Baca Selengkapnya


<ArrowRight

className="
size-4
"

/>


</Link>







</div>



</CardContent>


</Card>



))


}



</div>









{/* BUTTON */}

<div

className="
mt-12
flex
justify-center
"

>


<Button

size="lg"

asChild

className="
bg-green-600
hover:bg-green-700
"

>


<Link

href="/publikasi"

>

Lihat Semua Publikasi


<ArrowRight

className="
ml-2
size-4
"

/>


</Link>


</Button>


</div>









</div>


</section>


)


}