'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { orderSchema, OrderFormData } from '@/lib/validations'
import { useCartStore } from '@/store/useCartStore'
import { isSupabaseConfigured } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { 
  ShoppingBag, 
  Truck, 
  User, 
  Phone, 
  MapPin, 
  MessageSquare,
  CreditCard,
  CheckCircle,
  Package
} from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const items = useCartStore((state) => state.items)
  const total = useCartStore((state) => state.total())
  const clearCart = useCartStore((state) => state.clearCart)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema)
  })

  const onSubmit = async (data: OrderFormData) => {
    if (items.length === 0) {
      toast.error('Корзина пуста')
      return
    }

    if (!isSupabaseConfigured) {
      toast.info(
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Supabase не настроен. Заказ сохранен локально.
        </div>
      )
      console.log('Order (mock):', { ...data, items, total })
      clearCart()
      router.push('/success')
      return
    }

    setIsSubmitting(true)

    try {
      const { supabase } = await import('@/lib/supabase')
      const { error } = await supabase!.from('orders').insert({
        customer_name: data.customer_name,
        customer_phone: data.customer_phone,
        customer_address: data.customer_address,
        total_amount: total,
        items: items,
        status: 'new'
      })

      if (error) throw error

      clearCart()
      toast.success('Заказ успешно оформлен!')
      router.push('/success')
    } catch (error) {
      console.error('Order error:', error)
      toast.error('Ошибка при оформлении заказа. Попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="w-24 h-24 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Корзина пуста</h1>
        <p className="text-muted-foreground mb-4">Добавьте товары для оформления заказа</p>
        <Button onClick={() => router.push('/')} className="gap-2">
          <Package className="w-4 h-4" />
          Перейти в меню
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <CreditCard className="w-8 h-8 text-primary" />
          Оформление заказа
        </h1>
        <p className="text-muted-foreground">Заполните форму для оформления доставки</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Customer Info */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Контактная информация
                </h2>

                <div className="space-y-2">
                  <Label htmlFor="customer_name" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    Имя
                  </Label>
                  <Input
                    id="customer_name"
                    placeholder="Иван Иванов"
                    {...register('customer_name')}
                    className="h-12"
                  />
                  {errors.customer_name && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <span>⚠️</span> {errors.customer_name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer_phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    Телефон
                  </Label>
                  <Input
                    id="customer_phone"
                    placeholder="+7 (999) 000-00-00"
                    {...register('customer_phone')}
                    className="h-12"
                  />
                  {errors.customer_phone && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <span>⚠️</span> {errors.customer_phone.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  Адрес доставки
                </h2>

                <div className="space-y-2">
                  <Label htmlFor="customer_address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    Адрес
                  </Label>
                  <Input
                    id="customer_address"
                    placeholder="Улица, дом, квартира"
                    {...register('customer_address')}
                    className="h-12"
                  />
                  {errors.customer_address && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <span>⚠️</span> {errors.customer_address.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer_comment" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    Комментарий к заказу
                  </Label>
                  <Input
                    id="customer_comment"
                    placeholder="Домофон, этаж, пожелания"
                    {...register('customer_comment')}
                    className="h-12"
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              size="lg"
              className="w-full h-14 text-lg gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Оформление...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Заказать на {total} ₽
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                Ваш заказ
              </h2>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product_id} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-zinc-800 shrink-0">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64x64?text=No+Image'
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} × {item.price} ₽
                      </p>
                    </div>
                    <p className="font-semibold">{item.quantity * item.price} ₽</p>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Подытог:</span>
                  <span>{total} ₽</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Доставка:</span>
                  <span className="text-green-600">Бесплатно</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Итого:</span>
                    <span className="text-2xl text-primary">{total} ₽</span>
                  </div>
                </div>
              </div>

              {/* Delivery time */}
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-900">
                <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                  <Truck className="w-4 h-4" />
                  <span>Доставка от 30 минут</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
