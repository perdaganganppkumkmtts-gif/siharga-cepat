import {
  LayoutDashboard,
  Database,
  Package,
  ClipboardList,
  History,
  BarChart2,
  BarChart3,
  FileText,
  Newspaper,
  Users,
  Settings,
  Upload,
  FileSpreadsheet,
} from "lucide-react"

import type { UserRole } from "@/types/profile"


export function getNavigation(role: UserRole) {


  switch(role){


    case "admin":

      return [

        {
          label:"Dashboard",
          items:[
            {
              title:"Dashboard",
              url:"/dashboard",
              icon:LayoutDashboard,
            },
          ],
        },


        {
          label:"Master Data",
          items:[
            {
              title:"Kategori Komoditas",
              url:"/dashboard/master/kategori-komoditas",
              icon:Database,
            },

            {
              title: "Import Kategori Komoditas",
              url: "/dashboard/master/import-kategori-komoditas",
              icon: Upload,
            },

            {
              title:"Komoditas",
              url:"/dashboard/master/komoditas",
              icon:Package,
            },

            {
              title: "Import Komoditas",
              url: "/dashboard/master/import-komoditas",
              icon: Upload,
            },
          ],
        },


        {
          label:"Surveyor",
          items:[
            {
              title:"Survei Harian",
              url:"/dashboard/transaksi/survei-harian",
              icon:ClipboardList,
            },

            {
              title: "Import Data Harga",
              url: "/dashboard/transaksi/import-historis",
              icon: Upload,
            },
          ],
        },


        {
          label:"Analisis",
          items:[
            {
              title:"Survei Harian",
              url:"/dashboard/transaksi/analis/survei-harian",
              icon:ClipboardList,
            },
            {
              title:"Monitoring Harga",
              url:"/dashboard/analisis",
              icon:BarChart3,
            },

            {
              title:"Analisis Bapok",
              url:"/dashboard/analisis/trend-fluktuasi",
              icon:BarChart2,
            },

            {
              title:"Export Laporan Dinas",
              url:"/dashboard/analisis/publik-laporan",
              icon:FileText,
            },
          ],
        },


        {
          label:"Publikasi",
          items:[

            {
              title:"Publikasi Laporan",
              url:"/dashboard/analisis/laporan",
              icon:FileText,
            },
            {
              title:"Daftar Laporan",
              url:"/dashboard/daftar-publikasi",
              icon:Newspaper,
            },
            {
              title:"Berita",
              url:"/dashboard/publikasi/berita",
              icon:Newspaper,
            },
          ],
        },
        {
          label:"Pengaturan",
          items:[
            {
              title:"Pengguna",
              url:"/dashboard/users",
              icon:Users,
            },

            {
              title:"Pengaturan Sistem",
              url:"/dashboard/pengaturan",
              icon:Settings,
            },
          ],
        },


      ]





    case "surveyor":

      return [

        {
          label:"Dashboard",
          items:[
            {
              title:"Dashboard",
              url:"/dashboard",
              icon:LayoutDashboard,
            },
          ],
        },


        {
          label:"Survei Harga",
          items:[

            {
              title:"Input Harga Harian",
              url:"/dashboard/transaksi/survei-harian",
              icon:ClipboardList,
            },

            {
              title: "Import Data Harga",
              url: "/dashboard/transaksi/import-historis",
              icon: Upload,
            },

          ],
        },

      ]

    case "analis":

      return [

        {
          label:"Dashboard",
          items:[
            {
              title:"Dashboard",
              url:"/dashboard/analisis",
              icon:LayoutDashboard,
            },
          ],
        },


        {
          label:"Analisis",

          items:[
            {
              title:"Survei Harian",
              url:"/dashboard/transaksi/analis/survei-harian",
              icon:ClipboardList,
            },

            {
              title:"Analisis Harga Bapok",
              url:"/dashboard/analisis/trend-fluktuasi",
              icon:BarChart3,
            },


            {
              title:"Buat Laporan",
              url:"/dashboard/analisis/publik-laporan",
              icon:FileText,
            },


          ],

        },

      ]


    case "kabid":

      return [

        {
          label:"Dashboard",
          items:[
            {
              title:"Dashboard",
              url:"/dashboard/analisis",
              icon:LayoutDashboard,
            },
          ],
        },


        {
          label:"Monitoring",

          items:[


            {
              title:"Analisis Harga Bapok",
              url:"/dashboard/analisis/trend-fluktuasi",
              icon:BarChart2,
            },


            {
              title:"Buat Laporan",
              url:"/dashboard/analisis/publik-laporan",
              icon:FileText,
            },

          ],

        },

      ]







    case "kadis":

      return [

        {
          label:"Dashboard",
          items:[

            {
              title:"Dashboard",
              url:"/dashboard",
              icon:LayoutDashboard,
            },

          ],
        },


        {
          label:"Laporan Pimpinan",

          items:[

            {
              title:"Ringkasan Harga",
              url:"/dashboard/ringkasan",
              icon:BarChart3,
            },


            {
              title:"Laporan",
              url:"/dashboard/laporan",
              icon:FileText,
            },


          ],

        },

      ]





    default:

      return []

  }


}