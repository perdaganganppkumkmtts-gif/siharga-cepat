import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ClipboardList,
  CalendarDays,
  Package,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"

import { AnalysisCard } from "./components/analysis-card"
import { CommodityRanking } from "./components/commodity-ranking"
import { PriceAnalysisChart } from "./components/price-analysis-chart"

import {
  getAnalysisSummary,
  getPriceMovementSummary,
  getCommodityMovementRanking,
  getCommodityList,
} from "./actions"

export default async function Page() {
  const [summary, movement, ranking, commodities] = await Promise.all([
    getAnalysisSummary(),
    getPriceMovementSummary(),
    getCommodityMovementRanking(),
    getCommodityList(),
  ])

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Analisis Perdagangan
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground">
            Pemantauan, verifikasi, dan analisis perkembangan harga barang kebutuhan pokok sebagai bahan penyusunan laporan perdagangan.
          </p>
        </CardContent>
      </Card>

      {/* KPI SUMMARY */}
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Monitoring</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <AnalysisCard
              title="Total Survei"
              value={summary.totalSurvei}
              description="Total survei tersimpan"
              icon={ClipboardList}
              color="blue"
            />

            <AnalysisCard
              title="Survei Minggu Ini"
              value={summary.surveiMingguIni}
              description="Data 7 hari terakhir"
              icon={CalendarDays}
              color="purple"
            />

            <AnalysisCard
              title="Komoditas Dipantau"
              value={summary.totalKomoditas}
              description="Komoditas aktif"
              icon={Package}
              color="orange"
            />

            <AnalysisCard
              title="Harga Naik"
              value={summary.hargaNaik}
              description="Komoditas meningkat dalam seminggu terakhir"
              icon={TrendingUp}
              color="red"
            />

            <AnalysisCard
              title="Harga Turun"
              value={summary.hargaTurun}
              description="Komoditas menurun dalam seminggu terakhir"
              icon={TrendingDown}
              color="green"
            />

            <AnalysisCard
              title="Harga Stabil"
              value={summary.hargaStabil}
              description="Komoditas stabil dalam seminggu terakhir"
              icon={Minus}
              color="gray"
            />
          </div>
        </CardContent>
      </Card>

      {/* PERUBAHAN KOMODITAS */}
      <Card>
        <CardHeader>
          <CardTitle>Perubahan Harga Komoditas Mingguan</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <CommodityRanking
              title="Komoditas Harga Naik Seminggu Terakhir"
              data={ranking.naik}
            />

            <CommodityRanking
              title="Komoditas Harga Turun Seminggu Terakhir"
              data={ranking.turun}
            />
          </div>
        </CardContent>
      </Card>

      {/* GRAFIK */}
      <Card>
        <CardHeader>
          <CardTitle>Perkembangan Harga Komoditas</CardTitle>
        </CardHeader>

        <CardContent>
          <PriceAnalysisChart commodities={commodities} />
        </CardContent>
      </Card>
    </div>
  )
}