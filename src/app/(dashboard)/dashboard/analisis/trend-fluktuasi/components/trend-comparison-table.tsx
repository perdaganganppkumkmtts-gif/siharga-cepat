"use client"


interface Props {

  data:any

}



export function TrendComparisonTable({
  data
}:Props){


const current =
data.history ?? []


const previous =
data.historyPrevious ?? []



// jumlah baris berdasarkan periode terpanjang
const maxLength =
Math.max(
  current.length,
  previous.length
)



return (

<div
className="
rounded-xl
border
overflow-hidden
overflow-x-auto
"
>


<table
className="
w-full
text-sm
"
>


<thead
className="
bg-muted
"
>

<tr>


<th
className="
p-3
text-left
"
>
Tanggal Periode Analisis
</th>


<th
className="
p-3
text-left
"
>
Harga Periode Analisis
</th>



<th
className="
p-3
text-left
"
>
Tanggal Periode Pembanding
</th>



<th
className="
p-3
text-left
"
>
Harga Periode Pembanding
</th>


</tr>


</thead>





<tbody>


{

Array.from(
{
length:maxLength
}

).map(
(_,index)=>{


const currentItem =
current[index]


const previousItem =
previous[index]



return (

<tr

key={index}

className="
border-t
"

>


{/* TANGGAL ANALISIS */}

<td
className="
p-3
"
>

{

currentItem

?

formatTanggal(
currentItem.time
)

:

"-"

}

</td>





{/* HARGA ANALISIS */}

<td
className="
p-3
text-left
font-medium
"
>

{

currentItem

?

rupiah(
currentItem.value
)

:

"-"

}

</td>





{/* TANGGAL PEMBANDING */}

<td
className="
p-3
"
>

{

previousItem

?

formatTanggal(
previousItem.time
)

:

"-"

}

</td>





{/* HARGA PEMBANDING */}

<td
className="
p-3
text-left
font-medium
"
>

{

previousItem

?

rupiah(
previousItem.value
)

:

"-"

}

</td>



</tr>

)


}

)

}


</tbody>


</table>


</div>


)

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
value:number
){

return (

`Rp ${Math.round(value)
.toLocaleString("id-ID")}`

)

}