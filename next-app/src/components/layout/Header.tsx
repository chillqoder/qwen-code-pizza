'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Pizza, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCartStore } from '@/store/useCartStore'
import { Category } from '@/types/database'
import { CartDrawer } from '@/components/cart/CartDrawer'

interface HeaderProps {
  categories: Category[]
}

export function Header({ categories }: HeaderProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const items = useCartStore((state) => state.items)
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/90 backdrop-blur-md shadow-lg border-b'
            : 'bg-background/80 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 text-primary font-bold text-xl group">
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Pizza className="w-9 h-9" />
              </motion.div>
              <span className="hidden sm:inline bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                Pizza Delivery
              </span>
            </Link>

            {/* Categories - Horizontal Scroll */}
            <nav className="hidden md:flex items-center gap-1 overflow-x-auto max-w-lg">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className="group px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full hover:bg-accent hover:text-accent-foreground transition-all flex items-center gap-1.5"
                >
                  <span>{category.name}</span>
                  {index < categories.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              ))}
            </nav>

            {/* Cart Button */}
            <motion.button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-accent/10 transition-all group"
              whileTap={{ scale: 0.9 }}
              animate={totalCount > 0 ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <ShoppingCart className="w-6 h-6 group-hover:text-primary transition-colors" />
              {totalCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                >
                  {totalCount}
                </motion.span>
              )}
            </motion.button>
          </div>

          {/* Mobile Categories */}
          <nav className="md:hidden flex items-center gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className="px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-all flex items-center gap-1.5 shrink-0"
              >
                <span>{category.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  )
}
