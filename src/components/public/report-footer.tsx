"use client"


interface Props {

  tanggal?: string

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









export function ReportFooter({

tanggal,

}:Props){



const tanggalFooter =

tanggal ??

new Date()
.toISOString()
.slice(0,10)






return (


<div

className="
mt-16
text-sm
"

>









{/* ==========================
    TANDA TANGAN KEPALA DINAS
========================== */}



<div

className="
grid
grid-cols-4
"

>



{/* KOLOM KOSONG */}

<div></div>

<div></div>

<div></div>






{/* AREA TANDA TANGAN */}

<div

className="
text-left
"

>


<p>

SoE,{" "}

{

formatTanggal(
tanggalFooter
)

}

</p>








<p

className="
mt-5
leading-relaxed
"

>

Kepala Dinas Perdagangan,
<br/>

Perindustrian, Koperasi dan
<br/>

Usaha Mikro Kecil Menengah
<br/>

Kabupaten Timor Tengah Selatan

</p>










{/* RUANG TANDA TANGAN */}

<div

className="
h-28
"

>

</div>










<p

className="
font-bold
underline
"

>

Yusak E. Banunaek, SH, M.Hum

</p>







<p>

Pembina Utama Muda / (IV/c)

</p>







<p>

19700429 199903 1 008

</p>






</div>






</div>












{/* ==========================
    PARAF HIERARKI
========================== */}



<div

className="
mt-8
w-[260px]
"

>






<table

className="
w-full
border
border-black
border-collapse
text-xs
"

>



<thead>


<tr>


<th

colSpan={2}

className="
border
border-black
p-1.5
text-left
font-semibold
"

>

Paraf Hierarki

</th>



</tr>


</thead>









<tbody>





<tr>


<td

className="
border
border-black
p-2
"

>

Sekretaris Dinas

</td>




<td

className="
border
border-black
h-8
w-16
"

>

</td>



</tr>









<tr>


<td

className="
border
border-black
p-2
"

>

Kabid Bina Usaha Perdagangan

</td>




<td

className="
border
border-black
h-8
"

>

</td>



</tr>









<tr>


<td

className="
border
border-black
p-2
"

>

Analis Perdagangan Ahli Muda

</td>




<td

className="
border
border-black
h-8
"

>

</td>



</tr>





</tbody>







</table>







</div>








</div>


)


}