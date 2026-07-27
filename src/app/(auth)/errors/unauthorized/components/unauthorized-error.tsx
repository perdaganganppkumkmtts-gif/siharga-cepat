"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ShieldX,
  LogIn,
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DotPattern } from "@/components/dot-pattern";

export function UnauthorizedError() {
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
        from-blue-500/10
        via-background
        to-indigo-500/10
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
              border-blue-500/30
              text-blue-600
              dark:text-blue-400
            "
          >
            <ShieldX className="mr-2 h-4 w-4" />
            Error 401
          </Badge>

          <h1 className="text-7xl font-extrabold tracking-tight sm:text-8xl">
            401
          </h1>

          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Autentikasi Diperlukan
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Anda harus masuk terlebih dahulu untuk mengakses halaman ini.
            Sesi Anda mungkin telah berakhir atau Anda belum melakukan login.
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
              <Link href="/sign-in">
                <LogIn className="mr-2 h-4 w-4" />
                Masuk
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}