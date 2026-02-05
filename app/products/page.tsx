'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { products, productCategories } from '@/lib/data'

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('الكل')

  const filteredProducts = activeCategory === 'الكل'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary/50 py-10 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-accent font-medium mb-2">تشكيلة واسعة</p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">منتجاتنا</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              اكتشف مجموعتنا المتنوعة من الأثاث الفاخر بتصاميم عصرية وكلاسيكية
            </p>
          </div>
        </section>

        {/* Filter */}
        <section className="py-4 md:py-8 border-b border-border sticky top-16 md:top-20 z-40 bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 md:flex-wrap md:justify-center scrollbar-hide">
              {productCategories.map((category) => (
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

        {/* Products Grid */}
        <section className="py-8 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {filteredProducts.map((product) => (
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
                  <div className="p-3 md:p-5 space-y-1 md:space-y-2">
                    <span className="text-xs md:text-sm text-accent font-medium">{product.category}</span>
                    <h3 className="text-sm md:text-lg font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground text-xs md:text-sm line-clamp-2 hidden md:block">{product.description}</p>
                    {product.price && (
                      <p className="text-foreground font-semibold pt-1 md:pt-2 text-sm md:text-base">{product.price}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">لا توجد منتجات في هذا التصنيف</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
