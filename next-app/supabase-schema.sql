-- Pizza Delivery App Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  order_column INTEGER DEFAULT 0
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  ingredients TEXT[] DEFAULT '{}'
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  total_amount INTEGER NOT NULL,
  status TEXT DEFAULT 'new',
  items JSONB NOT NULL
);

-- Insert sample categories
INSERT INTO categories (name, image_url, order_column) VALUES
  ('Пицца', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop', 1),
  ('Напитки', 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=200&fit=crop', 2),
  ('Десерты', 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200&h=200&fit=crop', 3);

-- Insert sample products
INSERT INTO products (name, description, price, image_url, category_id, ingredients) VALUES
  -- Pizzas
  ('Пепперони', 'Классическая пицца с пикантными колбасками пепперони и моцареллой', 599, 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Пицца'), ARRAY['моцарелла', 'пепперони', 'томатный соус']),
  ('Маргарита', 'Традиционная итальянская пицца с томатами и свежим базиликом', 499, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Пицца'), ARRAY['моцарелла', 'томаты', 'базилик', 'оливковое масло']),
  ('Четыре сыра', 'Изысканная пицца с четырьмя видами сыра: моцарелла, пармезан, горгонзола, эмменталь', 699, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Пицца'), ARRAY['моцарелла', 'пармезан', 'горгонзола', 'эмменталь']),
  ('Гавайская', 'Сочная ветчина и сладкий ананас — тропическое наслаждение', 549, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Пицца'), ARRAY['ветчина', 'ананас', 'моцарелла', 'томатный соус']),
  ('Мясная', 'Ассорти из мяса: ветчина, пепперони, бекон, колбаски', 749, 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Пицца'), ARRAY['ветчина', 'пепперони', 'бекон', 'колбаски', 'моцарелла']),
  
  -- Drinks
  ('Coca-Cola', 'Классический прохладительный напиток', 99, 'https://images.unsplash.com/photo-1622483767028-3f66f328efc7?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Напитки'), ARRAY[]),
  ('Fanta', 'Апельсиновый прохладительный напиток', 99, 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Напитки'), ARRAY[]),
  ('Sprite', 'Лимонно-лаймовый прохладительный напиток', 99, 'https://images.unsplash.com/photo-1629203850128-22a75e518327?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Напитки'), ARRAY[]),
  ('Вода', 'Чистая питьевая вода без газа', 49, 'https://images.unsplash.com/photo-1560023907-5f339617ea30?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Напитки'), ARRAY[]),
  ('Лимонад', 'Домашний лимонад с мятой и лимоном', 149, 'https://images.unsplash.com/photo-1513558161099-b897e2d8c41a?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Напитки'), ARRAY['лимон', 'мята', 'сахар']),
  
  -- Desserts
  ('Тирамису', 'Нежный итальянский десерт с маскарпоне', 299, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Десерты'), ARRAY['маскарпоне', 'савоярди', 'кофе', 'какао']),
  ('Чизкейк', 'Классический нью-йоркский чизкейк', 349, 'https://images.unsplash.com/photo-1533134242116-79c5e60818a7?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Десерты'), ARRAY['сливочный сыр', 'печенье', 'ягоды']),
  ('Брауни', 'Шоколадный десерт с орехами', 249, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476d?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Десерты'), ARRAY['шоколад', 'орехи', 'масло']),
  ('Панна Котта', 'Итальянский сливочный десерт с ягодным соусом', 279, 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Десерты'), ARRAY['сливки', 'ваниль', 'ягоды']),
  ('Мороженое', 'Шарик пломбира с топпингом на выбор', 149, 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&h=600&fit=crop', ARRAY['молоко', 'сливки', 'сахар', 'ваниль']);
