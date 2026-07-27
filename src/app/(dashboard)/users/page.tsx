import { createClient } from "@/lib/supabase-server"

import { DataTable } from "./components/data-table"



export default async function UsersPage() {


  const supabase =
    await createClient()



  const {
    data: users,
    error
  } =
    await supabase
      .from("profiles")
      .select(`
        id,
        nama,
        email,
        no_hp,
        role,
        aktif,
        created_at
      `)
      .order(
        "created_at",
        {
          ascending:false
        }
      )



  if(error){

    throw new Error(
      error.message
    )

  }



  return (

    <div
      className="
      flex
      flex-col
      gap-4
      "
    >

      {/* Table User */}

      <div
        className="
        @container/main
        px-4
        lg:px-6
        mt-8
        lg:mt-12
        "
      >


        <DataTable

          users={users ?? []}

        />


      </div>



    </div>

  )

}