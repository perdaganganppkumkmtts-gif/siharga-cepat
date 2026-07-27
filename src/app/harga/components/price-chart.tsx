"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AreaSeries,
  ColorType,
  createChart,
  IChartApi,
  ISeriesApi,
  AreaData,
  UTCTimestamp,
} from "lightweight-charts";
import { useTheme } from "next-themes";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PriceChartProps {
  commodity: string;
  data: {
    unit: string;
    prices: {
      time: string;
      value: number;
    }[];
  };
}

const HET_PRICE = 75000;
const HAP_UPPER = 78000;
const HAP_LOWER = 70000;

export function PriceChart({
  commodity,
  data,
}: PriceChartProps) {
  const { resolvedTheme } = useTheme();

  const chartContainerRef = useRef<HTMLDivElement>(null);

  const chartRef = useRef<IChartApi | null>(null);

  const seriesRef =
    useRef<ISeriesApi<"Area"> | null>(null);

  const hetLineRef = useRef<any>(null);

  const hapUpperRef = useRef<any>(null);

  const hapLowerRef = useRef<any>(null);

  const [timeframe, setTimeframe] =
    useState<"daily" | "weekly" | "monthly">("daily");

  const [showHET, setShowHET] =
    useState(false);

  const [showHAP, setShowHAP] =
    useState(false);

  const chartData = useMemo(() => {

    const prices = data.prices;

    if (timeframe === "daily") {

        return prices;

    }


    if (timeframe === "weekly") {

        const last7Days = prices.slice(-7);

        const average =
            last7Days.reduce(
                (total, item) => total + item.value,
                0
            ) / last7Days.length;


        return [
            {
                time: last7Days[last7Days.length - 1]?.time ?? "",
                value: Math.round(average),
            },
        ];

    }



    if (timeframe === "monthly") {

        const last30Days = prices.slice(-30);


        const average =
            last30Days.reduce(
                (total, item) => total + item.value,
                0
            ) / last30Days.length;


        return [
            {
                time: last30Days[last30Days.length - 1]?.time ?? "",
                value: Math.round(average),
            },
        ];

    }


    return prices;


  }, [timeframe, data]);

  const lastPrice =
    chartData.length > 0
      ? chartData[chartData.length - 1].value
      : 0;

  const firstPrice =
    chartData[0]?.value ?? 0;

  const change =
    lastPrice - firstPrice;

  const percent =
    firstPrice === 0
      ? 0
      : (change / firstPrice) * 100;

  const priceStatus =
    change > 0
      ? "up"
      : change < 0
      ? "down"
      : "stable";

  const [legend, setLegend] =
    useState({
      price: lastPrice,
      date: "",
    });

/*
|--------------------------------------------------------------------------
| CREATE CHART
|--------------------------------------------------------------------------
*/

useEffect(() => {
  if (!chartContainerRef.current) return;

  const isDark = resolvedTheme === "dark";

  const chart = createChart(chartContainerRef.current, {
    width: chartContainerRef.current.clientWidth,
    height: 520,

    layout: {
      background: {
        type: ColorType.Solid,
        color: "transparent",
      },
      textColor: isDark ? "#d4d4d8" : "#3f3f46",
    },

    grid: {
      vertLines: {
        color: isDark ? "#27272a" : "#e5e7eb",
      },
      horzLines: {
        color: isDark ? "#27272a" : "#e5e7eb",
      },
    },

    rightPriceScale: {
      borderColor: isDark ? "#3f3f46" : "#d4d4d8",
    },

    timeScale: {
      borderColor: isDark ? "#3f3f46" : "#d4d4d8",
    },

    crosshair: {
      vertLine: {
        visible: true,
      },
      horzLine: {
        visible: true,
      },
    },
  });

  chartRef.current = chart;

  const series = chart.addSeries(
    AreaSeries,
    {
      lineColor:
        priceStatus === "up"
          ? "#ef4444"        // merah naik
          : priceStatus === "down"
          ? "#16a34a"        // hijau turun
          : "#ca8a04",       // yellow-600 stabil


      topColor:
        priceStatus === "up"
          ? "rgba(239,68,68,0.45)"     // merah
          : priceStatus === "down"
          ? "rgba(22,163,74,0.45)"     // hijau
          : "rgba(202,138,4,0.45)",    // yellow-600


      bottomColor:
        "rgba(0,0,0,0)",


      lineWidth: 3,
    }
  );

  seriesRef.current = series;
  series.setData(chartData);
  chart.timeScale().fitContent();

  const resizeObserver = new ResizeObserver(() => {
    chart.applyOptions({
      width: chartContainerRef.current!.clientWidth,
    });
  });

  resizeObserver.observe(chartContainerRef.current);

  chart.subscribeCrosshairMove((param) => {
    if (
      !param.time ||
      !param.seriesData.has(series)
    )
      return;

    const value = param.seriesData.get(series) as AreaData<
      UTCTimestamp
    >;

    if (!value) return;

    setLegend({
      price: value.value,
      date: new Date(
        String(param.time)
      ).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });
  });

  return () => {
    resizeObserver.disconnect();
    chart.remove();
  };
}, [resolvedTheme]);

/*
|--------------------------------------------------------------------------
| UPDATE DATA
|--------------------------------------------------------------------------
*/

useEffect(() => {
  if (!seriesRef.current) return;

  seriesRef.current.setData(chartData);
  

  const currentChange =
    chartData.length > 1
      ? chartData[chartData.length - 1].value -
        chartData[0].value
      : 0;


  const status =
    currentChange > 0
      ? "up"
      : currentChange < 0
      ? "down"
      : "stable";

  seriesRef.current.applyOptions({

    lineColor:
      status === "up"
        ? "#ef4444"
        : status === "down"
        ? "#16a34a"
        : "#f97316",


    topColor:
      status === "up"
        ? "rgba(239,68,68,.35)"
        : status === "down"
        ? "rgba(22,163,74,.35)"
        : "rgba(249,115,22,.35)",


    bottomColor:
      "rgba(0,0,0,0)",

  });

  setLegend({
    price: chartData.length
      ? chartData[chartData.length - 1].value
      : 0,

    date: chartData.length
      ? chartData[chartData.length - 1].time
      : "",
  });
}, [chartData]);

/*
|--------------------------------------------------------------------------
| HET
|--------------------------------------------------------------------------
*/

useEffect(() => {
  if (!seriesRef.current) return;

  if (hetLineRef.current) {
    seriesRef.current.removePriceLine(hetLineRef.current);
    hetLineRef.current = null;
  }

  if (showHET) {
    hetLineRef.current = seriesRef.current.createPriceLine({
      price: HET_PRICE,
      color: "#ef4444",
      lineWidth: 2,
      lineStyle: 2,
      axisLabelVisible: true,
      title: "HET",
    });
  }
}, [showHET]);

/*
|--------------------------------------------------------------------------
| HAP
|--------------------------------------------------------------------------
*/

useEffect(() => {
  if (!seriesRef.current) return;

  if (hapUpperRef.current) {
    seriesRef.current.removePriceLine(hapUpperRef.current);
    hapUpperRef.current = null;
  }

  if (hapLowerRef.current) {
    seriesRef.current.removePriceLine(hapLowerRef.current);
    hapLowerRef.current = null;
  }

  if (showHAP) {
    hapUpperRef.current = seriesRef.current.createPriceLine({
      price: HAP_UPPER,
      color: "#2563eb",
      lineWidth: 2,
      lineStyle: 2,
      axisLabelVisible: true,
      title: "HAP Atas",
    });

    hapLowerRef.current = seriesRef.current.createPriceLine({
      price: HAP_LOWER,
      color: "#2563eb",
      lineWidth: 2,
      lineStyle: 2,
      axisLabelVisible: true,
      title: "HAP Bawah",
    });
  }
}, [showHAP]);

return (
  <section className="py-10">
    <div className="container mx-auto px-4">
      <Card className="overflow-hidden border-border/60 bg-card/70 backdrop-blur">
        <CardContent className="p-0">
          {/* Header */}
          <div className="border-b px-6 py-5">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              {/* Left */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">
                    Komoditas
                  </span>

                  <span className="font-semibold">
                    {commodity || "Beras Medium"}
                  </span>
                </div>

                <div>
                  <h2 className="text-3xl font-bold tracking-tight">
                    Rp {lastPrice.toLocaleString("id-ID")}

                    <span className="ml-2 text-lg font-medium text-muted-foreground">
                      / {data.unit}
                    </span>
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span>
                      Tanggal :
                      <span className="ml-1 font-medium text-foreground">
                        {legend.date}
                      </span>
                    </span>

                    <span>
                      Harga :
                      <span className="ml-1 font-semibold text-foreground">
                        Rp {legend.price.toLocaleString("id-ID")} / {data.unit}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500" />

                    <Switch
                      id="het"
                      checked={showHET}
                      onCheckedChange={setShowHET}
                    />

                    <Label htmlFor="het">
                      HET
                    </Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-blue-500" />

                    <Switch
                      id="hap"
                      checked={showHAP}
                      onCheckedChange={setShowHAP}
                    />

                    <Label htmlFor="hap">
                      HAP
                    </Label>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex gap-2">

                {[
                  {
                    value: "daily",
                    label: "Harian",
                  },
                  {
                    value: "weekly",
                    label: "Mingguan",
                  },
                  {
                    value: "monthly",
                    label: "Bulanan",
                  },
                ].map((item) => (

                  <Button
                    key={item.value}
                    size="sm"
                    variant={
                      timeframe === item.value
                        ? "default"
                        : "outline"
                    }
                    onClick={() =>
                      setTimeframe(
                        item.value as
                        "daily" |
                        "weekly" |
                        "monthly"
                      )
                    }
                  >
                    {item.label}
                  </Button>

                ))}

              </div>
            </div>
          </div>

          {/* Chart */}
          <div
            ref={chartContainerRef}
            className="h-[500px] w-full"
          />
        </CardContent>
      </Card>
    </div>
  </section>
  );
}