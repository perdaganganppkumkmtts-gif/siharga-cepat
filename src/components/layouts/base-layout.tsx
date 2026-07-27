"use client"

import * as React from "react"

import {
  AppSidebar
} from "@/components/app-sidebar"

import {
  SiteHeader
} from "@/components/site-header"

import {
  SiteFooter
} from "@/components/site-footer"

import {
  ThemeCustomizer,
  ThemeCustomizerTrigger
} from "@/components/theme-customizer"

import {
  UpgradeToProButton
} from "@/components/upgrade-to-pro-button"

import {
  useSidebarConfig
} from "@/hooks/use-sidebar-config"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"



import type { UserRole } from "@/types/profile"

interface BaseLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string

  profile: {
    id: string
    nama: string
    email: string | null
    role: UserRole
    aktif: boolean
  }
}





export function BaseLayout({

  children,

  title,

  description,

  profile

}:BaseLayoutProps){



const [
  themeCustomizerOpen,
  setThemeCustomizerOpen
]

=
React.useState(false)



const {
  config
}

=
useSidebarConfig()



return (

<SidebarProvider>


<AppSidebar

variant={config.variant}

collapsible={config.collapsible}

side={config.side}

profile={profile}

/>



<SidebarInset>


<SiteHeader />



<div

className="
flex
flex-1
flex-col
"

>


<div

className="
flex
flex-col
gap-4
py-4
md:py-6
"

>



{
title &&

<div className="px-4 lg:px-6">

<h1 className="text-2xl font-bold">

{title}

</h1>


{
description &&

<p className="text-muted-foreground">

{description}

</p>

}

</div>

}



{children}



</div>


</div>



<SiteFooter />


</SidebarInset>






<ThemeCustomizerTrigger

onClick={()=>setThemeCustomizerOpen(true)}

/>


<ThemeCustomizer

open={themeCustomizerOpen}

onOpenChange={setThemeCustomizerOpen}

/>



<UpgradeToProButton />


</SidebarProvider>


)

}