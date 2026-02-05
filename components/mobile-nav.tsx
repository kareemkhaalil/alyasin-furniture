'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FolderKanban, Package, Tag, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'الرئيسية', icon: Home },
  { href: '/projects', label: 'المشاريع', icon: FolderKanban },
  { href: '/products', label: 'المنتجات', icon: Package },
  { href: '/offers', label: 'العروض', icon: Tag },
  { href: '/contact', label: 'تواصل', icon: MessageCircle },
]

export function MobileNav() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Don't show on admin pages
  if (pathname?.startsWith('/admin')) {
    return null
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname?.startsWith(href)
  }

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ease-in-out',
        visible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      {/* Blur background */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-t border-border" />
      
      {/* Safe area padding for phones with home indicator */}
      <div className="relative px-2 pt-2 pb-safe">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200 min-w-[64px]',
                  active 
                    ? 'text-accent bg-accent/10' 
                    : 'text-muted-foreground active:scale-95'
                )}
              >
                <Icon 
                  className={cn(
                    'h-5 w-5 transition-transform',
                    active && 'scale-110'
                  )} 
                  strokeWidth={active ? 2.5 : 2}
                />
                <span className={cn(
                  'text-[10px] font-medium',
                  active && 'font-semibold'
                )}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
