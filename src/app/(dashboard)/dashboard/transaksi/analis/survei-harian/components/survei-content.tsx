"use client"


import {
  useMemo,
  useState,
} from "react"



import {
  SurveiSummary
} from "@/components/survei/survei-summary"



import {
  SurveiFilter
} from "@/components/survei/survei-filter"



import {
  SurveiTable
} from "@/components/survei/survei-table"



import {
  columns
} from "../columns"



import type {
  SurveiRow
} from "@/components/survei/types"





interface SurveiContentProps {

  data: SurveiRow[]

}






export function SurveiContent({

  data,

}:SurveiContentProps){



  const [
    keyword,
    setKeyword
  ] =
  useState("")



  const [
    status,
    setStatus
  ] =
  useState("all")






  const filteredData =

    useMemo(()=>{


      return data.filter(

        item => {



          const tanggalFormat =

            new Date(
              item.tanggal
            )
            .toLocaleDateString(
              "id-ID",
              {
                day:"2-digit",
                month:"long",
                year:"numeric",
              }
            )






          const matchKeyword =


            !keyword

            ||

            tanggalFormat
            .toLowerCase()
            .includes(
              keyword.toLowerCase()
            )


            ||

            item.tanggal
            .includes(
              keyword
            )








          const matchStatus =


            status === "all"

            ||

            item.status === status







          return (

            matchKeyword

            &&

            matchStatus

          )



        }


      )



    },[

      data,

      keyword,

      status

    ])









  return (


    <div
      className="
      space-y-6
      "
    >




      {/* Summary */}

      <SurveiSummary

        data={
          filteredData
        }

      />







      {/* Filter */}

      <SurveiFilter


        keyword={
          keyword
        }


        status={
          status
        }



        onKeywordChange={
          setKeyword
        }



        onStatusChange={
          setStatus
        }


      />







      {/* Table */}

      <SurveiTable


        columns={
          columns
        }


        data={
          filteredData
        }


      />




    </div>


  )

}