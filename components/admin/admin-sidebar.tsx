"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAdmin } from "@/lib/admin-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  FolderKanban,
  Package,
  Tag,
  Settings,
  LogOut,
  Home,
  Menu,
  X
} from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/admin/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/projects", label: "المشاريع", icon: FolderKanban },
  { href: "/admin/products", label: "المنتجات", icon: Package },
  { href: "/admin/offers", label: "العروض", icon: Tag },
  { href: "/admin/settings", label: "إعدادات الموقع", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, siteSettings } = useAdmin()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/admin")
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-card rounded-lg shadow-md"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 right-0 z-40 w-64 bg-card border-l border-border flex flex-col transition-transform lg:translate-x-0",
        isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold text-foreground">{siteSettings.siteName}</h1>
          <p className="text-sm text-muted-foreground">لوحة التحكم</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-2">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
              <Home className="w-5 h-5" />
              عرض الموقع
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </Button>
        </div>
      </aside>
    </>
  )
}
