import { CheckCircle } from 'lucide-react'

const features = [
  'تصاميم حصرية ومخصصة',
  'أجود أنواع الأخشاب والأقمشة',
  'ضمان شامل على جميع المنتجات',
  'خدمة توصيل وتركيب مجانية',
  'صيانة دورية مجانية',
  'تصميم ثلاثي الأبعاد قبل التنفيذ',
]

export function AboutSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=533&fit=crop"
                    alt="تصميم داخلي"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=400&fit=crop"
                    alt="أثاث فاخر"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop"
                    alt="غرفة طعام"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=533&fit=crop"
                    alt="غرفة نوم"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-8 py-4 rounded-xl shadow-lg">
              <p className="text-3xl font-bold text-center">15+</p>
              <p className="text-sm">سنوات من الخبرة</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-accent font-medium">من نحن</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight text-balance">
                نصنع الفخامة والراحة في كل قطعة أثاث
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              منذ أكثر من 15 عاماً ونحن نقدم أرقى تصاميم الأثاث العربي والعصري. نؤمن بأن كل منزل يستحق لمسة من الفخامة والأناقة، لذلك نعمل مع أمهر الحرفيين ونستخدم أجود المواد لنقدم لكم قطع أثاث تدوم لسنوات.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
