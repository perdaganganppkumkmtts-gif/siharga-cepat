"use client"

import Link from "next/link"

import {
  ArrowLeft
} from "lucide-react"


import {
  Button
} from "@/components/ui/button"





export function SurveiHeader(){


  return (

    <div className="flex items-center justify-between">


      <div>


        <h1 className="text-2xl font-bold">

          Buat Survei Harian

        </h1>



        <p className="text-muted-foreground">

          Input harga barang kebutuhan pokok harian

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
            className="mr-2 h-4 w-4"
          />

          Kembali


        </Link>


      </Button>



    </div>

  )

}