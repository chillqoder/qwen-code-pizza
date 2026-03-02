'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Product } from '@/types/database'
import { useCartStore } from '@/store/useCartStore'
import { toast } from 'sonner'
import { 
  Flame, 
  Weight, 
  Ruler, 
  ChefHat, 
  Clock,
  Star,
  ShoppingCart,
  CheckCircle2,
  Leaf,
  Award,
  Shield,
  X
} from 'lucide-react'

interface ProductModalProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    if (product) {
      addItem({
        product_id: product.id,
        price: product.price,
        name: product.name,
        image_url: product.image_url
      })
      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <span>{product.name} добавлен в корзину</span>
        </div>,
        {
          duration: 2000
        }
      )
      onOpenChange(false)
    }
  }

  if (!product) return null

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => onOpenChange(false)}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div 
              className="relative w-full max-w-[1100px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
              style={{ maxHeight: 'min(90vh, 750px)' }}
            >
              {/* Close button */}
              <button
                onClick={() => onOpenChange(false)}
                className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Two column layout - equal height */}
              <div className="grid lg:grid-cols-2 h-full">
                {/* Left Column - Image */}
                <div className="relative h-[300px] lg:h-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x600?text=No+Image'
                    }}
                  />
                  
                  {/* Top badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.calories && (
                      <span className="bg-white/95 backdrop-blur-sm text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-orange-500" />
                        <span className="text-gray-900">{product.calories} ккал</span>
                      </span>
                    )}
                  </div>
                  
                  <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                    {product.size && (
                      <span className="bg-primary/95 backdrop-blur-sm text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-white">
                        <span>{product.size}</span>
                        <Ruler className="w-3.5 h-3.5" />
                      </span>
                    )}
                    {product.weight && (
                      <span className="bg-white/95 backdrop-blur-sm text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                        <span className="text-gray-900">{product.weight} г</span>
                        <Weight className="w-3.5 h-3.5 text-blue-500" />
                      </span>
                    )}
                  </div>
                  
                  {/* Bottom overlay with rating */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= 4.8
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-gray-600 text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-white font-bold">4.8</span>
                      <span className="text-white/70 text-xs">(124)</span>
                    </div>
                  </div>
                </div>

                {/* Right Column - Content */}
                <div className="flex flex-col p-5 lg:p-6 overflow-hidden">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3 shrink-0">
                    <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-primary" />
                      Хит
                    </span>
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Leaf className="w-3.5 h-3.5" />
                      Свежее
                    </span>
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" />
                      Гарантия
                    </span>
                  </div>

                  {/* Title and Price */}
                  <div className="mb-3 shrink-0">
                    <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-gray-900 dark:text-white leading-tight">
                      {product.name}
                    </h2>
                    <p className="text-4xl lg:text-5xl font-bold text-primary">
                      {product.price} ₽
                    </p>
                  </div>

                  {/* Description - limited height */}
                  <div className="mb-3 shrink-0">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Ingredients - compact */}
                  {product.ingredients && product.ingredients.length > 0 && (
                    <div className="mb-3 shrink-0">
                      <div className="flex items-center gap-1.5 mb-2">
                        <ChefHat className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-sm">Состав:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {product.ingredients.slice(0, 6).map((ingredient, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 text-xs px-2.5 py-1 rounded-full"
                          >
                            {ingredient}
                          </span>
                        ))}
                        {product.ingredients.length > 6 && (
                          <span className="text-gray-500 text-xs py-1">+{product.ingredients.length - 6}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Nutrition Info - compact grid */}
                  <div className="mb-4 shrink-0">
                    <div className="grid grid-cols-4 gap-2">
                      <div className="flex flex-col items-center text-center p-2 bg-gray-50 dark:bg-zinc-800 rounded-xl">
                        <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-1">
                          <Flame className="w-4 h-4 text-orange-500" />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Ккал</p>
                        <p className="font-bold text-sm text-gray-900 dark:text-white">{product.calories || '—'}</p>
                      </div>
                      <div className="flex flex-col items-center text-center p-2 bg-gray-50 dark:bg-zinc-800 rounded-xl">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-1">
                          <Weight className="w-4 h-4 text-blue-500" />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Вес</p>
                        <p className="font-bold text-sm text-gray-900 dark:text-white">{product.weight || '—'} г</p>
                      </div>
                      <div className="flex flex-col items-center text-center p-2 bg-gray-50 dark:bg-zinc-800 rounded-xl">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-1">
                          <Ruler className="w-4 h-4 text-green-500" />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Размер</p>
                        <p className="font-bold text-sm text-gray-900 dark:text-white">{product.size || '—'}</p>
                      </div>
                      <div className="flex flex-col items-center text-center p-2 bg-gray-50 dark:bg-zinc-800 rounded-xl">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-1">
                          <Clock className="w-4 h-4 text-purple-500" />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Время</p>
                        <p className="font-bold text-sm text-gray-900 dark:text-white">15-20</p>
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="mt-auto pt-4 border-t dark:border-zinc-700 shrink-0">
                    <Button
                      onClick={handleAddToCart}
                      size="lg"
                      className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all rounded-xl"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      В корзину — {product.price} ₽
                    </Button>
                    <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        15-20 мин
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" />
                        4.8
                      </span>
                      <span className="flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5" />
                        Гарантия
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
