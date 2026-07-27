"use client"


import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"





export interface CommodityOption {

  id:string

  nama:string

}





export type ChartPeriod =

  | "daily"
  | "weekly"
  | "monthly"
  | "quarterly"







interface PriceChartFilterProps {


  period:ChartPeriod


  commodityId:string


  commodities:CommodityOption[]



  onPeriodChange:
  (
    value:ChartPeriod
  )=>void



  onCommodityChange:
  (
    value:string
  )=>void


}









export function PriceChartFilter({

  period,

  commodityId,

  commodities,

  onPeriodChange,

  onCommodityChange,

}:PriceChartFilterProps){



return (

<div

className="
flex
flex-col
gap-4
md:flex-row
md:items-center
md:justify-between
"

>


{/* FILTER PERIODE */}


<Tabs

value={period}

onValueChange={

(value)=>{

if(

value === "daily" ||
value === "weekly" ||
value === "monthly" ||
value === "quarterly"

){

onPeriodChange(
value
)

}

}

}

>


<TabsList>


<TabsTrigger

value="daily"

>

Harian

</TabsTrigger>



<TabsTrigger

value="weekly"

>

Mingguan

</TabsTrigger>



<TabsTrigger

value="monthly"

>

Bulanan

</TabsTrigger>



<TabsTrigger

value="quarterly"

>

Triwulan

</TabsTrigger>



</TabsList>


</Tabs>







{/* FILTER KOMODITAS */}

<div
  className="
  flex
  items-center
  gap-3
  "
>

  <Label
    className="
    whitespace-nowrap
    font-medium
    "
  >
    Pilih Jenis Bapok
  </Label>


  <Select

    value={commodityId}

    onValueChange={
      onCommodityChange
    }

  >

    <SelectTrigger

      className="
      w-[260px]
      "

    >

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

            </SelectItem>

          )

        )
      }

    </SelectContent>


  </Select>


</div>





</div>


)


}