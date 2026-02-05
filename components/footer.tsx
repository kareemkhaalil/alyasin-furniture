'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useAdmin } from '@/lib/admin-context'

export function Footer() {
  const { siteSettings } = useAdmin()
  
  return (
    <footer className="bg-primary text-primary-foreground mb-mobile-nav">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{siteSettings.siteName}</h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              {siteSettings.siteDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">روابط سريعة</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                الرئيسية
              </Link>
              <Link href="/projects" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                المشاريع
              </Link>
              <Link href="/products" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                المنتجات
              </Link>
              <Link href="/offers" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                العروض
              </Link>
              <Link href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                تواصل معنا
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">معلومات التواصل</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground/80">{siteSettings.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground/80">{siteSettings.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground/80">{siteSettings.address}</span>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">ساعات العمل</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-primary-foreground/80">السبت - الخميس</p>
                  <p className="text-primary-foreground/80">{siteSettings.workingHours.weekdays}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-primary-foreground/80">الجمعة</p>
                  <p className="text-primary-foreground/80">{siteSettings.workingHours.weekends}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/60">
            جميع الحقوق محفوظة © {new Date().getFullYear()} {siteSettings.siteName}
          </p>
        </div>
      </div>
    </footer>
  )
}
