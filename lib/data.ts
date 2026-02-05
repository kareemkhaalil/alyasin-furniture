// Types
export interface Project {
  id: string
  title: string
  description: string
  images: string[]
  status: 'available' | 'sold' | 'reserved'
  category: string
  // Optional pricing fields
  price?: number // Original price in SAR
  discountPercentage?: number // Discount percentage (0-100)
  videoLinks?: string[]
}

export interface Product {
  id: string
  title: string
  description: string
  images: string[]
  sizes: string[]
  materials: string[]
  category: string
  price?: string
}

export interface Offer {
  id: string
  title: string
  description: string
  image: string
  discount: string
  validUntil: string
}

// Sample Data
export const projects: Project[] = [
  {
    id: '1',
    title: 'مجلس عربي فاخر',
    description: 'تصميم مجلس عربي كلاسيكي بلمسات عصرية، يتميز بالأقمشة الفاخرة والزخارف الشرقية الأصيلة',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800',
    ],
    status: 'available',
    category: 'مجالس'
  },
  {
    id: '2',
    title: 'غرفة طعام راقية',
    description: 'طاولة طعام من خشب الجوز الطبيعي مع كراسي مطرزة يدوياً بأجود أنواع الأقمشة',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800',
    ],
    status: 'reserved',
    category: 'غرف طعام'
  },
  {
    id: '3',
    title: 'غرفة نوم ملكية',
    description: 'تصميم ملكي فخم يجمع بين الراحة والأناقة مع سرير منجد وخزانة ملابس واسعة',
    images: [
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
    ],
    status: 'sold',
    category: 'غرف نوم'
  },
  {
    id: '4',
    title: 'صالة استقبال عصرية',
    description: 'تصميم عصري أنيق يمزج بين البساطة والفخامة مع أرائك مريحة وطاولات زجاجية',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=800',
    ],
    status: 'available',
    category: 'صالات'
  },
  {
    id: '5',
    title: 'مكتب تنفيذي',
    description: 'مكتب خشبي فاخر مع كرسي جلدي مريح ومكتبة مدمجة للكتب والملفات',
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    ],
    status: 'available',
    category: 'مكاتب'
  },
  {
    id: '6',
    title: 'ركن قراءة هادئ',
    description: 'زاوية مريحة للقراءة والاسترخاء مع كرسي مريح وإضاءة دافئة',
    images: [
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    ],
    status: 'reserved',
    category: 'أركان'
  },
]

