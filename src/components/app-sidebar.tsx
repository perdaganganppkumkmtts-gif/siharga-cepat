"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import type { Profile } from "@/types/profile"

import { getNavigation } from "@/lib/navigation"

import { NavMain } from "@/components/nav-main"

import { NavUser } from "@/components/nav-user"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"



interface AppSidebarProps
  extends React.ComponentProps<typeof Sidebar> {

  profile: Profile

}



export function AppSidebar({

  profile,

  ...props

}: AppSidebarProps) {



  const navGroups =
    getNavigation(profile.role)



  return (

    <Sidebar {...props}>


      {/* ================= HEADER ================= */}

      <SidebarHeader>

        <SidebarMenu>

          <SidebarMenuItem>


            <SidebarMenuButton

              size="lg"

              asChild

            >


              <Link href="/dashboard">


                <div
                  className="
                  flex
                  aspect-square
                  size-9
                  items-center
                  justify-center
                  "
                >
                  <Image
                    src="/siharga-dark.svg"
                    alt="Logo SIHARGA CEPAT"
                    width={36}
                    height={36}
                    priority
                    className="h-9 w-9 object-contain"
                  />
                </div>



                <div

                  className="
                  grid
                  flex-1
                  text-left
                  text-sm
                  leading-tight
                  "

                >


                  <span

                    className="
                    truncate
                    font-semibold
                    "

                  >

                    SIHARGA CEPAT

                  </span>



                  <span

                    className="
                    truncate
                    text-xs
                    text-muted-foreground
                    "

                  >

                    Sistem Informasi Harga Bapok

                  </span>


                </div>



              </Link>


            </SidebarMenuButton>


          </SidebarMenuItem>


        </SidebarMenu>


      </SidebarHeader>





      {/* ================= MENU ================= */}


      <SidebarContent>


        {


          navGroups.map((group) => (


            <NavMain

              key={group.label}

              label={group.label}

              items={group.items}

            />


          ))


        }


      </SidebarContent>





      {/* ================= FOOTER ================= */}


      <SidebarFooter>





        <NavUser

          user={profile}

        />


      </SidebarFooter>




    </Sidebar>


  )


}