export interface Komoditas {

  id:string

  kategori_id:string

  kode:string

  nama:string

  satuan:string

  urutan:number

  aktif:boolean

  is_publik:boolean


  het?:number | null

  hap?:number | null

  hap_bawah?:number | null

  hap_atas?:number | null
  

  created_at:string

  updated_at:string


  kategori_komoditas?:{

    nama:string

  }

}