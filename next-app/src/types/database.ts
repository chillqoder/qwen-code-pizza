export interface Category {
  id: string
  name: string
  image_url: string
  order: number
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category_id: string
  ingredients: string[]
  weight?: number
  calories?: number
  size?: string
}

export interface Order {
  id: string
  created_at: string
  customer_name: string
  customer_phone: string
  customer_address: string
  total_amount: number
  status: string
  items: CartItem[]
}

export interface CartItem {
  product_id: string
  quantity: number
  price: number
  name: string
  image_url: string
}
