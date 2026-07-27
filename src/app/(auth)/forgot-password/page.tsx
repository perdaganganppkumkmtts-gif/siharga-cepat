import Link from "next/link";
import Image from "next/image"

import { ForgotPasswordForm1 } from "./components/forgot-password-form-1";

export default function ForgotPasswordPage() {
  return (
    <div
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
        px-6
        py-10
      "
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link
          href="/beranda"
          className="mb-8 flex flex-col items-center justify-center"
        >
          <div
            className="
            flex
            aspect-square
            size-9
            items-center
            justify-center
            "
          >
            <Image
              src="/siharga-light.svg"
              alt="Logo SIHARGA CEPAT"
              width={36}
              height={36}
              priority
              className="h-9 w-9 object-contain"
            />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            SIHARGA CEPAT
          </h1>

          <p className="mt-1 text-center text-sm text-muted-foreground">
            Sistem Informasi Harga Barang Kebutuhan Pokok
          </p>
        </Link>

        {/* Form */}
        <ForgotPasswordForm1 />
      </div>
    </div>
  );
}