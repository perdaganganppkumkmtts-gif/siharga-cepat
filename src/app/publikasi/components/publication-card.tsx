"use client";


import Image from "next/image";


import Link from "next/link";


import {
  CalendarDays,
  FileText,
  Newspaper,
} from "lucide-react";



import {
  Card,
  CardContent
} from "@/components/ui/card";


import {
  Badge
} from "@/components/ui/badge";


import {
  Button
} from "@/components/ui/button";









interface Publication {


  id:string;


  jenis:
  "laporan"
  |
  "berita";



  judul:string;



  ringkasan:string | null;



  gambar:string | null;



  slug:string;



  created_by:string | null;



  published_at:string;



}









interface PublicationCardProps {


  item:Publication;



}









function formatTanggal(

tanggal?:string

){



if(!tanggal){

return "-";

}





return new Date(

tanggal

)

.toLocaleDateString(

"id-ID",

{

day:"numeric",

month:"long",

year:"numeric"

}

);


}









export function PublicationCard({


item


}:PublicationCardProps){






const isLaporan =

item.jenis === "laporan";








const detailUrl =



isLaporan



?



`/publikasi/${item.slug}/laporan`



:



`/publikasi/${item.slug}`;












return (



<article

aria-label={item.judul}

>





<Card


className="
overflow-hidden
border-border/60
bg-card
transition-all
hover:-translate-y-1
hover:shadow-lg
"

>









{/* IMAGE */}



<div

className="
relative
h-48
w-full
overflow-hidden
bg-muted
"

>





{

item.gambar

?

<Image


src={item.gambar}


alt={`Cover ${item.judul} - SIHARGA CEPAT`}


fill


sizes="
( max-width: 768px ) 100vw,
( max-width: 1200px ) 50vw,
33vw
"


className="
object-cover
transition-transform
duration-300
hover:scale-105
"

/>



:



<div

className="
flex
h-full
items-center
justify-center
text-muted-foreground
"

>


{

isLaporan

?



<FileText

className="h-12 w-12"

/>



:



<Newspaper

className="h-12 w-12"

/>



}



</div>



}



</div>












<CardContent

className="
p-5
space-y-4
"

>









{/* META */}



<div

className="
flex
items-center
justify-between
gap-2
"

>





<Badge

variant="outline"

className="gap-1"

>





{

isLaporan

?



<FileText

className="h-3 w-3"

/>



:



<Newspaper

className="h-3 w-3"

/>



}




{

isLaporan

?

"Laporan Harga"

:

"Berita"

}



</Badge>









<div

className="
flex
items-center
gap-1
text-xs
text-muted-foreground
"

>


<CalendarDays

className="h-3 w-3"

/>




{

formatTanggal(

item.published_at

)

}



</div>






</div>









{/* TITLE */}



<h2

className="
font-semibold
text-lg
line-clamp-2
"

>


{item.judul}



</h2>









{/* SUMMARY */}



<p

className="
text-sm
text-muted-foreground
line-clamp-3
"

>


{

item.ringkasan

??

"Tidak tersedia ringkasan publikasi harga barang kebutuhan pokok."

}



</p>









{/* AUTHOR */}



{

item.created_by &&


<p

className="
text-xs
text-muted-foreground
"

>


Disusun oleh:


{" "}



<span

className="
font-medium
text-foreground
"

>


{item.created_by}



</span>



</p>



}














{/* DETAIL LINK */}



<Button

asChild

size="sm"

className="w-full"

>



<Link


href={detailUrl}


title={item.judul}


aria-label={`Buka ${item.judul}`}

>



{

isLaporan

?

"Lihat Laporan Harga"

:

"Baca Berita"

}



</Link>



</Button>












</CardContent>








</Card>



</article>



);


}