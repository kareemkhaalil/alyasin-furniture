"use client"

import { useState, useEffect } from "react"
import { useAdmin } from "@/lib/admin-context"
import { AdminWrapper } from "@/components/admin/admin-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Building2, Phone, Clock, Palette } from "lucide-react"

export default function AdminSettingsPage() {
  const { siteSettings, updateSiteSettings } = useAdmin()
  const [formData, setFormData] = useState(siteSettings)
  const [saved, setSaved] = useState(false)

  // Sync formData when siteSettings changes (e.g., loaded from localStorage)
  useEffect(() => {
    setFormData(siteSettings)
  }, [siteSettings])

  const handleSave = () => {
    updateSiteSettings(formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const colorPresets = [
    { name: "نحاسي", primary: "#2d2a26", accent: "#b87333" },
    { name: "ذهبي", primary: "#1a1a1a", accent: "#d4af37" },
    { name: "أخضر زيتي", primary: "#2c3e2d", accent: "#556b2f" },
    { name: "أزرق ملكي", primary: "#1e3a5f", accent: "#4a90a4" },
    { name: "بني كلاسيكي", primary: "#3d2b1f", accent: "#8b4513" },
  ]

  return (
    <AdminWrapper title="إعدادات الموقع" description="تخصيص معلومات وألوان الموقع">
      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="info">المعلومات</TabsTrigger>
          <TabsTrigger value="contact">التواصل</TabsTrigger>
          <TabsTrigger value="colors">الألوان</TabsTrigger>
        </TabsList>

        {/* Site Information */}
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                معلومات الموقع
              </CardTitle>
              <CardDescription>
                المعلومات الأساسية التي تظهر في الموقع
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">اسم الموقع</Label>
                <Input
                  id="siteName"
                  value={formData.siteName}
                  onChange={(e) => setFormData(prev => ({ ...prev, siteName: e.target.value }))}
                  placeholder="دار الأثاث"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">وصف الموقع</Label>
                <Textarea
                  id="siteDescription"
                  value={formData.siteDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, siteDescription: e.target.value }))}
                  placeholder="معرض متخصص في الأثاث العربي الفاخر..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">العنوان</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="الرياض، المملكة العربية السعودية"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Information */}
        <TabsContent value="contact">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  معلومات التواصل
                </CardTitle>
                <CardDescription>
                  أرقام الهاتف والبريد الإلكتروني
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+966 50 123 4567"
                    dir="ltr"
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">رقم الواتساب (بدون علامة +)</Label>
                  <Input
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                    placeholder="966501234567"
                    dir="ltr"
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="info@example.com"
                    dir="ltr"
                    className="text-right"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  أوقات العمل
                </CardTitle>
                <CardDescription>
                  ساعات العمل خلال الأسبوع
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="weekdays">أيام الأسبوع (السبت - الخميس)</Label>
                  <Input
                    id="weekdays"
                    value={formData.workingHours.weekdays}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      workingHours: { ...prev.workingHours, weekdays: e.target.value }
                    }))}
                    placeholder="9:00 صباحاً - 10:00 مساءً"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weekends">الجمعة</Label>
                  <Input
                    id="weekends"
                    value={formData.workingHours.weekends}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      workingHours: { ...prev.workingHours, weekends: e.target.value }
                    }))}
                    placeholder="4:00 مساءً - 11:00 مساءً"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Colors */}
        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                ألوان الموقع
              </CardTitle>
              <CardDescription>
                اختر نظام الألوان المناسب لموقعك
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Color Presets */}
              <div className="space-y-3">
                <Label>أنظمة ألوان جاهزة</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        primaryColor: preset.primary,
                        accentColor: preset.accent
                      }))}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.primaryColor === preset.primary && formData.accentColor === preset.accent
                          ? 'border-accent ring-2 ring-accent/20'
                          : 'border-border hover:border-muted-foreground'
                      }`}
                    >
                      <div className="flex gap-2 mb-2">
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: preset.accent }}
                        />
                      </div>
                      <p className="text-xs font-medium">{preset.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Colors */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">اللون الأساسي</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={formData.primaryColor}
                      onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
                      placeholder="#2d2a26"
                      dir="ltr"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accentColor">اللون المميز</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accentColor"
                      type="color"
                      value={formData.accentColor}
                      onChange={(e) => setFormData(prev => ({ ...prev, accentColor: e.target.value }))}
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={formData.accentColor}
                      onChange={(e) => setFormData(prev => ({ ...prev, accentColor: e.target.value }))}
                      placeholder="#b87333"
                      dir="ltr"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="space-y-3">
                <Label>معاينة</Label>
                <div className="p-6 rounded-lg border" style={{ backgroundColor: formData.primaryColor }}>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#fff' }}>
                    {formData.siteName}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {formData.siteDescription}
                  </p>
                  <button
                    className="px-4 py-2 rounded-lg text-sm font-medium"
                    style={{ backgroundColor: formData.accentColor, color: '#fff' }}
                  >
                    زر نموذجي
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <Button onClick={handleSave} className="min-w-[150px]">
          <Save className="w-4 h-4 ml-2" />
          {saved ? "تم الحفظ!" : "حفظ التغييرات"}
        </Button>
      </div>
    </AdminWrapper>
  )
}
