"use client"


import Link from "next/link"


import {
  Button
} from "@/components/ui/button"


import {
  ArrowLeft
} from "lucide-react"







interface Props {

  href?: string

}







export function ReportPublishButton({

  href = "/publikasi"

}: Props){





return (


<Button

asChild

className="
gap-2
"

>


<Link href={href}>


<ArrowLeft

className="
h-4
w-4
"

/>


Kembali



</Link>


</Button>


)


}