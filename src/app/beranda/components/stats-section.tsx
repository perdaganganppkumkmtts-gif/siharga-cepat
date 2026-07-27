"use client"

import {
  Users,
  CalendarDays,
  Globe,
  Star
} from "lucide-react"

import {
  Card,
  CardContent
} from "@/components/ui/card"

import {
  DotPattern
} from "@/components/dot-pattern"

import { motion } from "framer-motion"

import CountUp from "react-countup"

import {
  Badge
} from "@/components/ui/badge"

interface Props {

stats: {

todayVisitor:number

weekVisitor:number

totalVisitor:number

averageRating:number

}

}



function formatNumber(value:number){

  return new Intl.NumberFormat(
    "id-ID"
  ).format(value)

}





export function StatsSection({

stats

}:Props){


const items = [
  {
    icon: Users,
    value: stats.todayVisitor,
    label: "Pengunjung Hari Ini",
    description: "Total akses website hari ini",
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    icon: CalendarDays,
    value: stats.weekVisitor,
    label: "7 Hari Terakhir",
    description: "Jumlah kunjungan minggu ini",
    color: "text-green-600",
    bg: "bg-green-100 dark:bg-green-900/30",
  },
  {
    icon: Globe,
    value: stats.totalVisitor,
    label: "Total Pengunjung",
    description: "Sejak SIHARGA CEPAT tersedia",
    color: "text-purple-600",
    bg: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    icon: Star,
    value: stats.averageRating,
    label: "Rating Pengguna",
    description: "Rata-rata penilaian layanan",
    color: "text-yellow-500",
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    rating: true,
  },
]



return (

<section

className="
relative
overflow-hidden
py-2
sm:py-16
"

>


<div

className="
absolute
inset-0
bg-gradient-to-r
from-green-500/10
via-transparent
to-red-500/10
"

/>



<DotPattern

className="
absolute
inset-0
opacity-50
"

size="md"

fadeStyle="circle"

/>



{/* HEADER */}

<div

className="
mx-auto
max-w-3xl
text-center
mb-16
"

>


<Badge

variant="outline"

className="
mb-4
border-green-600/40
text-green-700
dark:text-green-400
"

>

Statsistik Pengunjung

</Badge>













<p

className="
text-lg
text-muted-foreground
"

>

Statistik Pengunjung Website SIHARGA CEPAT

</p>


</div>

<div

className="
relative
container
mx-auto
px-4
sm:px-6
lg:px-8
"

>


<div

className="
grid
grid-cols-2
lg:grid-cols-4
gap-6
"

>


{items.map((item, index) => {
  const Icon = item.icon

  return (
    <motion.div
      key={item.label}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.4,
      }}
    >
      <Card
        className="
          h-full
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
          bg-background/70
          backdrop-blur-md
          border-border/50
        "
      >
        <CardContent className="p-6 text-center">

          <div className="flex justify-center mb-5">
            <div
              className={`
                rounded-2xl
                p-4
                ${item.bg}
              `}
            >
              <Icon
                className={`
                  h-7
                  w-7
                  ${item.color}
                `}
              />
            </div>
          </div>

          <h3 className="text-3xl font-bold tracking-tight">

            {item.rating ? (
              <>
                <CountUp
                  end={Number(item.value)}
                  decimals={1}
                  duration={1.5}
                />
                <span className="text-lg text-muted-foreground">
                  {" "}
                  / 5
                </span>
              </>
            ) : (
              <CountUp
                end={Number(item.value)}
                separator="."
                duration={1.5}
              />
            )}

          </h3>

          <p className="mt-2 font-semibold">
            {item.label}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            {item.description}
          </p>

        </CardContent>
      </Card>
    </motion.div>
  )
})}


</div>


</div>


</section>

)

}