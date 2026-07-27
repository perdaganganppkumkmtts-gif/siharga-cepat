import {
  notFound
} from "next/navigation"


import {
  getSurveiDetail
} from "./actions"

import {
  DetailActions
} from "./components/detail-actions"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import {
  Badge
} from "@/components/ui/badge"


import Link from "next/link"


import {
  Button
} from "@/components/ui/button"


import {
  ArrowLeft
} from "lucide-react"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"



interface PageProps {

  params: Promise<{
    id:string
  }>

}





function formatTanggal(
  value:string
){

  return new Date(
    value
  )
  .toLocaleDateString(
    "id-ID",
    {
      day:"2-digit",
      month:"long",
      year:"numeric",
    }
  )

}





function formatRupiah(
  value:number
){

  return new Intl.NumberFormat(
    "id-ID"
  )
  .format(
    value
  )

}






export default async function Page({

  params,

}:PageProps){


  const {
    id
  } =
    await params



  const survei =
    await getSurveiDetail(
      id
    )



  if(!survei){

    notFound()

  }




console.log(
  "DETAIL:",
  JSON.stringify(
    survei.survei_detail,
    null,
    2
  )
)
  return (

    <div
      className="
      space-y-6
      "
    >



      {/* Header */}

      <div
        className="
        flex
        items-center
        justify-between
        "
      >


        <div>


          <h1
            className="
            text-2xl
            font-bold
            "
          >

            Detail Survei Harian

          </h1>



          <p
            className="
            text-muted-foreground
            "
          >

            Monitoring harga barang kebutuhan pokok

          </p>


        </div>





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
              h-4 w-4
              "
            />

            Kembali


          </Link>


        </Button>



      </div>








      {/* Informasi Survei */}


      <Card>


        <CardHeader>

          <CardTitle>

            Informasi Survei

          </CardTitle>


        </CardHeader>



        <CardContent>


          <div
            className="
            grid
            gap-4
            md:grid-cols-3
            "
          >



            <div>

              <p
                className="
                text-sm
                text-muted-foreground
                "
              >

                Tanggal

              </p>


              <p
                className="
                font-medium
                "
              >

                {
                  formatTanggal(
                    survei.tanggal
                  )
                }

              </p>


            </div>

            <div>

              <p
                className="
                text-sm
                text-muted-foreground
                "
              >

                Status

              </p>



              <Badge>

                {
                  survei.status
                }

              </Badge>


            </div>


            <div>


              <p
                className="
                text-sm
                text-muted-foreground
                "
              >

                Dibuat

              </p>



              <p
                className="
                font-medium
                "
              >

                {
                  formatTanggal(
                    survei.created_at
                  )
                }

              </p>



            </div>



          </div>





          {
            survei.catatan && (

              <div
                className="
                mt-4
                "
              >

                <p
                  className="
                  text-sm
                  text-muted-foreground
                  "
                >

                  Catatan

                </p>


                <p>

                  {
                    survei.catatan
                  }

                </p>


              </div>


            )
          }

        </CardContent>


      </Card>

      {/* Detail Harga */}


      <Card>


        <CardHeader>

          <CardTitle>

            Daftar Harga Komoditas

          </CardTitle>


        </CardHeader>





        <CardContent
          className="
          p-0
          "
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
                survei.survei_detail.map(
                  (
                    item: { id: Key | null | undefined; komoditas: { nama: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; kode: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; satuan: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }; harga: any; keterangan: any },
                    index: number
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
                            item.komoditas?.nama
                          }


                        </div>


                        <div
                          className="
                          text-xs
                          text-muted-foreground
                          "
                        >

                          {
                            item.komoditas?.kode
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
                          item.komoditas?.satuan
                        }


                      </td>





                      <td
                        className="
                        px-4
                        py-3
                        font-medium
                        "
                      >

                        Rp{" "}

                        {
                          formatRupiah(
                            Number(
                              item.harga
                            )
                          )
                        }


                      </td>






                      <td
                        className="
                        px-4
                        py-3
                        "
                      >

                        {
                          item.keterangan
                          ??
                          "-"
                        }


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

      <DetailActions

        id={survei.id}

        status={survei.status}

      />

    </div>

  )

}