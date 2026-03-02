'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Product } from '@/types/database'
import { Flame, Weight, Ruler } from 'lucide-react'

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <Card
        onClick={onClick}
        className="cursor-pointer overflow-hidden h-full transition-all duration-300 hover:shadow-xl border-0 bg-white dark:bg-zinc-900 group"
      >
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=No+Image'
              }}
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Quick info badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {product.calories && (
                <span className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm text-xs font-semibold px-2.5 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  {product.calories} ккал
                </span>
              )}
            </div>
            
            {/* Size badge */}
            {product.size && (
              <div className="absolute top-3 right-3">
                <span className="bg-primary/95 backdrop-blur-sm text-xs font-semibold px-2.5 py-1.5 rounded-full shadow-lg text-white flex items-center gap-1">
                  <Ruler className="w-3.5 h-3.5" />
                  {product.size}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                {product.name}
              </h3>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3 h-10 leading-relaxed">
              {product.description}
            </p>
            
            {/* Ingredients preview */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-muted-foreground line-clamp-1">
                  <span className="font-medium">Состав:</span> {product.ingredients.slice(0, 4).join(', ')}
                  {product.ingredients.length > 4 && '...'}
                </p>
              </div>
            )}
            
            {/* Bottom row: Price + Weight */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                {product.weight && (
                  <span className="flex items-center text-xs text-muted-foreground bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-full">
                    <Weight className="w-3 h-3 mr-1" />
                    {product.weight} г
                  </span>
                )}
              </div>
              
              {/* Add to cart button on card */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-primary/10 hover:bg-primary text-primary hover:text-white p-2.5 rounded-full transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  onClick()
                }}
              >
                <span className="text-lg">+</span>
              </motion.button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
