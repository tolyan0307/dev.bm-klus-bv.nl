import Link from "next/link"
import { ArrowRight, Home, Phone, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20">
      <div className="container-default">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-8xl font-black tracking-tighter text-primary/20 select-none sm:text-9xl">
            404
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Pagina niet gevonden
          </h1>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            De pagina die u zoekt bestaat niet of is verplaatst.
            Controleer het adres of ga terug naar de homepage.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Naar homepage
            </Link>
            <Link
              href="/diensten/"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Bekijk onze diensten
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4 text-primary" />
            <span>
              Hulp nodig?{" "}
              <a
                href="tel:+31612079808"
                className="font-semibold text-foreground hover:text-primary transition-colors"
              >
                Bel ons: +31 6 12 07 98 08
              </a>
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            {[
              { label: "Gevelisolatie", href: "/gevelisolatie/" },
              { label: "Buiten stucwerk", href: "/buiten-stucwerk/" },
              { label: "Gevel schilderen", href: "/gevel-schilderen/" },
              { label: "Contact", href: "/contact/" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-1 font-medium text-foreground/60 hover:text-primary transition-colors"
              >
                {label}
                <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
