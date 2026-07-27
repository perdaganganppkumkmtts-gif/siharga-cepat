"use client"

import {
  Input
} from "@/components/ui/input"



interface HargaInputProps {


  value:string


  onChange:
    (value:string)=>void


}





export function HargaInput({

  value,

  onChange,

}:HargaInputProps){





  function handleChange(
    e:React.ChangeEvent<HTMLInputElement>
  ){


    const angka =
      e.target.value
        .replace(
          /\D/g,
          ""
        )



    onChange(
      angka
    )


  }







  const displayValue =
    value
    ?
    Number(value)
      .toLocaleString(
        "id-ID"
      )
    :
    ""






  return (

    <div className="flex items-center gap-2">


      <span className="text-sm text-muted-foreground">

        Rp

      </span>



      <Input

        type="text"

        value={
          displayValue
        }


        onChange={
          handleChange
        }


        placeholder="0"

        className="text-right"

      />


    </div>

  )

}