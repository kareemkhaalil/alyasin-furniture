'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAdmin } from '@/lib/admin-context'

const navLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/offers', label: 'عروض اليوم' },

  { href: '/projects', label: 'المشاريع' },
  { href: '/products', label: 'المنتجات' },
  { href: '/contact', label: 'تواصل معنا' },
]

export function Header() {
  const { siteSettings } = useAdmin()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold text-foreground">{siteSettings.siteName}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop only */}
          <div className="hidden md:block">
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/contact">احجز موعد</Link>
            </Button>
          </div>

          {/* Mobile: Show appointment button */}
          <div className="md:hidden">
            <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/contact">احجز موعد</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
