import { Badge } from "@/components/ui/badge"

import { SURVEI_STATUS } from "@/lib/constants/survei-status"

interface StatusBadgeProps {

  status:string

}

export function StatusBadge({

  status,

}:StatusBadgeProps){

  const statusConfig={

    [SURVEI_STATUS.DRAFT]:{

      label:"Draft",

      className:
      "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300"

    },

    [SURVEI_STATUS.DIAJUKAN]:{

      label:"Diajukan",

      className:
      "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300"

    },

    [SURVEI_STATUS.DISETUJUI]:{

      label:"Disetujui",

      className:
      "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300"

    },

    [SURVEI_STATUS.DITOLAK]:{

      label:"Ditolak",

      className:
      "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300"

    },

  }

  const current=

    statusConfig[
      status as keyof typeof statusConfig
    ]

  return(

    <Badge

      variant="outline"

      className={current?.className}

    >

      {current?.label ?? status}

    </Badge>

  )

}