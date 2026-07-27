import {
  NextRequest,
  NextResponse
} from "next/server"


import {
  getPriceTrend
} from "@/app/(dashboard)/dashboard/analisis/actions"




export async function GET(
  request: NextRequest
){


  try{


    const {
      searchParams
    } =
    new URL(
      request.url
    )



    const periodParam =
      searchParams.get(
        "period"
      )



    const period =
      periodParam === "daily" ||
      periodParam === "weekly" ||
      periodParam === "monthly" ||
      periodParam === "quarterly"

      ?

      periodParam

      :

      "daily"






    const komoditasId =
      searchParams.get(
        "komoditasId"
      )
      ||
      undefined





    const data =
      await getPriceTrend(

        period,

        komoditasId

      )






    return NextResponse.json(
      data
    )



  }
  catch(error){


    console.error(
      "CHART API ERROR:",
      error
    )



    return NextResponse.json(

      {
        message:
        "Gagal mengambil data grafik"
      },

      {
        status:500
      }

    )


  }


}