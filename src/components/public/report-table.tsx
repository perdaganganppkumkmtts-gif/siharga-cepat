"use client"

interface Props {
  data: any[]
}

function rupiah(
  value: number | null | undefined
) {

  if (value == null) {
    return "-"
  }

  return (
    "Rp " +
    Math.round(value).toLocaleString("id-ID")
  )

}

function formatPercent(
  value: number
) {

  if (value > 0) {
    return `+${value.toFixed(2)}%`
  }

  return `${value.toFixed(2)}%`

}

export function ReportTable({
  data
}: Props) {

  if (!data || data.length === 0) {
    return null
  }

return (

    <div
      className="
      rounded-xl
      border
      overflow-hidden
      "
    >


      {/* PETUNJUK MOBILE */}

      <div
        className="
        block
        md:hidden
        px-3
        py-2
        text-xs
        text-muted-foreground
        bg-muted/50
        "
      >

        Geser ke kiri untuk melihat informasi lainnya

      </div>

      <div
        className="
        w-full
        overflow-x-auto
        "
      >

        <table
          className="
          min-w-[1500px]
          w-full
          text-sm
          "
        >

          <thead
            className="
            bg-muted
            "
          >

            <tr>

              <th
className="
p-3
text-left
whitespace-nowrap
"
>
No
</th>

              <th
className="
p-3
text-left
whitespace-nowrap
"
>
Komoditas
</th>

              <th className="p-3 text-left whitespace-nowrap">
                Rerata Harga Periode Pembanding
              </th>

              <th className="p-3 text-left whitespace-nowrap">
                Rerata Harga Periode Analisis
              </th>

              <th className="p-3 text-left whitespace-nowrap">
                Harga Terakhir Periode Analisis
              </th>

              <th className="p-3 text-left whitespace-nowrap">
                Perubahan
              </th>

              <th className="p-3 text-left whitespace-nowrap">
                Tren
              </th>

              <th className="p-3 text-left whitespace-nowrap">
                Tingkat Fluktuasi
              </th>

              <th className="p-3 text-left whitespace-nowrap">
                HAP
              </th>

              <th className="p-3 text-left whitespace-nowrap">
                HET
              </th>

            </tr>

          </thead>

          <tbody>

            {

              data.map((item, index) => {

                const analysis =
                  item.analysis

                return (

                  <tr
                    key={item.id}
                    className="border-t"
                  >

                    <td
className="
p-3
text-left
whitespace-nowrap
"
>
{index + 1}
</td>

                    <td
className="
p-3
text-left
font-medium
whitespace-nowrap
"
>
{item.nama}
</td>

                    <td
                      className="
                      p-3
                      text-left
                      whitespace-nowrap
                      "
                    >
                      {
                        rupiah(
                          analysis.perbandingan.rataRataSebelumnya
                        )
                      }
                      {" / "}
                      {item.satuan}
                    </td>

                    <td
                      className="
                      p-3
                      text-left
                      whitespace-nowrap
                      "
                    >
                      {
                        rupiah(
                          analysis.perkembangan.rataRata
                        )
                      }
                      {" / "}
                      {item.satuan}
                    </td>

                    <td
                      className="
                      p-3
                      text-left
                      whitespace-nowrap
                      "
                    >
                      {
                        rupiah(
                          analysis.perkembangan.hargaAkhir
                        )
                      }
                      {" / "}
                      {item.satuan}
                    </td>

                    <td
                      className={`
                      p-3
                      text-left
                      whitespace-nowrap
                      font-medium

                      ${
                        analysis.perbandingan.perubahanPersen > 0
                          ? "text-red-600"
                          : analysis.perbandingan.perubahanPersen < 0
                          ? "text-green-600"
                          : "text-muted-foreground"
                      }
                      `}
                    >
                      {
                        formatPercent(
                          analysis.perbandingan.perubahanPersen
                        )
                      }
                    </td>

                    <td
                      className="
                      p-3
                      text-left
                      whitespace-nowrap
                      "
                    >

                      <span
                        className={`
                        rounded-full
                        px-2
                        py-1
                        text-xs
                        font-medium

                        ${
                          analysis.perbandingan.trend === "Naik"
                            ? "bg-red-100 text-red-700"
                            : analysis.perbandingan.trend === "Turun"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }
                        `}
                      >

                        {
                          analysis.perbandingan.trend
                        }

                      </span>

                    </td>

                    <td
                      className="
                      p-3
                      text-left
                      whitespace-nowrap
                      "
                    >

                      <span
                        className={`
                        rounded-full
                        px-2
                        py-1
                        text-xs

                        ${
                          analysis.fluktuasi.kategori === "Tinggi"
                            ? "bg-yellow-100 text-yellow-700"
                            : analysis.fluktuasi.kategori === "Sedang"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }
                        `}
                      >

                        {
                          analysis.fluktuasi.kategori
                        }

                      </span>

                    </td>

                    <td
                      className="
                      p-3
                      text-left
                      whitespace-nowrap
                      "
                    >

                      {
                        analysis.statusHAP
                          ? (

                            <span
                              className={`
                              rounded-full
                              px-2
                              py-1
                              text-xs

                              ${
                                analysis.statusHAP === "Di atas HAP"
                                  ? "bg-red-100 text-red-700"
                                  : analysis.statusHAP === "Di bawah HAP"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-blue-100 text-blue-700"
                              }
                              `}
                            >

                              {
                                analysis.statusHAP
                              }

                            </span>

                          )
                          : "-"
                      }

                    </td>

                    <td
                      className="
                      p-3
                      text-left
                      whitespace-nowrap
                      "
                    >

                      {
                        analysis.statusHET
                          ? (

                            <span
                              className={`
                              rounded-full
                              px-2
                              py-1
                              text-xs

                              ${
                                analysis.statusHET === "Di atas HET"
                                  ? "bg-red-100 text-red-700"
                                  : analysis.statusHET === "Di bawah HET"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-blue-100 text-blue-700"
                              }
                              `}
                            >

                              {
                                analysis.statusHET
                              }

                            </span>

                          )
                          : "-"
                      }

                    </td>

                  </tr>

                )

              })

            }

          </tbody>

        </table>

      </div>

    </div>

  )

}