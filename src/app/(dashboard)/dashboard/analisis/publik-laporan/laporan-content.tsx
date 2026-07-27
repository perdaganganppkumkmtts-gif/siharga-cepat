"use client"


import {
  useState
} from "react"



import {
  ReportFilter,
  CommodityOption,
} from "./components/report-filter"



import {
  ReportPreview
} from "./components/report-preview"



import {
  ReportPublishDialog
} from "./components/report-publish-dialog"



import {
  getTrendAnalysis,
  publishLaporan
} from "./actions"









interface Props {


  commodities:
  CommodityOption[]



  mode?:
  "dinas" |
  "publik"


}









export function LaporanContent({


commodities,


mode="publik"



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
// MODAL PUBLISH
// =========================


const [

publishOpen,

setPublishOpen

]=

useState(false)








const [

publishing,

setPublishing

]=

useState(false)















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

selectedCommodityIds.length === 0

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














// =========================
// OPEN MODAL PUBLISH
// =========================


function handlePublish(){


setPublishOpen(true)


}














// =========================
// SUBMIT PUBLISH
// =========================


async function handleSubmitPublish(
payload:any
){



try{


setPublishing(true)

setError(null)







await publishLaporan({


judul:
payload.judul,



createdBy:
payload.createdBy,



data:
result



})








alert(
"Laporan berhasil dipublikasikan."
)







setPublishOpen(false)





}



catch(err){


console.error(err)



setError(

"Gagal mempublikasikan laporan."

)



}



finally{


setPublishing(false)


}



}















return (


<div

className="
space-y-6
"

>









{/* =========================
FILTER LAPORAN
========================= */}



<ReportFilter



commodities={commodities}





selected={selectedCommodityIds}






dateRange={dateRange}






onSelectedChange={setSelectedCommodityIds}






onDateRangeChange={setDateRange}






onGenerate={handleGenerate}





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


<ReportPreview


data={result}


mode={mode}


onPublish={handlePublish}


/>

}
















{
!loading &&

result.length === 0 &&


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


















{/* =========================
DIALOG PUBLISH
========================= */}



<ReportPublishDialog

open={publishOpen}

onOpenChange={setPublishOpen}

onSubmit={handleSubmitPublish}

loading={publishing}

/>
















</div>


)


}