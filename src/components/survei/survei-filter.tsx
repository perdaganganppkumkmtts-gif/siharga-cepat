"use client"

import {
  Input
} from "@/components/ui/input"


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import {
  SURVEI_STATUS
} from "@/lib/constants/survei-status"



interface SurveiFilterProps {

  keyword:string

  status:string


  onKeywordChange:
  (
    value:string
  )=>void


  onStatusChange:
  (
    value:string
  )=>void

}




export function SurveiFilter({

  keyword,

  status,

  onKeywordChange,

  onStatusChange,

}:SurveiFilterProps){


return (

<div

className="
grid
gap-4
md:grid-cols-2
"

>


{/* SEARCH */}


<Input

placeholder="
Cari survei...
"

value={keyword}

onChange={(e)=>

onKeywordChange(
e.target.value
)

}

/>



{/* STATUS */}


<Select

value={status}

onValueChange={
onStatusChange
}

>


<SelectTrigger>

<SelectValue

placeholder="
Filter status
"

/>

</SelectTrigger>



<SelectContent>


<SelectItem value="all">

Semua Status

</SelectItem>



<SelectItem

value={
SURVEI_STATUS.DRAFT
}

>

Draft

</SelectItem>



<SelectItem

value={
SURVEI_STATUS.DIAJUKAN
}

>

Diajukan

</SelectItem>



<SelectItem

value={
SURVEI_STATUS.DISETUJUI
}

>

Disetujui

</SelectItem>



<SelectItem

value={
SURVEI_STATUS.DITOLAK
}

>

Ditolak

</SelectItem>



</SelectContent>


</Select>



</div>

)

}