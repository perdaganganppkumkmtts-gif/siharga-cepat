"use client"

import {
  useEffect,
  useState,
} from "react"


import {
  useRouter
} from "next/navigation"


import {
  getKomoditasAktif,
  saveSurvei
} from "./actions"



import {
  SurveiHeader
} from "./components/survei-header"


import {
  SurveiInfoCard
} from "./components/survei-info-card"


import {
  KomoditasSearch
} from "./components/komoditas-search"


import {
  SurveiInputTable
} from "./components/survei-input-table"


import {
  SubmitActions
} from "./components/submit-actions"



interface Komoditas {

  id:string

  kode:string

  nama:string

  satuan:string

  urutan:number

}





export default function Page(){


  const router =
    useRouter()



  const [komoditas,setKomoditas] =
    useState<Komoditas[]>([])



  const [tanggal,setTanggal] =
    useState(
      new Date()
      .toISOString()
      .split("T")[0]
    )



  const [catatan,setCatatan] =
    useState("")



  const [keyword,setKeyword] =
    useState("")



  const [harga,setHarga] =
    useState<
      Record<string,string>
    >({})



  const [keterangan,setKeterangan] =
    useState<
      Record<string,string>
    >({})



  const [loading,setLoading] =
    useState(false)





  useEffect(()=>{


    async function load(){

      const data =
        await getKomoditasAktif()


      setKomoditas(
        data
      )

    }


    load()


  },[])







  const filteredKomoditas =
    komoditas.filter(
      item =>

        item.nama
        .toLowerCase()
        .includes(
          keyword.toLowerCase()
        )

    )






  function handleHargaChange(
    id:string,
    value:string
  ){


    setHarga(prev=>({

      ...prev,

      [id]:value

    }))


  }







  function handleKeteranganChange(
    id:string,
    value:string
  ){


    setKeterangan(prev=>({

      ...prev,

      [id]:value

    }))


  }








  async function handleSubmit(
    status:"draft" | "diajukan"
  ){

    try{


      /*
        VALIDASI HARGA
      */

      const komoditasBelumDiisi =
        filteredKomoditas.filter(
          item =>
            !harga[item.id]
            ||
            harga[item.id] === ""
        )



      if(
        komoditasBelumDiisi.length > 0
      ){

        alert(
          `Masih ada ${komoditasBelumDiisi.length} komoditas yang belum diisi`
        )

        return

      }





      setLoading(true)





      await saveSurvei({

        tanggal,

        catatan,

        status,

        harga,

        keterangan,

      })





      if(status === "draft"){


        alert(
          "Survei berhasil disimpan sebagai draft"
        )


      }
      else{


        alert(
          "Survei berhasil diajukan untuk verifikasi"
        )


      }






      router.refresh()



      router.push(
        "/dashboard/transaksi/survei-harian"
      )





    }
    catch(error){


      console.error(error)


      alert(
        "Gagal menyimpan survei"
      )


    }
    finally{


      setLoading(false)


    }

  }






  return (

    <div className="space-y-6">


      <SurveiHeader />



      <SurveiInfoCard

        tanggal={
          tanggal
        }

        catatan={
          catatan
        }

        onTanggalChange={
          setTanggal
        }

        onCatatanChange={
          setCatatan
        }

      />




      <KomoditasSearch

        value={
          keyword
        }

        onChange={
          setKeyword
        }

      />





      <SurveiInputTable

        data={
          filteredKomoditas
        }

        harga={
          harga
        }

        keterangan={
          keterangan
        }

        onHargaChange={
          handleHargaChange
        }

        onKeteranganChange={
          handleKeteranganChange
        }

      />





      <SubmitActions

        loading={
          loading
        }

        onSaveDraft={()=> 
          handleSubmit(
            "draft"
          )
        }


        onSubmit={()=> 
          handleSubmit(
            "diajukan"
          )
        }

      />



    </div>

  )

}