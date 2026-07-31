import { getPublikasi } from "./actions"
import { PublikasiTable } from "./components/publikasi-table"

export default async function DaftarPublikasiPage() {
  const publikasi = await getPublikasi()

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold">
            Daftar Publikasi
          </h1>

          <p className="text-muted-foreground">
            Kelola seluruh berita dan laporan yang dipublikasikan.
          </p>
        </div>

      </div>

      <PublikasiTable
        data={publikasi}
      />

    </div>
  )
}