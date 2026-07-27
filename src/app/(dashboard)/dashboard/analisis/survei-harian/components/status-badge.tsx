import {
  Badge
} from "@/components/ui/badge"



interface StatusBadgeProps {

  status:string

}




export function StatusBadge({
  status,
}:StatusBadgeProps){



  const statusConfig = {

    draft: {

      label:"Draft",

      variant:"secondary" as const,

    },


    submitted: {

      label:"Diajukan",

      variant:"default" as const,

    },


    approved: {

      label:"Disetujui",

      variant:"default" as const,

    },


    rejected: {

      label:"Ditolak",

      variant:"destructive" as const,

    },


  }



  const current =
    statusConfig[
      status as keyof typeof statusConfig
    ]




  return (

    <Badge

      variant={
        current?.variant ?? "secondary"
      }

    >

      {
        current?.label ?? status
      }


    </Badge>

  )

}