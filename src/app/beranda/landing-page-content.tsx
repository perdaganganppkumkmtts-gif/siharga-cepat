"use client"

import { 
  LandingNavbar 
} from "@/components/landing/navbar"


import { 
  HeroSection 
} from "./components/hero-section"


import { 
  CommoditySection 
} from "./components/logo-carousel"


import { 
  PublicationSection 
} from "./components/blog-section"


import { 
  FeedbackSection 
} from "./components/feedback-section"


import { 
  StatsSection 
} from "./components/stats-section"


import { 
  LandingFooter 
} from "@/components/landing/footer"





interface Props {

  commodities:any[]

  publications:any[]

  stats:{
    todayVisitor:number
    weekVisitor:number
    totalVisitor:number
    averageRating:number
  }

}







export function LandingPageContent({

  commodities,

  publications,

  stats


}:Props){



  return (


    <div 
      className="
      min-h-screen
      bg-background
      "
    >



      {/* Navbar */}

      <LandingNavbar />





      <main>



        {/* Hero */}

        <HeroSection />





        {/* Harga Komoditas */}

        <CommoditySection

          commodities={commodities}

        />






        {/* Publikasi */}

        <PublicationSection

          publications={publications}

        />







        {/* Saran Pengunjung */}

        <FeedbackSection />







        {/* Statistik Website */}

        <StatsSection

          stats={stats}

        />





      </main>






      {/* Footer */}

      <LandingFooter />



    </div>


  )

}