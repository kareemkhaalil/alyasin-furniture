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
import { Plus, Pencil, Trash2, ImageIcon, Link as LinkIcon, Calendar, Percent } from "lucide-react"
import type { Offer } from "@/lib/data"

export default function AdminOffersPage() {
  const searchParams = useSearchParams()
  const { offers, addOffer, updateOffer, deleteOffer } = useAdmin()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null)
  const [imageInput, setImageInput] = useState("")
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    discount: "",
    validUntil: "",
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
      image: "",
      discount: "",
      validUntil: "",
    })
    setEditingOffer(null)
    setImageInput("")
  }

  const handleEdit = (offer: Offer) => {
    setEditingOffer(offer)
    setFormData({
      title: offer.title,
      description: offer.description,
      image: offer.image,
      discount: offer.discount,
      validUntil: offer.validUntil,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا العرض؟")) {
      deleteOffer(id)
    }
  }

  const setImageFromUrl = () => {
    if (imageInput.trim()) {
      let imageUrl = imageInput.trim()
      if (imageUrl.includes('drive.google.com')) {
        const match = imageUrl.match(/\/d\/([a-zA-Z0-9_-]+)/)
        if (match) {
          imageUrl = `https://drive.google.com/uc?export=view&id=${match[1]}`
        }
      }
      setFormData(prev => ({ ...prev, image: imageUrl }))
      setImageInput("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingOffer) {
      updateOffer(editingOffer.id, formData)
    } else {
      const newOffer: Offer = {
        id: Date.now().toString(),
        ...formData,
      }
      addOffer(newOffer)
    }
    
    setIsDialogOpen(false)
    resetForm()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isExpired = (dateString: string) => {
    return new Date(dateString) < new Date()
  }

  return (
    <AdminWrapper title="إدارة العروض" description="إضافة وتعديل وحذف العروض الخاصة">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">{offers.length} عرض</p>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              إضافة عرض
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingOffer ? "تعديل العرض" : "إضافة عرض جديد"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان العرض</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="مثال: عرض غرفة النوم الكاملة"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">وصف العرض</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="أدخل تفاصيل العرض..."
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount">نسبة الخصم</Label>
                  <div className="relative">
                    <Input
                      id="discount"
                      value={formData.discount}
                      onChange={(e) => setFormData(prev => ({ ...prev, discount: e.target.value }))}
                      placeholder="مثال: 25%"
                      required
                    />
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="validUntil">تاريخ الانتهاء</Label>
                  <div className="relative">
                    <Input
                      id="validUntil"
                      type="date"
                      value={formData.validUntil}
                      onChange={(e) => setFormData(prev => ({ ...prev, validUntil: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div className="space-y-3">
                <Label>صورة العرض</Label>
                <div className="flex gap-2">
                  <Input
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                    placeholder="رابط الصورة أو رابط Google Drive"
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" onClick={setImageFromUrl}>
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                </div>
                {formData.image && (
                  <div className="relative aspect-video w-full">
                    <Image
                      src={formData.image || "/placeholder.svg"}
                      alt="صورة العرض"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  {editingOffer ? "حفظ التغييرات" : "إضافة العرض"}
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

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => {
          const expired = isExpired(offer.validUntil)
          return (
            <Card key={offer.id} className={`overflow-hidden ${expired ? 'opacity-60' : ''}`}>
              <div className="relative aspect-video">
                <Image
                  src={offer.image || "/placeholder.svg"}
                  alt={offer.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-2 right-2 bg-accent text-accent-foreground text-sm font-bold px-3 py-1 rounded-full">
                  خصم {offer.discount}
                </span>
                {expired && (
                  <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
                    منتهي
                  </span>
                )}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{offer.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {offer.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>ينتهي: {formatDate(offer.validUntil)}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => handleEdit(offer)}
                  >
                    <Pencil className="w-4 h-4 ml-1" />
                    تعديل
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(offer.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {offers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">لا توجد عروض حتى الآن</p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 ml-2" />
            إضافة أول عرض
          </Button>
        </div>
      )}
    </AdminWrapper>
  )
}
