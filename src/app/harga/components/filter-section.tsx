"use client";

import { PackageSearch } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface FilterSectionProps {

  commodity: string;

  setCommodity: (value:string)=>void;

}



const commodities = [

"Beras Medium",
"Beras Premium",
"Beras SPHP Bulog",
"Kedelai Impor",
"Cabai Merah Keriting",
"Cabai Merah Besar",
"Cabai Rawit Merah",
"Bawang Merah",
"Gula Pasir Curah",
"Gula Pasir Kemasan",
"Minyak Goreng Sawit Kemasan Premium",
"Minyakita",
"Tepung Terigu",
"Daging Ayam Ras",
"Telur Ayam Ras",
"Daging Sapi Paha Belakang",
"Ikan Tongkol",
"Ikan Teri",
"Mie Instan",
"Bawang Putih Honan",
"Bawang Putih Kating",
"Bawang Bombai",
"Garam Halus",
"Susu Kental Manis",
"Susu Bubuk",
"Susu Bubuk Balita",
"Tempe Bungkus",
"Tahu Putih",
"Udang Basah",
"Pisang Lokal",
"Tomat",
"Kentang Sedang",
"Sawi Hijau",
"Kangkung",
"Ketimun Sedang",
"Kacang Panjang",
"Ketela Pohon",
"Daging Ayam Kampung",
"Kacang Tanah",
"Kacang Hijau"

];




export function FilterSection({

commodity,

setCommodity

}:FilterSectionProps){



return (

<section className="py-8">


<div
className="
container
mx-auto
px-4
sm:px-6
lg:px-8
"
>


<div
className="
max-w-3xl
mx-auto
"
>



<div
className="
flex
items-center
gap-3
mb-5
"
>


<div
className="
rounded-xl
bg-primary/10
p-3
"
>


<PackageSearch

className="
h-6
w-6
text-primary
"

/>


</div>



<div>


<h2
className="
text-2xl
font-bold
"
>

Pilih Komoditas

</h2>


<p
className="
text-muted-foreground
"
>

Tentukan komoditas yang ingin dipantau

</p>


</div>


</div>





<Select

value={commodity}

onValueChange={setCommodity}

>


<SelectTrigger

className="
h-12
w-full
"

>

<SelectValue

placeholder="Pilih komoditas"

/>


</SelectTrigger>



<SelectContent>


{
commodities.map((item)=>(


<SelectItem

key={item}

value={item}

>

{item}

</SelectItem>


))
}


</SelectContent>



</Select>




</div>


</div>


</section>


)

}