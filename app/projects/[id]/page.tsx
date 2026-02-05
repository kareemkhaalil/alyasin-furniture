'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { projects } from '@/lib/data'

const statusConfig = {
  available: { label: 'متوفر', className: 'bg-green-100 text-green-800' },
  reserved: { label: 'محجوز', className: 'bg-yellow-100 text-yellow-800' },
  sold: { label: 'تم البيع', className: 'bg-red-100 text-red-800' },
}

export default function ProjectDetailPage() {
  const params = useParams()
  const project = projects.find(p => p.id === params.id)
  const [currentImage, setCurrentImage] = useState(0)

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">المشروع غير موجود</h1>
            <Button asChild>
              <Link href="/projects">العودة للمشاريع</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-secondary/50 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground">الرئيسية</Link>
              <ArrowRight className="h-4 w-4 text-muted-foreground rotate-180" />
              <Link href="/projects" className="text-muted-foreground hover:text-foreground">المشاريع</Link>
              <ArrowRight className="h-4 w-4 text-muted-foreground rotate-180" />
              <span className="text-foreground">{project.title}</span>
            </nav>
          </div>
        </div>

        {/* Project Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                  <img
                    src={project.images[currentImage] || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full shadow-lg transition-colors"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full shadow-lg transition-colors"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                    </>
                  )}
                </div>
                {/* Thumbnails */}
                {project.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          currentImage === index ? 'border-accent' : 'border-transparent'
                        }`}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${project.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className={statusConfig[project.status].className}>
                      {statusConfig[project.status].label}
                    </Badge>
                    <span className="text-accent font-medium">{project.category}</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">{project.title}</h1>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="border-t border-border pt-6 space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">تفاصيل المشروع</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/50 p-4 rounded-xl">
                      <p className="text-sm text-muted-foreground">التصنيف</p>
                      <p className="font-semibold text-foreground">{project.category}</p>
                    </div>
                    <div className="bg-secondary/50 p-4 rounded-xl">
                      <p className="text-sm text-muted-foreground">الحالة</p>
                      <p className="font-semibold text-foreground">{statusConfig[project.status].label}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <a href="https://wa.me/966501234567" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="ml-2 h-5 w-5" />
                      استفسار عبر واتساب
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/contact">تواصل معنا</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">مشاريع مشابهة</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {projects
                .filter(p => p.id !== project.id && p.category === project.category)
                .slice(0, 3)
                .map((relatedProject) => (
                  <Link
                    key={relatedProject.id}
                    href={`/projects/${relatedProject.id}`}
                    className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedProject.images[0] || "/placeholder.svg"}
                        alt={relatedProject.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                        {relatedProject.title}
                      </h3>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
