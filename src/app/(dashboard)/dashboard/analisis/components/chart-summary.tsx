"use client"

import {
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react"



interface Props {

  data:{
    time:string
    value:number
    nama:string
    het:number | null
    hap:number | null
    hap_bawah:number | null
    hap_atas:number | null
  }[]

  lastPrice:number

  weekly:number

  monthly:number

  quarterly:number

  satuan?:string

  period:
  | "daily"
  | "weekly"
  | "monthly"
  | "quarterly"

}




export function ChartSummary({

  data,

  lastPrice,

  weekly,

  monthly,

  quarterly,

  satuan="",

  period

}:Props){



  if(!data.length)
    return null




  // ============================
  // PERUBAHAN HARGA
  // ============================


  const current =
    data[data.length - 1]?.value ?? 0


  const previous =
    data[data.length - 2]?.value ?? current




  const perubahan =

    previous

    ?

    ((current - previous) / previous) * 100

    :

    0





  const status =

    perubahan > 0

    ?

    "Naik"

    :

    perubahan < 0

    ?

    "Turun"

    :

    "Stabil"






  const Icon =

    status === "Naik"

    ?

    TrendingUp

    :

    status === "Turun"

    ?

    TrendingDown

    :

    Minus






  const comparisonLabel = {

    daily:
    "dibanding hari sebelumnya",

    weekly:
    "dibanding minggu sebelumnya",

    monthly:
    "dibanding bulan sebelumnya",

    quarterly:
    "dibanding triwulan sebelumnya"

  }[period]







  // ============================
  // KOMODITAS
  // ============================


  const latest =
    data[data.length - 1]


  const namaKomoditas =
    latest?.nama ?? ""





  // ============================
  // HARGA KEBIJAKAN
  // ============================


  const het =
    latest?.het ?? null


  const hap =
    latest?.hap ?? null


  const hapBawah =
    latest?.hap_bawah ?? null


  const hapAtas =
    latest?.hap_atas ?? null






  let policyStatus = ""

  let policyDifference = ""







  // ============================
  // HAP RANGE
  // ============================

  if(
    hapBawah !== null &&
    hapAtas !== null
  ){



    if(lastPrice > hapAtas){



      const diff =
      ((lastPrice - hapAtas) / hapAtas) * 100



      policyStatus =
      `Harga ${namaKomoditas} di atas HAP`



      policyDifference =
      `Selisih +${diff.toFixed(2)}% dari HAP atas`



    }




    else if(lastPrice < hapBawah){



      const diff =
      ((lastPrice - hapBawah) / hapBawah) * 100



      policyStatus =
      `Harga ${namaKomoditas} di bawah HAP`



      policyDifference =
      `Selisih ${diff.toFixed(2)}% dari HAP bawah`



    }





    else {



      const diffBawah =
      ((lastPrice - hapBawah) / hapBawah) * 100




      const diffAtas =
      ((lastPrice - hapAtas) / hapAtas) * 100




      policyStatus =
      `Harga ${namaKomoditas} berada dalam zona HAP`




      policyDifference =
      `Selisih +${diffBawah.toFixed(2)}% dari HAP bawah dan ${diffAtas.toFixed(2)}% dari HAP atas`



    }



  }






  // ============================
  // HAP TUNGGAL
  // ============================

  else if(
    hap !== null
  ){



    const diff =
    ((lastPrice - hap) / hap) * 100





    if(lastPrice > hap){



      policyStatus =
      `Harga ${namaKomoditas} di atas HAP`



      policyDifference =
      `Selisih +${diff.toFixed(2)}% dari HAP`



    }




    else if(lastPrice < hap){



      policyStatus =
      `Harga ${namaKomoditas} di bawah HAP`



      policyDifference =
      `Selisih ${diff.toFixed(2)}% dari HAP`



    }




    else {



      policyStatus =
      `Harga ${namaKomoditas} sesuai HAP`



      policyDifference =
      "Tidak ada selisih dari HAP"



    }



  }






  // ============================
  // HET
  // ============================


  else if(
    het !== null
  ){



    const diff =
    ((lastPrice - het) / het) * 100





    if(lastPrice > het){



      policyStatus =
      `Harga ${namaKomoditas} di atas HET`



      policyDifference =
      `Selisih +${diff.toFixed(2)}% dari HET`



    }




    else if(lastPrice < het){



      policyStatus =
      `Harga ${namaKomoditas} di bawah HET`



      policyDifference =
      `Selisih ${diff.toFixed(2)}% dari HET`



    }




    else {



      policyStatus =
      `Harga ${namaKomoditas} sesuai HET`



      policyDifference =
      "Tidak ada selisih dari HET"



    }



  }







  return (

    <div className="space-y-4">





      <div className="
        grid
        gap-4
        md:grid-cols-4
      ">


        <PriceBox

          title="Harga Terakhir"

          value={lastPrice}

          satuan={satuan}

        />



        <PriceBox

          title="Rata-rata Minggu Terakhir"

          value={weekly}

          satuan={satuan}

        />



        <PriceBox

          title="Rata-rata Bulan Terakhir"

          value={monthly}

          satuan={satuan}

        />



        <PriceBox

          title="Rata-rata Triwulan Terakhir"

          value={quarterly}

          satuan={satuan}

        />



      </div>







      <div

        className={`

        flex
        flex-wrap
        items-center
        gap-2
        w-fit
        rounded-lg
        px-4
        py-2
        text-sm
        font-medium


        ${
          status === "Naik"

          ?

          "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400"


          :

          status === "Turun"

          ?

          "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400"


          :

          "bg-muted text-muted-foreground"

        }

        `}

      >


        <Icon size={18}/>



        <span>
          {status}
        </span>



        <span>
          {Math.abs(perubahan).toFixed(2)}%
        </span>



        <span className="
          text-xs
          opacity-70
        ">

          {comparisonLabel}

        </span>



      </div>







      {

      (
        het !== null ||
        hap !== null ||
        hapBawah !== null ||
        hapAtas !== null
      )

      &&


      (

      <div

        className="
        rounded-lg
        border
        bg-card
        p-3
        text-sm
        space-y-2
        "

      >



        <p className="
          font-semibold
        ">
          Batas Harga Kebijakan
        </p>





        {
          het !== null && (

            <p>
              HET:
              {" "}
              Rp {het.toLocaleString("id-ID")}
            </p>

          )
        }





        {
          hap !== null && (

            <p>
              HAP:
              {" "}
              Rp {hap.toLocaleString("id-ID")}
            </p>

          )
        }





        {
          hapBawah !== null &&
          hapAtas !== null && (

            <p>
              HAP:
              {" "}
              Rp {hapBawah.toLocaleString("id-ID")}
              {" - "}
              Rp {hapAtas.toLocaleString("id-ID")}
            </p>

          )
        }






        {
          policyStatus && (

            <div className="
              pt-2
              border-t
              space-y-1
            ">


              <p className="
                font-medium
              ">

                {policyStatus}

              </p>




              <p className="
                text-xs
                text-muted-foreground
              ">

                {policyDifference}

              </p>



            </div>

          )
        }



      </div>

      )


      }





    </div>

  )

}







function PriceBox({

  title,

  value,

  satuan

}:{

  title:string

  value:number

  satuan:string

}){


  return (

    <div

      className="
      rounded-xl
      border
      bg-card
      p-4
      shadow-sm
      "

    >



      <p className="
        text-sm
        text-muted-foreground
      ">

        {title}

      </p>





      <div className="
        mt-2
        flex
        items-baseline
        gap-1
      ">



        <p className="
          text-xl
          font-bold
        ">

          Rp{" "}

          {Math.round(value)
            .toLocaleString("id-ID")}

        </p>





        {
          satuan && (

            <span className="
              text-sm
              text-muted-foreground
            ">

              /{satuan}

            </span>

          )
        }



      </div>


    </div>

  )

}