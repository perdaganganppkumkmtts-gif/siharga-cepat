"use client"


import {
  useEffect,
  useRef,
} from "react"


import {
  createChart,
  ColorType,
  LineSeries,
} from "lightweight-charts"



interface Props {

  data:any

}



export function TrendComparisonChart({
  data,
}:Props){


const chartContainer =
useRef<HTMLDivElement | null>(null)


const chartRef =
useRef<any>(null)



useEffect(()=>{


if(!chartContainer.current)
return



const current =
data.history ?? []



const previous =
data.historyPrevious ?? []



if(
 current.length === 0 &&
 previous.length === 0
)
return




const chart =
createChart(
chartContainer.current,
{

layout:{

background:{
type:ColorType.Solid,
color:"transparent",
},

textColor:"#64748b",

},


grid:{

vertLines:{
visible:false
},

horzLines:{
visible:false
}

},


height:350,


rightPriceScale:{

borderVisible:false

},


timeScale:{

borderVisible:false

}

}

)



chartRef.current =
chart




// =============================
// PERIODE ANALISIS
// =============================


const currentLine =
chart.addSeries(
LineSeries,
{

color:"#16a34a",

lineWidth:3,

}

)



currentLine.setData(

current.map(
(item:any)=>({

time:item.time,

value:item.value,

})

)

)





// =============================
// PERIODE PEMBANDING
// =============================


const previousLine =
chart.addSeries(
LineSeries,
{

color:"#64748b",

lineWidth:2,

}

)



previousLine.setData(

previous.map(
(item:any)=>({

time:item.time,

value:item.value,

})

)

)





chart.timeScale()
.fitContent()





return()=>{

chart.remove()

}



},[data])





return (

<div
className="
rounded-xl
border
bg-card
p-4
space-y-4
"
>


<div>

<h4
className="
font-semibold
"
>

Grafik Perbandingan Harga

</h4>


<p
className="
text-sm
text-muted-foreground
"
>

Periode analisis dibandingkan dengan periode sebelumnya

</p>


</div>




<div
ref={chartContainer}
/>




<div
className="
flex
gap-5
text-sm
"
>


<div
className="
flex
items-center
gap-2
"
>

<span
className="
h-3
w-3
rounded-full
bg-green-600
"
/>

Periode Analisis

</div>



<div
className="
flex
items-center
gap-2
"
>

<span
className="
h-3
w-3
rounded-full
bg-slate-500
"
/>

Periode Pembanding

</div>



</div>



</div>

)

}