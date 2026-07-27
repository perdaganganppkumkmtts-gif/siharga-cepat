"use client"


import {
  useState
} from "react"



import {
  ReportTitle
} from "./components/report-title"



import {
  ReportPeriod
} from "./components/report-period"



import {
  ReportSummary
} from "./components/report-summary"



import {
  TrendSummary
} from "../trend-fluktuasi/components/trend-summary"



import {
  ReportTable
} from "./components/report-table"



import {
  ReportSource
} from "./components/report-source"



import {
  ReportFilter,
  CommodityOption,
} from "./components/report-filter"



import {
  getTrendAnalysis
} from "../trend-fluktuasi/actions"






interface Props {

  commodities:
  CommodityOption[]

}


export function LaporanContent({

commodities

}:Props){





const [
result,
setResult
]=
useState<any[]>([])





const [
loading,
setLoading
]=
useState(false)





const [
error,
setError
]=
useState<string|null>(null)







// =========================
// FILTER
// =========================


const [
selectedCommodityIds,
setSelectedCommodityIds
]=
useState<string[]>([])






const [
dateRange,
setDateRange
]=
useState({

startDate:"",

endDate:""

})











// =========================
// GENERATE LAPORAN
// =========================


async function handleGenerate(){





if(
selectedCommodityIds.length===0
){

setError(
"Silakan pilih minimal satu komoditas."
)

return

}






if(
!dateRange.startDate ||
!dateRange.endDate
){

setError(
"Silakan pilih periode laporan."
)

return

}








try{


setLoading(true)

setError(null)





const data =

await getTrendAnalysis(

selectedCommodityIds,

dateRange.startDate,

dateRange.endDate

)





setResult(data)



}



catch(err){


console.error(err)


setError(
"Gagal membuat laporan analisis harga."
)


setResult([])



}



finally{


setLoading(false)


}



}









return (


<div

className="
space-y-6
"

>







{/* =========================
FILTER
========================= */}



<ReportFilter


commodities={
commodities
}



selected={
selectedCommodityIds
}



dateRange={
dateRange
}



onSelectedChange={
setSelectedCommodityIds
}



onDateRangeChange={
setDateRange
}



onGenerate={
handleGenerate
}



/>









{
error &&


<div

className="
rounded-lg
border
border-destructive/30
bg-destructive/10
p-4
text-sm
text-destructive
"

>

{error}

</div>


}









{
loading &&


<div

className="
rounded-lg
border
p-6
text-center
text-muted-foreground
"

>

Menyusun laporan analisis harga...

</div>


}












{
!loading &&
result.length > 0 &&


<div

className="
space-y-8
"

>









{/* =========================
JUDUL LAPORAN
========================= */}



<ReportTitle />









{/* =========================
PERIODE
========================= */}



<ReportPeriod


periodeAnalisis={

result[0]
.analysis
.periodeAnalisis

}


periodePembanding={

result[0]
.analysis
.periodePembanding

}


/>









{/* =========================
RINGKASAN
========================= */}



<ReportSummary


data={
result
}


/>









{/* =========================
TREND FLUKTUASI
========================= */}



<TrendSummary


data={
result
}


/>









{/* =========================
TABEL
========================= */}



<ReportTable


data={
result
}


/>



{/* =========================
SUMBER
========================= */}



<ReportSource />







</div>


}









{
!loading &&
result.length===0 &&


<div

className="
rounded-lg
border
p-6
text-center
text-muted-foreground
"

>

Belum ada laporan yang dibuat.

</div>


}









</div>


)


}