"use client";


import { motion } from "framer-motion";

import {
  Newspaper,
  FileText,
} from "lucide-react";


import { Badge } from "@/components/ui/badge";



export function PublicationHeader(){


return (


<section
className="
text-center
mb-10
"
>


<motion.div

initial={{
opacity:0,
y:20
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
duration:0.5
}}

>



<Badge

variant="outline"

className="
mb-4
border-green-500/30
text-green-600
gap-2
"

>


<Newspaper
className="
h-4
w-4
"
/>


Publikasi


</Badge>






<h2

className="
text-3xl
font-bold
tracking-tight
sm:text-4xl
"

>


Berita dan Laporan Harga



<span

className="
block
bg-gradient-to-r
from-green-600
to-red-500
bg-clip-text
text-transparent
"

>

Barang Kebutuhan Pokok

</span>


</h2>






<p

className="
mt-4
mx-auto
max-w-2xl
text-muted-foreground
"

>


Informasi terbaru mengenai perkembangan harga,
laporan pemantauan, dan publikasi perdagangan
Kabupaten Timor Tengah Selatan.


</p>





<div

className="
mt-6
flex
justify-center
gap-4
"

>


<div

className="
flex
items-center
gap-2
rounded-full
border
px-4
py-2
text-sm
"

>


<FileText

className="
h-4
w-4
text-green-600
"

/>


Laporan Bulanan


</div>





<div

className="
flex
items-center
gap-2
rounded-full
border
px-4
py-2
text-sm
"

>


<Newspaper

className="
h-4
w-4
text-red-500
"

/>


Berita


</div>




</div>



</motion.div>



</section>


);


}