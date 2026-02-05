# Al-Yasin Furniture - Developer Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Core Systems](#core-systems)
5. [Data Models](#data-models)
6. [Admin Dashboard](#admin-dashboard)
7. [Styling & Theming](#styling--theming)
8. [Adding New Features](#adding-new-features)
9. [Customization Guide](#customization-guide)
10. [Deployment](#deployment)

---

## Project Overview

Al-Yasin Furniture is a bilingual (Arabic RTL) furniture showroom website with:
- Public-facing product catalog and project gallery
- Admin dashboard for content management
- Dynamic theming and site settings
- PWA support for mobile devices
- Responsive design optimized for all screen sizes

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | Pre-built UI components |
| **React Context** | State management |
| **localStorage** | Data persistence |
| **Cairo Font** | Arabic typography |

---

## Project Structure

```
/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with AdminProvider
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles & CSS variables
│   ├── contact/                 # Contact page
│   ├── offers/                  # Offers/promotions page
│   ├── products/                # Products catalog
│   │   ├── page.tsx            # Products list
│   │   └── [id]/page.tsx       # Product detail
│   ├── projects/                # Projects gallery
│   │   ├── page.tsx            # Projects list
│   │   └── [id]/page.tsx       # Project detail
│   └── admin/                   # Admin dashboard (protected)
│       ├── layout.tsx          # Admin layout wrapper
│       ├── page.tsx            # Login page
│       ├── dashboard/          # Dashboard home
│       ├── projects/           # Manage projects
│       ├── products/           # Manage products
│       ├── offers/             # Manage offers
│       └── settings/           # Site settings
│
├── components/
│   ├── header.tsx              # Site header with navigation
│   ├── footer.tsx              # Site footer with contact info
│   ├── mobile-nav.tsx          # Mobile bottom navigation
│   ├── pwa-register.tsx        # PWA service worker registration
│   ├── home/                   # Homepage sections
│   │   ├── hero-section.tsx
│   │   ├── about-section.tsx
│   │   ├── featured-projects.tsx
│   │   ├── featured-products.tsx
│   │   └── cta-section.tsx
│   ├── admin/                  # Admin components
│   │   ├── admin-sidebar.tsx
│   │   └── admin-wrapper.tsx
│   └── ui/                     # shadcn/ui components
│
├── lib/
│   ├── admin-context.tsx       # Global state & CRUD operations
│   ├── data.ts                 # Type definitions & initial data
│   └── utils.ts                # Utility functions (cn helper)
│
└── public/
    └── manifest.json           # PWA manifest
```

---

## Core Systems

### 1. Admin Context (`lib/admin-context.tsx`)

The central state management system that handles:
- Authentication state
- Projects, Products, Offers data
- Site settings (name, colors, contact info)
- localStorage persistence
- Dynamic CSS variable updates

#### Key Exports:

```typescript
// Provider - Wrap your app with this
export function AdminProvider({ children }: { children: ReactNode })

// Hook - Access admin context anywhere
export function useAdmin(): AdminContextType
```

#### Available Methods:

```typescript
interface AdminContextType {
  // Authentication
  isAuthenticated: boolean
  isLoading: boolean
  login: (password: string) => boolean
  logout: () => void
  
  // Projects CRUD
  projects: Project[]
  addProject: (project: Project) => void
  updateProject: (id: string, project: Partial<Project>) => void
  deleteProject: (id: string) => void
  
  // Products CRUD
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  
  // Offers CRUD
  offers: Offer[]
  addOffer: (offer: Offer) => void
  updateOffer: (id: string, offer: Partial<Offer>) => void
  deleteOffer: (id: string) => void
  
  // Site Settings
  siteSettings: SiteSettings
  updateSiteSettings: (settings: Partial<SiteSettings>) => void
}
```

#### Usage Example:

```tsx
'use client'
import { useAdmin } from '@/lib/admin-context'

export function MyComponent() {
  const { projects, siteSettings, addProject } = useAdmin()
  
  return (
    <div>
      <h1>{siteSettings.siteName}</h1>
      {projects.map(p => <div key={p.id}>{p.title}</div>)}
    </div>
  )
}
```

### 2. Data Persistence

Data is stored in browser localStorage with these keys:

| Key | Description |
|-----|-------------|
| `admin_auth` | Authentication state (`'true'` or removed) |
| `projects` | JSON array of projects |
| `products` | JSON array of products |
| `offers` | JSON array of offers |
| `siteSettings` | JSON object with site configuration |

**Important:** Data syncs automatically when modified via context methods.

---

## Data Models

### Project

```typescript
interface Project {
  id: string           // Unique identifier
  title: string        // Display title (Arabic)
  description: string  // Full description
  images: string[]     // Array of image URLs
  status: 'available' | 'sold' | 'reserved'
  category: string     // Category name (Arabic)
}
```

### Product

```typescript
interface Product {
  id: string
  title: string
  description: string
  images: string[]
  sizes: string[]      // Available size options
  materials: string[]  // Available material options
  category: string
  price?: string       // Optional price display
}
```

### Offer

```typescript
interface Offer {
  id: string
  title: string
  description: string
  image: string        // Single image URL
  discount: string     // e.g., "25%"
  validUntil: string   // ISO date string
}
```

### SiteSettings

```typescript
interface SiteSettings {
  siteName: string           // Site name displayed in header/footer
  siteDescription: string    // Meta description
  phone: string              // Display phone number
  whatsapp: string           // WhatsApp number (numbers only)
  email: string              // Contact email
  address: string            // Physical address
  primaryColor: string       // Hex color for primary theme
  accentColor: string        // Hex color for accent/highlights
  workingHours: {
    weekdays: string         // e.g., "9:00 AM - 10:00 PM"
    weekends: string         // e.g., "4:00 PM - 11:00 PM"
  }
}
```

---

## Admin Dashboard

### Access

- **URL:** `/admin`
- **Default Password:** `admin123`
- **Change Password:** Edit `ADMIN_PASSWORD` constant in `lib/admin-context.tsx`

### Pages

| Route | Purpose |
|-------|---------|
| `/admin` | Login page |
| `/admin/dashboard` | Overview statistics |
| `/admin/projects` | Manage projects (add, edit, delete) |
| `/admin/products` | Manage products |
| `/admin/offers` | Manage promotional offers |
| `/admin/settings` | Site settings (name, colors, contact) |

### Authentication Flow

1. User visits `/admin`
2. Enters password
3. `login()` validates against `ADMIN_PASSWORD`
4. Sets `admin_auth` in localStorage
5. Redirects to `/admin/dashboard`
6. Protected pages check `isAuthenticated` before rendering

---

## Styling & Theming

### CSS Variables

Theme colors are defined in `app/globals.css` and can be dynamically updated via admin settings:

```css
:root {
  --background: 40 20% 97%;      /* Page background */
  --foreground: 30 10% 10%;      /* Text color */
  --primary: 30 15% 15%;         /* Primary brand color */
  --primary-foreground: 40 20% 97%;
  --accent: 25 60% 45%;          /* Accent/highlight color */
  --accent-foreground: 40 20% 97%;
  /* ... more variables */
}
```

### Dynamic Color Updates

When admin changes colors in settings, they're converted from HEX to HSL and applied:

```typescript
// In admin-context.tsx
root.style.setProperty('--primary', primaryHSL)
root.style.setProperty('--accent', accentHSL)
```

### RTL Support

The app is configured for Arabic (RTL):

```tsx
<html lang="ar" dir="rtl">
```

All layouts use `flex` with proper RTL handling via Tailwind's built-in RTL support.

---

## Adding New Features

### Adding a New Page

1. Create file in `app/` directory:

```tsx
// app/new-page/page.tsx
'use client'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useAdmin } from '@/lib/admin-context'

export default function NewPage() {
  const { siteSettings } = useAdmin()
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Your content */}
      </main>
      <Footer />
    </div>
  )
}
```

### Adding a New Data Type

1. Define the interface in `lib/data.ts`:

```typescript
export interface Service {
  id: string
  name: string
  description: string
  price: string
}

export const services: Service[] = [
  // Initial data
]
```

2. Add to `AdminContext` in `lib/admin-context.tsx`:

```typescript
// Add state
const [services, setServices] = useState<Service[]>(initialServices)

// Add CRUD methods
const addService = (service: Service) => {
  setServices(prev => [...prev, service])
}

// Add to localStorage effects
useEffect(() => {
  if (isMounted) {
    localStorage.setItem('services', JSON.stringify(services))
  }
}, [services, isMounted])

// Load in mount effect
const savedServices = localStorage.getItem('services')
if (savedServices) setServices(JSON.parse(savedServices))

// Add to context value
<AdminContext.Provider value={{
  // ...existing
  services,
  addService,
  updateService,
  deleteService,
}}>
```

3. Create admin page `app/admin/services/page.tsx`

### Adding a New Homepage Section

1. Create component in `components/home/`:

```tsx
// components/home/new-section.tsx
'use client'
import { useAdmin } from '@/lib/admin-context'

export function NewSection() {
  const { siteSettings } = useAdmin()
  
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Content */}
      </div>
    </section>
  )
}
```

2. Import in `app/page.tsx`:

```tsx
import { NewSection } from '@/components/home/new-section'

// Add in JSX
<NewSection />
```

---

## Customization Guide

### Changing Default Data

Edit `lib/data.ts` to modify:
- Initial projects, products, offers
- Categories list
- Any default content

### Changing Admin Password

In `lib/admin-context.tsx`:

```typescript
const ADMIN_PASSWORD = 'your-new-password'
```

**For production:** Replace with proper authentication (NextAuth, Supabase Auth, etc.)

### Changing Default Site Settings

In `lib/admin-context.tsx`, modify `defaultSiteSettings`:

```typescript
const defaultSiteSettings: SiteSettings = {
  siteName: 'Your Brand Name',
  siteDescription: 'Your description',
  phone: '+966 XX XXX XXXX',
  whatsapp: '966XXXXXXXXX',
  email: 'contact@yourdomain.com',
  address: 'Your Address',
  primaryColor: '#2d2a26',
  accentColor: '#b87333',
  workingHours: {
    weekdays: '9:00 AM - 10:00 PM',
    weekends: '4:00 PM - 11:00 PM'
  }
}
```

### Changing Theme Colors

Option 1: Edit CSS variables in `app/globals.css`

Option 2: Use admin dashboard Settings page

Option 3: Modify `defaultSiteSettings.primaryColor` and `accentColor`

### Adding Navigation Links

Edit `components/header.tsx`:

```typescript
const navLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/projects', label: 'مشاريعنا' },
  { href: '/products', label: 'منتجاتنا' },
  { href: '/offers', label: 'العروض' },
  { href: '/contact', label: 'تواصل معنا' },
  // Add new link
  { href: '/new-page', label: 'صفحة جديدة' },
]
```

Also update `components/mobile-nav.tsx` for mobile navigation.

### Changing Font

In `app/layout.tsx`:

```typescript
import { Tajawal } from 'next/font/google' // Different Arabic font

const tajawal = Tajawal({ 
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700'],
})

// Use in body
<body className={`${tajawal.className} antialiased`}>
```

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel dashboard
3. Deploy automatically

### Environment Variables

Currently, no environment variables are required (localStorage-based).

For production with a database, add:
- `DATABASE_URL` - Database connection string
- `NEXTAUTH_SECRET` - For authentication
- `NEXTAUTH_URL` - Your domain

### Production Recommendations

1. **Replace localStorage with database:**
   - Supabase, Planetscale, or similar
   - Migrate context to API routes

2. **Add proper authentication:**
   - NextAuth.js or Supabase Auth
   - Remove hardcoded password

3. **Add image upload:**
   - Vercel Blob, Cloudinary, or S3
   - Replace URL inputs with file uploads

4. **Add analytics:**
   - Vercel Analytics
   - Google Analytics

---

## File Quick Reference

| File | Purpose | Edit When |
|------|---------|-----------|
| `lib/admin-context.tsx` | Global state, CRUD | Adding data types, changing auth |
| `lib/data.ts` | Types, initial data | Adding types, changing defaults |
| `app/globals.css` | Theme colors | Changing default theme |
| `app/layout.tsx` | Root layout, font | Changing font, metadata |
| `components/header.tsx` | Navigation | Adding nav links |
| `components/footer.tsx` | Footer content | Changing footer layout |
| `components/mobile-nav.tsx` | Mobile nav | Adding mobile nav items |

---

## Support

For issues or questions:
1. Check browser console for errors
2. Verify localStorage has correct data
3. Clear localStorage to reset to defaults
4. Check that `AdminProvider` wraps your components

---

*Last updated: February 2026*
