"use client"

import Link from "next/link"

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
  Pencil,
  Send,
  ArrowLeft
} from "lucide-react"


import {
  submitSurvei
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







  async function handleSubmit(){


    const confirmSubmit =
      confirm(
        "Ajukan survei ini untuk verifikasi?"
      )



    if(!confirmSubmit)
      return





    try{


      setLoading(true)



      await submitSurvei(
        id
      )



      alert(
        "Survei berhasil diajukan"
        )


        router.refresh()


        router.push(
        "/dashboard/transaksi/survei-harian"
      )

    }
    catch(error){


      console.error(error)



      alert(
        "Gagal mengajukan survei"
      )


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
          href="/dashboard/transaksi/survei-harian"
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
        status === "draft" && (


          <>


            <Button

              variant="outline"

              asChild

            >

              <Link

                href={
                  `/dashboard/transaksi/survei-harian/${id}/edit`
                }

              >

                <Pencil

                  className="
                  mr-2
                  h-4
                  w-4
                  "

                />

                Edit


              </Link>


            </Button>







            <Button

              onClick={
                handleSubmit
              }

              disabled={
                loading
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



          </>


        )
      }



    </div>

  )

}