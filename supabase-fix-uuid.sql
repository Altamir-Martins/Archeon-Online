-- FIX PARA ERRO DE UUID vs INTEGER
-- Execute este script COMPLETO no SQL Editor do Supabase

-- ===========================================
-- PASSO 1: REMOVER TABELAS EXISTENTES
-- ===========================================

DROP TABLE IF EXISTS rewards CASCADE;
DROP TABLE IF EXISTS purchases CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS content CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ===========================================
-- PASSO 2: CRIAR TABELAS COM UUID (Correto para Supabase)
-- ===========================================

CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  title VARCHAR(50) DEFAULT 'Novato',
  services_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page VARCHAR(50) NOT NULL,
  section VARCHAR(50) NOT NULL,
  field VARCHAR(50) NOT NULL,
  value TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(page, section, field)
);

CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  product_id UUID REFERENCES products(id),
  stripe_payment_id VARCHAR(100),
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rewards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type VARCHAR(50) NOT NULL,
  points INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- PASSO 3: INSERIR DADOS INICIAIS
-- ===========================================

INSERT INTO content (page, section, field, value) VALUES
('home', 'hero', 'title', 'FORJANDO MUNDOS PARA JOGOS E RPG'),
('home', 'hero', 'subtitle', 'Concept art e direção visual para projetos que exigem identidade forte e imersão.'),
('home', 'hero', 'image', '/images/hero-default.jpg'),
('shop', 'page', 'title', 'LOJA DIGITAL'),
('shop', 'page', 'subtitle', 'Produtos e assets exclusivos para seus projetos');

INSERT INTO products (name, description, price, image_url) VALUES
('Website Básico', 'Site institucional responsivo com até 5 páginas', 500.00, '/images/website-basico.jpg'),
('E-commerce', 'Loja virtual completa com painel administrativo', 1500.00, '/images/ecommerce.jpg'),
('App Mobile', 'Aplicativo nativo para iOS e Android', 2500.00, '/images/app-mobile.jpg'),
('Concept Art Pack', 'Pacote com 10 artes conceituais para jogos', 300.00, '/images/concept-art.jpg'),
('UI/UX Design', 'Design de interface completo para aplicações', 800.00, '/images/ui-ux.jpg');

-- ===========================================
-- PASSO 4: CRIAR ÍNDICES
-- ===========================================

CREATE INDEX idx_content_page_section ON content(page, section);
CREATE INDEX idx_purchases_user_id ON purchases(user_id);
CREATE INDEX idx_rewards_user_id ON rewards(user_id);

-- ===========================================
-- PASSO 5: HABILITAR RLS E CRIAR POLÍTICAS
-- ===========================================

-- Content (público)
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Conteúdo público" ON content FOR SELECT USING (true);
CREATE POLICY "Conteúdo admin" ON content FOR ALL USING (auth.uid() IS NOT NULL);

-- Products (público)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Produtos públicos" ON products FOR SELECT USING (true);
CREATE POLICY "Produtos admin" ON products FOR ALL USING (auth.uid() IS NOT NULL);

-- Users (privado)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuários próprios" ON users FOR ALL USING (auth.uid() = id);

-- Purchases (privado)
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Compras próprias" ON purchases FOR ALL USING (auth.uid() = user_id);

-- Rewards (privado)
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Recompensas próprias" ON rewards FOR ALL USING (auth.uid() = user_id);

-- ===========================================
-- SUCESSO! Agora o banco está configurado corretamente
-- ===========================================