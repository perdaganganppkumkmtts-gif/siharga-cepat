"use client"

import { useState } from "react"

import {
  TrendFilter,
  CommodityOption,
  DateRange,
} from "./components/trend-filter"

import {
  AnalysisCard,
} from "./components/analysis-card"

import {
  getTrendAnalysis,
} from "./actions"

import {
 TrendSummary
} from "./components/trend-summary"

interface Props {
  commodities: CommodityOption[]
}



export default function TrendFluktuasiContent({
  commodities,
}: Props) {


  const [selectedCommodityIds, setSelectedCommodityIds] =
    useState<string[]>([])



  // =============================
  // DEFAULT 30 HARI TERAKHIR
  // =============================

  const today =
    new Date()


  const thirtyDaysAgo =
    new Date()


  thirtyDaysAgo.setDate(
    today.getDate() - 30
  )



  const [analysisRange,setAnalysisRange] =
useState<DateRange>({

 startDate:
 thirtyDaysAgo
 .toISOString()
 .slice(0,10),

 endDate:
 today
 .toISOString()
 .slice(0,10)

})



const [comparisonRange,setComparisonRange] =
useState<DateRange>({

 startDate:
 "",

 endDate:
 ""

})




  const [loading,setLoading] =
    useState(false)



  const [result,setResult] =
    useState<any[]>([])



  const [error,setError] =
    useState<string | null>(null)





  async function handleAnalyze(){


    if(
      selectedCommodityIds.length === 0
    ){

      setError(
        "Silakan pilih minimal satu komoditas."
      )

      return

    }



    try{


      setLoading(true)

      setError(null)



      const data =
        await getTrendAnalysis(

 selectedCommodityIds,

 analysisRange.startDate,

 analysisRange.endDate,

 comparisonRange.startDate,

 comparisonRange.endDate

)



      setResult(
        data
      )



    }
    catch(error){


      console.error(
        error
      )


      setError(
        "Terjadi kesalahan saat mengambil analisis."
      )


      setResult([])


    }
    finally{


      setLoading(false)


    }


  }






  return (

    <div className="space-y-6">


      <TrendFilter

commodities={commodities}

selected={selectedCommodityIds}


analysisRange={analysisRange}

comparisonRange={comparisonRange}


onSelectedChange={
setSelectedCommodityIds
}


onAnalysisChange={
setAnalysisRange
}


onComparisonChange={
setComparisonRange
}


onAnalyze={
handleAnalyze
}

/>





      {
        error && (

          <div
            className="
            rounded-lg
            border
            border-destructive/30
            bg-destructive/10
            p-4
            text-sm
            text-destructive
            "
          >

            {error}

          </div>

        )
      }






      {
        loading && (

          <div
            className="
            rounded-lg
            border
            p-6
            text-center
            text-muted-foreground
            "
          >

            Memuat analisis harga...

          </div>

        )
      }







        {
        !loading &&
        result.length > 0 && (

            <div className="space-y-6">


            {/* DETAIL ANALISIS PER KOMODITAS */}

            <div className="space-y-4">

                {
                result.map(
                    (item)=>(

                    <AnalysisCard

                        key={
                        item.id
                        }

                        data={
                        item
                        }

                    />

                    )
                )
                }

            </div>





            {/* RINGKASAN MULTI KOMODITAS */}

            <TrendSummary

                data={
                result
                }

            />


            </div>

        )
        }





      {
        !loading &&
        result.length === 0 &&
        selectedCommodityIds.length > 0 && (


          <div
            className="
            rounded-lg
            border
            p-6
            text-center
            text-muted-foreground
            "
          >

            Belum ada data harga pada periode yang dipilih.

          </div>


        )
      }



    </div>

  )

}