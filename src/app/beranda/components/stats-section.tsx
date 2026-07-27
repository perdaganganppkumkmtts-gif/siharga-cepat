"use client"


import {
  Users,
  CalendarDays,
  Globe,
  Star
} from "lucide-react"


import {
  Card,
  CardContent
} from "@/components/ui/card"


import {
  DotPattern
} from "@/components/dot-pattern"


import {
  motion
} from "framer-motion"


import CountUp from "react-countup"


import {
  Badge
} from "@/components/ui/badge"





interface Props {

stats: {

todayVisitor:number

weekVisitor:number

totalVisitor:number

averageRating:number

}

}







function safeNumber(
value:number
){

return Number(value ?? 0)

}









export function StatsSection({

stats

}:Props){





const items = [

{
icon:Users,
value:safeNumber(stats.todayVisitor),
label:"Pengunjung Hari Ini",
description:
"Akses website SIHARGA CEPAT hari ini",
color:"text-blue-600",
bg:
"bg-blue-100 dark:bg-blue-900/30"
},



{
icon:CalendarDays,
value:safeNumber(stats.weekVisitor),
label:"Pengunjung 7 Hari",
description:
"Jumlah kunjungan website selama satu minggu",
color:"text-green-600",
bg:
"bg-green-100 dark:bg-green-900/30"
},




{
icon:Globe,
value:safeNumber(stats.totalVisitor),
label:"Total Pengunjung",
description:
"Total pengguna yang mengakses SIHARGA CEPAT",
color:"text-purple-600",
bg:
"bg-purple-100 dark:bg-purple-900/30"
},




{
icon:Star,
value:safeNumber(stats.averageRating),
label:"Rating Pengguna",
description:
"Penilaian masyarakat terhadap layanan informasi harga",
color:"text-yellow-500",
bg:
"bg-yellow-100 dark:bg-yellow-900/30",
rating:true
}


]









return (



<section

id="statistik"

aria-label="Statistik website SIHARGA CEPAT"

className="
relative
overflow-hidden
py-12
sm:py-16
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
mb-12
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

Statistik Layanan

</Badge>







<h2

className="
text-3xl
font-bold
tracking-tight
sm:text-4xl
"

>


Statistik Website SIHARGA CEPAT


</h2>






<p

className="
mt-4
text-muted-foreground
"

>


Data kunjungan masyarakat terhadap Sistem Informasi Harga Barang Kebutuhan Pokok Cepat dan Terpadu Kabupaten Timor Tengah Selatan.


</p>





</div>













{/* CARD */}

<div

className="
grid
grid-cols-2
lg:grid-cols-4
gap-5
"

>



{

items.map((item,index)=>{


const Icon = item.icon



return (


<motion.div


key={item.label}



initial={{

opacity:0,

y:30

}}



whileInView={{

opacity:1,

y:0

}}



viewport={{

once:true,

amount:0.2

}}



transition={{

delay:index * 0.1,

duration:0.4

}}


>



<Card


className="
h-full
bg-background/70
backdrop-blur-md
border-border/50
transition-all
duration-300
hover:-translate-y-1
hover:shadow-xl
"


>



<CardContent

className="
p-5
text-center
"

>




<div

className="
flex
justify-center
mb-5
"

>


<div

className={`
rounded-2xl
p-4
${item.bg}
`}

>


<Icon

aria-hidden="true"

className={`
h-7
w-7
${item.color}
`}

/>


</div>


</div>









<h3

className="
text-3xl
font-bold
tracking-tight
"

>


{


item.rating

?


<>

<CountUp

end={item.value}

decimals={1}

duration={1.5}

/>


<span

className="
text-lg
text-muted-foreground
"

>

 / 5

</span>


</>



:


<CountUp

end={item.value}

separator="."

duration={1.5}

/>


}




</h3>









<p

className="
mt-2
font-semibold
"

>


{item.label}


</p>








<p

className="
mt-1
text-sm
text-muted-foreground
"

>


{item.description}


</p>







</CardContent>



</Card>



</motion.div>



)



})


}



</div>







</div>








</section>



)


}