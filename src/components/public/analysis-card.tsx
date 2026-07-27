"use client"

import {
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"

import {
 TrendComparisonTable
}
from "./trend-comparison-table"

import {
 TrendComparisonChart
} from "./trend-comparison-chart"

interface Props {

  data: {

    id:string

    nama:string

    satuan:string

    history:{
    time:string
    value:number
    }[]


    previousHistory:{
    time:string
    value:number
    }[]


    analysis: {

      periodeAnalisis:{

        mulai:string

        sampai:string

      }


      periodePembanding:{

        mulai:string

        sampai:string

      }



      perkembangan:{

        hargaAwal:number
        hargaAkhir:number
        hargaTertinggi:number
        hargaTerendah:number
        rataRata:number

        hap:number|null

        hap_bawah:number|null

        hap_atas:number|null

        het:number|null

        }



      perbandingan:{

        rataRataSebelumnya:number

        perubahanNominal:number

        perubahanPersen:number

        trend:
        "Naik"
        |
        "Turun"
        |
        "Stabil"

      }



      fluktuasi:{

        kategori:
        "Rendah"
        |
        "Sedang"
        |
        "Tinggi"

        koefisienVariasi:number

      }



      statusHAP:
  | "Di atas HAP"
  | "Di bawah HAP"
  | "Dalam zona HAP"
  | null


selisihHAP:number|null


statusHET:
  | "Di atas HET"
  | "Di bawah HET"
  | "Sesuai HET"
  | null


selisihHET:number|null


    }


    narrative:string

  }

}

function formatTanggal(
  tanggal:string
){

  return new Date(
    tanggal
  ).toLocaleDateString(
    "id-ID",
    {
      day:"numeric",
      month:"long",
      year:"numeric",
    }
  )

}




export function AnalysisCard({
  data,
}:Props){



const analysis =
data.analysis





const TrendIcon =

analysis.perbandingan.trend === "Naik"

?

TrendingUp

:

analysis.perbandingan.trend === "Turun"

?

TrendingDown

:

Minus





const trendColor =


analysis.perbandingan.trend === "Naik"

?

"bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400"


:


analysis.perbandingan.trend === "Turun"

?

"bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400"


:


"bg-muted text-muted-foreground"






const rupiah =
(value:number)=>

`Rp${Math.round(value).toLocaleString("id-ID")}`






return (

<div

className="
rounded-xl
border
bg-card
p-5
space-y-5
shadow-sm
"

>



{/* HEADER */}

<div

className="
flex
items-start
justify-between
gap-4
"

>


<div>

<h3
className="
text-lg
font-semibold
"
>

{data.nama}

</h3>



<p
className="
text-sm
text-muted-foreground
"
>

Periode analisis:

{" "}

{formatTanggal(
  analysis.periodeAnalisis.mulai
)}

{" "}

s/d

{" "}

{formatTanggal(
  analysis.periodeAnalisis.sampai
)}

</p>



<p
className="
text-sm
text-muted-foreground
"
>

Pembanding:

{" "}

{formatTanggal(
  analysis.periodePembanding.mulai
)}

{" "}

s/d

{" "}

{formatTanggal(
  analysis.periodePembanding.sampai
)}

</p>



</div>





<div

className={`
flex
items-center
gap-2
rounded-lg
px-3
py-2
text-sm
font-medium
${trendColor}
`}

>

<TrendIcon
size={18}
/>


{analysis.perbandingan.trend}


</div>


</div>







{/* STATISTIK HARGA */}

<div

className="
grid
gap-3
md:grid-cols-4
"

>


<InfoBox

title="Rata-rata Harga"

value={
rupiah(
analysis.perkembangan.rataRata
)
}

/>



<InfoBox

title="Harga Tertinggi"

value={
rupiah(
analysis.perkembangan.hargaTertinggi
)
}

/>



<InfoBox

title="Harga Terendah"

value={
rupiah(
analysis.perkembangan.hargaTerendah
)
}

/>



<InfoBox

title="Perubahan"

value={

`${analysis.perbandingan.perubahanPersen > 0 ? "+" : ""}${analysis.perbandingan.perubahanPersen.toFixed(2)}%`

}

/>


</div>









{/* FLUKTUASI */}

<div

className="
grid
gap-3
md:grid-cols-2
"

>


<InfoBox

title="Tingkat Fluktuasi"

value={
analysis.fluktuasi.kategori
}

/>



<InfoBox

title="Koefisien Variasi"

value={

`${analysis.fluktuasi.koefisienVariasi.toFixed(2)}%`

}

/>


</div>









{/* HAP HET */}

<div
className="
space-y-3
rounded-lg
border
p-4
text-sm
"
>

<h4
className="
font-semibold
"
>
Keterangan Harga
</h4>


<p>
<b>Harga Terkini:</b>{" "}
{
rupiah(
analysis.perkembangan.hargaAkhir
)
}
/
{data.satuan}
</p>



{
analysis.statusHAP && (

<div
className="
space-y-1
"
>

<p>
<b>HAP:</b>{" "}

{
analysis.perkembangan.hap
?

rupiah(
analysis.perkembangan.hap
)

:

analysis.perkembangan.hap_bawah &&
analysis.perkembangan.hap_atas

?

`${rupiah(
analysis.perkembangan.hap_bawah
)} - ${rupiah(
analysis.perkembangan.hap_atas
)}`

:

"-"

}

</p>


<p>
<b>Status:</b>{" "}
Harga {data.nama}

{" "}

{
analysis.statusHAP === "Dalam zona HAP"

?

"berada dalam zona HAP."

:

analysis.statusHAP === "Di atas HAP"

?

`berada di atas HAP sebesar ${analysis.selisihHAP?.toFixed(2)}%.`

:

`berada di bawah HAP sebesar ${analysis.selisihHAP?.toFixed(2)}%.`

}

</p>

</div>

)

}



{
analysis.statusHET && (

<div
className="
space-y-1
"
>

<p>
<b>HET:</b>{" "}
{
analysis.perkembangan.het
?
rupiah(
analysis.perkembangan.het
)
:
"-"
}
</p>


<p>
<b>Status:</b>{" "}
Harga {data.nama}

{" "}

{
analysis.statusHET === "Sesuai HET"

?

"sesuai dengan HET yang ditetapkan."

:

analysis.statusHET === "Di atas HET"

?

`berada di atas HET sebesar ${analysis.selisihHET?.toFixed(2)}%.`

:

`berada di bawah HET sebesar ${analysis.selisihHET?.toFixed(2)}%.`

}

</p>

</div>

)

}

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

{data.narrative}

</div>


<TrendComparisonTable
 data={data}
/>


<TrendComparisonChart
 data={data}
/>


</div>


)

}








function InfoBox({

title,

value,

}:{

title:string

value:string

}){


return (

<div

className="
rounded-lg
border
p-3
"

>


<p

className="
text-xs
text-muted-foreground
"

>

{title}

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