"use client"

import {
  useState
} from "react"


import {
  motion
} from "framer-motion"


import {
  Card
} from "@/components/ui/card"


import {
  Button
} from "@/components/ui/button"


import {
  DotPattern
} from "@/components/dot-pattern"


import {
  Input
} from "@/components/ui/input"


import {
  Textarea
} from "@/components/ui/textarea"


import {
  toast
} from "sonner"


import {
  Badge
} from "@/components/ui/badge"

import {
  Star,
  Send,
  Loader2,
  MessageSquare
} from "lucide-react"

export function FeedbackSection(){

const [website,setWebsite] =
useState("")

const [nama,setNama] =
useState("")


const [whatsapp,setWhatsapp] =
useState("")


const [pesan,setPesan] =
useState("")


const [rating,setRating] =
useState(0)



const [loading,setLoading] =
useState(false)



const [errors,setErrors] =
useState({

nama:"",
whatsapp:"",
pesan:"",
rating:""

})







function validate(){

// ANTI BOT HONEYPOT

if(website){

toast.error(
"Pengiriman tidak valid."
)

return false

}


let valid = true


const newErrors = {

nama:"",
whatsapp:"",
pesan:"",
rating:""

}





// NAMA

if(!nama.trim()){

newErrors.nama =
"Nama wajib diisi."

valid = false

}





// WHATSAPP

if(!whatsapp.trim()){

newErrors.whatsapp =
"Nomor WhatsApp wajib diisi."

valid = false


}
else if(
!/^08\d{8,11}$/.test(whatsapp)
){

newErrors.whatsapp =
"Format WhatsApp tidak valid. Contoh: 081200000000."

valid = false

}







// PESAN

if(!pesan.trim()){

newErrors.pesan =
"Saran atau masukan wajib diisi."

valid = false

}






// RATING

if(rating === 0){

newErrors.rating =
"Silakan pilih rating kepuasan."

valid = false

}






setErrors(newErrors)


return valid


}









async function handleSubmit(){


if(loading)
return




if(!validate()){

toast.error(
"Periksa kembali data yang belum lengkap."
)

return

}





try{


setLoading(true)





const response =

await fetch(

"/api/feedback",

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},


body:JSON.stringify({

nama,

whatsapp,

rating,

pesan

})


}

)





if(!response.ok){


const result =
await response.json()


throw new Error(

result.message ||

"Gagal mengirim masukan."

)


}





toast.success(

"Terima kasih! Masukan Anda berhasil dikirim."

)





setNama("")
setWhatsapp("")
setPesan("")
setRating(0)


setErrors({

nama:"",
whatsapp:"",
pesan:"",
rating:""

})




}


catch(error){


toast.error(

error instanceof Error

?

error.message

:

"Gagal mengirim masukan."

)


}


finally{


setLoading(false)


}



}










return (

<section

className="
relative
py-16
overflow-hidden
"

>


<div

className="
absolute
inset-0
bg-gradient-to-r
from-green-500/10
via-transparent
to-red-500/10
"

/>



<DotPattern

className="
absolute
inset-0
opacity-50
"

size="md"

fadeStyle="circle"

/>







<motion.div

initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true,
amount:0.2
}}

transition={{
duration:0.6
}}

className="
relative
container
mx-auto
px-4
max-w-5xl
"

>





{/* HEADER */}

<div

className="
mx-auto
max-w-3xl
text-center
mb-12
"

>


<Badge

variant="outline"

className="
mb-4
border-green-600/40
text-green-700
dark:text-green-400
"

>


<MessageSquare

className="
mr-2
h-4
w-4
"

/>


Saran & Masukan


</Badge>







<h2

className="
text-3xl
font-bold
tracking-tight
sm:text-4xl
mb-4
"

>

Bantu Kami Meningkatkan


<span

className="
block
bg-gradient-to-r
from-green-600
via-green-500
to-red-500
bg-clip-text
text-transparent
"

>

SIHARGA CEPAT

</span>


</h2>







<p

className="
text-lg
text-muted-foreground
"

>

Berikan pendapat, kritik, dan saran Anda
untuk membantu meningkatkan layanan informasi
harga barang kebutuhan pokok Kabupaten Timor Tengah Selatan.

