"use client"


import {
  ReportTitle
} from "./report-title"


import {
  ReportPeriod
} from "./report-period"


import {
  ReportSummary
} from "./report-summary"


import {
  AnalysisCard
} from "./analysis-card"


import {
  TrendSummary
} from "./trend-summary"


import {
  ReportTable
} from "./report-table"


import {
  ReportSource
} from "./report-source"


import {
  ReportFooter
} from "./report-footer"


import {
 ReportExportButton
} from "./report-export-button"


import {
  ReportPublishButton
} from "./report-publish-button"




interface Props {

data:any[]

mode?:
"dinas" |
"publik"


tanggal?:string


onPublish?:()=>void

}









export function ReportPreview({

data,

mode="publik",

tanggal,

onPublish

}:Props){





if(

!data ||

data.length===0

){

return null

}







const first =

data[0].analysis







const tanggalPengesahan =

tanggal ??

new Date()

.toISOString()

.slice(0,10)








return (


<div

className="
space-y-8
"

id="laporan-preview"

>

{
mode==="dinas" &&

<div

className="
flex
justify-end
"

>

<ReportExportButton

targetId="laporan-preview"

/>

</div>

}

{/* =========================
AKSI PUBLIK
========================= */}


{
mode==="publik" &&

<div

className="
flex
justify-end
"

>


<ReportPublishButton

onPublish={onPublish}

/>


</div>

}

<div

className="
space-y-8
"

id="laporan-preview"

></div>







{/* =========================
HALAMAN UTAMA
========================= */}



<ReportTitle />







<ReportPeriod


periodeAnalisis={

first.periodeAnalisis

}




periodePembanding={

first.periodePembanding

}



/>









<ReportSummary


data={data}


/>









<ReportTable


data={data}


/>









<ReportSource />













{/* =========================
LAMPIRAN TREND FLUKTUASI
========================= */}



<div

className="
break-before-page
space-y-8
"

>



<h2

className="
text-xl
font-bold
"

>

Lampiran

Perkembangan dan Fluktuasi Harga Komoditas

</h2>









{/* DETAIL ANALISIS KOMODITAS */}



<div

className="
space-y-4
"

>


{

data.map(

(item)=>(


<AnalysisCard


key={item.id}


data={item}


/>


)

)


}



</div>












{/* RINGKASAN TREND */}



<TrendSummary


data={data}


/>



</div>













{/* =========================
PENGESAHAN DINAS
========================= */}



{

mode==="dinas" &&


<div

className="
break-before-page
"

>


<ReportFooter


tanggal={

tanggalPengesahan

}


/>


</div>


}








</div>


)


}