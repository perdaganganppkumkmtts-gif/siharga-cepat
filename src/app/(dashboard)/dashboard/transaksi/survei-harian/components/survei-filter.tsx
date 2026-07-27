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



interface SurveiFilterProps {

  keyword:string

  status:string

  onKeywordChange:
    (value:string)=>void


  onStatusChange:
    (value:string)=>void

}




export function SurveiFilter({

  keyword,

  status,

  onKeywordChange,

  onStatusChange,

}:SurveiFilterProps){


  return (

    <div className="
      grid
      gap-4
      md:grid-cols-2
    ">



      {/* Search */}


      <Input

        placeholder="
        Cari tanggal survei...
        "

        value={
          keyword
        }


        onChange={
          e =>
          onKeywordChange(
            e.target.value
          )
        }

      />





      {/* Status */}


      <Select

        value={
          status
        }


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


          <SelectItem value="draft">

            Draft

          </SelectItem>


          <SelectItem value="diajukan">

            Diajukan

          </SelectItem>



          <SelectItem value="disetujui">

            Disetujui

          </SelectItem>



          <SelectItem value="ditolak">

            Ditolak

          </SelectItem>


        </SelectContent>


      </Select>



    </div>

  )

}