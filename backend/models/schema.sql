-- Archeon Database Schema
-- Run this file to initialize the database

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  points INTEGER DEFAULT 0,
  services_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Rewards table
CREATE TABLE IF NOT EXISTS rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  used BOOLEAN DEFAULT FALSE,
  earned_at TIMESTAMP DEFAULT NOW(),
  used_at TIMESTAMP NULL
);

-- Purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  service_name VARCHAR(100) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  points_earned INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Site content table (for CMS)
CREATE TABLE IF NOT EXISTS site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_key VARCHAR(100) UNIQUE NOT NULL,
  content_type VARCHAR(20) NOT NULL,
  content_value TEXT NOT NULL,
  element_position JSONB NULL,
  updated_by UUID REFERENCES users(id),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Admin logs table
CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(50) NOT NULL,
  content_key VARCHAR(100),
  old_value TEXT,
  new_value TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Shop products table
CREATE TABLE IF NOT EXISTS shop_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(50),
  image_url VARCHAR(500),
  points_for_10_discount INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_rewards_user_id ON rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_site_content_key ON site_content(content_key);
CREATE INDEX IF NOT EXISTS idx_admin_logs_user_id ON admin_logs(user_id);

-- Insert default admin user (password will be hashed by the app)
-- Password: #ADM123 (this will be hashed)
INSERT INTO users (username, email, password_hash, is_admin)
VALUES ('ArchADM-123', 'admin@archeont.com', '$2a$10$placeholder.hash.will.be.replaced', true)
ON CONFLICT (username) DO NOTHING;

-- Insert sample shop products
INSERT INTO shop_products (name, description, price, category, image_url, points_for_10_discount) VALUES
('Medieval Castle Pack', 'Complete castle assets for RPG games', 49.99, 'Assets', '/images/shop/castle-pack.jpg', 50),
('Fantasy Character Templates', 'Ready-to-use character designs', 29.99, 'Templates', '/images/shop/character-templates.jpg', 30),
('Concept Art Tutorial', 'Learn advanced concept art techniques', 19.99, 'Tutorials', '/images/shop/concept-tutorial.jpg', 20),
('Digital Brushes Set', 'Professional brushes for Photoshop', 14.99, 'Brushes', '/images/shop/brushes-set.jpg', 15),
('Texture Collection', 'High-res textures for 3D modeling', 39.99, 'Assets', '/images/shop/textures.jpg', 40),
('Storyboard Template', 'Professional storyboard layouts', 24.99, 'Templates', '/images/shop/storyboard.jpg', 25)
ON CONFLICT DO NOTHING;