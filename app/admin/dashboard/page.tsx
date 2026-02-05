"use client"

import Link from "next/link"
import { useAdmin } from "@/lib/admin-context"
import { AdminWrapper } from "@/components/admin/admin-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FolderKanban, Package, Tag, TrendingUp, Eye, Plus } from "lucide-react"

export default function AdminDashboardPage() {
  const { projects, products, offers } = useAdmin()

  const stats = [
    {
      title: "المشاريع",
      value: projects.length,
      icon: FolderKanban,
      href: "/admin/projects",
      available: projects.filter(p => p.status === 'available').length,
      label: "متاح"
    },
    {
      title: "المنتجات",
      value: products.length,
      icon: Package,
      href: "/admin/products",
      available: products.length,
      label: "منتج"
    },
    {
      title: "العروض",
      value: offers.length,
      icon: Tag,
      href: "/admin/offers",
      available: offers.length,
      label: "عرض نشط"
    },
  ]

  const recentProjects = projects.slice(0, 5)
  const recentProducts = products.slice(0, 5)

  return (
    <AdminWrapper title="لوحة التحكم" description="مرحباً بك في لوحة تحكم دار الأثاث">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.available} {stat.label}
              </p>
              <Link href={stat.href}>
                <Button variant="link" className="px-0 mt-2 h-auto">
                  عرض الكل
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">إجراءات سريعة</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/projects?action=new">
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              إضافة مشروع
            </Button>
          </Link>
          <Link href="/admin/products?action=new">
            <Button variant="outline">
              <Plus className="w-4 h-4 ml-2" />
              إضافة منتج
            </Button>
          </Link>
          <Link href="/admin/offers?action=new">
            <Button variant="outline">
              <Plus className="w-4 h-4 ml-2" />
              إضافة عرض
            </Button>
          </Link>
          <Link href="/" target="_blank">
            <Button variant="ghost">
              <Eye className="w-4 h-4 ml-2" />
              معاينة الموقع
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">أحدث المشاريع</CardTitle>
            <Link href="/admin/projects">
              <Button variant="ghost" size="sm">عرض الكل</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{project.title}</p>
                    <p className="text-xs text-muted-foreground">{project.category}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.status === 'available' ? 'bg-green-100 text-green-700' :
                    project.status === 'reserved' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {project.status === 'available' ? 'متاح' :
                     project.status === 'reserved' ? 'محجوز' : 'مباع'}
                  </span>
                </div>
              ))}
              {recentProjects.length === 0 && (
                <p className="text-center text-muted-foreground py-4">لا توجد مشاريع</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">أحدث المنتجات</CardTitle>
            <Link href="/admin/products">
              <Button variant="ghost" size="sm">عرض الكل</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{product.title}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {product.price}
                  </span>
                </div>
              ))}
              {recentProducts.length === 0 && (
                <p className="text-center text-muted-foreground py-4">لا توجد منتجات</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminWrapper>
  )
}
