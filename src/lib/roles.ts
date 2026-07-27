export const Roles = {
  ADMIN: "admin",
  KADIS: "kadis",
  KABID: "kabid",
  ANALIS: "analis",
  SURVEYOR: "surveyor",
} as const

export type Role =
  (typeof Roles)[keyof typeof Roles]