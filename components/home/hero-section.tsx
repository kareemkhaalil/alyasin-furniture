import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center bg-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-right">
            <div className="space-y-4">
              <p className="text-accent font-medium tracking-wide">معرض الأثاث العربي الفاخر</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                التنظيم الأمثل يلتقي
                <br />
                <span className="text-accent">بالتصميم الراقي</span>
              </h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              حوّل منزلك إلى تحفة فنية مع تصاميمنا المخصصة التي تجمع بين الأصالة العربية والأناقة العصرية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8">
                <Link href="/products">
                  تصفح المنتجات
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Link href="/projects">
                  المشاريع المنجزة
                </Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop"
                alt="أثاث فاخر"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary rounded-full blur-xl" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: 'المشاريع', href: '/projects', count: '50+' },
            { label: 'المنتجات', href: '/products', count: '200+' },
            { label: 'العملاء', href: '/projects', count: '1000+' },
            { label: 'سنوات الخبرة', href: '/contact', count: '15+' },
          ].map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="group bg-card hover:bg-secondary transition-colors p-4 md:p-6 rounded-xl text-center active:scale-95"
            >
              <p className="text-2xl md:text-3xl font-bold text-accent">{stat.count}</p>
              <p className="text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors">{stat.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
