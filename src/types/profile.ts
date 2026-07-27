export type UserRole =
  | "admin"
  | "surveyor"
  | "analis"
  | "kabid"
  | "kadis"


export interface Profile {

  id: string

  nama: string

  email: string | null

  no_hp?: string | null

  role: UserRole

  aktif: boolean

  created_at?: string

  updated_at?: string

}