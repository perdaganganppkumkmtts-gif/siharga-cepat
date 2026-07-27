import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase-server"

export async function GET() {
  try {
    const supabase = await createClient()

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    // Pengunjung hari ini
    const { count: todayVisitors } = await supabase
      .from("website_visits")
      .select("*", { count: "exact", head: true })
      .gte("created_at", today.toISOString())

    // Pengunjung 7 hari terakhir
    const { count: weeklyVisitors } = await supabase
      .from("website_visits")
      .select("*", { count: "exact", head: true })
      .gte("created_at", sevenDaysAgo.toISOString())

    // Total pengunjung
    const { count: totalVisitors } = await supabase
      .from("website_visits")
      .select("*", { count: "exact", head: true })

    // Ambil semua rating
    const { data: ratings } = await supabase
      .from("feedback")
      .select("rating")

    let averageRating = 0

    if (ratings && ratings.length > 0) {
      averageRating =
        ratings.reduce((sum, item) => sum + item.rating, 0) /
        ratings.length
    }

    return NextResponse.json({
      todayVisitors: todayVisitors ?? 0,
      weeklyVisitors: weeklyVisitors ?? 0,
      totalVisitors: totalVisitors ?? 0,
      averageRating: Number(averageRating.toFixed(1)),
    })

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        message: "Terjadi kesalahan."
      },
      {
        status: 500
      }
    )
  }
}