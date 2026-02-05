"use client"

import React, { useEffect } from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAdmin } from "@/lib/admin-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Eye, EyeOff } from "lucide-react"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const { login, isAuthenticated, isLoading } = useAdmin()
  const router = useRouter()

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/admin/dashboard")
    }
  }, [isAuthenticated, isLoading, router])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">جاري التحميل...</div>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">جاري التحويل...</div>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (login(password)) {
      router.push("/admin/dashboard")
    } else {
      setError("كلمة المرور غير صحيحة")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">لوحة التحكم</CardTitle>
          <CardDescription>أدخل كلمة المرور للوصول إلى لوحة التحكم</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className="pl-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            {error && (
              <p className="text-destructive text-sm text-center">{error}</p>
            )}
            
            <Button type="submit" className="w-full">
              دخول
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              كلمة المرور الافتراضية: admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
