"use client"

import {
  useEffect,
  useRef
} from "react"

import {
  createChart,
  ColorType,
  LineSeries,
  AreaSeries,
  LineStyle
} from "lightweight-charts"

import {
  useTheme
} from "next-themes"


interface PriceChartProps {

  data:{
    time:string
    value:number
    het:number|null
    hap:number|null
    hap_bawah:number|null
    hap_atas:number|null
  }[]

  showHarga:boolean
  showHET:boolean
  showHAP:boolean
  showHAPBawah:boolean
  showHAPAtas:boolean

}



export function PriceChart({

data,
showHarga,
showHET,
showHAP,
showHAPBawah,
showHAPAtas

}:PriceChartProps){


const chartContainer =
useRef<HTMLDivElement>(null)


const {resolvedTheme} =
useTheme()



useEffect(()=>{


if(
!chartContainer.current ||
!data.length
)
return



const isDark =
resolvedTheme==="dark"



const rupiah =
(value:number)=>

new Intl.NumberFormat(
"id-ID",
{
style:"currency",
currency:"IDR",
maximumFractionDigits:0
}
).format(value)





const chart =
createChart(

chartContainer.current,

{

height:380,

autoSize:true,


layout:{

background:{
type:ColorType.Solid,
color:"transparent"
},

textColor:
isDark
?
"#e4e4e7"
:
"#52525b"

},



grid:{

vertLines:{
color:
isDark
?
"#27272a"
:
"#f1f5f9"
},

horzLines:{
color:
isDark
?
"#27272a"
:
"#f1f5f9"
}

},



rightPriceScale:{

borderVisible:false,

scaleMargins:{
top:0.15,
bottom:0.15
}

},



timeScale:{

borderVisible:false,
timeVisible:false,
rightOffset:5

},



crosshair:{
mode:1
}


}

)








// ==========================
// TOOLTIP
// ==========================


const tooltip =
document.createElement("div")


tooltip.style.position="absolute"

tooltip.style.display="none"

tooltip.style.pointerEvents="none"

tooltip.style.zIndex="1000"

tooltip.style.minWidth="220px"

tooltip.style.padding="12px"

tooltip.style.borderRadius="10px"

tooltip.style.fontSize="13px"

tooltip.style.lineHeight="1.7"


tooltip.style.color =
isDark
?
"#ffffff"
:
"#18181b"



tooltip.style.background =
isDark
?
"#18181b"
:
"#ffffff"



tooltip.style.border =
isDark
?
"1px solid #3f3f46"
:
"1px solid #e4e4e7"



tooltip.style.boxShadow =
"0 8px 20px rgba(0,0,0,.18)"



chartContainer.current.appendChild(
tooltip
)





chart.subscribeCrosshairMove(
(param)=>{


if(
!param.point ||
!param.time
){

tooltip.style.display="none"

return

}



const item =
data.find(
x=>
x.time===String(param.time)
)



if(!item){

tooltip.style.display="none"

return

}



tooltip.style.display="block"



tooltip.style.left =
`${param.point.x+20}px`


tooltip.style.top =
`${param.point.y+20}px`





tooltip.innerHTML = `

<div style="font-weight:600;margin-bottom:8px">

${item.time}

</div>


${
showHarga

?

`
<div>
🟢 Harga :
<b>${rupiah(item.value)}</b>
</div>
`

:""

}



${
showHET && item.het!==null

?

`
<div>
🔴 HET :
<b>${rupiah(item.het)}</b>
</div>
`

:""

}



${
showHAP && item.hap!==null

?

`
<div>
🔵 HAP :
<b>${rupiah(item.hap)}</b>
</div>
`

:""

}



${
showHAPBawah && item.hap_bawah!==null

?

`
<div>
🟠 HAP Bawah :
<b>${rupiah(item.hap_bawah)}</b>
</div>
`

:""

}



${
showHAPAtas && item.hap_atas!==null

?

`
<div>
🟣 HAP Atas :
<b>${rupiah(item.hap_atas)}</b>
</div>
`

:""

}

`

}

)






// ==========================
// HARGA
// ==========================


if(showHarga){


const area =
chart.addSeries(

AreaSeries,

{

lineColor:
isDark
?
"#22c55e"
:
"#16a34a",

topColor:
"rgba(34,197,94,.35)",

bottomColor:
"rgba(0,0,0,0)",

lineWidth:2

}

)



area.setData(

data.map(
x=>({
time:x.time,
value:x.value
})
)

)





const line =
chart.addSeries(

LineSeries,

{

color:
isDark
?
"#4ade80"
:
"#16a34a",

lineWidth:3,

priceLineVisible:false

}

)



line.setData(

data.map(
x=>({
time:x.time,
value:x.value
})
)

)


}






// ==========================
// FUNCTION LIMIT LINE
// ==========================


function addLimitLine(

show:boolean,

color:string,

values:
(number|null)[]

){

if(!show)
return



const series =
chart.addSeries(

LineSeries,

{

color,

lineWidth:2,

lineStyle:
LineStyle.Dashed,

priceLineVisible:false

}

)



series.setData(

data
.map(
(item,index)=>({

time:item.time,

value:values[index]

})

)

.filter(
x=>x.value!==null
)
.map(
x=>({

time:x.time,

value:x.value as number

})
)

)


}





addLimitLine(
showHET,
"#ef4444",
data.map(x=>x.het)
)



addLimitLine(
showHAP,
"#3b82f6",
data.map(x=>x.hap)
)



addLimitLine(
showHAPBawah,
"#f97316",
data.map(x=>x.hap_bawah)
)



addLimitLine(
showHAPAtas,
"#a855f7",
data.map(x=>x.hap_atas)
)






chart.timeScale()
.fitContent()






const resizeObserver =
new ResizeObserver(

entries=>{


if(entries.length){

chart.applyOptions({

width:
entries[0]
.contentRect
.width

})

}

}

)



resizeObserver.observe(
chartContainer.current
)





return ()=>{

resizeObserver.disconnect()

tooltip.remove()

chart.remove()

}



},[
data,
resolvedTheme,
showHarga,
showHET,
showHAP,
showHAPBawah,
showHAPAtas
])





return (

<div

ref={chartContainer}

className="
relative
w-full
rounded-xl
border
bg-background
p-2
overflow-hidden
"

/>

)


}