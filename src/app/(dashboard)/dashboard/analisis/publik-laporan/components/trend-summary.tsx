"use client"


import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react"


import {
  generateSummaryNarrative
} from "../utils/trend-summary-narrative"




interface Props {

  data:any[]

}







export function TrendSummary({
data
}:Props){



if(
!data ||
data.length === 0
){

return null

}







/*
============================
TREND
============================
*/


const naik =
data.filter(
item =>
item.analysis.perbandingan.trend === "Naik"
)



const turun =
data.filter(
item =>
item.analysis.perbandingan.trend === "Turun"
)



const stabil =
data.filter(
item =>
item.analysis.perbandingan.trend === "Stabil"
)









/*
============================
FLUKTUASI
============================
*/


const fluktuasiTinggi =

data.filter(

item =>

item.analysis.fluktuasi.kategori === "Tinggi"

)

.length











/*
============================
HAP
============================
*/


const diAtasHAP =

data.filter(

item =>

item.analysis.statusHAP === "Di atas HAP"

)

.length




const diBawahHAP =

data.filter(

item =>

item.analysis.statusHAP === "Di bawah HAP"

)

.length





const zonaHAP =

data.filter(

item =>

item.analysis.statusHAP === "Dalam zona HAP"

)

.length












/*
============================
HET
============================
*/


const diAtasHET =

data.filter(

item =>

item.analysis.statusHET === "Di atas HET"

)

.length





const diBawahHET =

data.filter(

item =>

item.analysis.statusHET === "Di bawah HET"

)

.length






const sesuaiHET =

data.filter(

item =>

item.analysis.statusHET === "Sesuai HET"

)

.length












/*
============================
DAFTAR KOMODITAS
============================
*/


const namaKomoditas =

data.map(

item =>
item.nama

)






const badgeKomoditas =

namaKomoditas.length > 8

?

[

...namaKomoditas.slice(0,8),

`+ ${namaKomoditas.length - 8} lainnya`

]

:

namaKomoditas












/*
============================
TERTINGGI / TERBESAR
============================
*/


const kenaikanTertinggi =


naik.length > 0

?

naik.reduce(

(prev,current)=>

current
.analysis
.perbandingan
.perubahanPersen

>

prev
.analysis
.perbandingan
.perubahanPersen

?

current

:

prev

)

:

undefined










const penurunanTerbesar =


turun.length > 0

?

turun.reduce(

(prev,current)=>

current
.analysis
.perbandingan
.perubahanPersen

<

prev
.analysis
.perbandingan
.perubahanPersen

?

current

:

prev

)

:

undefined










const first =

data[0].analysis











/*
============================
NARASI
============================
*/


const narrative =

generateSummaryNarrative({

total:
data.length,


namaKomoditas,


naik:
naik.length,


turun:
turun.length,


stabil:
stabil.length,



fluktuasiTinggi,




diAtasHAP,


diBawahHAP,


zonaHAP,




diAtasHET,


diBawahHET,


sesuaiHET,





kenaikanTertinggi:

kenaikanTertinggi

?

{

nama:
kenaikanTertinggi.nama,


perubahan:
kenaikanTertinggi
.analysis
.perbandingan
.perubahanPersen

}

:

undefined,







penurunanTerbesar:

penurunanTerbesar

?

{

nama:
penurunanTerbesar.nama,


perubahan:
penurunanTerbesar
.analysis
.perbandingan
.perubahanPersen

}

:

undefined,







periodeAnalisis:

first.periodeAnalisis,




periodePembanding:

first.periodePembanding,



})













return (

<div

className="
rounded-xl
border
bg-card
p-6
space-y-6
shadow-sm
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

Kesimpulan Analisis

</h2>



<p

className="
text-sm
text-muted-foreground
"

>

Ringkasan perkembangan harga seluruh komoditas yang dianalisis.

</p>





<div

className="
flex
flex-wrap
gap-2
mt-3
"

>


{

badgeKomoditas.map(

(item:string,index:number)=>(


<span

key={index}

className="
rounded-full
border
bg-muted
px-3
py-1
text-xs
font-medium
"

>

{item}

</span>


)

)

}



</div>



</div>













{/* STATISTIK TREND */}

<div

className="
grid
gap-4
md:grid-cols-4
"

>


<SummaryBox

icon={TrendingUp}

label="Mengalami Kenaikan"

value={`${naik.length} Komoditas`}

color="
bg-red-50
border-red-200
text-red-600
dark:bg-red-950
dark:border-red-900
dark:text-red-400
"

/>




<SummaryBox

icon={TrendingDown}

label="Mengalami Penurunan"

value={`${turun.length} Komoditas`}

color="
bg-green-50
border-green-200
text-green-600
dark:bg-green-950
dark:border-green-900
dark:text-green-400
"

/>






<SummaryBox

icon={Minus}

label="Harga Stabil"

value={`${stabil.length} Komoditas`}

color="
bg-blue-50
border-blue-200
text-blue-600
dark:bg-blue-950
dark:border-blue-900
dark:text-blue-400
"

/>






<SummaryBox

icon={AlertTriangle}

label="Fluktuasi Tinggi"

value={`${fluktuasiTinggi} Komoditas`}

color="
bg-yellow-50
border-yellow-200
text-yellow-600
dark:bg-yellow-950
dark:border-yellow-900
dark:text-yellow-400
"

/>



</div>









{/* STATUS HAP HET */}

<div

className="
grid
gap-4
md:grid-cols-4
"

>


<SummaryBox

icon={ShieldAlert}

label="Di Atas HAP"

value={`${diAtasHAP} Komoditas`}

color="
bg-orange-50
border-orange-200
text-orange-600
dark:bg-orange-950
dark:border-orange-900
dark:text-orange-400
"

/>





<SummaryBox

icon={ShieldCheck}

label="Dalam Zona HAP"

value={`${zonaHAP} Komoditas`}

color="
bg-green-50
border-green-200
text-green-600
dark:bg-green-950
dark:border-green-900
dark:text-green-400
"

/>





<SummaryBox

icon={ShieldAlert}

label="Di Atas HET"

value={`${diAtasHET} Komoditas`}

color="
bg-red-50
border-red-200
text-red-600
dark:bg-red-950
dark:border-red-900
dark:text-red-400
"

/>





<SummaryBox

icon={ShieldCheck}

label="Sesuai HET"

value={`${sesuaiHET} Komoditas`}

color="
bg-blue-50
border-blue-200
text-blue-600
dark:bg-blue-950
dark:border-blue-900
dark:text-blue-400
"

/>



</div>











{/* NARASI */}

<div

className="
rounded-lg
bg-muted
p-4
text-sm
leading-relaxed
"

>

{narrative}

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

className="mb-2"

/>



<p

className="
text-xs
opacity-80
"

>

{label}

</p>



<p

className="
font-semibold
text-lg
"

>

{value}

</p>


</div>

)

}