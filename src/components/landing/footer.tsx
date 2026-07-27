"use client"

import Image from "next/image"
import Link from "next/link"

import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { DotPattern } from "@/components/dot-pattern"
import { useTheme } from "next-themes"



const navigation = [
  {
    name: "Beranda",
    href: "/",
  },
  {
    name: "Informasi Harga",
    href: "/harga",
  },
  {
    name: "Publikasi",
    href: "/publikasi",
  },
  {
    name: "Kontak",
    href: "#kontak",
  },
]



const socialMedia = [
  {
    icon: Facebook,
    href: "#",
  },
  {
    icon: Instagram,
    href: "#",
  },
  {
    icon: Youtube,
    href: "#",
  },
]



export function LandingFooter() {


  const { theme } = useTheme()



  return (

<footer
id="kontak"
className="
relative
overflow-hidden
border-t
bg-gradient-to-r
from-green-500/10
via-background
to-red-500/10
"
>


{/* TOP LINE */}

<div
className="
absolute
top-0
left-0
h-px
w-full
bg-gradient-to-r
from-transparent
via-green-500
to-red-500
"
/>





{/* BACKGROUND PATTERN */}

<div className="absolute inset-0">

<DotPattern
className="
opacity-40
"
size="md"
fadeStyle="ellipse"
/>

</div>







<div
className="
relative
container
mx-auto
px-4
sm:px-6
lg:px-8
py-16
"
>



<div
className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-4
gap-10
"
>









{/* BRAND */}

<div>


<div
className="
flex
items-center
gap-3
mb-5
"
>


<Image

src={
theme === "dark"
?
"/siharga-dark.svg"
:
"/siharga-light.svg"
}

alt="SIHARGA CEPAT"

width={60}

height={60}

/>



<div>

<h3
className="
font-bold
text-xl
"
>

SIHARGA CEPAT

</h3>


<p
className="
text-xs
text-muted-foreground
"
>

Kabupaten Timor Tengah Selatan

</p>


</div>


</div>





<p
className="
text-muted-foreground
leading-relaxed
"
>

Sistem Informasi Harga Barang Kebutuhan Pokok Kabupaten Timor Tengah Selatan
untuk menyediakan informasi harga yang cepat,
akurat, transparan dan mudah diakses masyarakat.

</p>







<div
className="
flex
gap-2
mt-6
"
>


{
socialMedia.map(
(item,index)=>(


<Button

key={index}

variant="ghost"

size="icon"

asChild

>

<a
href={item.href}
target="_blank"
>

<item.icon
className="h-5 w-5"
/>

</a>


</Button>


))
}



</div>



</div>












{/* NAVIGASI */}

<div>


<h4
className="
font-semibold
mb-5
"
>

Navigasi

</h4>




<ul
className="
space-y-3
"
>


{
navigation.map(
(item)=>(


<li
key={item.name}
>


<Link

href={item.href}

className="
text-muted-foreground
hover:text-primary
transition
"

>

{item.name}

</Link>


</li>


))
}


</ul>


</div>












{/* KONTAK */}

<div>


<h4
className="
font-semibold
mb-5
"
>

Kontak

</h4>




<div
className="
space-y-5
text-muted-foreground
"
>




<div
className="
flex
gap-3
"
>

<MapPin
className="
h-5
w-5
text-green-600
shrink-0
"
/>


<p>

Dinas Perdagangan,
Perindustrian,
Koperasi dan UMKM

<br/>

Kabupaten Timor Tengah Selatan

</p>


</div>





<div
className="
flex
gap-3
"
>

<Mail
className="
h-5
w-5
text-green-600
"
/>


<span>

dinasppkdanumkm@gmail.com

</span>


</div>





<div
className="
flex
gap-3
"
>

<Phone
className="
h-5
w-5
text-green-600
"
/>


<span>

(0388) – 21255 SoE 85511

</span>


</div>





<div
className="
flex
gap-3
"
>

<Clock
className="
h-5
w-5
text-green-600
"
/>


<span>

Senin - Jumat
<br/>
08.00 - 16.00 WITA

</span>


</div>




</div>


</div>












{/* MAP SATELLITE */}

<div>


<h4
className="
font-semibold
mb-5
"
>

Lokasi Kantor

</h4>





<div
className="
overflow-hidden
rounded-xl
border
bg-background/50
backdrop-blur
h-[250px]
"
>


<iframe

title="Lokasi Dinas PPK dan UMKM"

src="
https://www.google.com/maps/embed?pb=!4v1784668238691!6m8!1m7!1sCAoSLEFGMVFpcE9vZkFhQm9YVnVvV3Z5ZlF1T2JxM0VhZlRr!2m2!1d-9.860675887872393!2d124.26015591646534!3f0!4f0!5f0.7820865974627469
"

className="
w-full
h-full
border-0
"

loading="lazy"

allowFullScreen

referrerPolicy="no-referrer-when-downgrade"

/>


</div>


</div>







</div>







<Separator
className="my-8"
/>








<div
className="
flex
flex-col
md:flex-row
justify-between
items-center
gap-4
text-sm
"
>


<p
className="
text-muted-foreground
text-center
"
>

© {new Date().getFullYear()}{" "}

Dinas Perdagangan, Perindustrian,
Koperasi dan UMKM

Kabupaten Timor Tengah Selatan

</p>





<p
className="
font-medium
text-center
"
>

Design & Development by

<Link
href="https://www.instagram.com/roysadukh?igsh=MXVtbmxkNDBpMjl0ZA%3D%3D&utm_source=qr"
target="_blank"
rel="noopener noreferrer"
className="
ml-1
text-primary
hover:underline
transition-colors
"
>

Yoob Benry Sadukh, S.T.

</Link>


</p>


</div>





</div>


</footer>


  )

}