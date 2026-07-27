"use client"


interface Props {


  periodeAnalisis?: {

    mulai:string

    sampai:string

  }



  periodePembanding?: {

    mulai:string

    sampai:string

  }


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

year:"numeric",

}

)

}









export function ReportPeriod({

periodeAnalisis,

periodePembanding,

}:Props){



return (


<div

className="
rounded-lg
border
bg-muted/30
p-4
space-y-2
text-sm
"

>


<p>

<b>
Periode Analisis:
</b>

{" "}


{

periodeAnalisis &&

`${formatTanggal(
periodeAnalisis.mulai
)}
s.d.
${formatTanggal(
periodeAnalisis.sampai
)}`

}


</p>






<p>

<b>
Periode Pembanding:
</b>

{" "}


{

periodePembanding &&

`${formatTanggal(
periodePembanding.mulai
)}
s.d.
${formatTanggal(
periodePembanding.sampai
)}`

}


</p>





</div>


)

}