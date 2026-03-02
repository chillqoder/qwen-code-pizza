'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/useCartStore'
import { Plus, Minus, Trash2, ShoppingBag, Package, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const total = useCartStore((state) => state.total())

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg p-0 gap-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="flex items-center gap-2.5 text-xl">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
            Ваш заказ
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-6">
            <div className="w-24 h-24 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <p className="text-lg font-semibold mb-2">Корзина пуста</p>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Добавьте товары из меню, чтобы оформить заказ
            </p>
            <Button onClick={() => onOpenChange(false)} className="gap-2">
              <Package className="w-4 h-4" />
              Перейти к меню
            </Button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product_id}
                  className="flex gap-4 p-4 bg-card rounded-xl border shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="w-20 h-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-800">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80x80?text=No+Image'
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <h4 className="font-semibold line-clamp-1">{item.name}</h4>
                    <p className="text-primary font-bold mt-1">{item.price} ₽</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-auto">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg"
                        onClick={() => updateQuantity(item.product_id, -1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-10 text-center font-semibold text-lg">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg"
                        onClick={() => updateQuantity(item.product_id, 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-auto text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg"
                        onClick={() => removeItem(item.product_id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="flex flex-col items-end justify-between py-1">
                    <span className="font-bold text-lg">{item.quantity * item.price} ₽</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t p-6 space-y-4 bg-card">
              {/* Delivery info */}
              <div className="flex items-center gap-3 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                <Package className="w-4 h-4 text-primary" />
                <span>Доставка от 30 минут</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Итого:</span>
                <span className="text-3xl font-bold text-primary">{total} ₽</span>
              </div>
              <Button asChild size="lg" className="w-full h-14 text-lg gap-2">
                <Link href="/checkout">
                  Оформить заказ
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
