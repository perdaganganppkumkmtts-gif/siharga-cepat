export interface Publikasi {
  id: string
  judul: string
  slug: string
  jenis: "berita" | "laporan"
  ringkasan: string | null
  gambar: string | null
  konten: string | null
  status: "draft" | "published"
  created_by: string | null
  created_at: string
  published_at: string | null
}