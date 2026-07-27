import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autentikasi | SIHARGA CEPAT",
  description:
    "Masuk ke sistem SIHARGA CEPAT untuk mengelola data harga barang kebutuhan pokok Kabupaten Timor Tengah Selatan.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}