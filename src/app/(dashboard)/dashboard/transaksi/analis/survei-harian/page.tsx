import {
  getSurveiHarian
} from "./actions"


import {
  SurveiContent
} from "./components/survei-content"




export default async function Page(){


  const data =
    await getSurveiHarian()



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

          Verifikasi Survei Harian

        </h1>



        <p
          className="
          text-muted-foreground
          "
        >

          Pemeriksaan dan persetujuan data harga barang kebutuhan pokok

        </p>


      </div>





      <SurveiContent

        data={
          data
        }

      />





    </div>

  )

}