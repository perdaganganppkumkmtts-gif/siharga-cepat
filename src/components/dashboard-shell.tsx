"use client"

import React from "react"

import type { Profile } from "@/types/profile"

import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

import { useSidebarConfig } from "@/hooks/use-sidebar-config"

interface DashboardShellProps {

  profile: Profile

  children: React.ReactNode

}

export function DashboardShell({

  profile,

  children,

}: DashboardShellProps) {

  const { config } = useSidebarConfig()

  return (

    <SidebarProvider

      style={

        {

          "--sidebar-width": "17rem",

          "--sidebar-width-icon": "3.5rem",

          "--header-height":
            "calc(var(--spacing) * 14)",

        } as React.CSSProperties

      }

      className={

        config.collapsible === "none"

          ? "sidebar-none-mode"

          : ""

      }

    >

      {

        config.side === "left"

          ?

          <>

            <AppSidebar
              profile={profile}
              variant={config.variant}
              collapsible={config.collapsible}
              side={config.side}
            />

            <SidebarInset>

              <SiteHeader />

              <main

                className="
                flex
                flex-1
                flex-col
                bg-muted/30
                "

              >

                <div

                  className="
                  @container/main
                  flex
                  flex-1
                  flex-col
                  gap-4
                  p-4
                  md:p-6
                  "

                >

                  {children}

                </div>

              </main>

              <SiteFooter />

            </SidebarInset>

          </>

          :

          <>

            <SidebarInset>

              <SiteHeader />

              <main

                className="
                flex
                flex-1
                flex-col
                bg-muted/30
                "

              >

                <div

                  className="
                  @container/main
                  flex
                  flex-1
                  flex-col
                  gap-4
                  p-4
                  md:p-6
                  "

                >

                  {children}

                </div>

              </main>

              <SiteFooter />

            </SidebarInset>

            <AppSidebar

              profile={profile}

              variant={config.variant}

              collapsible={config.collapsible}

              side={config.side}

            />

          </>

      }

    </SidebarProvider>

  )

}