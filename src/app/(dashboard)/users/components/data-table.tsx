"use client"

import { useState } from "react"

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type Row,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"


import {
  EllipsisVertical,
  Search,
  Pencil,
  Trash2,
  KeyRound,
} from "lucide-react"


import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { Input } from "@/components/ui/input"


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



interface User {

  id:string

  nama:string

  email:string

  username?:string

  no_hp:string | null


  role:
  | "admin"
  | "kadis"
  | "kabid"
  | "analis"
  | "surveyor"


  aktif:boolean


  created_at:string

}



interface DataTableProps {

 users:User[]

}




export function DataTable({
 users
}:DataTableProps){


const [sorting,setSorting]
=
useState<SortingState>([])


const [columnFilters,setColumnFilters]
=
useState<ColumnFiltersState>([])


const [columnVisibility,setColumnVisibility]
=
useState<VisibilityState>({})


const [rowSelection,setRowSelection]
=
useState({})


const [globalFilter,setGlobalFilter]
=
useState("")





const getRoleColor=(role:string)=>{


switch(role){


case "admin":
return "bg-red-500/10 text-red-600"


case "kadis":
return "bg-purple-500/10 text-purple-600"


case "kabid":
return "bg-blue-500/10 text-blue-600"


case "analis":
return "bg-green-500/10 text-green-600"


case "surveyor":
return "bg-yellow-500/10 text-yellow-600"


default:
return ""

}


}






const exactFilter = (
row:Row<User>,
columnId:string,
value:string
)=>{


return row
.getValue(columnId)
===
value


}







const columns:ColumnDef<User>[]=[



{
id:"select",

header:({table})=>(

<Checkbox

checked={
table.getIsAllPageRowsSelected()
||
(
table.getIsSomePageRowsSelected()
&&
"indeterminate"
)
}

onCheckedChange={(value)=>
table.toggleAllPageRowsSelected(
!!value
)
}

/>

),


cell:({row})=>(

<Checkbox

checked={
row.getIsSelected()
}

onCheckedChange={(value)=>
row.toggleSelected(
!!value
)
}

/>

),


enableSorting:false,

enableHiding:false,

},






{
accessorKey:"nama",

header:"Pengguna",


cell:({row})=>{


const user=row.original


return (

<div className="flex items-center gap-3">


<Avatar>

<AvatarFallback>

{
user.nama
.substring(0,2)
.toUpperCase()
}

</AvatarFallback>


</Avatar>



<div>

<p className="font-medium">

{user.nama}

</p>


<p className="text-sm text-muted-foreground">

{user.email}

</p>


</div>


</div>

)

}


},







{
accessorKey:"role",

header:"Role",


cell:({row})=>{


const role=row.original.role


return (

<Badge

variant="secondary"

className={
getRoleColor(role)
}

>

{role.toUpperCase()}

</Badge>

)

},


filterFn:exactFilter

},







{
accessorKey:"aktif",

header:"Status",


cell:({row})=>{


const aktif=row.original.aktif


return (

<Badge

variant="secondary"

className={
aktif
?
"bg-green-500/10 text-green-600"
:
"bg-red-500/10 text-red-600"
}

>

{
aktif
?
"Aktif"
:
"Nonaktif"
}


</Badge>

)

}


},








{
accessorKey:"no_hp",

header:"No HP",


cell:({row})=>
row.original.no_hp ?? "-"


},







{
accessorKey:"created_at",

header:"Tanggal Daftar",


cell:({row})=>

new Date(
row.original.created_at
)
.toLocaleDateString(
"id-ID"
)

},








{
id:"actions",

header:"Aksi",


cell:({row})=>{


return (

<DropdownMenu>


<DropdownMenuTrigger asChild>


<Button

variant="ghost"

size="icon"

>

<EllipsisVertical
className="size-4"
/>

</Button>


</DropdownMenuTrigger>




<DropdownMenuContent align="end">


<DropdownMenuItem>

<Pencil className="mr-2 size-4"/>

Edit User

</DropdownMenuItem>



<DropdownMenuItem>

<KeyRound className="mr-2 size-4"/>

Reset Password

</DropdownMenuItem>



<DropdownMenuSeparator/>


<DropdownMenuItem
className="text-red-600"
>

<Trash2 className="mr-2 size-4"/>

Hapus User

</DropdownMenuItem>



</DropdownMenuContent>


</DropdownMenu>

)


}

}



]










const table=
useReactTable({

data:users,

columns,


getRowId:(row)=>
row.id,


state:{

sorting,

columnFilters,

columnVisibility,

rowSelection,

globalFilter

},


onSortingChange:setSorting,

onColumnFiltersChange:setColumnFilters,

onColumnVisibilityChange:setColumnVisibility,

onRowSelectionChange:setRowSelection,


onGlobalFilterChange:setGlobalFilter,


getCoreRowModel:
getCoreRowModel(),


getFilteredRowModel:
getFilteredRowModel(),


getSortedRowModel:
getSortedRowModel(),


getPaginationRowModel:
getPaginationRowModel(),


})







const roleFilter =
(table
.getColumn("role")
?.getFilterValue() as string)
??
""









return (

<div className="space-y-5">






<div className="flex flex-col md:flex-row gap-4 justify-between">


<div className="relative max-w-sm">


<Search

className="
absolute
left-3
top-1/2
size-4
-translate-y-1/2
text-muted-foreground
"

/>


<Input

placeholder="Cari pengguna..."

value={globalFilter}

onChange={(e)=>
setGlobalFilter(
e.target.value
)
}


className="pl-9"

/>


</div>






<Select


value={roleFilter}


onValueChange={(value)=>

table
.getColumn("role")
?.setFilterValue(
value==="all"
?
""
:
value
)

}

>


<SelectTrigger className="w-[180px]">

<SelectValue placeholder="Filter Role"/>

</SelectTrigger>



<SelectContent>


<SelectItem value="all">

Semua Role

</SelectItem>


<SelectItem value="admin">

Admin

</SelectItem>


<SelectItem value="kadis">

Kadis

</SelectItem>


<SelectItem value="kabid">

Kabid

</SelectItem>


<SelectItem value="analis">

Analis

</SelectItem>


<SelectItem value="surveyor">

Surveyor

</SelectItem>


</SelectContent>


</Select>


</div>









<div className="rounded-md border overflow-x-auto">


<Table>


<TableHeader>


{
table.getHeaderGroups()
.map(group=>(

<TableRow key={group.id}>


{
group.headers.map(header=>(

<TableHead key={header.id}>

{
flexRender(
header.column.columnDef.header,
header.getContext()
)
}

</TableHead>

))

}


</TableRow>


))

}


</TableHeader>





<TableBody>


{
table.getRowModel()
.rows.length
?


table.getRowModel()
.rows.map(row=>(


<TableRow key={row.id}>


{
row.getVisibleCells()
.map(cell=>(


<TableCell key={cell.id}>


{
flexRender(
cell.column.columnDef.cell,
cell.getContext()
)
}


</TableCell>


))

}


</TableRow>


))


:

<TableRow>


<TableCell

colSpan={columns.length}

className="text-center h-24"

>

Belum ada data pengguna

</TableCell>


</TableRow>

}


</TableBody>


</Table>


</div>





</div>

)

}