import {
  ImportForm
} from "./import-form"



export default function Page(){


return (

<div className="space-y-6">


<div>


<h1 className="text-2xl font-bold">

Import Komoditas

</h1>


<p className="text-muted-foreground">

Upload data komoditas melalui file Excel

</p>


</div>




<ImportForm />


</div>

)

}