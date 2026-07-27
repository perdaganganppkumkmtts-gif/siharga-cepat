import TrendFluktuasiContent from "./trend-fluktuasi-content"
import { getCommodityOptions } from "./actions"

export default async function TrendFluktuasiPage() {
  const commodities = await getCommodityOptions()

  return (
    <TrendFluktuasiContent
      commodities={commodities}
    />
  )
}