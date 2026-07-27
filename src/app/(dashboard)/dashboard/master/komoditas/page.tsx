import {
 getKomoditas
} from "./actions"

import {
 getKategoriKomoditas
} from "../kategori-komoditas/actions"


import {
 columns
} from "./columns"


import KomoditasTable
from "./komoditas-table"


import {
 KomoditasFormDialog
} from "./komoditas-form-dialog"




export default async function Page(){


const data =
await getKomoditas()



const kategori =
await getKategoriKomoditas()



return (

<div className="space-y-6">


<div className="flex items-center justify-between">

<div>

<h1 className="text-2xl font-bold">
Komoditas
</h1>


<p className="text-muted-foreground">
Kelola barang kebutuhan pokok dan penting
</p>

</div>


<KomoditasFormDialog
kategori={kategori}
/>


</div>




<KomoditasTable

data={data}

kategori={kategori}

/>



</div>

)

}