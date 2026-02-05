'use client'

import React from "react"

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react'
import { useAdmin } from '@/lib/admin-context'

export default function ContactPage() {
  const { siteSettings } = useAdmin()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Generate WhatsApp message with form data
    const message = `مرحباً، أنا ${formData.name}
رقم الجوال: ${formData.phone}
${formData.email ? `البريد الإلكتروني: ${formData.email}` : ''}

الرسالة:
${formData.message}`
    
    window.open(`https://wa.me/${siteSettings.whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary/50 py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-accent font-medium mb-2">نحن هنا لمساعدتك</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">تواصل معنا</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نسعد بتواصلكم معنا للاستفسار أو حجز موعد زيارة للمعرض
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-card rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-foreground mb-6">أرسل رسالتك</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="أدخل اسمك الكامل"
                      className="text-right"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الجوال *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="05xxxxxxxx"
                      className="text-right"
                      dir="ltr"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني (اختياري)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@email.com"
                      className="text-right"
                      dir="ltr"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">الرسالة *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="اكتب رسالتك هنا..."
                      className="text-right resize-none"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Send className="ml-2 h-5 w-5" />
                    إرسال عبر واتساب
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">معلومات التواصل</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="bg-accent/10 p-3 rounded-xl">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">الهاتف</h3>
                        <p className="text-muted-foreground">{siteSettings.phone}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="bg-accent/10 p-3 rounded-xl">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">البريد الإلكتروني</h3>
                        <p className="text-muted-foreground">{siteSettings.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="bg-accent/10 p-3 rounded-xl">
                        <MapPin className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">العنوان</h3>
                        <p className="text-muted-foreground">{siteSettings.address}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="bg-accent/10 p-3 rounded-xl">
                        <Clock className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">ساعات العمل</h3>
                        <p className="text-muted-foreground">السبت - الخميس: {siteSettings.workingHours.weekdays}</p>
                        <p className="text-muted-foreground">الجمعة: {siteSettings.workingHours.weekends}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick WhatsApp */}
                <div className="bg-green-50 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-green-600 p-3 rounded-xl">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">تواصل سريع</h3>
                      <p className="text-muted-foreground text-sm">رد فوري على استفساراتك</p>
                    </div>
                  </div>
                  <Button asChild size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <a href={`https://wa.me/${siteSettings.whatsapp}`} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="ml-2 h-5 w-5" />
                      تواصل عبر واتساب
                    </a>
                  </Button>
                </div>

                {/* Map Placeholder */}
                <div className="bg-muted rounded-2xl aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">خريطة الموقع</p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline text-sm"
                    >
                      افتح في خرائط جوجل
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
