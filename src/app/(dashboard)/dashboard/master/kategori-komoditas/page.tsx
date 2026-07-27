import { getKategoriKomoditas } from "./actions"

import { columns } from "./columns"

import { DataTable } from "../../components/data-table"

import {
 KategoriFormDialog
} from "../components/kategori-form-dialog"

export const metadata = {
  title: "Kategori Komoditas | SIHARGA CEPAT",
}



export default async function Page() {


  const data = await getKategoriKomoditas()



  return (

    <div className="space-y-6">


      <div>

        <h1 className="text-2xl font-bold">
          Kategori Komoditas
        </h1>


        <p className="text-muted-foreground">
          Kelola kategori barang kebutuhan pokok
        </p>

      </div>

    <KategoriFormDialog />

      <DataTable

        columns={columns}

        data={data}

      />


    </div>

  )

}