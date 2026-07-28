"use client"


import {
  Check,
  ChevronsUpDown,
} from "lucide-react"


import {
  useMemo,
  useState,
} from "react"



import {
  Button
} from "@/components/ui/button"



import {
  Input
} from "@/components/ui/input"



import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"



import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"









export interface CommodityOption {

  id:string

  nama:string

}








export interface ReportDateRange {

  startDate:string

  endDate:string

}






export interface ComparisonDateRange {

  startDate:string

  endDate:string

}









interface Props {


  commodities:
  CommodityOption[]



  selected:
  string[]



  dateRange:
  ReportDateRange



  comparisonRange:
  ComparisonDateRange




  onSelectedChange:
  (
    value:string[]
  )=>void





  onDateRangeChange:
  (
    value:ReportDateRange
  )=>void





  onComparisonRangeChange:
  (
    value:ComparisonDateRange
  )=>void





  onGenerate:
  ()=>void


}









export function ReportFilter({

commodities,

selected,

dateRange,

comparisonRange,

onSelectedChange,

onDateRangeChange,

onComparisonRangeChange,

onGenerate,

}:Props){






const [

open,

setOpen

]=useState(false)









function toggleCommodity(
id:string
){



if(
selected.includes(id)
){


onSelectedChange(

selected.filter(

(item)=>

item !== id

)

)


}

else
{


onSelectedChange(

[

...selected,

id

]

)


}


}









const selectedLabel =

useMemo(()=>{


if(
selected.length===0
){

return "Pilih Komoditas"

}






const names =

commodities

.filter(

(item)=>

selected.includes(item.id)

)

.map(

(item)=>

item.nama

)









if(
names.length <= 2
){

return names.join(", ")

}







return `${names[0]}, ${names[1]} (+${names.length-2})`





},[

selected,

commodities

])















return (


<div

className="
space-y-6
"

>









<div

className="
grid
gap-6
lg:grid-cols-3
"

>









{/* =====================
    KOMODITAS
===================== */}



<div

className="
space-y-2
"

>


<label

className="
text-sm
font-medium
"

>

Komoditas Laporan

</label>






<Popover

open={open}

onOpenChange={setOpen}

>


<PopoverTrigger

asChild

>


<Button

variant="outline"

className="
w-full
justify-between
"

>


{selectedLabel}



<ChevronsUpDown

className="
h-4
w-4
opacity-60
"

/>



</Button>


</PopoverTrigger>









<PopoverContent

className="
w-[360px]
p-0
"

>


<Command>



<CommandInput

placeholder="
Cari komoditas...
"

/>






<CommandEmpty>

Komoditas tidak ditemukan

</CommandEmpty>







<CommandGroup

className="
max-h-72
overflow-auto
"

>


{


commodities.map(

(item)=>(



<CommandItem


key={item.id}



onSelect={()=>


toggleCommodity(
item.id
)


}



>


<Check


className={`

mr-2
h-4
w-4

${
selected.includes(item.id)

?

"opacity-100"

:

"opacity-0"

}

`}


/>





{item.nama}





</CommandItem>


)


)





}



</CommandGroup>





</Command>


</PopoverContent>


</Popover>



</div>














{/* =====================
    PERIODE ANALISIS
===================== */}



<div

className="
space-y-2
"

>


<label

className="
text-sm
font-medium
"

>

Periode Analisis

</label>







<div

className="
grid
grid-cols-2
gap-3
"

>


<Input


type="date"



value={

dateRange.startDate

}



onChange={(e)=>


onDateRangeChange({

...dateRange,

startDate:
e.target.value

})


}



/>






<Input


type="date"



value={

dateRange.endDate

}



onChange={(e)=>


onDateRangeChange({

...dateRange,

endDate:
e.target.value

})


}



/>



</div>



</div>















{/* =====================
    PERIODE PEMBANDING
===================== */}



<div

className="
space-y-2
"

>


<label

className="
text-sm
font-medium
"

>

Periode Pembanding

</label>







<div

className="
grid
grid-cols-2
gap-3
"

>


<Input


type="date"



value={

comparisonRange.startDate

}



onChange={(e)=>


onComparisonRangeChange({

...comparisonRange,

startDate:
e.target.value

})


}



/>






<Input


type="date"



value={

comparisonRange.endDate

}



onChange={(e)=>


onComparisonRangeChange({

...comparisonRange,

endDate:
e.target.value

})


}



/>



</div>



</div>









</div>













{/* BUTTON */}



<div

className="
flex
justify-end
"

>


<Button


disabled={

selected.length===0

}



onClick={

onGenerate

}



>


Generate Laporan


</Button>



</div>










</div>


)


}