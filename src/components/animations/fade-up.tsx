"use client";


import { motion } from "framer-motion";


export function FadeUp({
children,
className=""
}:{
children:React.ReactNode;
className?:string;
}){


return (

<motion.div

initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true,
amount:0.2
}}

transition={{
duration:0.5
}}

className={className}

>

{children}

</motion.div>

)

}