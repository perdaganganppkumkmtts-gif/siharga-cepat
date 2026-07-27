export const SURVEI_STATUS = {

  DRAFT: "draft",

  DIAJUKAN: "diajukan",

  DISETUJUI: "disetujui",

  DITOLAK: "ditolak",

} as const

export type SurveiStatus =
  typeof SURVEI_STATUS[keyof typeof SURVEI_STATUS]