"use client"

import {
  useState
} from "react"


import {
  useRouter
} from "next/navigation"


import {
  Button
} from "@/components/ui/button"


import {
  ArrowLeft,
  Check,
  X
} from "lucide-react"


import Link from "next/link"


import {
  approveSurvei,
  rejectSurvei
} from "../actions"




interface DetailActionsProps {

  id:string

  status:string

}





export function DetailActions({

  id,

  status,

}:DetailActionsProps){


  const router =
    useRouter()


  const [
    loading,
    setLoading
  ] =
  useState(false)





  async function handleApprove(){


    if(
      !confirm(
        "Setujui survei ini?"
      )
    )
      return



    try{

      setLoading(true)


      await approveSurvei(id)


      alert(
        "Survei berhasil disetujui"
      )


      router.refresh()


      router.back()


    }
    finally{

      setLoading(false)

    }


  }






  async function handleReject(){


    if(
      !confirm(
        "Tolak survei ini?"
      )
    )
      return



    try{

      setLoading(true)


      await rejectSurvei(id)


      alert(
        "Survei berhasil ditolak"
      )


      router.refresh()


      router.back()


    }
    finally{

      setLoading(false)

    }


  }






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
        asChild
      >

        <Link
          href="/dashboard/transaksi/analis/survei-harian"
        >

          <ArrowLeft
            className="
            mr-2
            h-4
            w-4
            "
          />

          Kembali

        </Link>

      </Button>





      {
        status === "diajukan" && (

          <>

            <Button

              onClick={handleApprove}

              disabled={loading}

            >

              <Check
                className="
                mr-2
                h-4
                w-4
                "
              />

              Setujui

            </Button>





            <Button

              variant="destructive"

              onClick={handleReject}

              disabled={loading}

            >

              <X
                className="
                mr-2
                h-4
                w-4
                "
              />

              Tolak

            </Button>


          </>

        )
      }


    </div>

  )

}