"use client"

import {
 DataTable
} from "@/app/(dashboard)/dashboard/components/data-table"


import {
 columns
} from "./columns"


import type {
 Komoditas
} from "@/types/komoditas"



export default function KomoditasTable({

data,

kategori

}:{

data:Komoditas[]

kategori:{
id:string
nama:string
}[]

}){


return (

<DataTable

columns={
columns(kategori)
}

data={data}

/>

)

}