"use server"

import { createClient } from "@/lib/supabase-server"
import { SURVEI_STATUS } from "@/lib/constants/survei-status"
// =======================================
// SUMMARY
// =======================================

export async function getSummary() {

  const supabase =
    await createClient()

  const {
    data,
    error,
  } =
    await supabase
      .from("survei_harian")
      .select("status")

  if (error) {

    console.error(error)

    throw new Error(
      error.message
    )

  }

  const summary = {

    total: 0,

    diajukan: 0,

    disetujui: 0,

    ditolak: 0,

  }

  data?.forEach((item) => {

    summary.total++

    switch(item.status){

      case SURVEI_STATUS.DIAJUKAN:

      summary.diajukan++

      break

      case SURVEI_STATUS.DISETUJUI:

      summary.disetujui++

      break

      case SURVEI_STATUS.DITOLAK:

      summary.ditolak++

      break

    }

  })

  return summary

}



// =======================================
// LIST SURVEI
// =======================================

export async function getSurveiHarian() {

  const supabase =
    await createClient()

  const {
    data,
    error,
  } =
    await supabase
      .from("survei_harian")
      .select(`
        id,
        tanggal,
        status,
        catatan,
        created_at,
        updated_at,

        survei_detail (

          id,

          harga,

          keterangan,

          komoditas (

            id,
            kode,
            nama,
            satuan

          )

        )

      `)
      .order(
        "tanggal",
        {
          ascending: false,
        }
      )

  if (error) {

    console.error(error)

    throw new Error(
      error.message
    )

  }

  return (data ?? []).map((item: any) => ({

    ...item,

    jumlahKomoditas:

      item.survei_detail?.length ?? 0,

  }))

}



// =======================================
// DELETE
// =======================================

export async function deleteSurvei(
  id: string
) {

  const supabase =
    await createClient()

  const {
    error,
  } =
    await supabase
      .from("survei_harian")
      .delete()
      .eq(
        "id",
        id
      )

  if (error) {

    console.error(error)

    throw new Error(
      error.message
    )

  }

  return {

    success: true,

  }

}



// =======================================
// APPROVE
// =======================================

export async function approveSurvei(
  id: string
) {

  const supabase =
    await createClient()

  const {
    error,
  } =
    await supabase
      .from("survei_harian")
      .update({

        status:SURVEI_STATUS.DISETUJUI

      })
      .eq(
        "id",
        id
      )

  if (error) {

    console.error(error)

    throw new Error(
      error.message
    )

  }

  return {

    success: true,

  }

}



// =======================================
// REJECT
// =======================================

export async function rejectSurvei(

  id: string,

  catatan?: string

) {

  const supabase =
    await createClient()

  const {
    error,
  } =
    await supabase
      .from("survei_harian")
      .update({

        status:SURVEI_STATUS.DITOLAK,

        catatan,

      })
      .eq(
        "id",
        id
      )

  if (error) {

    console.error(error)

    throw new Error(
      error.message
    )

  }

  return {

    success: true,

  }

}