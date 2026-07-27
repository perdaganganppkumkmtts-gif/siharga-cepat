import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { SidebarConfigProvider } from "@/contexts/sidebar-context";
import { inter } from "@/lib/fonts";
import VisitorTracker from "@/components/visitor-tracker"
import BackToTop from "@/components/back-to-top"

import { Toaster } from "sonner";

export const metadata: Metadata = {
title:
"SIHARGA CEPAT | Informasi Harga Bapok Kabupaten Timor Tengah Selatan",


description:
"Sistem Informasi Harga Barang Kebutuhan Pokok Kabupaten Timor Tengah Selatan untuk menyediakan informasi harga yang cepat, akurat, transparan dan mudah diakses masyarakat.",


keywords:[

"harga bapok TTS",

"harga sembako Timor Tengah Selatan",

"informasi harga pasar",

"SIHARGA CEPAT"

],



openGraph:{


title:
"SIHARGA CEPAT | Informasi Harga Bapok TTS",



description:
"Pantau perkembangan harga barang kebutuhan pokok Kabupaten Timor Tengah Selatan.",



type:"website",



locale:"id_ID",


},



};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system" storageKey="nextjs-ui-theme">
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
