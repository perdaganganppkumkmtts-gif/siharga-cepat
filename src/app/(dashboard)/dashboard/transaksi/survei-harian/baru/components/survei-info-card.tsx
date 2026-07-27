"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import {
  Input
} from "@/components/ui/input"


import {
  Textarea
} from "@/components/ui/textarea"


import {
  Badge
} from "@/components/ui/badge"





interface SurveiInfoCardProps {


  tanggal:string


  catatan:string



  onTanggalChange:
    (value:string)=>void



  onCatatanChange:
    (value:string)=>void


}





export function SurveiInfoCard({

  tanggal,

  catatan,

  onTanggalChange,

  onCatatanChange,

}:SurveiInfoCardProps){



  return (

    <Card>


      <CardHeader>


        <CardTitle>

          Informasi Survei

        </CardTitle>


      </CardHeader>





      <CardContent className="space-y-4">


        <div className="grid gap-4 md:grid-cols-2">



          {/* Tanggal */}


          <div className="space-y-2">


            <label className="text-sm font-medium">

              Tanggal Pantauan

            </label>



            <Input

              type="date"

              value={
                tanggal
              }

              onChange={
                e =>
                onTanggalChange(
                  e.target.value
                )
              }

            />


          </div>





          {/* Status */}


          <div className="space-y-2">


            <label className="text-sm font-medium">

              Status

            </label>


            <div>


              <Badge>

                Draft

              </Badge>


            </div>


          </div>


        </div>







        {/* Catatan */}


        <div className="space-y-2">


          <label className="text-sm font-medium">

            Catatan

          </label>



          <Textarea

            placeholder="
            Tambahkan catatan survei jika diperlukan...
            "

            value={
              catatan
            }


            onChange={
              e =>
              onCatatanChange(
                e.target.value
              )
            }


            rows={4}

          />


        </div>




      </CardContent>


    </Card>

  )

}