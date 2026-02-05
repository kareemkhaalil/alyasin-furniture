'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone, MessageCircle } from 'lucide-react'
import { useAdmin } from '@/lib/admin-context'

export function CTASection() {
  const { siteSettings } = useAdmin()
  
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-balance">
              هل أنت مستعد لتحويل منزلك؟
            </h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              تواصل معنا اليوم واحصل على استشارة مجانية من خبرائنا في التصميم الداخلي
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8">
              <Link href="/contact">
                <Phone className="ml-2 h-5 w-5" />
                احجز موعد زيارة
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 bg-transparent"
            >
              <a
                href={`https://wa.me/${siteSettings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="ml-2 h-5 w-5" />
                تواصل عبر واتساب
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
