'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { projects, categories } from '@/lib/data'

const statusConfig = {
  available: { label: 'متوفر', className: 'bg-green-100 text-green-800' },
  reserved: { label: 'محجوز', className: 'bg-yellow-100 text-yellow-800' },
  sold: { label: 'تم البيع', className: 'bg-red-100 text-red-800' },
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('الكل')

  const filteredProjects = activeCategory === 'الكل'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary/50 py-10 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-accent font-medium mb-2">معرض أعمالنا</p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">المشاريع المنجزة</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              استعرض مجموعة من أفضل مشاريعنا التي نفذناها لعملائنا الكرام
            </p>
          </div>
        </section>

        {/* Filter */}
        <section className="py-4 md:py-8 border-b border-border sticky top-16 md:top-20 z-40 bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 md:flex-wrap md:justify-center scrollbar-hide">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'default' : 'outline'}
                  onClick={() => setActiveCategory(category)}
                  size="sm"
                  className={`whitespace-nowrap flex-shrink-0 ${activeCategory === category ? 'bg-accent text-accent-foreground' : ''}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-8 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.images[0] || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className={statusConfig[project.status].className}>
                        {statusConfig[project.status].label}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="text-sm text-accent font-medium">{project.category}</span>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">{project.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">لا توجد مشاريع في هذا التصنيف</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
