"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm1({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <Card className="border-border/60 bg-card/80 shadow-xl backdrop-blur">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">
            Lupa Kata Sandi
          </CardTitle>

          <CardDescription className="leading-relaxed">
            Masukkan alamat email yang terdaftar pada akun Anda.
            Kami akan mengirimkan tautan untuk mengatur ulang kata sandi.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">
                  Alamat Email
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  autoComplete="email"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full cursor-pointer"
              >
                Kirim Tautan Reset Kata Sandi
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Sudah ingat kata sandi?{" "}

                <Link
                  href="/sign-in"
                  className="
                    font-medium
                    text-primary
                    hover:underline
                    underline-offset-4
                  "
                >
                  Kembali ke Halaman Masuk
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}