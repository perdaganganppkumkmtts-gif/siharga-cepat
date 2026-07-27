"use client"


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import {
  Database,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react"




interface Props {

data:any[]

}





export function MonitoringSummary({

data

}:Props){





const total =
data.length





const naik =
data.filter(
(item)=>
item.status==="Naik"
)
.length





const turun =
data.filter(
(item)=>
item.status==="Turun"
)
.length





const stabil =
data.filter(
(item)=>
item.status==="Stabil"
)
.length






const items=[



{

title:"Total Komoditas",

value:
total,

icon:
Database

},



{

title:"Harga Naik",

value:
naik,

icon:
TrendingUp

},



{

title:"Harga Turun",

value:
turun,

icon:
TrendingDown

},



{

title:"Harga Stabil",

value:
stabil,

icon:
Minus

},



]








return (

<div className="
grid
gap-4
md:grid-cols-4
">


{

items.map(

(item)=>(


<Card

key={item.title}

>


<CardHeader

className="
flex
flex-row
items-center
justify-between
pb-2
"

>


<CardTitle

className="
text-sm
font-medium
"

>

{item.title}

</CardTitle>



<item.icon

className="
h-4
w-4
text-muted-foreground
"

/>



</CardHeader>





<CardContent>


<div className="
text-2xl
font-bold
">

{item.value}

</div>


</CardContent>



</Card>


)

)

}



</div>

)

}