export const products: Product[] = [
  {
    id: '1',
    title: 'كنبة كلاسيكية',
    description: 'كنبة ثلاثية بتصميم كلاسيكي أنيق مع وسائد مريحة',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=800',
    ],
    sizes: ['3 مقاعد - 220 سم', '4 مقاعد - 280 سم', '5 مقاعد - 340 سم'],
    materials: ['قماش مخمل', 'جلد طبيعي', 'قماش كتان'],
    category: 'كنب',
    price: 'يبدأ من 4,500 ر.س'
  },
  {
    id: '2',
    title: 'طاولة طعام خشبية',
    description: 'طاولة طعام من خشب البلوط الصلب مع تشطيب طبيعي',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800',
    ],
    sizes: ['6 أشخاص - 180×90 سم', '8 أشخاص - 220×100 سم', '10 أشخاص - 280×110 سم'],
    materials: ['خشب بلوط', 'خشب جوز', 'خشب زان'],
    category: 'طاولات',
    price: 'يبدأ من 3,200 ر.س'
  },
  {
    id: '3',
    title: 'سرير ملكي منجد',
    description: 'سرير فاخر بتصميم منجد مع رأسية عالية وقاعدة متينة',
    images: [
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
    ],
    sizes: ['مفرد - 120×200 سم', 'كوين - 160×200 سم', 'كينج - 200×200 سم'],
    materials: ['قماش مخمل', 'جلد صناعي', 'قماش كتان'],
    category: 'أسرة',
    price: 'يبدأ من 5,800 ر.س'
  },
  {
    id: '4',
    title: 'كرسي استرخاء',
    description: 'كرسي استرخاء مريح مع مسند قدم قابل للتعديل',
    images: [
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800',
      'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=800',
    ],
    sizes: ['قياسي - 85×90 سم', 'كبير - 95×100 سم'],
    materials: ['جلد طبيعي', 'قماش سويدي', 'جلد صناعي'],
    category: 'كراسي',
    price: 'يبدأ من 2,100 ر.س'
  },
  {
    id: '5',
    title: 'خزانة ملابس',
    description: 'خزانة ملابس واسعة بأبواب منزلقة ومرآة كاملة',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
    ],
    sizes: ['بابين - 150 سم', '3 أبواب - 200 سم', '4 أبواب - 270 سم'],
    materials: ['خشب MDF', 'خشب طبيعي', 'خشب ملامين'],
    category: 'خزائن',
    price: 'يبدأ من 4,200 ر.س'
  },
  {
    id: '6',
    title: 'طاولة قهوة',
    description: 'طاولة قهوة عصرية بسطح رخامي وأرجل معدنية ذهبية',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800',
    ],
    sizes: ['صغيرة - 80×80 سم', 'متوسطة - 100×60 سم', 'كبيرة - 120×70 سم'],
    materials: ['رخام طبيعي', 'رخام صناعي', 'زجاج مقسى'],
    category: 'طاولات',
    price: 'يبدأ من 1,800 ر.س'
  },
  {
    id: '7',
    title: 'مكتبة حائط',
    description: 'مكتبة حائط عصرية بتصميم هندسي أنيق مع إضاءة مدمجة',
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    ],
    sizes: ['180×220 سم', '240×220 سم', '300×220 سم'],
    materials: ['خشب بلوط', 'خشب MDF', 'خشب ملامين'],
    category: 'مكتبات',
    price: 'يبدأ من 3,500 ر.س'
  },
  {
    id: '8',
    title: 'كونسول مدخل',
    description: 'طاولة كونسول أنيقة للمدخل مع درجين ومرآة مزخرفة',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    ],
    sizes: ['100×35 سم', '120×40 سم', '140×40 سم'],
    materials: ['خشب زان', 'خشب جوز', 'خشب MDF'],
    category: 'كونسول',
    price: 'يبدأ من 2,400 ر.س'
  },
]

export const offers: Offer[] = [
  {
    id: '1',
    title: 'عرض غرفة النوم الكاملة',
    description: 'احصل على غرفة نوم كاملة تشمل السرير والتسريحة والكومودينو بخصم خاص',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800',
    discount: '25%',
    validUntil: '2026-03-31'
  },
  {
    id: '2',
    title: 'عرض المجلس العربي',
    description: 'مجلس عربي فاخر بتصميم حصري مع خصم مميز على الطقم الكامل',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    discount: '20%',
    validUntil: '2026-02-28'
  },
  {
    id: '3',
    title: 'عرض غرفة الطعام',
    description: 'طاولة طعام مع 8 كراسي بتصميم عصري بسعر مخفض',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800',
    discount: '30%',
    validUntil: '2026-03-15'
  },
  {
    id: '4',
    title: 'عرض الأثاث المكتبي',
    description: 'طقم مكتب كامل يشمل المكتب والكرسي والمكتبة بخصم حصري',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
    discount: '15%',
    validUntil: '2026-04-30'
  },
]

export const categories = [
  'الكل',
  'مجالس',
  'غرف نوم',
  'غرف طعام',
  'صالات',
  'مكاتب',
  'أركان'
]

export const productCategories = [
  'الكل',
  'كنب',
  'طاولات',
  'أسرة',
  'كراسي',
  'خزائن',
  'مكتبات',
  'كونسول'
]
