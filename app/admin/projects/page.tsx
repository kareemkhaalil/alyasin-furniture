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
import { Plus, Pencil, Trash2, X, ImageIcon, Link as LinkIcon, Video } from "lucide-react"
import type { Project } from "@/lib/data"
import { categories } from "@/lib/data"

const statusOptions = [
  { value: 'available', label: 'متاح', color: 'bg-green-100 text-green-700' },
  { value: 'reserved', label: 'محجوز', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'sold', label: 'مباع', color: 'bg-red-100 text-red-700' },
]

export default function AdminProjectsPage() {
  const searchParams = useSearchParams()
  const { projects, addProject, updateProject, deleteProject } = useAdmin()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [newImageUrl, setNewImageUrl] = useState("")
  const [driveLink, setDriveLink] = useState("")
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [] as string[],
    videoLinks: [] as string[],
    status: "available" as Project["status"],
    category: "",
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
      videoLinks: [],
      status: "available",
      category: "",
    })
    setEditingProject(null)
    setNewImageUrl("")
    setDriveLink("")
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      images: project.images,
      videoLinks: (project as any).videoLinks || [],
      status: project.status,
      category: project.category,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المشروع؟")) {
      deleteProject(id)
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
      // Convert Google Drive link to direct image URL if needed
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

  const addVideoLink = () => {
    const link = prompt("أدخل رابط الفيديو (YouTube أو Google Drive)")
    if (link) {
      setFormData(prev => ({
        ...prev,
        videoLinks: [...prev.videoLinks, link]
      }))
    }
  }

  const removeVideoLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videoLinks: prev.videoLinks.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingProject) {
      updateProject(editingProject.id, formData)
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        ...formData,
      }
      addProject(newProject)
    }
    
    setIsDialogOpen(false)
    resetForm()
  }

  const projectCategories = categories.filter(c => c !== 'الكل')

  return (
    <AdminWrapper title="إدارة المشاريع" description="إضافة وتعديل وحذف المشاريع">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">{projects.length} مشروع</p>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              إضافة مشروع
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "تعديل المشروع" : "إضافة مشروع جديد"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان المشروع</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="مثال: مجلس عربي فاخر"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">وصف المشروع</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="أدخل وصف تفصيلي للمشروع..."
                  rows={4}
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
                      {projectCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>الحالة</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: Project["status"]) => setFormData(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Images Section */}
              <div className="space-y-3">
                <Label>الصور</Label>
                
                {/* Add Image URL */}
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

                {/* Add Google Drive Link */}
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

                {/* Images Preview */}
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

              {/* Video Links Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>روابط الفيديو</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={addVideoLink}>
                    <Video className="w-4 h-4 ml-1" />
                    إضافة فيديو
                  </Button>
                </div>
                {formData.videoLinks.length > 0 && (
                  <div className="space-y-2">
                    {formData.videoLinks.map((link, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                        <Video className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm flex-1 truncate">{link}</span>
                        <button
                          type="button"
                          onClick={() => removeVideoLink(index)}
                          className="p-1 hover:bg-destructive/10 rounded"
                        >
                          <X className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  {editingProject ? "حفظ التغييرات" : "إضافة المشروع"}
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const statusInfo = statusOptions.find(s => s.value === project.status)
          return (
            <Card key={project.id} className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={project.images[0] || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${statusInfo?.color}`}>
                  {statusInfo?.label}
                </span>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{project.category}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {project.description}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => handleEdit(project)}
                  >
                    <Pencil className="w-4 h-4 ml-1" />
                    تعديل
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">لا توجد مشاريع حتى الآن</p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 ml-2" />
            إضافة أول مشروع
          </Button>
        </div>
      )}
    </AdminWrapper>
  )
}
