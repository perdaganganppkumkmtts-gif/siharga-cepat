"use client";


import {
  FileText,
  Newspaper,
  Layers,
} from "lucide-react";


import {
  Button
} from "@/components/ui/button";









interface PublicationFilterProps {


  activeCategory:string;



  setActiveCategory:
  (
    category:string
  )=>void;



}









const categories = [


  {
    name:"Semua",

    value:"Semua",

    icon:Layers,

  },


  {
    name:"Laporan",

    value:"laporan",

    icon:FileText,

  },


  {
    name:"Berita",

    value:"berita",

    icon:Newspaper,

  },


];









export function PublicationFilter({


activeCategory,


setActiveCategory,


}:PublicationFilterProps){






return (



<div

className="
flex
flex-wrap
justify-center
gap-3
mb-10
"

>







{

categories.map((item)=>{





const Icon = item.icon;







return (



<Button



key={item.value}



variant={

activeCategory === item.value

?

"default"

:

"outline"

}





onClick={()=>


setActiveCategory(

item.value

)


}





className="
gap-2
rounded-full
"

>





<Icon

className="
h-4
w-4
"

/>






{item.name}






</Button>



);



})

}





</div>



);



}