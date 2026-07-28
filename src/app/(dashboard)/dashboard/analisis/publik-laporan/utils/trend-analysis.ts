export interface CommodityPricePoint {

  time:string

  value:number

  het?:number|null

  hap?:number|null

  hap_bawah?:number|null

  hap_atas?:number|null

}



export interface PeriodRange {

  mulai:string

  sampai:string

}





export interface CommodityAnalysisResult {


  periodeAnalisis:PeriodRange

  periodePembanding:PeriodRange



  perkembangan:{

    hargaAwal:number

    hargaAkhir:number

    hargaTertinggi:number

    hargaTerendah:number

    rataRata:number


    hap:number|null

    hap_bawah:number|null

    hap_atas:number|null

    het:number|null

  }



  perbandingan:{

    rataRataSebelumnya:number

    perubahanNominal:number

    perubahanPersen:number

    trend:
      "Naik"
      |
      "Turun"
      |
      "Stabil"

  }



  fluktuasi:{

    standarDeviasi:number

    koefisienVariasi:number

    kategori:
      "Rendah"
      |
      "Sedang"
      |
      "Tinggi"

  }



  statusHAP:
    | "Di atas HAP"
    | "Di bawah HAP"
    | "Dalam zona HAP"
    | null



  statusHET:
    | "Di atas HET"
    | "Di bawah HET"
    | "Sesuai HET"
    | null



  selisihHAP:number|null

  selisihHET:number|null



  jumlahData:number


}





// ===============================
// HELPER
// ===============================


function average(values:number[]){


  if(values.length===0)
    return 0


  return (

    values.reduce(
      (a,b)=>a+b,
      0
    )
    /
    values.length

  )

}





function standardDeviation(values:number[]){


  if(values.length<=1)
    return 0


  const avg =
    average(values)



  const variance =

    values.reduce(

      (total,value)=>

        total +
        Math.pow(
          value - avg,
          2
        ),

      0

    )
    /
    values.length



  return Math.sqrt(
    variance
  )

}





function coefficientVariation(
  std:number,
  mean:number
){


  if(mean===0)
    return 0



  return (

    std /
    mean

  )
  *
  100


}





function classifyTrend(
  percent:number
){


  if(percent > 0.5)
    return "Naik"


  if(percent < -0.5)
    return "Turun"


  return "Stabil"

}





function classifyFluctuation(
  cv:number
){


  if(cv < 5)
    return "Rendah"


  if(cv < 10)
    return "Sedang"


  return "Tinggi"


}








function analyzeHAP(
  harga:number,
  bawah:number|null|undefined,
  atas:number|null|undefined
){



  if(
    bawah == null ||
    atas == null
  ){

    return {

      status:null,

      selisih:null

    }

  }




  if(harga < bawah){


    return {

      status:
      "Di bawah HAP" as const,


      selisih:

      (

        (bawah-harga)
        /
        bawah

      )
      *
      100

    }


  }




  if(harga > atas){


    return {


      status:
      "Di atas HAP" as const,


      selisih:

      (

        (harga-atas)
        /
        atas

      )
      *
      100


    }


  }





  return {

    status:
    "Dalam zona HAP" as const,


    selisih:0

  }


}







function analyzeHET(
  harga:number,
  het:number|null|undefined
){



  if(het==null){

    return {

      status:null,

      selisih:null

    }

  }





  if(harga > het){


    return {

      status:
      "Di atas HET" as const,


      selisih:

      (

        (harga-het)
        /
        het

      )
      *
      100


    }


  }





  if(harga < het){


    return {


      status:
      "Di bawah HET" as const,


      selisih:

      (

        (het-harga)
        /
        het

      )
      *
      100


    }


  }





  return {

    status:
    "Sesuai HET" as const,


    selisih:0

  }


}











// =====================================
// ANALISIS KOMODITAS
// =====================================


export function analyzeCommodityTrend(


  currentData:CommodityPricePoint[],


  previousData:CommodityPricePoint[],


  periodeAnalisis:PeriodRange,


  periodePembanding:PeriodRange


):CommodityAnalysisResult {



  const current =

    [...currentData]

    .sort(

      (a,b)=>

      new Date(a.time).getTime()
      -
      new Date(b.time).getTime()

    )





  const previous =

    [...previousData]








  const values =

    current.map(

      item=>
      item.value

    )





  const previousValues =

    previous.map(

      item=>
      item.value

    )







  // ==========================
  // RERATA PERIODE
  // ==========================


  const rataRata =

    average(values)



  const rataRataSebelumnya =

    average(previousValues)






  // ==========================
  // PERUBAHAN HARGA
  // ==========================


  const perubahanNominal =

    rataRata
    -
    rataRataSebelumnya





  const perubahanPersen =


    rataRataSebelumnya === 0

    ?

    0

    :

    (

      perubahanNominal
      /
      rataRataSebelumnya

    )
    *
    100







  // ==========================
  // PERKEMBANGAN
  // ==========================


  const hargaAwal =

    rataRataSebelumnya



  const hargaAkhir =

    rataRata







  const std =

    standardDeviation(
      values
    )





  const cv =

    coefficientVariation(

      std,

      rataRata

    )






  const reference =

    current[
      current.length - 1
    ]








  const hap =

    analyzeHAP(

      rataRata,

      reference?.hap_bawah,

      reference?.hap_atas

    )







  const het =

    analyzeHET(

      rataRata,

      reference?.het

    )







  return {



    periodeAnalisis,


    periodePembanding,





    perkembangan:{


      hargaAwal,


      hargaAkhir,


      hargaTertinggi:

        values.length

        ?

        Math.max(...values)

        :

        0,



      hargaTerendah:

        values.length

        ?

        Math.min(...values)

        :

        0,



      rataRata,



      hap:

      reference?.hap
      ??
      null,



      hap_bawah:

      reference?.hap_bawah
      ??
      null,



      hap_atas:

      reference?.hap_atas
      ??
      null,



      het:

      reference?.het
      ??
      null


    },







    perbandingan:{


      rataRataSebelumnya,


      perubahanNominal,


      perubahanPersen,



      trend:

      classifyTrend(
        perubahanPersen
      )


    },







    fluktuasi:{


      standarDeviasi:std,


      koefisienVariasi:cv,


      kategori:

      classifyFluctuation(
        cv
      )


    },







    statusHAP:

      hap.status,



    statusHET:

      het.status,



    selisihHAP:

      hap.selisih,



    selisihHET:

      het.selisih,



    jumlahData:

      values.length



  }



}