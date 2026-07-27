import {
  getMonitoringHarga
} from "./actions"


import {
  MonitoringSummary
} from "./monitoring-summary"


import {
  MonitoringTable
} from "./monitoring-table"


import {
  MonitoringFilter
} from "./monitoring-filter"





function formatTanggal(
tanggal:string
){

return new Date(
tanggal
)
.toLocaleDateString(
"id-ID",
{
  day:"2-digit",
  month:"long",
  year:"numeric"
}
)

}





export default async function Page({

searchParams

}:{

searchParams:{
  tanggalAkhir?:string
}

}) {



const tanggalSekarang =
searchParams.tanggalAkhir
?
new Date(
searchParams.tanggalAkhir
)
:
new Date()





const tanggalSebelumnya =
new Date(
tanggalSekarang
)



tanggalSebelumnya.setDate(
tanggalSebelumnya.getDate() - 1
)







const data =
await getMonitoringHarga(
searchParams.tanggalAkhir
)






return (

<div className="space-y-6">





{/* Header */}

<div>


<h1 className="text-2xl font-bold tracking-tight">

Monitoring Harga

</h1>



<p className="text-muted-foreground">

Pemantauan perkembangan harga barang kebutuhan pokok

</p>


</div>







{/* Informasi Periode */}

<div className="rounded-lg border bg-muted/30 p-4">


<p className="text-sm text-muted-foreground">

Perbandingan harga:

</p>



<p className="font-semibold">

{
formatTanggal(
tanggalSekarang.toISOString()
)
}

{" dibandingkan "}


{
formatTanggal(
tanggalSebelumnya.toISOString()
)
}

</p>


</div>









{/* Summary */}

<MonitoringSummary

data={data}

/>








{/* Filter */}

<div className="rounded-lg border p-4">


<MonitoringFilter />


</div>







{/* Table */}

<MonitoringTable

data={data}

tanggalSekarang={
tanggalSekarang.toISOString()
}

tanggalSebelumnya={
tanggalSebelumnya.toISOString()
}

/>







</div>

)

}