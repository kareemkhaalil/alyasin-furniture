import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
import { projects } from '@/lib/data'

const statusConfig = {
  available: { label: 'متوفر', className: 'bg-green-100 text-green-800' },
  reserved: { label: 'محجوز', className: 'bg-yellow-100 text-yellow-800' },
  sold: { label: 'تم البيع', className: 'bg-red-100 text-red-800' },
}

export function FeaturedProjects() {
  const featuredProjects = projects.slice(0, 3)

  return (
    <section className="py-12 md:py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="text-center md:text-right">
            <p className="text-accent font-medium mb-2">أعمالنا المميزة</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">المشاريع المنجزة</h2>
          </div>
          <Button asChild variant="outline" className="group bg-transparent">
            <Link href="/projects">
              عرض جميع المشاريع
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {featuredProjects.map((project) => (
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
      </div>
    </section>
  )
}
