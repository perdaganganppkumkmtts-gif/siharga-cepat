import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })

          response = NextResponse.next({
            request,
          })

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // ==========================
  // Refresh Session
  // ==========================

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  const isAuthPage =
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/forgot-password")

  const isDashboard =
    pathname.startsWith("/dashboard")

  // ==========================
  // Belum login
  // ==========================

  if (!user && isDashboard) {
    return NextResponse.redirect(
      new URL("/sign-in", request.url)
    )
  }

  // ==========================
  // Sudah login
  // ==========================

  if (user && isAuthPage) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    )
  }

  // ==========================
  // Dashboard Protection
  // ==========================

  if (user && isDashboard) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role,aktif")
      .eq("id", user.id)
      .single()

    // ==========================
    // Profile tidak ditemukan
    // ==========================

    if (!profile) {
      await supabase.auth.signOut()

      const redirect = NextResponse.redirect(
        new URL("/sign-in?error=profile", request.url)
      )

      redirect.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate"
      )

      redirect.headers.set(
        "Pragma",
        "no-cache"
      )

      redirect.headers.set(
        "Expires",
        "0"
      )

      return redirect
    }

    // ==========================
    // Akun Non Aktif
    // ==========================

    if (!profile.aktif) {
      await supabase.auth.signOut()

      const redirect = NextResponse.redirect(
        new URL("/sign-in?error=inactive", request.url)
      )

      redirect.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate"
      )

      redirect.headers.set(
        "Pragma",
        "no-cache"
      )

      redirect.headers.set(
        "Expires",
        "0"
      )

      return redirect
    }

    // ==========================
    // ROLE (Siap ditambahkan)
    // ==========================

    switch (profile.role) {
      case "admin":
      case "surveyor":
      case "analis":
      case "kabid":
      case "kadis":
        break

      default:
        await supabase.auth.signOut()

        return NextResponse.redirect(
          new URL("/sign-in", request.url)
        )
    }
  }

  // ==========================
  // Anti Cache
  // ==========================

  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate"
  )

  response.headers.set(
    "Pragma",
    "no-cache"
  )

  response.headers.set(
    "Expires",
    "0"
  )

  return response
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
  ],
}