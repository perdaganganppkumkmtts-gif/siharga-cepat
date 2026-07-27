import { TrendingUp } from "lucide-react"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="px-4 py-6 lg:px-6">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <TrendingUp className="h-4 w-4 fill-red-500 text-red-500" />
            <span>by</span>
            <Link
              href="https://www.instagram.com/roysadukh?igsh=MXVtbmxkNDBpMjl0ZA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Yoob Benry Sadukh, S.T.
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            Dinas Perdagangan Perindustrian Koperasi & Usaha Mikro Kecil Menengah Kab Timor Tengah Selatan
          </p>
          <p className="text-xs text-muted-foreground">
            Bidang Bina Usaha Perdagangan
          </p>
        </div>
      </div>
    </footer>
  )
}
