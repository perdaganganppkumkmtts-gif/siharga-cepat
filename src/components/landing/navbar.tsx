"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Menu } from "lucide-react";


import { DotPattern } from "@/components/dot-pattern";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "@/hooks/use-theme";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";



const navigationItems = [

  {
    name: "Beranda",
    href: "/",
  },

  {
    name: "Informasi Harga",
    href: "/harga",
  },

  {
    name: "Publikasi",
    href: "/publikasi",
  },

  {
    name: "Kontak",
    href: "#kontak",
  },

];





function scrollToSection(
  href:string
){

  const element =
    document.querySelector(href);


  if(element){

    element.scrollIntoView({
      behavior:"smooth",
      block:"start",
    });

  }

}





export function LandingNavbar() {

  const [isOpen,setIsOpen] = useState(false);

  const [mounted,setMounted] = useState(false);


  const { theme } = useTheme();



  useEffect(()=>{

    setMounted(true);

  },[]);

  const logoSrc =
  mounted && theme === "dark"
    ? "/siharga-dark.svg"
    : "/siharga-light.svg";





  return (


<header
className="
sticky
top-0
z-50
w-full
overflow-hidden
border-b
bg-gradient-to-r
from-green-500/10
via-background/70
to-red-500/10
backdrop-blur-xl
"
>


<DotPattern

className="
absolute
inset-0
opacity-20
"

size="md"

fadeStyle="ellipse"

/>





<div

className="
relative
container
mx-auto
flex
h-16
items-center
justify-between
px-4
sm:px-6
lg:px-8
"

>





{/* LOGO */}


<Link

href="/"

className="
flex
items-center
gap-3
"

>


<Image

src={logoSrc}

alt="SIHARGA CEPAT"

width={38}

height={38}

priority

/>


<div
className="
leading-tight
"
>

<p
className="
font-bold
text-base
sm:text-lg
"
>

SIHARGA CEPAT

</p>


<p
className="
text-xs
text-muted-foreground
"
>

Sistem Informasi Harga Bapok Kab. Timor Tengah Selatan

</p>


</div>


</Link>








{/* DESKTOP MENU */}


<NavigationMenu
className="
hidden
xl:flex
"
>


<NavigationMenuList>


{
navigationItems.map((item)=>(


<NavigationMenuItem

key={item.name}

>


{

item.href.startsWith("/")

?


<Link

href={item.href}

className="
inline-flex
h-10
items-center
px-5
text-sm
font-medium
transition-colors
hover:text-primary
"

>

{item.name}

</Link>


:


<button

onClick={()=>scrollToSection(item.href)}

className="
inline-flex
h-10
items-center
px-5
text-sm
font-medium
transition-colors
hover:text-primary
"

>

{item.name}

</button>


}


</NavigationMenuItem>


))

}


</NavigationMenuList>


</NavigationMenu>








{/* DESKTOP TOGGLE */}


<div
className="
hidden
xl:flex
"
>

<ModeToggle
variant="ghost"
/>

</div>









{/* MOBILE */}


<Sheet

open={isOpen}

onOpenChange={setIsOpen}

>


<div
className="
flex
items-center
gap-1
xl:hidden
"
>


<ModeToggle
variant="ghost"
/>



<SheetTrigger asChild>


<Button

variant="ghost"

size="icon"

>

<Menu
className="
h-5
w-5
"
/>


</Button>


</SheetTrigger>


</div>








<SheetContent

side="right"

className="
w-full
sm:w-[320px]
"

>


<SheetHeader

className="
border-b
px-6
py-5
"

>


<Link

href="/"

onClick={()=>setIsOpen(false)}

className="
flex
items-center
gap-3
"

>


<Image

src={logoSrc}

alt="SIHARGA CEPAT"

width={42}

height={42}

/>


<div>


<SheetTitle

className="
text-left
"

>

SIHARGA CEPAT

</SheetTitle>


<p
className="
text-xs
text-muted-foreground
"
>

Sistem Informasi Harga Bapok Kab. Timor Tengah Selatan

</p>


</div>


</Link>


</SheetHeader>









<nav

className="
px-6
py-6
space-y-2
"

>


{

navigationItems.map((item)=>(


item.href.startsWith("/")


?


<Link

key={item.name}

href={item.href}

onClick={()=>setIsOpen(false)}

className="
flex
w-full
rounded-xl
px-4
py-4
font-medium
transition
hover:bg-primary
hover:text-primary-foreground
"

>

{item.name}

</Link>


:


<button

key={item.name}

onClick={()=>{

setIsOpen(false);

setTimeout(()=>{

scrollToSection(item.href);

},150);

}}

className="
flex
w-full
rounded-xl
px-4
py-4
text-left
font-medium
transition
hover:bg-primary
hover:text-primary-foreground
"

>

{item.name}

</button>


))

}


</nav>





</SheetContent>


</Sheet>



</div>



</header>


  );

}