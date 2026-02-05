"use client"

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { projects as initialProjects, products as initialProducts, offers as initialOffers, type Project, type Product, type Offer } from './data'

interface SiteSettings {
  siteName: string
  siteDescription: string
  phone: string
  whatsapp: string
  email: string
  address: string
  primaryColor: string
  accentColor: string
  workingHours: {
    weekdays: string
    weekends: string
  }
}

interface AdminContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: (password: string) => boolean
  logout: () => void
  
  projects: Project[]
  addProject: (project: Project) => void
  updateProject: (id: string, project: Partial<Project>) => void
  deleteProject: (id: string) => void
  
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  
  offers: Offer[]
  addOffer: (offer: Offer) => void
  updateOffer: (id: string, offer: Partial<Offer>) => void
  deleteOffer: (id: string) => void
  
  siteSettings: SiteSettings
  updateSiteSettings: (settings: Partial<SiteSettings>) => void
}

const defaultSiteSettings: SiteSettings = {
  siteName: 'دار الأثاث',
  siteDescription: 'معرض متخصص في الأثاث العربي الفاخر والتصاميم العصرية',
  phone: '+966 50 123 4567',
  whatsapp: '966501234567',
  email: 'info@daralathath.com',
  address: 'الرياض، المملكة العربية السعودية',
  primaryColor: '#2d2a26',
  accentColor: '#b87333',
  workingHours: {
    weekdays: '9:00 صباحاً - 10:00 مساءً',
    weekends: '4:00 مساءً - 11:00 مساءً'
  }
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

const ADMIN_PASSWORD = 'admin123' // In production, use proper auth

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [offers, setOffers] = useState<Offer[]>(initialOffers)
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('admin_auth')
    if (saved === 'true') setIsAuthenticated(true)
    
    const savedProjects = localStorage.getItem('projects')
    if (savedProjects) setProjects(JSON.parse(savedProjects))
    
    const savedProducts = localStorage.getItem('products')
    if (savedProducts) setProducts(JSON.parse(savedProducts))
    
    const savedOffers = localStorage.getItem('offers')
    if (savedOffers) setOffers(JSON.parse(savedOffers))
    
    const savedSettings = localStorage.getItem('siteSettings')
    if (savedSettings) setSiteSettings(JSON.parse(savedSettings))
    
    setIsLoading(false)
    setIsMounted(true)
  }, [])

  // Save to localStorage on changes (only after initial mount to prevent overwriting)
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('projects', JSON.stringify(projects))
    }
  }, [projects, isMounted])

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('products', JSON.stringify(products))
    }
  }, [products, isMounted])

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('offers', JSON.stringify(offers))
    }
  }, [offers, isMounted])

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('siteSettings', JSON.stringify(siteSettings))
    }
    
    // Apply colors to CSS variables
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      
      // Convert hex to HSL for CSS variables
      const hexToHSL = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16) / 255
        const g = parseInt(hex.slice(3, 5), 16) / 255
        const b = parseInt(hex.slice(5, 7), 16) / 255

        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        let h = 0
        let s = 0
        const l = (max + min) / 2

        if (max !== min) {
          const d = max - min
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
          switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
            case g: h = ((b - r) / d + 2) / 6; break
            case b: h = ((r - g) / d + 4) / 6; break
          }
        }

        return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
      }

      // Apply primary color
      if (siteSettings.primaryColor) {
        const primaryHSL = hexToHSL(siteSettings.primaryColor)
        root.style.setProperty('--primary', primaryHSL)
        root.style.setProperty('--primary-foreground', '30 10% 96%')
      }
      
      // Apply accent color
      if (siteSettings.accentColor) {
        const accentHSL = hexToHSL(siteSettings.accentColor)
        root.style.setProperty('--accent', accentHSL)
        root.style.setProperty('--accent-foreground', '30 10% 96%')
      }
    }
  }, [siteSettings, isMounted])

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_auth')
  }

  // Projects CRUD
  const addProject = (project: Project) => {
    setProjects(prev => [...prev, project])
  }

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  // Products CRUD
  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product])
  }

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  // Offers CRUD
  const addOffer = (offer: Offer) => {
    setOffers(prev => [...prev, offer])
  }

  const updateOffer = (id: string, updates: Partial<Offer>) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o))
  }

  const deleteOffer = (id: string) => {
    setOffers(prev => prev.filter(o => o.id !== id))
  }

  // Site Settings
  const updateSiteSettings = (updates: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...updates }))
  }

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      isLoading,
      login,
      logout,
      projects,
      addProject,
      updateProject,
      deleteProject,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      offers,
      addOffer,
      updateOffer,
      deleteOffer,
      siteSettings,
      updateSiteSettings
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}
