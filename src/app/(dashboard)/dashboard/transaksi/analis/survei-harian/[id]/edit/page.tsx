import {
  notFound
} from "next/navigation"


import {
  getSurveiEdit
} from "./actions"


import {
  EditForm
} from "./components/edit-form"



interface PageProps {

  params: Promise<{
    id:string
  }>

}




export default async function Page({

  params,

}:PageProps){


  const {
    id
  } =
  await params



  const survei =
    await getSurveiEdit(
      id
    )



  if(!survei){

    notFound()

  }



  if(
    survei.status !== "draft"
  ){

    return (

      <div
        className="
        p-6
        "
      >

        <h1
          className="
          text-xl
          font-bold
          "
        >

          Survei tidak dapat diedit

        </h1>


        <p
          className="
          text-muted-foreground
          "
        >

          Survei hanya dapat diubah
          ketika status masih draft.

        </p>


      </div>

    )

  }




  return (

    <div
      className="
      space-y-6
      "
    >


      <div>

        <h1
          className="
          text-2xl
          font-bold
          "
        >

          Edit Survei Harian

        </h1>


        <p
          className="
          text-muted-foreground
          "
        >

          Perubahan harga komoditas

        </p>


      </div>




      <EditForm

        id={
          survei.id
        }

        details={
          survei.survei_detail
        }

      />



    </div>

  )

}