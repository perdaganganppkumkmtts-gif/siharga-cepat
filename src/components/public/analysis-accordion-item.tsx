"use client"


import {
  useRef
} from "react"


import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


import {
  AnalysisCard
} from "./analysis-card"




interface Props {

item:any

index:number

}





export function AnalysisAccordionItem({

item,

index

}:Props){



const itemRef =
useRef<HTMLDivElement>(null)




return (

<AccordionItem


ref={itemRef}


value={`item-${index}`}


className="
scroll-mt-24
rounded-xl
border
bg-card
px-4
"


>


<AccordionTrigger


onClick={()=>{


setTimeout(()=>{


itemRef.current?.scrollIntoView({

behavior:"smooth",

block:"start"

})


},200)


}}


>


<div

className="
flex
items-center
gap-3
text-left
"

>


<span

className="
font-semibold
"

>

{index + 1}.

</span>


<span>

{item.nama}

</span>


</div>


</AccordionTrigger>





<AccordionContent>


<AnalysisCard

data={item}

/>


</AccordionContent>



</AccordionItem>


)


}