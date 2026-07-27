export interface SurveiRow {

  id:string

  tanggal:string

  status:string

  catatan?:string | null

  created_at:string

  updated_at?:string | null


  survei_detail:{

    id:string

    harga:number

    keterangan?:string | null


    komoditas:{

      id:string

      kode:string

      nama:string

      satuan:string

    }[]

  }[]

}