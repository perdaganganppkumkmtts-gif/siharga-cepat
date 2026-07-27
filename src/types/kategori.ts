export interface KategoriKomoditas {

  id:string

  kode:string

  nama:string

  deskripsi:string | null

  aktif:boolean

  created_at:string

  updated_at:string

}





export interface Komoditas {

  id:string

  kategori_id:string

  kode:string

  nama:string

  satuan:string

  urutan:number

  aktif:boolean

  is_publik:boolean

  created_at:string

  updated_at:string


  kategori_komoditas?:{

    nama:string

  }

}