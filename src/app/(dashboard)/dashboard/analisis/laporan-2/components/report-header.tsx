"use client"


interface Props {


  nomorSurat:string


  tanggalSurat:string



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








export function ReportHeader({

nomorSurat,

tanggalSurat,

periodeAnalisis,

periodePembanding,

}:Props){



return (


<div

className="
space-y-6
text-sm
"

>









{/* =====================
    KOP DINAS
===================== */}


<div

className="
flex
items-center
gap-4
px-4
pb-3
"

>







{/* LOGO PEMDA */}


<div

className="
shrink-0
w-28
flex
justify-center
items-center
"

>


<img

src="/tts-logo.svg"

alt="Logo Pemda TTS"

className="
w-24
h-24
object-contain
"

/>


</div>









{/* IDENTITAS DINAS */}


<div

className="
flex-1
text-center
leading-tight
"

>


<h1

className="
font-bold
text-base
uppercase
"

>

PEMERINTAH KABUPATEN TIMOR TENGAH SELATAN

</h1>







<h2

className="
font-bold
text-base
uppercase
mt-1
"

>

DINAS PERDAGANGAN, PERINDUSTRIAN,
<br/>

KOPERASI DAN USAHA MIKRO KECIL MENENGAH

</h2>







<p

className="
text-xs
mt-2
"

>

Jln. Gajah Mada

<br/>

Telp. 0388 – 21255 SoE 85511&nbsp;&nbsp;
Email: dinasppkdanumkm@gmail.com

</p>







</div>






</div>









{/* =====================
    GARIS KOP
===================== */}



<div

className="
mt-2
space-y-[2px]
"

>


<div

className="
border-t-[3px]
border-black
"

/>



<div

className="
border-t
border-black
"

/>



</div>













{/* =====================
    TANGGAL SURAT
===================== */}



<div

className="
flex
justify-end
"

>


<p>

SoE,{" "}

{

formatTanggal(
tanggalSurat
)

}


</p>


</div>












{/* =====================
    IDENTITAS SURAT
===================== */}



<div

className="
grid
grid-cols-[90px_10px_1fr]
gap-y-1
"

>



<span>
Nomor
</span>


<span>
:
</span>


<span>

{nomorSurat}

</span>








<span>
Hal
</span>


<span>
:
</span>


<span>

Laporan Perkembangan Harga Barang Kebutuhan Pokok

</span>





</div>












{/* =====================
    JUDUL LAPORAN
===================== */}



<div

className="
text-center
space-y-2
pt-5
"

>


<h3

className="
font-bold
text-lg
uppercase
"

>

LAPORAN PERKEMBANGAN HARGA

<br/>

BARANG KEBUTUHAN POKOK

</h3>






<p>

Sistem Informasi Harga Barang Kebutuhan Pokok

<br/>

Cepat dan Terpadu (SIHARGA CEPAT)

</p>





</div>












{/* =====================
    PERIODE ANALISIS
===================== */}



<div

className="
space-y-1
pt-3
"

>



<p>

<b>
Periode Analisis :
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
Periode Pembanding :
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









</div>


)


}