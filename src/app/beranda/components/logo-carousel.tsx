"use client";

import Link from "next/link";

import {
  Card
} from "@/components/ui/card";

import {
  Button
} from "@/components/ui/button";

import {
  TrendingDown,
  TrendingUp,
  Minus,
  Search,
  ArrowRight
} from "lucide-react";

import {
  DotPattern
} from "@/components/dot-pattern";


interface Commodity {

  name:string;

  unit:string;

  price:number;

  change:number;

  percent:number;

  status:
  | "up"
  | "down"
  | "flat";

}



interface Props {

  commodities:Commodity[];

}





export function CommoditySection({

  commodities

}:Props){



return (

<section

aria-label="
Informasi harga barang kebutuhan pokok Kabupaten Timor Tengah Selatan
"

className="
relative
overflow-hidden
py-2
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



<DotPattern

className="opacity-50"

size="md"

fadeStyle="circle"

/>





<div

className="
relative
container
mx-auto
px-4
"

>



{/* HEADER */}

<div

className="
text-center
mb-8
"

>


<h2

className="
mt-2
text-2xl
font-bold
sm:text-3xl
"

>

Harga Barang Kebutuhan Pokok
Kabupaten Timor Tengah Selatan

</h2>




<p

className="
mt-3
text-muted-foreground
"

>

Informasi perkembangan harga barang kebutuhan pokok
berdasarkan pemantauan Pasar Inpres Soe,
Kabupaten Timor Tengah Selatan.

</p>




<p

className="
mt-2
text-sm
text-muted-foreground
"

>

Perubahan harga terbaru dibandingkan dengan harga rata-rata minggu sebelumnya

</p>



</div>





{/* SEO TEXT */}

<div

className="
sr-only
"

>

SIHARGA CEPAT menyediakan informasi harga barang kebutuhan pokok
Kabupaten Timor Tengah Selatan seperti beras, gula, minyak goreng,
cabai, telur dan komoditas lainnya berdasarkan pemantauan harga
Pasar Inpres Soe.

</div>





{/* SLIDER */}

<div

className="
relative
overflow-hidden
"

>


<div

className="
absolute
left-0
top-0
bottom-0
w-24
bg-gradient-to-r
from-background
to-transparent
z-10
"

/>



<div

className="
absolute
right-0
top-0
bottom-0
w-24
bg-gradient-to-l
from-background
to-transparent
z-10
"

/>



<div

className="
flex
gap-5
animate-logo-scroll
"

>


{

[

...commodities,

...commodities

]

.map(

(item,index)=>(


<Card

key={index}

className="
min-w-[230px]
h-28
flex-shrink-0
p-5
bg-background/70
backdrop-blur
border-border/50
"

>


<div

className="
flex
justify-between
items-start
"

>


<div>


<p

className="
text-sm
text-muted-foreground
"

>

Harga {item.name}

</p>



<p

className="
mt-2
text-xl
font-bold
"

>

Rp {item.price.toLocaleString("id-ID")}


<span

className="
ml-1
text-sm
font-normal
text-muted-foreground
"

>

/{item.unit}

</span>


</p>


</div>

<div>


{

item.status === "up" &&

(

<div

className="
flex
items-center
gap-1
text-red-600
font-semibold
"

>


<TrendingUp

className="
h-4
w-4
"

/>



+{item.percent.toFixed(2)}%



</div>


)

}








{

item.status === "down" &&

(

<div

className="
flex
items-center
gap-1
text-green-600
font-semibold
"

>


<TrendingDown

className="
h-4
w-4
"

/>



{item.percent.toFixed(2)}%



</div>


)

}








{

item.status === "flat" &&

(

<div

className="
flex
items-center
gap-1
text-yellow-600
font-semibold
"

>


<Minus

className="
h-4
w-4
"

/>



0.00%



</div>


)

}



</div>





</div>






</Card>



)

)



}



</div>




</div>








{/* BUTTON */}



<div

className="
mt-10
text-center
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

aria-label="
Lihat harga barang kebutuhan pokok hari ini
"

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



</section>



);


}