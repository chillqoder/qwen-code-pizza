'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { HeroSlider } from '@/components/home/HeroSlider'
import { CategorySection } from '@/components/products/CategorySection'
import { ProductModal } from '@/components/products/ProductModal'
import { Product, Category } from '@/types/database'
// import { supabase, isSupabaseConfigured } from '@/lib/supabase'

// Mock data for development without Supabase
const mockCategories: Category[] = [
  { id: '1', name: '🍕 Пицца', image_url: '', order: 1 },
  { id: '2', name: '🥤 Напитки', image_url: '', order: 2 },
  { id: '3', name: '🍰 Десерты', image_url: '', order: 3 }
]

const mockProducts: Product[] = [
  // Pizzas - с проверенными картинками
  { 
    id: '1', 
    name: 'Пепперони', 
    description: 'Классическая пицца с пикантными колбасками пепперони и тягучей моцареллой', 
    price: 599, 
    image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&h=800&fit=crop&q=80', 
    category_id: '1', 
    ingredients: ['моцарелла', 'пепперони', 'томатный соус', 'итальянские травы'],
    weight: 450,
    calories: 280,
    size: '30 см'
  },
  { 
    id: '2', 
    name: 'Маргарита', 
    description: 'Традиционная итальянская пицца со свежими томатами, моцареллой и базиликом', 
    price: 499, 
    image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=800&fit=crop&q=80', 
    category_id: '1', 
    ingredients: ['моцарелла', 'свежие томаты', 'базилик', 'оливковое масло', 'томатный соус'],
    weight: 400,
    calories: 250,
    size: '30 см'
  },
  { 
    id: '3', 
    name: 'Четыре сыра', 
    description: 'Изысканная пицца с четырьмя видами сыра: моцарелла, пармезан, горгонзола и эмменталь', 
    price: 699, 
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=800&fit=crop&q=80', 
    category_id: '1', 
    ingredients: ['моцарелла', 'пармезан', 'горгонзола', 'эмменталь', 'сливочный соус'],
    weight: 480,
    calories: 320,
    size: '30 см'
  },
  { 
    id: '4', 
    name: 'Гавайская', 
    description: 'Сочная ветчина и сладкий ананас — тропическое наслаждение в каждом кусочке', 
    price: 549, 
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=800&fit=crop&q=80', 
    category_id: '1', 
    ingredients: ['ветчина', 'ананас', 'моцарелла', 'томатный соус'],
    weight: 420,
    calories: 260,
    size: '30 см'
  },
  { 
    id: '5', 
    name: 'Мясная', 
    description: 'Ассорти из мяса для настоящих ценителей: ветчина, пепперони, бекон и охотничьи колбаски', 
    price: 749, 
    image_url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&h=800&fit=crop&q=80', 
    category_id: '1', 
    ingredients: ['ветчина', 'пепперони', 'бекон', 'охотничьи колбаски', 'моцарелла', 'томатный соус'],
    weight: 550,
    calories: 350,
    size: '35 см'
  },
  { 
    id: '6', 
    name: 'Дьябло', 
    description: 'Острая пицца для любителей жгучих ощущений с халапеньо и острой колбасой', 
    price: 649, 
    image_url: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800&h=800&fit=crop&q=80', 
    category_id: '1', 
    ingredients: ['острая колбаса', 'халапеньо', 'моцарелла', 'томатный соус', 'красный лук'],
    weight: 470,
    calories: 290,
    size: '30 см'
  },
  { 
    id: '7', 
    name: 'Вегетарианская', 
    description: 'Свежие овощи и зелень на хрустящем тесте — легкий и полезный выбор', 
    price: 529, 
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=800&fit=crop&q=80', 
    category_id: '1', 
    ingredients: ['шампиньоны', 'болгарский перец', 'красный лук', 'маслины', 'моцарелла', 'томатный соус'],
    weight: 410,
    calories: 220,
    size: '30 см'
  },
  { 
    id: '8', 
    name: 'Карбонара', 
    description: 'Пицца в стиле знаменитой пасты с беконом, сливочным соусом и пармезаном', 
    price: 679, 
    image_url: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800&h=800&fit=crop&q=80', 
    category_id: '1', 
    ingredients: ['бекон', 'пармезан', 'моцарелла', 'сливочный соус', 'яичный желток'],
    weight: 490,
    calories: 310,
    size: '30 см'
  },
  // Drinks - с рабочими картинками
  { 
    id: '9', 
    name: 'Coca-Cola Classic', 
    description: 'Легендарный прохладительный напиток с освежающим вкусом', 
    price: 99, 
    image_url: 'https://pngimg.com/d/cocacola_PNG23.png', 
    category_id: '2', 
    ingredients: ['газированная вода', 'сахар', 'кофеин', 'ортофосфорная кислота'],
    weight: 500,
    calories: 42,
    size: '0.5 л'
  },
  { 
    id: '10', 
    name: 'Sprite', 
    description: 'Освежающий лимонно-лаймовый напиток без кофеина', 
    price: 99, 
    image_url: 'https://t3.ftcdn.net/jpg/02/86/26/86/360_F_286268644_FJxZ9RW8bXWWiaZgKajwnwEZ61ynkfOp.jpg', 
    category_id: '2', 
    ingredients: ['газированная вода', 'сахар', 'лимонная кислота', 'натуральные ароматизаторы'],
    weight: 500,
    calories: 38,
    size: '0.5 л'
  },
  { 
    id: '11', 
    name: 'Fanta Апельсин', 
    description: 'Яркий апельсиновый напиток для поднятия настроения', 
    price: 99, 
    image_url: 'https://pngimg.com/d/fanta_PNG20.png', 
    category_id: '2', 
    ingredients: ['газированная вода', 'сахар', 'апельсиновый сок', 'натуральные ароматизаторы'],
    weight: 500,
    calories: 45,
    size: '0.5 л'
  },
  { 
    id: '12', 
    name: 'Домашний лимонад', 
    description: 'Натуральный лимонад из свежих лимонов с мятой и имбирем', 
    price: 149, 
    image_url: 'https://onetable.ru/wp-content/uploads/2022/07/domashniy-limonad-bez-sakhara-foto-1.jpg', 
    category_id: '2', 
    ingredients: ['свежие лимоны', 'мята', 'имбирь', 'тростниковый сахар', 'газированная вода'],
    weight: 400,
    calories: 35,
    size: '0.4 л'
  },
  { 
    id: '13', 
    name: 'Минеральная вода', 
    description: 'Природная минеральная вода без газа', 
    price: 49, 
    image_url: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?w=800&h=800&fit=crop&q=80', 
    category_id: '2', 
    ingredients: ['природная минеральная вода'],
    weight: 500,
    calories: 0,
    size: '0.5 л'
  },
  // Desserts - с рабочими картинками
  { 
    id: '14', 
    name: 'Тирамису', 
    description: 'Классический итальянский десерт с маскарпоне, савоярди и эспрессо', 
    price: 299, 
    image_url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=800&fit=crop&q=80', 
    category_id: '3', 
    ingredients: ['маскарпоне', 'савоярди', 'эспрессо', 'какао', 'яйца', 'сахар'],
    weight: 180,
    calories: 320,
    size: '1 порция'
  },
  { 
    id: '15', 
    name: 'Нью-Йорк чизкейк', 
    description: 'Классический сливочный чизкейк с ванильным оттенком и ягодным соусом', 
    price: 349, 
    image_url: 'https://kulinarenok.ru/storage/recipes/23614/image/chizkeyk-nyu-york-bez-vodyanoy-bani.jpg', 
    category_id: '3', 
    ingredients: ['сливочный сыр', 'печенье Oreo', 'сливки', 'ваниль', 'клубничный соус'],
    weight: 200,
    calories: 380,
    size: '1 порция'
  },
  { 
    id: '16', 
    name: 'Шоколадный брауни', 
    description: 'Плотный шоколадный десерт с грецкими орехами и вишней', 
    price: 249, 
    image_url: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&h=800&fit=crop&q=80', 
    category_id: '3', 
    ingredients: ['темный шоколад', 'грецкие орехи', 'сливочное масло', 'вишня', 'какао'],
    weight: 150,
    calories: 420,
    size: '1 порция'
  },
  { 
    id: '17', 
    name: 'Панна Котта', 
    description: 'Нежный итальянский десерт из сливок с ванилью и малиновым кули', 
    price: 279, 
    image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=800&fit=crop&q=80', 
    category_id: '3', 
    ingredients: ['сливки', 'ваниль', 'желатин', 'малина', 'сахар'],
    weight: 160,
    calories: 280,
    size: '1 порция'
  },
  { 
    id: '18', 
    name: 'Мороженое Ассорти', 
    description: 'Три шарика премиального мороженого на выбор: ваниль, шоколад, клубника', 
    price: 149, 
    image_url: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&h=800&fit=crop&q=80', 
    category_id: '3', 
    ingredients: ['молоко', 'сливки', 'сахар', 'ваниль', 'какао', 'клубника'],
    weight: 180,
    calories: 250,
    size: '3 шарика'
  }
]

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Use mock data (Supabase temporarily disabled)
    setCategories(mockCategories)
    setProducts(mockProducts)
    setLoading(false)
  }, [])

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const groupedProducts = categories.reduce((acc, category) => {
    acc[category.id] = products.filter(p => p.category_id === category.id)
    return acc
  }, {} as Record<string, Product[]>)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <Header categories={categories} />
      <HeroSlider />
      
      <div className="py-8">
        {categories.map((category) => (
          <CategorySection
            key={category.id}
            id={category.id}
            title={category.name}
            products={groupedProducts[category.id] || []}
            onProductClick={handleProductClick}
          />
        ))}
      </div>

      <ProductModal
        product={selectedProduct}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </main>
  )
}
