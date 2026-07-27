export interface CommodityPrice {
  unit: string;
  prices: {
    time: string;
    value: number;
  }[];
}

export const dummyPrice: Record<string, CommodityPrice> = {
  "Beras Medium": {
    unit: "kg",
    prices: [
      { time: "2026-07-01", value: 16167 },
      { time: "2026-07-02", value: 16167 },
      { time: "2026-07-03", value: 16167 },
      { time: "2026-07-06", value: 16167 },
      { time: "2026-07-07", value: 16167 },
      { time: "2026-07-08", value: 16167 },
    ],
  },

  "Beras Premium": {
    unit: "kg",
    prices: [
      { time: "2026-07-01", value: 16917 },
      { time: "2026-07-02", value: 16917 },
      { time: "2026-07-03", value: 16917 },
      { time: "2026-07-06", value: 16917 },
      { time: "2026-07-07", value: 16917 },
      { time: "2026-07-08", value: 16917 },
    ],
  },

  "Beras SPHP Bulog": {
    unit: "kg",
    prices: [
      { time: "2026-07-01", value: 13100 },
      { time: "2026-07-02", value: 13100 },
      { time: "2026-07-03", value: 13100 },
      { time: "2026-07-06", value: 13100 },
      { time: "2026-07-07", value: 13100 },
      { time: "2026-07-08", value: 13100 },
    ],
  },

  "Kedelai Impor": {
    unit: "kg",
    prices: [
      { time: "2026-07-01", value: 23333 },
      { time: "2026-07-02", value: 23333 },
      { time: "2026-07-03", value: 23333 },
      { time: "2026-07-06", value: 20000 },
      { time: "2026-07-07", value: 20000 },
      { time: "2026-07-08", value: 38000 },
    ],
  },

  "Cabai Merah Keriting": {
    unit: "kg",
    prices: [
      { time: "2026-07-01", value: 60000 },
      { time: "2026-07-02", value: 60000 },
      { time: "2026-07-03", value: 60000 },
      { time: "2026-07-06", value: 60000 },
      { time: "2026-07-07", value: 60000 },
      { time: "2026-07-08", value: 55000 },
    ],
  },

  "Cabai Merah Besar": {
    unit: "kg",
    prices: [
      { time: "2026-07-01", value: 50000 },
      { time: "2026-07-02", value: 50000 },
      { time: "2026-07-03", value: 50000 },
      { time: "2026-07-06", value: 50000 },
      { time: "2026-07-07", value: 50000 },
      { time: "2026-07-08", value: 50000 },
    ],
  },
};