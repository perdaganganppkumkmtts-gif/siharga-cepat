export interface Komoditas {

  id:string

  kode:string

  nama:string

  satuan:string

}



export interface SurveiDetail {

  id:string

  harga:number

  keterangan:string | null

  komoditas:Komoditas

}



export interface SurveiHarian {

  id:string

  tanggal:string

  status:string

  catatan:string | null

  created_at:string

  survei_detail:SurveiDetail[]

}

export interface DetailKomoditas {

  id:string

  kode:string

  nama:string

  satuan:string

}


export interface SurveiDetailWithKomoditas {

  id:string

  harga:number

  keterangan:string | null

  komoditas:DetailKomoditas

}


export interface SurveiDetailResponse {

  id:string

  tanggal:string

  status:string

  catatan:string | null

  created_at:string

  survei_detail:
  SurveiDetailWithKomoditas[]

}

export interface RiwayatHarga {


id:string

tanggal:string

kode:string

komoditas:string

satuan:string

harga:number

keterangan:string | null


}