import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@/types/database'

interface CartState {
  items: CartItem[]
  addItem: (product: Omit<CartItem, 'quantity'>) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, delta: number) => void
  clearCart: () => void
  total: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const items = get().items
        const existingItem = items.find(item => item.product_id === product.product_id)
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.product_id === product.product_id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] })
        }
      },
      
      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.product_id !== productId) })
      },
      
      updateQuantity: (productId, delta) => {
        const items = get().items
        set({
          items: items
            .map(item => {
              if (item.product_id === productId) {
                const newQuantity = item.quantity + delta
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : null
              }
              return item
            })
            .filter(Boolean) as CartItem[]
        })
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      total: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      }
    }),
    {
      name: 'cart-storage'
    }
  )
)
