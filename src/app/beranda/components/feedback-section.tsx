"use client"


import {
  useState
} from "react"


import {
  motion
} from "framer-motion"


import {
  Star,
  Send,
  Loader2
} from "lucide-react"


import {
  Card
} from "@/components/ui/card"


import {
  Button
} from "@/components/ui/button"


import {
  DotPattern
} from "@/components/dot-pattern"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { toast } from "sonner"

import {
  Badge
} from "@/components/ui/badge"

export function FeedbackSection(){



const [nama,setNama] =
useState("")


const [whatsapp, setWhatsapp] = useState("")


const [pesan,setPesan] =
useState("")


const [rating,setRating] =
useState(0)



const [loading,setLoading] =
useState(false)







async function handleSubmit(){

  if (loading) return

if (
  !nama.trim() ||
  !whatsapp.trim() ||
  !pesan.trim() ||
  rating === 0
) {


toast.error(
  "Nama, No. WhatsApp, rating, dan saran wajib diisi."
)

return

}

if (!/^08\d{8,11}$/.test(whatsapp)) {
    toast.error("Masukkan nomor WhatsApp yang valid.")
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


body: JSON.stringify({
  nama,
  whatsapp,
  rating,
  pesan
})


}

)






if (!response.ok) {
  const result = await response.json()

  throw new Error(
    result.message || "Terjadi kesalahan."
  )
}






toast.success(
  "Terima kasih! Masukan Anda berhasil dikirim."
)





setNama("")
setWhatsapp("")
setPesan("")
setRating(0)





}

catch (error) {

  toast.error(
    error instanceof Error
      ? error.message
      : "Gagal mengirim masukan."
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
py-2
overflow-hidden
"

>



{/* BACKGROUND */}


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
container
mx-auto
px-4
max-w-5xl
relative
"

>







{/* HEADER */}

<div

className="
mx-auto
max-w-3xl
text-center
mb-16
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

Saran & Masukan

</h2>






<p

className="
text-lg
text-muted-foreground
"

>

Berikan Saran & Masukan terkait SIHARGA CEPAT

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


<Card

className="
p-6
sm:p-10
shadow-lg
bg-background/60
backdrop-blur-md
border-border/50
"

>


<div

className="
space-y-6
"

>






{/* RATING */}


<div>


<p

className="
font-medium
mb-3
"

>

Bagaimana tingkat kepuasan Anda?

</p>




<div

className="
flex
gap-2
"

>


{

[1,2,3,4,5].map(

(item)=>(


<button
  key={item}
  type="button"
  disabled={loading}
  onClick={() => setRating(item)}
  className="
    transition-transform
    hover:scale-110
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>


<Star

className={`
w-8
h-8
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


)

)

}



</div>



</div>










{/* NAMA */}


<Input
  disabled={loading}
  value={nama}
  onChange={(e) => setNama(e.target.value)}
  placeholder="Masukkan nama anda"
/>









{/* EMAIL */}


<Input
  disabled={loading}
  type="tel"
  value={whatsapp}
  onChange={(e) =>
    setWhatsapp(e.target.value.replace(/[^0-9]/g, ""))
  }
  placeholder="Masukkan Nomor Whatsapp contoh: 081200000000"
/>









{/* PESAN */}


<Textarea
  disabled={loading}
  value={pesan}
  onChange={(e) => setPesan(e.target.value)}
  placeholder="Tuliskan kritik, saran, atau pengalaman Anda menggunakan SIHARGA CEPAT."
  rows={5}
/>








{/* BUTTON */}


<Button
  onClick={handleSubmit}
  disabled={loading}
  className="
    w-full
    sm:w-auto
    bg-green-600
    hover:bg-green-700
    transition-all
    duration-300
    disabled:opacity-70
    disabled:cursor-not-allowed
  "
>
  {loading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Mengirim...
    </>
  ) : (
    <>
      <Send className="mr-2 h-4 w-4" />
      Kirim Masukan
    </>
  )}
</Button>







</div>


</Card>



</motion.div>





</motion.div>




</section>


)



}