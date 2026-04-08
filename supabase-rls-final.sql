-- ============================================
-- RLS (Row Level Security) Policies - Archeon
-- Execute in SQL Editor AFTER running the main schema
-- ============================================

-- ==============================================
-- TABLE: users (Already created, applying RLS)
-- ==============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Public can read user profiles (basic info only)
CREATE POLICY "users_public_read" ON users
  FOR SELECT USING (true);

-- Users can read their own full profile
CREATE POLICY "users_self_read" ON users
  FOR SELECT USING (auth.uid() = id OR is_admin = true);

-- Users can update their own profile
CREATE POLICY "users_self_update" ON users
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ==============================================
-- TABLE: shop_products
-- ==============================================

ALTER TABLE shop_products ENABLE ROW LEVEL SECURITY;

-- Everyone can read shop products
CREATE POLICY "shop_products_public_read" ON shop_products
  FOR SELECT USING (true);

-- Only admins can INSERT products
CREATE POLICY "shop_products_admin_insert" ON shop_products
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

-- Only admins can UPDATE products
CREATE POLICY "shop_products_admin_update" ON shop_products
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

-- Only admins can DELETE products
CREATE POLICY "shop_products_admin_delete" ON shop_products
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

-- ==============================================
-- TABLE: purchases
-- ==============================================

ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Users can read their own purchases
CREATE POLICY "purchases_user_read" ON purchases
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

-- Users can INSERT their own purchases
CREATE POLICY "purchases_user_insert" ON purchases
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Only admins can UPDATE/DELETE
CREATE POLICY "purchases_admin_update" ON purchases
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

-- ==============================================
-- TABLE: rewards
-- ==============================================

ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;

-- Users can read their own rewards
CREATE POLICY "rewards_user_read" ON rewards
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

-- Users can UPDATE their own rewards (mark as used)
CREATE POLICY "rewards_user_update" ON rewards
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ==============================================
-- TABLE: site_content
-- ==============================================

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Everyone can read site content
CREATE POLICY "site_content_public_read" ON site_content
  FOR SELECT USING (true);

-- Only admins can INSERT/UPDATE/DELETE content
CREATE POLICY "site_content_admin_write" ON site_content
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

CREATE POLICY "site_content_admin_update" ON site_content
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

CREATE POLICY "site_content_admin_delete" ON site_content
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

-- ==============================================
-- TABLE: admin_logs
-- ==============================================

ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can read admin logs
CREATE POLICY "admin_logs_admin_read" ON admin_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );

-- Only admins can INSERT logs (via backend)
CREATE POLICY "admin_logs_admin_insert" ON admin_logs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.is_admin = true
    )
  );
