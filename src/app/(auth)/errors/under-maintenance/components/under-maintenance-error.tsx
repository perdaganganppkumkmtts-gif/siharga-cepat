"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Wrench,
  RotateCcw,
  Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DotPattern } from "@/components/dot-pattern";

export function UnderMaintenanceError() {
  const router = useRouter();

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
        from-amber-500/10
        via-background
        to-yellow-500/10
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
              border-amber-500/30
              text-amber-700
              dark:text-amber-400
            "
          >
            <Wrench className="mr-2 h-4 w-4" />
            Error 503
          </Badge>

          <h1 className="text-7xl font-extrabold tracking-tight sm:text-8xl">
            503
          </h1>

          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Sistem Sedang Dalam Pemeliharaan
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Layanan SIHARGA CEPAT untuk sementara tidak dapat diakses karena
            sedang dilakukan pemeliharaan sistem. Silakan coba kembali beberapa
            saat lagi. Terima kasih atas pengertian Anda.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={() => router.refresh()}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Muat Ulang
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
            >
              <Link href="/beranda">
                <Home className="mr-2 h-4 w-4" />
                Halaman Utama
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}