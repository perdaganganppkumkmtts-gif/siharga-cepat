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



// ambil jumlah baris terbanyak
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
Tanggal
</th>


<th
className="
p-3
text-right
"
>
Periode Analisis
</th>


<th
className="
p-3
text-right
"
>
Periode Pembanding
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



{/* TANGGAL */}

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

previousItem

?

formatTanggal(
previousItem.time
)

:

"-"

}

</td>





{/* PERIODE ANALISIS */}

<td
className="
p-3
text-right
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





{/* PERIODE PEMBANDING */}

<td
className="
p-3
text-right
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