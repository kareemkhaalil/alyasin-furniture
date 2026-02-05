"use client"

import React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAdmin } from "@/lib/admin-context"
import { AdminSidebar } from "./admin-sidebar"

interface AdminWrapperProps {
  children: React.ReactNode
  title: string
  description?: string
}

export function AdminWrapper({ children, title, description }: AdminWrapperProps) {
  const { isAuthenticated, isLoading } = useAdmin()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">جاري التحميل...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <main className="flex-1 lg:pr-0 pr-0">
        <div className="p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{title}</h1>
            {description && (
              <p className="text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}
