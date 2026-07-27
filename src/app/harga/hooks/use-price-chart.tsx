import { PriceData } from "../types/price"

export function usePriceChart() {

    const data: PriceData[] = [
        { time: "2026-07-01", value: 14000 },
        { time: "2026-07-02", value: 14100 },
        { time: "2026-07-03", value: 14200 },
        { time: "2026-07-04", value: 14150 },
        { time: "2026-07-05", value: 14300 },
    ]

    return {
        data
    }

}