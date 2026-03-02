'use client'

import { Product } from '@/types/database'
import { ProductCard } from './ProductCard'

interface CategorySectionProps {
  id: string
  title: string
  products: Product[]
  onProductClick: (product: Product) => void
}

export function CategorySection({ id, title, products, onProductClick }: CategorySectionProps) {
  return (
    <section id={id} className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">{title}</h2>
        
        {/* Grid Container - Fixed number of cards per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick(product)}
            />
          ))}
        </div>
        
        {/* If products less than 4 on desktop, add empty cells to maintain layout */}
        {products.length < 4 && products.length > 0 && (
          <div className="hidden xl:block">
            {Array.from({ length: 4 - products.length }).map((_, i) => (
              <div key={i} className="invisible" />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
