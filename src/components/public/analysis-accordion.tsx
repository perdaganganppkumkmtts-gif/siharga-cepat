"use client"


import {
  Accordion
} from "@/components/ui/accordion"


import {
  AnalysisAccordionItem
} from "./analysis-accordion-item"




interface Props {

  data:any[]

}




export function AnalysisAccordion({

data

}:Props){



if(
!data ||
data.length === 0
){

return null

}



return (

<Accordion

type="single"

collapsible

className="
space-y-3
"

>


{

data.map(

(item,index)=>(


<AnalysisAccordionItem

key={item.id}

item={item}

index={index}

/>


)

)

}



</Accordion>


)


}