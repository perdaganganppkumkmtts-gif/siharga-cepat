import {
  TrendingUp,
  TrendingDown,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Props {
  title: string
  data: any[]
}

export function CommodityRanking({
  title,
  data,
}: Props) {
  return (
    <Card className="h-full">

      <CardHeader>

        <CardTitle className="text-lg">
          {title}
        </CardTitle>

      </CardHeader>

      <CardContent>

        {
          data.length === 0 ? (

            <div
              className="
              flex
              h-40
              items-center
              justify-center
              text-sm
              text-muted-foreground
              "
            >
              Belum ada data
            </div>

          ) : (

            <div className="space-y-3">

              {
                data.map(
                  (
                    item,
                    index
                  ) => {

                    const naik =
                      item.perubahan > 0

                    return (

                      <div
                        key={item.nama}
                        className="
                        flex
                        items-center
                        justify-between
                        rounded-lg
                        border
                        p-3
                        transition-colors
                        hover:bg-muted/50
                        "
                      >

                        {/* Kiri */}

                        <div className="flex items-center gap-3">

                          <div
                            className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            bg-muted
                            text-sm
                            font-bold
                            "
                          >
                            {index + 1}
                          </div>

                          <div>

                            <p className="font-semibold">
                              {item.nama}
                            </p>

                            <p
                              className="
                              text-lg
                              font-bold
                              "
                            >
                              Rp{" "}
                              {(item.rataIni ?? 0).toLocaleString(
                                "id-ID"
                              )}
                            </p>

                            <p
                              className="
                              text-xs
                              text-muted-foreground
                              "
                            >
                              / {item.satuan}
                            </p>

                          </div>

                        </div>

                        {/* Kanan */}

                        <div
                          className={`
                          inline-flex
                          items-center
                          gap-1
                          rounded-full
                          px-3
                          py-1
                          text-sm
                          font-semibold
                          ${
                            naik
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }
                          `}
                        >

                          {
                            naik
                              ? (
                                <TrendingUp className="h-4 w-4" />
                              )
                              : (
                                <TrendingDown className="h-4 w-4" />
                              )
                          }

                          {Math.abs(item.perubahan ?? 0).toFixed(2)}%

                        </div>

                      </div>

                    )
                  }
                )
              }

            </div>

          )
        }

      </CardContent>

    </Card>
  )
}