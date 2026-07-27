"use client"

import * as React from "react"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type SortingState,
  type VisibilityState,
  useReactTable,
} from "@tanstack/react-table"


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { Button } from "@/components/ui/button"

import {
  ChevronLeft,
  ChevronRight,
  Columns3,
} from "lucide-react"



interface DataTableProps<TData,TValue>{

  columns: ColumnDef<TData,TValue>[]

  data:TData[]

}



export function DataTable<TData,TValue>({

  columns,

  data,

}:DataTableProps<TData,TValue>) {



const [sorting,setSorting] =
React.useState<SortingState>([])


const [columnVisibility,setColumnVisibility] =
React.useState<VisibilityState>({})



const table = useReactTable({

data,

columns,


state:{
sorting,
columnVisibility
},


onSortingChange:setSorting,

onColumnVisibilityChange:setColumnVisibility,


getCoreRowModel:getCoreRowModel(),

getFilteredRowModel:getFilteredRowModel(),

getSortedRowModel:getSortedRowModel(),

getPaginationRowModel:getPaginationRowModel(),


})



return (

<div className="space-y-4">


{/* TOOLBAR */}

<div className="flex items-center justify-between">


<div className="text-sm text-muted-foreground">

Total data :
{" "}
{table.getFilteredRowModel().rows.length}

</div>



<DropdownMenu>

<DropdownMenuTrigger asChild>

<Button
variant="outline"
size="sm"
>

<Columns3 className="mr-2 h-4 w-4"/>

Kolom

</Button>

</DropdownMenuTrigger>



<DropdownMenuContent align="end">

{
table
.getAllColumns()
.filter(
(column)=>
column.getCanHide()
)
.map((column)=>(

<DropdownMenuCheckboxItem

key={column.id}

checked={
column.getIsVisible()
}

onCheckedChange={(value)=>
column.toggleVisibility(
!!value
)
}

className="capitalize"

>

{column.id}


</DropdownMenuCheckboxItem>

))
}


</DropdownMenuContent>


</DropdownMenu>


</div>





{/* TABLE */}

<div className="rounded-md border">


<Table>


<TableHeader>

{
table
.getHeaderGroups()
.map(
(headerGroup)=>(

<TableRow
key={headerGroup.id}
>

{
headerGroup.headers.map(
(header)=>(

<TableHead
key={header.id}
>

{
header.isPlaceholder
?null
:
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
table.getRowModel().rows.length
?


table.getRowModel().rows.map(
(row)=>(

<TableRow
key={row.id}
>


{
row
.getVisibleCells()
.map(
(cell)=>(

<TableCell
key={cell.id}
>

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
className="h-24 text-center"
>

Tidak ada data

</TableCell>


</TableRow>


}


</TableBody>



</Table>


</div>






{/* PAGINATION */}

<div className="flex justify-end gap-2">


<Button

variant="outline"

size="sm"

onClick={()=>
table.previousPage()
}

disabled={
!table.getCanPreviousPage()
}

>

<ChevronLeft/>

</Button>




<Button

variant="outline"

size="sm"

onClick={()=>
table.nextPage()
}

disabled={
!table.getCanNextPage()
}

>

<ChevronRight/>

</Button>


</div>



</div>

)


}