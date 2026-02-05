'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, Calendar, Tag } from 'lucide-react'
import { useAdmin } from '@/lib/admin-context'

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function OffersPage() {
  const { offers, siteSettings } = useAdmin()
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary/50 py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-accent font-medium mb-2">عروض حصرية</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">العروض والتخفيضات</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              استفد من عروضنا المميزة على أفخم تشكيلات الأثاث
            </p>
          </div>
        </section>

        {/* Offers Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={offer.image || "/placeholder.svg"}
                      alt={offer.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Discount Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-accent text-accent-foreground text-lg px-4 py-1">
                        خصم {offer.discount}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold text-foreground">{offer.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{offer.description}</p>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 text-accent" />
                      <span>ينتهي في: {formatDate(offer.validUntil)}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 flex-1">
                        <a
                          href={`https://wa.me/${siteSettings.whatsapp}?text=${encodeURIComponent(`مرحباً، أود الاستفسار عن عرض: ${offer.title}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="ml-2 h-5 w-5" />
                          استفسار عن العرض
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="flex-1 bg-transparent">
                        <Link href="/contact">تواصل معنا</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <Tag className="h-12 w-12 mx-auto text-accent" />
              <h2 className="text-3xl font-bold">لا تفوت عروضنا القادمة</h2>
              <p className="text-primary-foreground/80">
                تابعنا على وسائل التواصل الاجتماعي أو تواصل معنا مباشرة لتصلك آخر العروض والتخفيضات
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <a href={`https://wa.me/${siteSettings.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="ml-2 h-5 w-5" />
                    تواصل عبر واتساب
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                  <Link href="/contact">زيارة المعرض</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
