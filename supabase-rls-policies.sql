-- Políticas RLS (Row Level Security) para Archeon
-- Execute no SQL Editor do Supabase APÓS executar o schema principal

-- ===========================================
-- 1. TABELA: content (Conteúdo público)
-- ===========================================

-- Habilitar RLS
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Política: Permitir leitura pública de todo conteúdo
CREATE POLICY "Conteúdo público - leitura" ON content
    FOR SELECT USING (true);

-- Política: Apenas admins podem inserir/editar conteúdo
CREATE POLICY "Conteúdo - admins podem modificar" ON content
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.is_admin = true
        )
    );

-- ===========================================
-- 2. TABELA: products (Produtos públicos)
-- ===========================================

-- Habilitar RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Política: Permitir leitura pública de produtos
CREATE POLICY "Produtos públicos - leitura" ON products
    FOR SELECT USING (true);

-- Política: Apenas admins podem modificar produtos
CREATE POLICY "Produtos - admins podem modificar" ON products
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.is_admin = true
        )
    );

-- ===========================================
-- 3. TABELA: users (Dados dos usuários)
-- ===========================================

-- Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ver seus próprios dados
CREATE POLICY "Usuários - ver próprio perfil" ON users
    FOR SELECT USING (auth.uid() = id);

-- Política: Usuários podem atualizar seus próprios dados (exceto is_admin)
CREATE POLICY "Usuários - atualizar próprio perfil" ON users
    FOR UPDATE USING (auth.uid() = id)
    WITH CHECK (
        auth.uid() = id
        AND (OLD.is_admin = NEW.is_admin OR OLD.is_admin = false)
    );

-- Política: Permitir inserção para registro (signup)
CREATE POLICY "Usuários - permitir registro" ON users
    FOR INSERT WITH CHECK (true);

-- Política: Apenas admins podem ver todos os usuários
CREATE POLICY "Usuários - admins podem ver tudo" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users u
            WHERE u.id = auth.uid()
            AND u.is_admin = true
        )
    );

-- ===========================================
-- 4. TABELA: purchases (Compras)
-- ===========================================

-- Habilitar RLS
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ver suas próprias compras
CREATE POLICY "Compras - ver próprias" ON purchases
    FOR SELECT USING (auth.uid() = user_id);

-- Política: Usuários podem inserir suas próprias compras
CREATE POLICY "Compras - inserir próprias" ON purchases
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Política: Apenas admins podem ver todas as compras
CREATE POLICY "Compras - admins podem ver tudo" ON purchases
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.is_admin = true
        )
    );

-- ===========================================
-- 5. TABELA: rewards (Recompensas)
-- ===========================================

-- Habilitar RLS
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ver suas próprias recompensas
CREATE POLICY "Recompensas - ver próprias" ON rewards
    FOR SELECT USING (auth.uid() = user_id);

-- Política: Sistema pode inserir recompensas (usando service role)
CREATE POLICY "Recompensas - sistema pode inserir" ON rewards
    FOR INSERT WITH CHECK (true);

-- Política: Apenas admins podem ver todas as recompensas
CREATE POLICY "Recompensas - admins podem ver tudo" ON rewards
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.is_admin = true
        )
    );

-- ===========================================
-- NOTA IMPORTANTE:
-- ===========================================
-- Para que as políticas funcionem corretamente, você precisa:
-- 1. Configurar Authentication no Supabase
-- 2. Usar auth.uid() nas queries do backend
-- 3. Para operações admin, usar service role key
--
-- Se ainda houver erros, verifique se o Authentication está habilitado
-- no seu projeto Supabase (Authentication > Settings)