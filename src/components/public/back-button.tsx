"use client"

import {
  ArrowLeft
} from "lucide-react"

import {
  Button
} from "@/components/ui/button"


export function BackButton(){


function handleBack(){

window.history.back()

}



return (

<Button

variant="outline"

onClick={handleBack}

className="gap-2"

>

<ArrowLeft size={16}/>

Kembali

</Button>

)


}