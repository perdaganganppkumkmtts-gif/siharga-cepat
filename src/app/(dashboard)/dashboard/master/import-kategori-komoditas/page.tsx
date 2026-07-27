import { ImportForm } from "./import-form"

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Import Kategori Komoditas
        </h1>

        <p className="text-muted-foreground">
          Import data kategori komoditas dari file Excel (.xlsx atau .xls).
          Sistem akan menambahkan kategori komoditas baru dan memperbarui kategori komoditas yang sudah ada berdasarkan kode kategori komoditas.
        </p>
      </div>

      <ImportForm />
    </div>
  )
}