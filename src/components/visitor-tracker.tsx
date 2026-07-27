"use client"

import {
  useEffect
} from "react"



export default function VisitorTracker(){


useEffect(()=>{


async function trackVisitor(){


try{


let sessionId =
localStorage.getItem(
  "visitor_session"
)



// buat session baru jika belum ada

if(!sessionId){


sessionId =
crypto.randomUUID()


localStorage.setItem(
  "visitor_session",
  sessionId
)


}





await fetch(
"/api/visit",
{

method:"POST",

headers:{

"Content-Type":
"application/json"

},


body:JSON.stringify({

sessionId,

page:
window.location.pathname,

userAgent:
navigator.userAgent,

referrer:
document.referrer || null

})


}

)



}

catch(error){

console.error(
"Visitor tracking error:",
error
)

}


}




trackVisitor()



},[])



return null


}