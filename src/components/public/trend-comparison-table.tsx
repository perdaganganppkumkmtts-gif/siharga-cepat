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
data.previousHistory ??
data.historyPrevious ??
[]



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


{/* PETUNJUK MOBILE */}

<div

className="
block
md:hidden
px-3
py-2
text-xs
text-muted-foreground
bg-muted/50
"

>

Geser ke kiri untuk melihat informasi lainnya

</div>




<div

className="
overflow-x-auto
"

>


<table

className="
min-w-[700px]
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
whitespace-nowrap
"

>

Tanggal Periode Analisis

</th>




<th

className="
p-3
text-left
whitespace-nowrap
"

>

Harga Periode Analisis

</th>




<th

className="
p-3
text-left
whitespace-nowrap
"

>

Tanggal Periode Pembanding

</th>




<th

className="
p-3
text-left
whitespace-nowrap
"

>

Harga Periode Pembanding

</th>



</tr>


</thead>





<tbody>


{


Array.from({

length:maxLength

}).map(

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
text-left
whitespace-nowrap
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
whitespace-nowrap
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
text-left
whitespace-nowrap
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
whitespace-nowrap
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