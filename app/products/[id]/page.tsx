'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageCircle, ChevronLeft, ChevronRight, Ruler, Layers } from 'lucide-react'
import { products } from '@/lib/data'

export default function ProductDetailPage() {
  const params = useParams()
  const product = products.find(p => p.id === params.id)
  const [currentImage, setCurrentImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">المنتج غير موجود</h1>
            <Button asChild>
              <Link href="/products">العودة للمنتجات</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const generateWhatsAppMessage = () => {
    let message = `مرحباً، أود الاستفسار عن:\n\n${product.title}`
    if (selectedSize) message += `\nالمقاس: ${selectedSize}`
    if (selectedMaterial) message += `\nالخامة: ${selectedMaterial}`
    return encodeURIComponent(message)
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
              <Link href="/products" className="text-muted-foreground hover:text-foreground">المنتجات</Link>
              <ArrowRight className="h-4 w-4 text-muted-foreground rotate-180" />
              <span className="text-foreground">{product.title}</span>
            </nav>
          </div>
        </div>

        {/* Product Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                  <img
                    src={product.images[currentImage] || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  {product.images.length > 1 && (
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
                {product.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          currentImage === index ? 'border-accent' : 'border-transparent'
                        }`}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${product.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <span className="text-accent font-medium">{product.category}</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">{product.title}</h1>
                  {product.price && (
                    <p className="text-2xl font-bold text-accent">{product.price}</p>
                  )}
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Sizes */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Ruler className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-foreground">المقاسات المتوفرة</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          selectedSize === size
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-border hover:border-accent/50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Materials */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-foreground">الخامات المتوفرة</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.materials.map((material) => (
                      <button
                        key={material}
                        onClick={() => setSelectedMaterial(selectedMaterial === material ? null : material)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          selectedMaterial === material
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-border hover:border-accent/50'
                        }`}
                      >
                        {material}
                      </button>
                    ))}
                  </div>
                </div>

                {/* WhatsApp Button */}
                <div className="pt-6 border-t border-border">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-lg"
                  >
                    <a
                      href={`https://wa.me/966501234567?text=${generateWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="ml-2 h-6 w-6" />
                      استفسار عبر واتساب
                    </a>
                  </Button>
                  <p className="text-sm text-muted-foreground text-center mt-3">
                    اختر المقاس والخامة ثم اضغط للتواصل مباشرة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">منتجات مشابهة</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products
                .filter(p => p.id !== product.id && p.category === product.category)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={relatedProduct.images[0] || "/placeholder.svg"}
                        alt={relatedProduct.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                        {relatedProduct.title}
                      </h3>
                      {relatedProduct.price && (
                        <p className="text-sm text-muted-foreground mt-1">{relatedProduct.price}</p>
                      )}
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
