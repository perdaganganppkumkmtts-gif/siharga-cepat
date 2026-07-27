"use client"

import {
  Button
} from "@/components/ui/button"


import {
  Save,
  Send,
} from "lucide-react"





interface SubmitActionsProps {


  loading:boolean



  onSaveDraft:
    ()=>void



  onSubmit:
    ()=>void


}






export function SubmitActions({

  loading,

  onSaveDraft,

  onSubmit,

}:SubmitActionsProps){



  return (

    <div
      className="
      flex
      justify-end
      gap-3
      "
    >




      <Button


        variant="outline"


        disabled={
          loading
        }


        onClick={
          onSaveDraft
        }


      >

        <Save
          className="
          mr-2
          h-4
          w-4
          "
        />


        {
          loading
          ?
          "Menyimpan..."
          :
          "Simpan Draft"
        }


      </Button>







      <Button


        disabled={
          loading
        }


        onClick={
          onSubmit
        }


      >


        <Send

          className="
          mr-2
          h-4
          w-4
          "

        />


        {
          loading
          ?
          "Mengirim..."
          :
          "Ajukan Verifikasi"
        }


      </Button>





    </div>

  )

}