import React from "react"

import { requireAuth } from "@/lib/auth"

import { DashboardShell } from "@/components/dashboard-shell"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const profile = await requireAuth()

  return (

    <DashboardShell
      profile={profile}
    >

      {children}

    </DashboardShell>

  )

}