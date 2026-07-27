import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { SidebarConfigProvider } from "@/contexts/sidebar-context";
import { inter } from "@/lib/fonts";
import VisitorTracker from "@/components/visitor-tracker";
import BackToTop from "@/components/back-to-top";

import { Toaster } from "sonner";



export const metadata: Metadata = {


metadataBase:

new URL(

process.env.NEXT_PUBLIC_SITE_URL ??

"https://sihargacepat-ppkumkmtts.vercel.app/"

),




title:{


default:

"SIHARGA CEPAT | Informasi Harga Bapok Kabupaten Timor Tengah Selatan",



template:

"%s | SIHARGA CEPAT"


},





description:

"Sistem Informasi Harga Barang Kebutuhan Pokok Cepat dan Terpadu Kabupaten Timor Tengah Selatan untuk menyediakan informasi harga yang cepat, akurat, transparan dan mudah diakses masyarakat.",





keywords:[


"SIHARGA CEPAT",


"harga bapok TTS",


"harga sembako Timor Tengah Selatan",


"informasi harga pasar",


"harga komoditas TTS",


"laporan harga pangan",


"harga kebutuhan pokok"


],






robots:{


index:true,


follow:true


},





openGraph:{


title:

"SIHARGA CEPAT | Informasi Harga Bapok TTS",




description:

"Pantau perkembangan harga barang kebutuhan pokok Kabupaten Timor Tengah Selatan.",




siteName:

"SIHARGA CEPAT",




locale:

"id_ID",




type:

"website",




images:[


{

url:

"/seo-image.png",


width:

1200,


height:

630,


alt:

"SIHARGA CEPAT Kabupaten Timor Tengah Selatan"


}


]


},






twitter:{


card:

"summary_large_image",



title:

"SIHARGA CEPAT | Informasi Harga Bapok TTS",




description:

"Pantau perkembangan harga barang kebutuhan pokok Kabupaten Timor Tengah Selatan.",




images:[

"/seo-image.png"

]


},





icons:{


icon:

"/favicon.ico"


}



};





export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


return (

<html

lang="id"

className={`${inter.variable} antialiased`}

>


<body className={inter.className}>


<ThemeProvider

defaultTheme="system"

storageKey="nextjs-ui-theme"

>


<VisitorTracker />


<SidebarConfigProvider>


{children}


<BackToTop />


</SidebarConfigProvider>



<Toaster

position="top-center"

richColors

closeButton

/>


</ThemeProvider>


</body>


</html>

);


}