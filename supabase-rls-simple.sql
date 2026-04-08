-- POLÍTICAS RLS SIMPLIFICADAS (Alternativa)
-- Se as políticas acima forem muito complexas, use estas:

-- ===========================================
-- VERSÃO SIMPLIFICADA - DESABILITAR RLS TEMPORARIAMENTE
-- ===========================================

-- Desabilitar RLS para desenvolvimento (NÃO use em produção!)
ALTER TABLE content DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE purchases DISABLE ROW LEVEL SECURITY;
ALTER TABLE rewards DISABLE ROW LEVEL SECURITY;

-- Dar permissões básicas
GRANT SELECT ON content TO anon, authenticated;
GRANT SELECT ON products TO anon, authenticated;
GRANT ALL ON users TO anon, authenticated;
GRANT ALL ON purchases TO anon, authenticated;
GRANT ALL ON rewards TO anon, authenticated;

-- ===========================================
-- PARA PRODUÇÃO: REABILITE RLS E USE AS POLÍTICAS ACIMA
-- ===========================================