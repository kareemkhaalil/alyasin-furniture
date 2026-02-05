'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useAdmin } from '@/lib/admin-context'

export function FeaturedProducts() {
  const { products } = useAdmin()
  const featuredProducts = products.slice(0, 4)

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="text-center md:text-right">
            <p className="text-accent font-medium mb-2">تشكيلة متنوعة</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">منتجاتنا المميزة</h2>
          </div>
          <Button asChild variant="outline" className="group bg-transparent">
            <Link href="/products">
              عرض جميع المنتجات
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-sm text-accent font-medium">{product.category}</span>
                <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                  {product.title}
                </h3>
                {product.price && (
                  <p className="text-muted-foreground text-sm">{product.price}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
