'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SuccessPage() {
  useEffect(() => {
    // Clear any checkout-related state if needed
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>

        <h1 className="text-3xl font-bold mb-4">Заказ оформлен!</h1>
        <p className="text-muted-foreground mb-8">
          Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время для подтверждения.
        </p>

        <div className="space-y-4">
          <Button asChild size="lg" className="w-full">
            <Link href="/">
              Вернуться в меню <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
