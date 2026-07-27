import {
  Package,
  ClipboardCheck,
  FileText,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";





const summary = [

  {
    title:"Total Komoditas",
    value:"40",
    description:"Komoditas pantauan harga",
    icon:Package,
  },


  {
    title:"Survei Hari Ini",
    value:"12",
    description:"Data harga masuk",
    icon:ClipboardCheck,
  },


  {
    title:"Publikasi",
    value:"8",
    description:"Berita dan laporan",
    icon:FileText,
  },


  {
    title:"Monitoring",
    value:"Aktif",
    description:"Sistem berjalan",
    icon:Activity,
  },

];






const priceMovement = [

{
 name:"Cabai Rawit Merah",
 price:"Rp 85.000",
 change:"+5.2%",
 status:"up",
},


{
 name:"Beras Medium",
 price:"Rp 14.000",
 change:"-2.1%",
 status:"down",
},


{
 name:"Minyakita",
 price:"Rp 18.000",
 change:"0%",
 status:"stable",
},


];







export default function DashboardPage(){



return (


<div className="space-y-6">



{/* HEADER */}


<div>


<h1
className="
text-3xl
font-bold
tracking-tight
"
>

Dashboard SIHARGA CEPAT

</h1>



<p
className="
text-muted-foreground
mt-2
"
>

Ringkasan monitoring harga barang kebutuhan pokok
Kabupaten Timor Tengah Selatan.

</p>


</div>







{/* SUMMARY CARD */}


<div

className="
grid
gap-4
md:grid-cols-2
xl:grid-cols-4
"

>


{


summary.map((item)=>(


<Card

key={item.title}

className="
border-border/60
bg-card/70
"

>


<CardContent

className="
flex
items-center
justify-between
p-6
"

>


<div>


<p
className="
text-sm
text-muted-foreground
"

>

{item.title}

</p>


<h2
className="
mt-2
text-3xl
font-bold
"

>

{item.value}

</h2>


<p
className="
mt-1
text-xs
text-muted-foreground
"

>

{item.description}

</p>


</div>





<div

className="
rounded-xl
bg-primary/10
p-3
"

>


<item.icon

className="
h-6
w-6
text-primary
"

/>


</div>





</CardContent>


</Card>



))


}


</div>










{/* CONTENT GRID */}



<div

className="
grid
gap-6
lg:grid-cols-2
"

>





{/* PERGERAKAN HARGA */}



<Card>


<CardHeader>


<CardTitle>

Pergerakan Harga Terbaru

</CardTitle>


</CardHeader>





<CardContent

className="
space-y-4
"

>


{


priceMovement.map((item)=>(


<div

key={item.name}

className="
flex
items-center
justify-between
rounded-lg
border
p-4
"

>



<div>


<p

className="
font-medium
"

>

{item.name}

</p>



<p

className="
text-sm
text-muted-foreground
"

>

{item.price}

</p>


</div>






{

item.status==="up" &&


<Badge

className="
gap-1
bg-red-500/15
text-red-600
border-red-500/20
"

>

<TrendingUp

className="
h-3
w-3
"

/>

{item.change}

</Badge>



}





{

item.status==="down" &&


<Badge

className="
gap-1
bg-green-500/15
text-green-600
border-green-500/20
"

>

<TrendingDown

className="
h-3
w-3
"

/>

{item.change}

</Badge>



}






{

item.status==="stable" &&


<Badge

className="
bg-yellow-500/15
text-yellow-600
border-yellow-500/20
"

>

Stabil

</Badge>



}





</div>



))


}



</CardContent>


</Card>









{/* AKTIVITAS */}



<Card>


<CardHeader>


<CardTitle>

Aktivitas Sistem

</CardTitle>


</CardHeader>




<CardContent

className="
space-y-4
"

>


<div

className="
rounded-lg
border
p-4
"

>


<p

className="
font-medium
"

>

Survei harga berhasil diperbarui

</p>


<p

className="
text-sm
text-muted-foreground
"

>

Hari ini pukul 10:30 WITA

</p>


</div>





<div

className="
rounded-lg
border
p-4
"

>


<p

className="
font-medium
"

>

Laporan Juli 2026 dipublikasikan

</p>


<p

className="
text-sm
text-muted-foreground
"

>

20 Juli 2026

</p>


</div>





<div

className="
rounded-lg
border
p-4
"

>


<p

className="
font-medium
"

>

40 komoditas aktif

</p>


<p

className="
text-sm
text-muted-foreground
"

>

Master data tersedia

</p>


</div>



</CardContent>


</Card>







</div>





</div>


)

}