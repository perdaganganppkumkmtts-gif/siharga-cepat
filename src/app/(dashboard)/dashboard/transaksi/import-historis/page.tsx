import {
  ImportForm
} from "./import-form"



export const metadata = {

  title:"Import Harga Historis",

  description:
  "Import data harga historis dari Excel"

}





export default function Page(){


return (

<div className="space-y-6">


<div>


<h1 className="text-2xl font-bold">

Import Harga Historis

</h1>



<p className="text-muted-foreground">

Import data harga historis menggunakan file Excel

</p>


</div>





<ImportForm />


</div>

)


}