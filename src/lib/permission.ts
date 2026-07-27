import { Role } from "./roles"

export const Permissions: Record<Role, string[]> = {
  admin: ["*"],

  kadis: [
    "dashboard",
    "laporan",
    "monitoring",
  ],

  kabid: [
    "dashboard",
    "laporan",
    "monitoring",
  ],

  analis: [
    "dashboard",
    "analisis",
    "laporan",
  ],

  surveyor: [
    "dashboard",
    "input-harga",
  ],
}