</p>



</div>









<motion.div

initial={{
opacity:0,
scale:0.98
}}

whileInView={{
opacity:1,
scale:1
}}

viewport={{
once:true
}}

transition={{
duration:0.5
}}

>





{/* INFORMASI FORM */}

<div

className="
mb-6
rounded-xl
border
bg-muted/40
p-4
"

>


<p

className="
font-medium
"

>

📝 Isi Form Saran & Masukan

</p>


<p

className="
mt-1
text-sm
text-muted-foreground
"

>

Lengkapi data berikut untuk menyampaikan
masukan Anda terkait layanan SIHARGA CEPAT.

</p>


</div>









<Card

className="
p-6
sm:p-10
bg-background/70
backdrop-blur
shadow-lg
"

>


<div

className="
space-y-6
"

>








{/* NAMA */}

<div className="space-y-2">


<label

className="
text-sm
font-medium
"

>

Nama Lengkap

</label>


<Input

disabled={loading}

value={nama}

onChange={(e)=>{

setNama(e.target.value)

setErrors({

...errors,

nama:""

})

}}

placeholder="Masukkan nama Anda"

/>


{

errors.nama &&

<p className="text-sm text-red-500">

{errors.nama}

</p>

}


</div>









{/* WHATSAPP */}

<div className="space-y-2">


<label

className="
text-sm
font-medium
"

>

Nomor WhatsApp

</label>


<Input

disabled={loading}

type="tel"

maxLength={12}

value={whatsapp}

onChange={(e)=>{

const value = e.target.value
.replace(/[^0-9]/g,"")
.slice(0,12)


setWhatsapp(value)


setErrors({

...errors,

whatsapp:""

})

}}

placeholder="Contoh: 081200000000"

/>



<p

className="
text-xs
text-muted-foreground
"

>

Nomor WhatsApp aktif diperlukan apabila diperlukan tindak lanjut.

</p>



{

errors.whatsapp &&

<p className="text-sm text-red-500">

{errors.whatsapp}

</p>

}


</div>









{/* PESAN */}

<div className="space-y-2">


<label

className="
text-sm
font-medium
"

>

Saran atau Masukan

</label>


<Textarea

disabled={loading}

value={pesan}

onChange={(e)=>{

setPesan(e.target.value)

setErrors({

...errors,

pesan:""

})

}}

placeholder="Tuliskan kritik, saran, atau pengalaman Anda."

rows={5}

/>



{

errors.pesan &&

<p className="text-sm text-red-500">

{errors.pesan}

</p>

}


</div>









{/* RATING */}

<div>


<label

className="
text-sm
font-medium
block
mb-3
"

>

Tingkat Kepuasan Layanan

</label>


<div className="flex gap-2">


{

[1,2,3,4,5].map((item)=>(


<button

key={item}

type="button"

disabled={loading}

onClick={()=>{

setRating(item)

setErrors({

...errors,

rating:""

})

}}

>


<Star

className={`

h-8

w-8

transition

${
item <= rating

?

"fill-yellow-400 text-yellow-400"

:

"text-muted-foreground"

}

`}

/>


</button>


))


}


</div>





{

errors.rating &&

<p className="mt-2 text-sm text-red-500">

{errors.rating}

</p>

}



</div>



{/* HONEYPOT ANTI SPAM */}

<div
className="
hidden
"
>

<Input

tabIndex={-1}

autoComplete="off"

value={website}

onChange={(e)=>
setWebsite(e.target.value)
}

placeholder="Website"

/>

</div>





<Button

onClick={handleSubmit}

disabled={loading}

className="
w-full
sm:w-auto
bg-green-600
hover:bg-green-700
"

>


{

loading

?

<>

<Loader2 className="mr-2 h-4 w-4 animate-spin"/>

Mengirim...

</>

:

<>

<Send className="mr-2 h-4 w-4"/>

Kirim Masukan

</>

}



</Button>





<p

className="
text-xs
text-muted-foreground
"

>

Dengan mengirimkan masukan, Anda membantu kami meningkatkan kualitas layanan SIHARGA CEPAT.

</p>





</div>


</Card>





</motion.div>






</motion.div>


</section>


)


}