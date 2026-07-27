import {
  Card,
  CardContent,
} from "@/components/ui/card"

import type {
  LucideIcon,
} from "lucide-react"

interface AnalysisCardProps {

  title: string

  value: string | number

  description: string

  icon: LucideIcon

  color?:
    | "blue"
    | "green"
    | "red"
    | "orange"
    | "purple"
    | "gray"

}

const colorMap = {

  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600",
  },

  green: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-600",
  },

  red: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-600",
  },

  orange: {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-600",
  },

  purple: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-600",
  },

  gray: {
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-600 dark:text-slate-300",
  },

}

export function AnalysisCard({

  title,

  value,

  description,

  icon: Icon,

  color = "blue",

}: AnalysisCardProps) {

  const style =
    colorMap[color]

  return (

    <Card
      className="
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-lg
      "
    >

      <CardContent
        className="
        p-6
        "
      >

        <div
          className="
          flex
          items-start
          justify-between
          "
        >

          <div
            className="
            space-y-2
            "
          >

            <p
              className="
              text-sm
              font-medium
              text-muted-foreground
              "
            >
              {title}
            </p>

            <h2
              className="
              text-3xl
              font-bold
              tracking-tight
              "
            >
              {value}
            </h2>

            <p
              className="
              text-xs
              text-muted-foreground
              "
            >
              {description}
            </p>

          </div>

          <div
            className={`
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              ${style.bg}
            `}
          >

            <Icon
              className={`
                h-6
                w-6
                ${style.text}
              `}
            />

          </div>

        </div>

      </CardContent>

    </Card>

  )

}