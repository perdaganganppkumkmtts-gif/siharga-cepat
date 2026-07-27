"use client"


import {
 ReportSummary
} from "./report-summary"


import {
 ReportTable
} from "./report-table"



interface Props {

data:any[]

}



export function ReportPreview({
data
}:Props){


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


<div>

<h1
className="
text-xl
font-bold
"
>

Laporan Perkembangan Harga
Barang Kebutuhan Pokok

</h1>


<p
className="
text-sm
text-muted-foreground
"
>

SIHARGA CEPAT Kabupaten Timor Tengah Selatan

</p>


</div>



<ReportSummary

data={data}

/>



<ReportTable

data={data}

/>



</div>

)

}