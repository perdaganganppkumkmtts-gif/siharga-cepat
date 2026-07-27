"use client"


import {
 Button
} from "@/components/ui/button"


import {
 Upload
} from "lucide-react"





interface Props {

onPublish?:()=>void

}





export function ReportPublishButton({

onPublish

}:Props){



return (


<Button

onClick={onPublish}

className="
gap-2
"

>


<Upload

className="
h-4
w-4
"

/>


Publikasikan Laporan


</Button>


)


}