"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Loader2 } from "lucide-react"
import { login } from "../actions"

// ==========================
// VALIDATION
// ==========================

const loginSchema = z.object({

  email: z
    .string()
    .email("Email tidak valid"),


  password: z
    .string()
    .min(
      6,
      "Password minimal 6 karakter"
    ),

})



type LoginFormValues =
z.infer<typeof loginSchema>




// ==========================
// COMPONENT
// ==========================

export function LoginForm1({
  className,
  ...props
}: React.ComponentProps<"div">) {


const [error,setError] =
useState("")


const [loading,setLoading] =
useState(false)



const form =
useForm<LoginFormValues>({

resolver:zodResolver(loginSchema),


defaultValues:{

email:"",

password:""

}


})





// ==========================
// SUBMIT
// ==========================

async function onSubmit(
values:LoginFormValues
){


try{


setLoading(true)

setError("")



// sementara test
const result =
await login(
  values.email,
  values.password
)


if(result?.error){

setError(result.error)

return

}



/*

Nanti diganti:

const result =
await login(values)


*/


}catch(error){


setError(
"Terjadi kesalahan saat login"
)



}finally{


setLoading(false)


}



}




return (

<div
className={
cn(
"flex flex-col gap-6",
className
)
}
{...props}
>


<Card>


<CardHeader
className="text-center"
>


<CardTitle
className="text-xl"
>

Selamat Datang

</CardTitle>


<CardDescription>

Masukkan email dan password

</CardDescription>


</CardHeader>




<CardContent>


<Form {...form}>


<form
onSubmit={
form.handleSubmit(onSubmit)
}
className="space-y-5"
>



{
error &&

<div
className="
rounded-md
bg-red-50
px-3
py-2
text-sm
text-red-600
"
>

{error}

</div>

}




<FormField


control={
form.control
}


name="email"


render={
({field})=>(


<FormItem>


<FormLabel>

Email

</FormLabel>


<FormControl>


<Input

type="email"

placeholder="nama@email.com"

{...field}

/>


</FormControl>


<FormMessage/>


</FormItem>


)

}


/>





<FormField


control={
form.control
}


name="password"


render={
({field})=>(


<FormItem>



<div
className="
flex
items-center
justify-between
"
>


<FormLabel>

Password

</FormLabel>



<a

href="/forgot-password"

className="
text-sm
underline
"

>

Lupa password?

</a>


</div>




<FormControl>


<Input

type="password"

placeholder="********"

{...field}

/>


</FormControl>


<FormMessage/>


</FormItem>


)

}


/>







<Button

type="submit"

className="w-full"

disabled={loading}

>


{

loading ?

(

<>

<Loader2
className="
mr-2
h-4
w-4
animate-spin
"
/>

Memproses...

</>

)

:

"Masuk"

}


</Button>





</form>


</Form>


</CardContent>


</Card>
</div>


)

}