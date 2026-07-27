"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import type {
  SurveiRow
} from "@/components/survei/types"



interface SurveiSummaryProps {

  data: SurveiRow[]

}



export function SurveiSummary({
  data,
}:SurveiSummaryProps){


  const total =
    data.length



  const draft =
    data.filter(
      item =>
        item.status === "draft"
    )
    .length



  const diajukan =
    data.filter(
      item =>
        item.status === "diajukan"
    )
    .length



  const disetujui =
    data.filter(
      item =>
        item.status === "disetujui"
    )
    .length


  const ditolak =
    data.filter(
      item =>
        item.status === "ditolak"
    )
    .length



  const summary = [

    {
      title:"Total Survei",
      value:total,
    },


    {
      title:"Draft",
      value:draft,
    },


    {
      title:"Diajukan",
      value:diajukan,
    },


    {
      title:"Disetujui",
      value:disetujui,
    },


    {
      title:"Ditolak",
      value:ditolak,
    },

  ]




  return (

    <div className="
      grid
      gap-4
      md:grid-cols-5
    ">


      {
        summary.map(
          item => (

            <Card
              key={
                item.title
              }
            >

              <CardHeader
                className="pb-2"
              >

                <CardTitle
                  className="
                  text-sm
                  font-medium
                  text-muted-foreground
                  "
                >

                  {
                    item.title
                  }

                </CardTitle>


              </CardHeader>



              <CardContent>


                <div
                  className="
                  text-2xl
                  font-bold
                  "
                >

                  {
                    item.value
                  }


                </div>


              </CardContent>


            </Card>

          )

        )
      }


    </div>

  )

}