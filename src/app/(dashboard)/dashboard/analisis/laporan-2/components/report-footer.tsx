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



return (


<div

className="
mt-16
text-sm
"

>









{/* ==========================
    AREA TANDA TANGAN
========================== */}



<div

className="
grid
grid-cols-4
"

>



{/* KOLOM 1 */}

<div></div>



{/* KOLOM 2 */}

<div></div>



{/* KOLOM 3 */}

<div></div>





{/* KOLOM 4 TANDA TANGAN */}

<div

className="
text-left
"

>



<p>

SoE,{" "}

{

tanggal

?

formatTanggal(tanggal)

:

"........................"

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
    KIRI BAWAH
========================== */}



<div

className="
mt-6
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
p-1
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
p-1.5
"

>

Sekretaris Dinas

</td>



<td

className="
border
border-black
w-16
h-7
"

>

</td>



</tr>








<tr>


<td

className="
border
border-black
p-1.5
"

>

Kabid Bina Usaha Perdagangan

</td>



<td

className="
border
border-black
h-7
"

>

</td>



</tr>








<tr>


<td

className="
border
border-black
p-1.5
"

>

Analis Perdagangan Ahli Muda

</td>



<td

className="
border
border-black
h-7
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