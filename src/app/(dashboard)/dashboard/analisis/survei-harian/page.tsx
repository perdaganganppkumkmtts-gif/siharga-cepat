import Link from "next/link"

import {
  Plus,
} from "lucide-react"


import {
  Button
} from "@/components/ui/button"


import {
  getSurveiHarian
} from "./actions"


import {
  SurveiContent
} from "./components/survei-content"



export default async function Page(){

  const data =
    await getSurveiHarian()



  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex items-center justify-between">


        <div>

          <h1 className="text-2xl font-bold">
            Survei Harian
          </h1>


          <p className="text-muted-foreground">
            Monitoring harga barang kebutuhan pokok harian
          </p>

        </div>



        <Button asChild>


          <Link
            href="/dashboard/transaksi/survei-harian/baru"
          >

            <Plus className="mr-2 h-4 w-4"/>

            Buat Survei Baru

          </Link>


        </Button>


      </div>

        <SurveiContent
        data={data}
        />


    </div>

  )

}