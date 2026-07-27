"use client"

import {
  Share2
} from "lucide-react"

import {
  Button
} from "@/components/ui/button"


export function ShareButton({

title

}:{

title:string

}){


async function handleShare(){


const url = window.location.href


if(navigator.share){


await navigator.share({

title,

url

})


}else{


await navigator.clipboard.writeText(url)


alert(
"Link berhasil disalin."
)


}


}



return (

<Button

variant="outline"

onClick={handleShare}

className="gap-2"

>

<Share2 size={16}/>

Bagikan

</Button>

)

}