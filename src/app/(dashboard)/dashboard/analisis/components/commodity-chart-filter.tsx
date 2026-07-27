"use client"


import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select"



interface Props {


commodities:
{
id:string
nama:string
satuan:string
}[]


value:string


onChange:
(value:string)=>void


}




export function CommodityChartFilter({

commodities,

value,

onChange

}:Props){



return (

<Select

value={value}

onValueChange={onChange}

>


<SelectTrigger>

<SelectValue

placeholder="Pilih Komoditas"

/>


</SelectTrigger>



<SelectContent>


{
commodities.map(
(item)=>(


<SelectItem

key={item.id}

value={item.id}

>


{item.nama}

(
{item.satuan}
)


</SelectItem>


)

)

}



</SelectContent>


</Select>


)

}