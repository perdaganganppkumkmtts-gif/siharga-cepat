"use client"

import {
  Card,
  CardContent,
} from "@/components/ui/card"


import {
  Input
} from "@/components/ui/input"


import {
  HargaInput
} from "./harga-input"





interface Komoditas {


  id:string


  kode:string


  nama:string


  satuan:string


  urutan:number


}





interface SurveiInputTableProps {


  data:Komoditas[]


  harga:
    Record<string,string>


  keterangan:
    Record<string,string>



  onHargaChange:
    (
      id:string,
      value:string
    )=>void



  onKeteranganChange:
    (
      id:string,
      value:string
    )=>void


}







export function SurveiInputTable({

  data,

  harga,

  keterangan,

  onHargaChange,

  onKeteranganChange,

}:SurveiInputTableProps){





  return (

    <Card>


      <CardContent
        className="p-0"
      >


        <div
          className="
          overflow-x-auto
          "
        >



          <table
            className="
            w-full
            "
          >


            <thead
              className="
              bg-muted
              "
            >


              <tr>


                <th
                  className="
                  px-4
                  py-3
                  text-left
                  "
                >

                  No

                </th>



                <th
                  className="
                  px-4
                  py-3
                  text-left
                  "
                >

                  Komoditas

                </th>



                <th
                  className="
                  px-4
                  py-3
                  text-left
                  "
                >

                  Satuan

                </th>



                <th
                  className="
                  px-4
                  py-3
                  text-left
                  "
                >

                  Harga

                </th>



                <th
                  className="
                  px-4
                  py-3
                  text-left
                  "
                >

                  Keterangan

                </th>


              </tr>


            </thead>






            <tbody>



              {
                data.map(
                  (
                    item,
                    index
                  )=>(


                    <tr

                      key={
                        item.id
                      }

                      className="
                      border-t
                      "

                    >



                      <td
                        className="
                        px-4
                        py-3
                        "
                      >

                        {
                          index + 1
                        }

                      </td>






                      <td
                        className="
                        px-4
                        py-3
                        "
                      >


                        <div
                          className="
                          font-medium
                          "
                        >

                          {
                            item.nama
                          }


                        </div>



                        <div
                          className="
                          text-xs
                          text-muted-foreground
                          "
                        >

                          {
                            item.kode
                          }

                        </div>


                      </td>







                      <td
                        className="
                        px-4
                        py-3
                        "
                      >

                        {
                          item.satuan
                        }

                      </td>








                      <td
                        className="
                        px-4
                        py-3
                        min-w-[180px]
                        "
                      >


                        <HargaInput


                          value={
                            harga[
                              item.id
                            ]
                            ??
                            ""
                          }



                          onChange={
                            value =>
                            onHargaChange(
                              item.id,
                              value
                            )
                          }


                        />


                      </td>









                      <td
                        className="
                        px-4
                        py-3
                        "
                      >


                        <Input


                          value={
                            keterangan[
                              item.id
                            ]
                            ??
                            ""
                          }



                          onChange={
                            e =>
                            onKeteranganChange(
                              item.id,
                              e.target.value
                            )
                          }


                          placeholder="
                          Keterangan
                          "


                        />


                      </td>




                    </tr>


                  )
                )
              }



            </tbody>


          </table>



        </div>


      </CardContent>


    </Card>

  )

}