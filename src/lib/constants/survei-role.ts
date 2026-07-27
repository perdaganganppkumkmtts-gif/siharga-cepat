export const SURVEI_ROLE = {

  SURVEYOR:"surveyor",

  ANALIS:"analis",

  KABID:"kabid",

  KADIS:"kadis",

} as const


export type SurveiRole =
typeof SURVEI_ROLE[keyof typeof SURVEI_ROLE]