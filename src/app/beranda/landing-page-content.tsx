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
  CTASection
} from "./components/cta-section"


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

        {/* Statistik Website */}

        <StatsSection

          stats={stats}

        />


        <CTASection />

        
        {/* Saran Pengunjung */}

        <FeedbackSection />


      </main>






      {/* Footer */}

      <LandingFooter />



    </div>


  )

}