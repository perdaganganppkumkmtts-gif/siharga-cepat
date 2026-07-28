"use client"

import { useEffect, useState } from "react"
import { CalendarDays, Clock } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function DateTimeWidget() {
  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const tanggal = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Makassar",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now)

  const jam = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Makassar",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now)

  return (
    <Card className="overflow-hidden border-border/50 shadow-md">
      <CardHeader className="pb-2 items-center justify-center">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-primary" />
          Tanggal & Jam
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <CalendarDays className="h-5 w-5" />
            <span className="text-base font-medium">
            {tanggal}
            </span>
        </div>

        <div>
            <h2 className="text-4xl font-bold tracking-widest md:text-5xl">
            {jam}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
            Waktu Indonesia Tengah (WITA)
            </p>
        </div>
    </CardContent>
    </Card>
  )
}