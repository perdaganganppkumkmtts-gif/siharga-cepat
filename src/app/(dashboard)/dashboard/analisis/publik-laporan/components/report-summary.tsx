"use client"


import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  ShieldCheck
} from "lucide-react"





interface Props {

  data:any[]

}







function formatTanggal(
tanggal:string
){

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
)

}







function rupiah(
value:number|null|undefined
){

if(value==null)
return "-"


return (
"Rp" +
Math.round(value)
.toLocaleString("id-ID")
)

}









export function ReportSummary({

data

}:Props){





if(
!data ||
data.length===0
){

return null

}







const first =
data[0].analysis







const naik =

data.filter(

item=>

item.analysis.perbandingan.trend === "Naik"

)








const turun =

data.filter(

item=>

item.analysis.perbandingan.trend === "Turun"

)








const stabil =

data.filter(

item=>

item.analysis.perbandingan.trend === "Stabil"

)









const fluktuasiTinggi =

data.filter(

item=>

item.analysis.fluktuasi.kategori === "Tinggi"

)

.length










/*
=========================
TOP KENAIKAN
=========================
*/


const daftarKenaikanTertinggi =

[...naik]

.sort(

(a,b)=>

b.analysis.perbandingan.perubahanPersen -

a.analysis.perbandingan.perubahanPersen

)

.slice(0,3)









/*
=========================
TOP PENURUNAN
=========================
*/


const daftarPenurunanTerbesar =

[...turun]

.sort(

(a,b)=>

a.analysis.perbandingan.perubahanPersen -

b.analysis.perbandingan.perubahanPersen

)

.slice(0,3)












const zonaHAP =

data.filter(

item=>

item.analysis.statusHAP

)

.length







const zonaHET =

data.filter(

item=>

item.analysis.statusHET

)

.length









return (

<div

className="
rounded-xl
border
bg-card
p-6
space-y-6
"

>







{/* HEADER */}

<div>

<h2

className="
text-lg
font-semibold
"

>

Ringkasan Analisis Perkembangan Harga

</h2>



<p

className="
text-sm
text-muted-foreground
"

>

Periode Analisis:

{" "}

{

formatTanggal(
first.periodeAnalisis.mulai
)

}

{" s/d "}

{

formatTanggal(
first.periodeAnalisis.sampai
)

}

</p>




<p

className="
text-sm
text-muted-foreground
"

>

Periode Pembanding:

{" "}

{

formatTanggal(
first.periodePembanding.mulai
)

}

{" s/d "}

{

formatTanggal(
first.periodePembanding.sampai
)

}

</p>


</div>









{/* STATISTIK */}

<div

className="
grid
gap-4
md:grid-cols-5
"

>



<SummaryBox

icon={TrendingUp}

label="Kenaikan"

value={`${naik.length} Komoditas`}

color="
text-red-600
bg-red-50
border-red-200
"

/>





<SummaryBox

icon={TrendingDown}

label="Penurunan"

value={`${turun.length} Komoditas`}

color="
text-green-600
bg-green-50
border-green-200
"

/>






<SummaryBox

icon={Minus}

label="Stabil"

value={`${stabil.length} Komoditas`}

color="
text-blue-600
bg-blue-50
border-blue-200
"

/>






<SummaryBox

icon={AlertTriangle}

label="Fluktuasi Tinggi"

value={`${fluktuasiTinggi} Komoditas`}

color="
text-yellow-600
bg-yellow-50
border-yellow-200
"

/>






<SummaryBox

icon={ShieldCheck}

label="Memiliki HAP/HET"

value={`${zonaHAP + zonaHET} Komoditas`}

color="
text-purple-600
bg-purple-50
border-purple-200
"

/>



</div>









{/* NARASI SINGKAT */}

<div

className="
rounded-lg
bg-muted
p-5
text-sm
leading-relaxed
"

>


<p>

Berdasarkan hasil analisis terhadap

{" "}

<b>
{data.length}
</b>

{" "}

komoditas pantauan, perkembangan harga menunjukkan:


</p>



<ul

className="
list-disc
ml-5
mt-2
space-y-1
"

>


<li>

<b>{naik.length}</b>

{" "}

komoditas mengalami kenaikan harga.

</li>



<li>

<b>{turun.length}</b>

{" "}

komoditas mengalami penurunan harga.

</li>



<li>

<b>{stabil.length}</b>

{" "}

komoditas berada dalam kondisi stabil.

</li>


</ul>


</div>









{/* TOP KENAIKAN & PENURUNAN */}

<div
className="
grid
gap-5
md:grid-cols-2
"
>


{/* TOP KENAIKAN */}

<div

className="
rounded-xl
border
p-5
space-y-3
"

>


<div
className="
flex
items-center
gap-2
font-semibold
text-red-600
"

>

<TrendingUp
className="h-5 w-5"
/>

Top Kenaikan Harga

</div>



{

daftarKenaikanTertinggi.length === 0 ?

(

<p
className="
text-sm
text-muted-foreground
"
>

Tidak ada kenaikan harga.

</p>

)

:

(

<div
className="
space-y-3
"
>


{

daftarKenaikanTertinggi.map(

(item,index)=>(


<div

key={item.id}

className="
flex
items-center
justify-between
rounded-lg
border
p-3
"

>


<div
className="
flex
items-center
gap-3
"

>


<div

className="
flex
h-8
w-8
items-center
justify-center
rounded-full
bg-red-50
font-bold
text-red-600
"

>

{index+1}

</div>



<div>


<p
className="
font-semibold
"
>

{item.nama}

</p>


<p

className="
text-xs
text-muted-foreground
"

>

Rata-rata:

{" "}

{

rupiah(
item.analysis.perbandingan.rataRataSebelumnya
)

}

{" → "}

{

rupiah(
item.analysis.perkembangan.rataRata
)

}


</p>


</div>


</div>






<div

className="
rounded-full
bg-red-100
px-3
py-1
text-sm
font-bold
text-red-700
"

>

+

{

item.analysis.perbandingan.perubahanPersen.toFixed(2)

}

%

</div>



</div>


)

)

}



</div>

)

}


</div>








{/* TOP PENURUNAN */}

<div

className="
rounded-xl
border
p-5
space-y-3
"

>


<div

className="
flex
items-center
gap-2
font-semibold
text-green-600
"

>

<TrendingDown

className="h-5 w-5"

/>


Top Penurunan Harga

</div>




{

daftarPenurunanTerbesar.length === 0 ?

(

<p

className="
text-sm
text-muted-foreground
"

>

Tidak ada penurunan harga.

</p>

)

:

(

<div

className="
space-y-3
"

>


{

daftarPenurunanTerbesar.map(

(item,index)=>(


<div

key={item.id}

className="
flex
items-center
justify-between
rounded-lg
border
p-3
"

>


<div

className="
flex
items-center
gap-3
"

>


<div

className="
flex
h-8
w-8
items-center
justify-center
rounded-full
bg-green-50
font-bold
text-green-600
"

>

{index+1}

</div>



<div>


<p
className="
font-semibold
"
>

{item.nama}

</p>



<p

className="
text-xs
text-muted-foreground
"

>

Rata-rata:

{" "}

{

rupiah(
item.analysis.perbandingan.rataRataSebelumnya
)

}

{" → "}

{

rupiah(
item.analysis.perkembangan.rataRata
)

}


</p>



</div>


</div>






<div

className="
rounded-full
bg-green-100
px-3
py-1
text-sm
font-bold
text-green-700
"

>


{

item.analysis.perbandingan.perubahanPersen.toFixed(2)

}

%


</div>



</div>



)

)

}



</div>

)

}


</div>



</div>





</div>


)

}













function SummaryBox({

icon:Icon,

label,

value,

color,

}:{

icon:any

label:string

value:string

color:string

}){



return (

<div

className={`

rounded-lg

border

p-4

${color}

`}

>


<Icon

size={20}

/>



<p

className="
text-xs
mt-2
"

>

{label}

</p>



<p

className="
font-semibold
"

>

{value}

</p>



</div>

)


}