"use client"

interface Props {
  data: any
}

export function TrendComparisonTable({
  data,
}: Props) {
  const current = data.history ?? []

  const previous = data.historyPrevious ?? []

  // Ambil jumlah baris terbanyak
  const maxLength = Math.max(
    current.length,
    previous.length
  )

  return (
    <div
      className="
      rounded-xl
      border
      overflow-hidden
      "
    >
      <table
        className="
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
              "
            >
              Tanggal Periode Analisis
            </th>

            <th
              className="
              p-3
              text-left
              "
            >
              Harga Periode Analisis
            </th>

            <th
              className="
              p-3
              text-left
              "
            >
              Tanggal Periode Pembanding
            </th>

            <th
              className="
              p-3
              text-left
              "
            >
              Harga Periode Pembanding
            </th>
          </tr>
        </thead>

        <tbody>
          {Array.from({
            length: maxLength,
          }).map((_, index) => {
            const currentItem = current[index]

            const previousItem = previous[index]

            return (
              <tr
                key={index}
                className="
                border-t
                "
              >
                {/* Tanggal Analisis */}
                <td
                  className="
                  p-3
                  text-left
                  "
                >
                  {currentItem
                    ? formatTanggal(currentItem.time)
                    : "-"}
                </td>

                {/* Harga Analisis */}
                <td
                  className="
                  p-3
                  text-left
                  font-medium
                  "
                >
                  {currentItem
                    ? rupiah(currentItem.value)
                    : "-"}
                </td>

                {/* Tanggal Pembanding */}
                <td
                  className="
                  p-3
                  text-left
                  "
                >
                  {previousItem
                    ? formatTanggal(previousItem.time)
                    : "-"}
                </td>

                {/* Harga Pembanding */}
                <td
                  className="
                  p-3
                  text-left
                  "
                >
                  {previousItem
                    ? rupiah(previousItem.value)
                    : "-"}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function formatTanggal(
  tanggal: string
) {
  return new Date(tanggal).toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  )
}

function rupiah(
  value: number
) {
  return `Rp ${Math.round(value).toLocaleString(
    "id-ID"
  )}`
}