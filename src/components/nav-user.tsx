"use client"

import {
  EllipsisVertical,
  LogOut,
  CircleUser,
} from "lucide-react"

import Link from "next/link"
import Image from "next/image"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { logout } from "@/app/(auth)/sign-in/actions"

import type { Profile } from "@/types/profile"

export function NavUser({
  user,
}: {
  user: Profile
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="
                data-[state=open]:bg-sidebar-accent
                data-[state=open]:text-sidebar-accent-foreground
                cursor-pointer
              "
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                <Image
                  src="/siharga-dark.svg"
                  alt="Logo SIHARGA CEPAT"
                  width={36}
                  height={36}
                  priority
                  className="h-9 w-9 object-contain"
                />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user.nama}
                </span>

                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>

              <EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {/* PROFILE */}
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="h-8 w-8 rounded-lg">
                  <Image
                    src="/siharga-dark.svg"
                    alt="Logo SIHARGA CEPAT"
                    width={36}
                    height={36}
                    priority
                    className="h-9 w-9 object-contain"
                  />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user.nama}
                  </span>

                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>

                  <span className="truncate text-xs font-semibold text-primary">
                    {user.role.toUpperCase()}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className="cursor-pointer"
              >
                <Link href="/settings/account">
                  <CircleUser />
                  Pengaturan Akun
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <form action={logout}>
              <button
                type="submit"
                className="w-full"
              >
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={(e) => e.preventDefault()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}