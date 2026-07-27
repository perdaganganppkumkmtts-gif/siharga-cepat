"use client"


import {
  Badge
} from "@/components/ui/badge"




interface Props {

  data:any[]

  tanggalSekarang:string

  tanggalSebelumnya:string

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
  day:"2-digit",
  month:"short",
  year:"numeric"
}
)

}





function formatRupiah(
angka:number
){

return Number(
angka
)
.toLocaleString(
"id-ID"
)

}






export function MonitoringTable({

data,

tanggalSekarang,

tanggalSebelumnya

}:Props){





return (


<div className="rounded-lg border overflow-hidden">



<table className="w-full">





<thead className="border-b bg-muted/50">


<tr>



<th className="p-3 text-center text-sm">

No.

</th>





<th className="p-3 text-left text-sm">

Komoditas

</th>





<th className="p-3 text-left text-sm">

Satuan

</th>





<th className="p-3 text-right text-sm">

Harga {formatTanggal(
tanggalSekarang
)}

</th>





<th className="p-3 text-right text-sm">

Harga {formatTanggal(
tanggalSebelumnya
)}

</th>





<th className="p-3 text-right text-sm">

Selisih

</th>





<th className="p-3 text-center text-sm">

Status

</th>



</tr>


</thead>







<tbody>


{


data.map(

(item,index)=>(



<tr

key={item.kode}

className="border-b hover:bg-muted/50"

>






<td className="p-3 text-center">

{index + 1}

</td>







<td className="p-3 font-medium">

{item.nama}

</td>







<td className="p-3">

{item.satuan}

</td>







<td className="p-3 text-right">

Rp {formatRupiah(
item.harga_sekarang
)}

</td>







<td className="p-3 text-right">

Rp {formatRupiah(
item.harga_sebelumnya
)}

</td>







<td className="p-3 text-right">


<span

className={

item.selisih > 0

?

"text-red-600"

:

item.selisih < 0

?

"text-green-600"

:

"text-muted-foreground"

}


>


{

item.selisih > 0

?

"+"

:

""

}


{formatRupiah(
item.selisih
)}



</span>



</td>








<td className="p-3 text-center">


{

item.status === "Naik"

&&

<Badge variant="destructive">

Naik

</Badge>

}






{

item.status === "Turun"

&&

<Badge className="bg-green-600">

Turun

</Badge>

}







{

item.status === "Stabil"

&&

<Badge variant="secondary">

Stabil

</Badge>

}




</td>






</tr>



)

)



}





</tbody>



</table>


</div>


)

}