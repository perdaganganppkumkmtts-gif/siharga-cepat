import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase-server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const supabase = await createClient()

    const { error } = await supabase
      .from("website_visits")
      .insert({
        session_id: body.sessionId,
        page: body.page,
        user_agent: body.userAgent,
        referrer: body.referrer,
      })

    if (error) throw error

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    )
  }
}