"use client";


import {
  useEffect,
  useRef,
  useState,
} from "react";


import {
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";



import {
  Input
} from "@/components/ui/input";


import {
  Button
} from "@/components/ui/button";


import {
  PublicationCard
} from "./publication-card";









interface Publication {


  id:string;


  judul:string;


  slug:string;



  jenis:
  "laporan"
  |
  "berita";



  ringkasan:string|null;


  gambar:string|null;



  created_by:string|null;



  published_at:string;



  konten?:string|null;



}









interface PublicationListProps {


  publications:Publication[];



  category:string;



}









export function PublicationList({


publications,


category,


}:PublicationListProps){







const [

search,

setSearch

]=

useState("");








const [

page,

setPage

]=

useState(1);







const listRef =

useRef<HTMLDivElement>(null);







const itemsPerPage = 6;











// =========================
// FILTER
// =========================


const filteredData =

publications.filter((item)=>{






const matchCategory =





category === "Semua"



||



item.jenis === category;












const keyword =

search.toLowerCase();









const matchSearch =




item.judul

.toLowerCase()

.includes(keyword)







||







item.ringkasan

?.toLowerCase()

.includes(keyword)








||







item.created_by

?.toLowerCase()

.includes(keyword);









return (

matchCategory

&&

Boolean(matchSearch)

);



});












// =========================
// RESET PAGE
// =========================


useEffect(()=>{


setPage(1);


},[

search,

category

]);












// =========================
// PAGINATION
// =========================


const totalPage =

Math.ceil(

filteredData.length

/

itemsPerPage

);







const startIndex =

(page-1)

*

itemsPerPage;







const currentData =

filteredData.slice(

startIndex,

startIndex + itemsPerPage

);












// =========================
// CHANGE PAGE
// =========================


function changePage(

newPage:number

){



setPage(newPage);



setTimeout(()=>{


listRef.current?.scrollIntoView({

behavior:"smooth",

block:"start"

});


},100);



}













return (



<div

ref={listRef}

className="
space-y-8
"

>









{/* SEARCH */}



<div

className="
flex
flex-col
gap-4
md:flex-row
md:items-center
md:justify-between
"

>







<div

className="
relative
w-full
md:max-w-md
"

>


<Search

className="
absolute
left-3
top-1/2
h-4
w-4
-translate-y-1/2
text-muted-foreground
"

/>






<Input


placeholder="
Cari publikasi...
"



value={search}



onChange={(e)=>


setSearch(

e.target.value

)

}



className="
pl-10
"

/>






</div>









<p

className="
text-sm
text-muted-foreground
"

>



Menampilkan


{" "}



<span

className="
font-semibold
text-foreground
"

>

{filteredData.length}


</span>



{" "}

publikasi



</p>







</div>













{/* CARD */}



{


currentData.length === 0



?

(



<div

className="
rounded-xl
border
p-10
text-center
text-muted-foreground
"

>


Tidak ada publikasi ditemukan.



</div>



)



:



(



<div

className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
gap-6
"

>



{

currentData.map((item)=>(



<PublicationCard


key={item.id}


item={item}


/>



))


}



</div>



)



}














{/* PAGINATION */}



{


totalPage > 1



&&



<div

className="
flex
items-center
justify-center
gap-3
pt-6
"

>







<Button


variant="outline"


size="icon"



disabled={page===1}



onClick={()=>changePage(page-1)}



>


<ChevronLeft

className="
h-4
w-4
"

/>


</Button>









<div

className="
flex
gap-2
"

>


{

Array.from({

length:totalPage

})

.map((_,index)=>{



const pageNumber = index+1;



return (



<Button


key={pageNumber}



size="sm"



variant={

page===pageNumber

?

"default"

:

"outline"

}



onClick={()=>changePage(pageNumber)}

>


{pageNumber}


</Button>



);



})


}



</div>









<Button


variant="outline"


size="icon"



disabled={page===totalPage}



onClick={()=>changePage(page+1)}



>


<ChevronRight

className="
h-4
w-4
"

/>


</Button>









</div>



}









</div>



);


}