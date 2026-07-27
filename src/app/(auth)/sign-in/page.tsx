import { LoginForm1 } from "./components/login-form-1"
import Image from "next/image"
import Link from "next/link"

export default function Page() {
  
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
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
          Siharga Cepat
        </Link>
        <LoginForm1 />
      </div>
    </div>
  )
}
