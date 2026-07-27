import Link from "next/link";
import { SearchX, ArrowLeft, BarChart3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DotPattern } from "@/components/dot-pattern";

export default function NotFound() {
  return (
    <main
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-gradient-to-br
        from-green-500/10
        via-background
        to-red-500/10
      "
    >
      <DotPattern
        className="absolute inset-0 opacity-40"
        size="md"
        fadeStyle="ellipse"
      />

      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="outline"
            className="
              mb-6
              border-red-500/30
              text-red-600
              dark:text-red-400
            "
          >
            <SearchX className="mr-2 h-4 w-4" />
            Error 404
          </Badge>

          <h1
            className="
              text-7xl
              font-extrabold
              tracking-tight
              sm:text-8xl
            "
          >
            404
          </h1>

          <h2
            className="
              mt-6
              text-3xl
              font-bold
              tracking-tight
              sm:text-4xl
            "
          >
            Halaman Tidak Ditemukan
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              text-lg
              leading-relaxed
              text-muted-foreground
            "
          >
            Maaf, halaman yang Anda cari tidak tersedia atau mungkin telah
            dipindahkan. Silakan kembali ke halaman utama atau lanjutkan melihat
            informasi harga barang kebutuhan pokok Kabupaten Timor Tengah
            Selatan.
          </p>

          <div
            className="
              mt-10
              flex
              flex-col
              justify-center
              gap-4
              sm:flex-row
            "
          >
            <Button asChild size="lg">
              <Link href="/beranda">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Beranda
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="/harga">
                <BarChart3 className="mr-2 h-4 w-4" />
                Informasi Harga
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}