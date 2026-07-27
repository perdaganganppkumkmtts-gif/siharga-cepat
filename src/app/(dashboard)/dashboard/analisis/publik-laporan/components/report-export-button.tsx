"use client"


import {
 useRef
} from "react"


import {
 Button
} from "@/components/ui/button"


import {
 Printer
} from "lucide-react"


import {
 useReactToPrint
} from "react-to-print"





interface Props {

targetId:string

}





export function ReportExportButton({

targetId

}:Props){



const contentRef =

useRef<HTMLDivElement>(null)





const handlePrint =

useReactToPrint({

contentRef,


documentTitle:
"Laporan Perkembangan Harga Komoditas",



pageStyle:`

@page {

size:A4;

margin:20mm;

}


body {

font-family:

Arial,

sans-serif;

-webkit-print-color-adjust:

exact;

print-color-adjust:

exact;

}


table {

width:100%;

border-collapse:collapse;

}


.break-before-page {

page-break-before:always;

}


`

})







function preparePrint(){



const element =

document.getElementById(
targetId
) as HTMLDivElement | null




if(!element)
return





contentRef.current =
element





handlePrint()



}








return (

<Button

onClick={preparePrint}

className="
gap-2
"

>


<Printer

className="
h-4
w-4
"

/>


Cetak / Simpan PDF


</Button>

)


}