"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { useAdmin } from "@/lib/admin-context"
import { AdminWrapper } from "@/components/admin/admin-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, X, ImageIcon, Link as LinkIcon } from "lucide-react"
import type { Product } from "@/lib/data"
import { productCategories } from "@/lib/data"

export default function AdminProductsPage() {
  const searchParams = useSearchParams()
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newImageUrl, setNewImageUrl] = useState("")
  const [driveLink, setDriveLink] = useState("")
  const [newSize, setNewSize] = useState("")
  const [newMaterial, setNewMaterial] = useState("")
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [] as string[],
    sizes: [] as string[],
    materials: [] as string[],
    category: "",
    price: "",
  })

  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      setIsDialogOpen(true)
    }
  }, [searchParams])

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      images: [],
      sizes: [],
      materials: [],
      category: "",
      price: "",
    })
    setEditingProduct(null)
    setNewImageUrl("")
    setDriveLink("")
    setNewSize("")
    setNewMaterial("")
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      title: product.title,
      description: product.description,
      images: product.images,
      sizes: product.sizes,
      materials: product.materials,
      category: product.category,
      price: product.price || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      deleteProduct(id)
    }
  }

  const addImageUrl = () => {
    if (newImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()]
      }))
      setNewImageUrl("")
    }
  }

  const addDriveLink = () => {
    if (driveLink.trim()) {
      let imageUrl = driveLink.trim()
      if (imageUrl.includes('drive.google.com')) {
        const match = imageUrl.match(/\/d\/([a-zA-Z0-9_-]+)/)
        if (match) {
          imageUrl = `https://drive.google.com/uc?export=view&id=${match[1]}`
        }
      }
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl]
      }))
      setDriveLink("")
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const addSize = () => {
    if (newSize.trim()) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, newSize.trim()]
      }))
      setNewSize("")
    }
  }

  const removeSize = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }))
  }

  const addMaterial = () => {
    if (newMaterial.trim()) {
      setFormData(prev => ({
        ...prev,
        materials: [...prev.materials, newMaterial.trim()]
      }))
      setNewMaterial("")
    }
  }

  const removeMaterial = (index: number) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingProduct) {
      updateProduct(editingProduct.id, formData)
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...formData,
      }
      addProduct(newProduct)
    }
    
    setIsDialogOpen(false)
    resetForm()
  }

  const prodCategories = productCategories.filter(c => c !== 'الكل')

  return (
    <AdminWrapper title="إدارة المنتجات" description="إضافة وتعديل وحذف المنتجات">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">{products.length} منتج</p>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              إضافة منتج
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">اسم المنتج</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="مثال: كنبة كلاسيكية"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">وصف المنتج</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="أدخل وصف تفصيلي للمنتج..."
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>التصنيف</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر التصنيف" />
                    </SelectTrigger>
                    <SelectContent>
                      {prodCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">السعر</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="مثال: يبدأ من 4,500 ر.س"
                  />
                </div>
              </div>

              {/* Images Section */}
              <div className="space-y-3">
                <Label>الصور</Label>
                <div className="flex gap-2">
                  <Input
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="رابط الصورة (URL)"
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" onClick={addImageUrl}>
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={driveLink}
                    onChange={(e) => setDriveLink(e.target.value)}
                    placeholder="رابط Google Drive للصورة"
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" onClick={addDriveLink}>
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                </div>
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative group aspect-square">
                        <Image
                          src={img || "/placeholder.svg"}
                          alt={`صورة ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sizes Section */}
              <div className="space-y-3">
                <Label>المقاسات</Label>
                <div className="flex gap-2">
                  <Input
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    placeholder="مثال: 3 مقاعد - 220 سم"
                    className="flex-1"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())}
                  />
                  <Button type="button" variant="outline" onClick={addSize}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.sizes.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.sizes.map((size, index) => (
                      <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm">
                        {size}
                        <button type="button" onClick={() => removeSize(index)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Materials Section */}
              <div className="space-y-3">
                <Label>الخامات</Label>
                <div className="flex gap-2">
                  <Input
                    value={newMaterial}
                    onChange={(e) => setNewMaterial(e.target.value)}
                    placeholder="مثال: قماش مخمل"
                    className="flex-1"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addMaterial())}
                  />
                  <Button type="button" variant="outline" onClick={addMaterial}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.materials.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.materials.map((material, index) => (
                      <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm">
                        {material}
                        <button type="button" onClick={() => removeMaterial(index)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  {editingProduct ? "حفظ التغييرات" : "إضافة المنتج"}
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                  setIsDialogOpen(false)
                  resetForm()
                }}>
                  إلغاء
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{product.title}</CardTitle>
              <p className="text-xs text-muted-foreground">{product.category}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-accent font-medium mb-2">{product.price}</p>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {product.description}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => handleEdit(product)}
                >
                  <Pencil className="w-4 h-4 ml-1" />
                  تعديل
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">لا توجد منتجات حتى الآن</p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 ml-2" />
            إضافة أول منتج
          </Button>
        </div>
      )}
    </AdminWrapper>
  )
}
