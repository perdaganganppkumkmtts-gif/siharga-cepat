"use client"


import Link from "next/link"


import {
  ArrowRight,
  Search,
  FileText
} from "lucide-react"


import {
  Button
} from "@/components/ui/button"


import {
  DotPattern
} from "@/components/dot-pattern"







export function CTASection(){





return (



<section

id="cta"

aria-label="Akses layanan SIHARGA CEPAT"

className="
relative
overflow-hidden
py-16
sm:py-20
"

>







{/* BACKGROUND */}


<div

className="
absolute
inset-0
bg-gradient-to-r
from-green-600/10
via-background
to-red-500/10
"

/>






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
sm:px-6
lg:px-8
"

>








<div

className="
mx-auto
max-w-4xl
rounded-3xl
border
bg-background/70
backdrop-blur-md
p-8
text-center
shadow-lg
sm:p-12
"

>









<h2

className="
text-3xl
font-bold
tracking-tight
sm:text-4xl
"

>


Pantau Harga Barang Kebutuhan Pokok
Kabupaten Timor Tengah Selatan


</h2>








<p

className="
mx-auto
mt-5
max-w-2xl
text-muted-foreground
text-lg
"

>


Akses informasi harga bapok terbaru melalui
SIHARGA CEPAT
(Sistem Informasi Harga Barang Kebutuhan Pokok Cepat dan Terpadu)
untuk mendukung transparansi informasi harga pasar masyarakat.


</p>













<div

className="
mt-8
flex
flex-col
justify-center
gap-4
sm:flex-row
"

>









<Button

size="lg"

className="
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









<Button

size="lg"

variant="outline"

asChild

>


<Link

href="/publikasi"

>


<FileText

className="
mr-2
h-5
w-5
"

/>


Lihat Publikasi Laporan



</Link>


</Button>









</div>














{/* SEO TEXT */}


<p

className="
mt-8
text-sm
text-muted-foreground
"

>


Data harga bersumber dari pemantauan komoditas
barang kebutuhan pokok di wilayah Kabupaten Timor Tengah Selatan,
termasuk pantauan pasar seperti Pasar Inpres Soe.


</p>









</div>









</div>








</section>



)

}