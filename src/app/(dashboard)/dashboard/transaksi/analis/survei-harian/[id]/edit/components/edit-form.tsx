"use client"


import {
  useState
} from "react"


import {
  useRouter
} from "next/navigation"


import {
  updateSurvei
} from "../actions"



import {
  Button
} from "@/components/ui/button"



import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"




interface EditFormProps {


  id:string


  details:any[]


}




export function EditForm({

  id,

  details,

}:EditFormProps){



  const router =
    useRouter()



  const [data,setData] =
    useState(
      details
    )



  const [loading,setLoading] =
    useState(false)





  function updateHarga(

    index:number,

    value:string

  ){


    const clone =
      [...data]


    clone[index] = {

      ...clone[index],

      harga:
        Number(
          value
        )

    }


    setData(
      clone
    )

  }






  function updateKeterangan(

    index:number,

    value:string

  ){


    const clone =
      [...data]


    clone[index] = {

      ...clone[index],

      keterangan:
        value

    }


    setData(
      clone
    )

  }








  async function handleSubmit(){


    try{


      setLoading(true)



      await updateSurvei(

        id,

        data.map(
          item=>({

            id:item.id,

            harga:
              Number(
                item.harga
              ),

            keterangan:
              item.keterangan

          })
        )

      )



      alert(
        "Perubahan survei berhasil disimpan"
      )



      router.push(
        `/dashboard/transaksi/survei-harian/${id}`
      )


    }
    catch(error){


      console.error(
        error
      )


      alert(
        "Gagal menyimpan perubahan"
      )


    }
    finally{


      setLoading(false)


    }


  }







  return (

    <Card>


      <CardHeader>

        <CardTitle>

          Perubahan Harga Komoditas

        </CardTitle>


      </CardHeader>




      <CardContent>



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
                        index+1
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
                      "
                    >

                      <input

                        type="number"

                        value={
                          item.harga
                        }

                        onChange={
                          e=>
                          updateHarga(
                            index,
                            e.target.value
                          )
                        }

                        className="
                        border
                        rounded-md
                        px-3
                        py-2
                        w-40
                        "

                      />


                    </td>





                    <td
                      className="
                      px-4
                      py-3
                      "
                    >


                      <input

                        type="text"

                        value={
                          item.keterangan ??
                          ""
                        }

                        onChange={
                          e=>
                          updateKeterangan(
                            index,
                            e.target.value
                          )
                        }


                        className="
                        border
                        rounded-md
                        px-3
                        py-2
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






        <div
          className="
          flex
          justify-end
          gap-3
          mt-6
          "
        >


          <Button

            variant="outline"

            onClick={
              ()=>router.back()
            }

          >

            Batal


          </Button>




          <Button

            disabled={
              loading
            }

            onClick={
              handleSubmit
            }

          >

            {
              loading
              ?
              "Menyimpan..."
              :
              "Simpan Perubahan"
            }


          </Button>



        </div>



      </CardContent>


    </Card>


  )


}