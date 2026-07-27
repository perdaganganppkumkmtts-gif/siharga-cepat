"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  SearchX,
  ArrowLeft,
  Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DotPattern } from "@/components/dot-pattern";

export function NotFoundError() {
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

          <h1 className="text-7xl font-extrabold tracking-tight sm:text-8xl">
            404
          </h1>

          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Halaman Tidak Ditemukan
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Halaman yang Anda cari tidak tersedia atau mungkin telah
            dipindahkan. Silakan kembali ke halaman sebelumnya atau kembali ke
            Dashboard SIHARGA CEPAT.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
            >
              <Link href="/dashboard">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}