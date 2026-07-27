"use client";

import { useEffect, useState } from "react";

import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  Minus,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";



interface ComparisonTableProps {
  commodities: any[];
}




export function ComparisonTable({
  commodities,
}: ComparisonTableProps) {


  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");



  /*
    Ambil daftar tanggal tersedia
  */

  const availableDates =
    commodities?.[0]?.prices?.map(
      (item: any) => item.time
    ) ?? [];




  /*
    Default:
    tanggal terakhir
    dibandingkan dengan
    tanggal sebelumnya
  */

  useEffect(() => {

    if (availableDates.length >= 2) {

      setDate1(
        availableDates[
          availableDates.length - 2
        ]
      );

      setDate2(
        availableDates[
          availableDates.length - 1
        ]
      );

    }

  }, [commodities]);







  /*
    Format tanggal
  */

  function formatDate(date: string) {

    if (!date) return "-";


    return new Date(date)
      .toLocaleDateString(
        "id-ID",
        {
          day: "numeric",
          month: "short",
        }
      );

  }







  /*
    Format harga
  */

  function formatPrice(
    value: number | undefined,
    unit: string
  ) {


    if (value === undefined) {

      return (
        <span className="text-muted-foreground">
          Data belum tersedia
        </span>
      );

    }


    return (
      <>
        Rp {value.toLocaleString("id-ID")}
        <span className="text-muted-foreground">
          /{unit}
        </span>
      </>
    );

  }








  /*
    Ambil harga berdasarkan tanggal
  */

  function getPrice(
    item: any,
    date: string
  ) {

    return item.prices?.find(
      (price: any) =>
        price.time === date
    )?.value;

  }









  /*
    Hitung perubahan harga
  */

function renderChange(
  price1: number | undefined,
  price2: number | undefined,
  unit: string
) {

  if (
    price1 === undefined ||
    price2 === undefined
  ) {

    return (
      <Badge variant="secondary">
        Data belum tersedia
      </Badge>
    );

  }


  const difference =
    price2 - price1;


  const percent =
    price1 === 0
      ? 0
      : (difference / price1) * 100;



  /*
    HARGA STABIL
  */

  if (difference === 0) {

    return (

      <Badge
        className="
        gap-1
        bg-yellow-500/15
        text-yellow-600
        border-yellow-500/20
        "
      >

        <Minus className="h-3 w-3" />

        Rp 0/{unit}

        {" "}

        (0.00%)

      </Badge>

    );

  }




  /*
    HARGA NAIK
  */

  if (difference > 0) {


    return (

      <Badge
        className="
        gap-1
        bg-red-500/15
        text-red-600
        border-red-500/20
        "
      >

        <ArrowUp
          className="h-3 w-3"
        />


        Rp {difference.toLocaleString("id-ID")}
        /{unit}


        (
        +{percent.toFixed(2)}
        %)

      </Badge>

    );

  }





  /*
    HARGA TURUN
  */

  return (

    <Badge

      className="
      gap-1
      bg-green-500/15
      text-green-600
      border-green-500/20
      "

    >

      <ArrowDown
        className="h-3 w-3"
      />


      Rp {Math.abs(difference)
      .toLocaleString("id-ID")}
      /{unit}


      (
      {percent.toFixed(2)}
      %)

    </Badge>

  );

}









  return (

    <section className="py-10">

      <div className="container mx-auto px-4">


        <Card
          className="
            overflow-hidden
            border-border/60
            bg-card/70
            backdrop-blur
            shadow-sm
          "
        >



          {/* HEADER */}

          <CardHeader
            className="
              border-b
            "
          >

            <CardTitle
              className="
                flex
                items-center
                gap-2
                text-xl
              "
            >

              <CalendarDays
                className="
                  h-5
                  w-5
                  text-green-600
                "
              />

              Perbandingan Harga Komoditas

            </CardTitle>


            <p
              className="
                text-sm
                text-muted-foreground
              "
            >

              Membandingkan perubahan harga antar periode pemantauan.

            </p>


          </CardHeader>







          <CardContent className="p-6">



            {/* FILTER TANGGAL */}

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
                mb-6
              "
            >


              <div>

                <label className="text-sm font-medium">
                  Tanggal Awal
                </label>


                <input
                  type="date"
                  value={date1}
                  onChange={(e)=>
                    setDate1(e.target.value)
                  }
                  className="
                    mt-2
                    w-full
                    rounded-lg
                    border
                    bg-background
                    px-3
                    py-2
                  "
                />

              </div>





              <div>

                <label className="text-sm font-medium">
                  Tanggal Pembanding
                </label>


                <input
                  type="date"
                  value={date2}
                  onChange={(e)=>
                    setDate2(e.target.value)
                  }
                  className="
                    mt-2
                    w-full
                    rounded-lg
                    border
                    bg-background
                    px-3
                    py-2
                  "
                />

              </div>


            </div>








            {/* TABLE */}

            <div
              className="
                rounded-xl
                border
                overflow-hidden
              "
            >

              <div
                className="
                  max-h-[600px]
                  overflow-auto
                "
              >

                <Table>


                  <TableHeader
                    className="
                      sticky
                      top-0
                      bg-background
                      z-10
                    "
                  >

                    <TableRow>

                      <TableHead>
                        Komoditas
                      </TableHead>


                      <TableHead>
                        {formatDate(date1)}
                      </TableHead>


                      <TableHead>
                        {formatDate(date2)}
                      </TableHead>


                      <TableHead>
                        Perubahan
                      </TableHead>


                    </TableRow>

                  </TableHeader>





                  <TableBody>


                    {
                      commodities.map(
                        (item:any)=>{


                          const price1 =
                            getPrice(
                              item,
                              date1
                            );


                          const price2 =
                            getPrice(
                              item,
                              date2
                            );



                          return (

                            <TableRow
                              key={item.name}
                              className="
                                hover:bg-muted/50
                                transition
                              "
                            >


                              <TableCell
                                className="
                                  font-medium
                                  whitespace-nowrap
                                "
                              >

                                {item.name}

                              </TableCell>




                              <TableCell>

                                {formatPrice(
                                  price1,
                                  item.unit
                                )}

                              </TableCell>




                              <TableCell>

                                {formatPrice(
                                  price2,
                                  item.unit
                                )}

                              </TableCell>




                              <TableCell>

                                {renderChange(
                                  price1,
                                  price2,
                                  item.unit
                                )}

                              </TableCell>


                            </TableRow>

                          );

                        }
                      )
                    }


                  </TableBody>


                </Table>


              </div>


            </div>


          </CardContent>


        </Card>


      </div>


    </section>

  );

}