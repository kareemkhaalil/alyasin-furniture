import React from "react"
import type { Metadata, Viewport } from 'next'
import { Cairo } from 'next/font/google'
import { MobileNav } from '@/components/mobile-nav'
import { PWARegister } from '@/components/pwa-register'
import { AdminProvider } from '@/lib/admin-context'
import { ChatWidget } from '@/components/chat-widget'

import './globals.css'

const cairo = Cairo({ 
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cairo'
})

export const metadata: Metadata = {
  title: 'دار الأثاث | معرض الأثاث العربي',
  description: 'معرض متخصص في الأثاث العربي الفاخر والتصاميم العصرية',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'دار الأثاث',
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#f7f5f2',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} antialiased`}>
        <AdminProvider>
          {children}
          <MobileNav />
          <ChatWidget />
          <PWARegister />
        </AdminProvider>
      </body>
    </html>
  )
}
