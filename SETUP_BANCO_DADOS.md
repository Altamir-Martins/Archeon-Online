# 🗄️ Guia Completo: Ativar Banco de Dados Archeon

## Passo 1: Verificar o Projeto Supabase

1. Acesse [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto **Archeon**
3. Vá em **SQL Editor** (colchete `{ }` na sidebar esquerda)

## Passo 2: Executar o Schema Principal

1. Clique em **New Query**
2. Copie TODO o conteúdo de `supabase-schema.sql` do seu repositório
3. Cole na query editor
4. Clique em **Run** (botão azul)
5. Aguarde completar (algo como "OK ~2 segundos")

### Resultado esperado:
```
✅ Todas as 6 tabelas criadas:
  - users
  - shop_products
  - purchases
  - rewards
  - site_content
  - admin_logs
```

## Passo 3: Executar as Políticas de RLS (Segurança)

1. Clique em **New Query** novamente
2. Copie TODO o conteúdo de `supabase-rls-final.sql`
3. Cole na query editor
4. Clique em **Run**
5. Aguarde completar

### Resultado esperado:
```
✅ 20+ políticas de segurança criadas
```

## Passo 4: Verificar o Status no Supabase

### Para verificar as tabelas:
1. Vá em **Database** (ícone de tabela)
2. Veja a lista de tabelas na esquerda
3. Confirme que todas as 6 estão lá

### Para verificar RLS está ativado:
1. Clique em cada tabela
2. Vá para **RLS** no topo da página
3. Confirme que mostra "Policies" com múltiplas linhas ✅

### Para verificar Security Issues estão resolvidos:
1. Vá em **Security** na sidebar
2. Clique em **Security Advisor**
3. Deve mostrar 0 erros (era 3 avisos de RLS)

## Passo 5: Testar Localmente

```bash
# No terminal do VS Code no seu projeto
cd backend
node test-db.js
```

### Resultado esperado:
```
🔄 Testando conexão com Supabase...
✅ Conexão estabelecida!
📋 Tabelas encontradas: [
  'users',
  'rewards',
  'purchases',
  'site_content',
  'admin_logs',
  'shop_products'
]
✅ Todas as tabelas necessárias existem!
```

Se não funcionar e der erro de `ETIMEDOUT`:
- Verifique se o `DATABASE_URL` está correto em `backend/.env`
- Confirme que o projeto Supabase está **ativo** (não pausado)

## Passo 6: Iniciar o Backend Localmente

```bash
# No terminal do VS Code
cd backend
npm start
```

### Resultado esperado:
```
✅ Connected to PostgreSQL database
✅ Admin já existe no banco de dados (ou: ✅ Admin criado automaticamente)
🚀 Archeon Backend running on port 5000
```

## Passo 7: Testar Admin Login

1. Abra o frontend localmente:
   ```bash
   npm run dev
   ```

2. Acesse a página de login: `http://localhost:5173/login`

3. Use as credenciais:
   - **Username/Email**: `ArchADM-123`
   - **Senha**: `#ADM123`

4. Se funcionar, será redirecionado para Home

## 🚀 Após Confirmar que Tudo Funciona Localmente

Execute este comando para fazer rebuild no Render e Vercel:

```bash
# Isso força rebuild automático pelas plataformas
git add .
git commit -m "Trigger deploy after database setup"
git push
```

Os deploys (Render + Vercel) vão automaticamente se atualizar com o novo código.

## ❌ Se Algo Não Funcionar

### Erro: "ETIMEDOUT na conexão"
- O Supabase pode estar bloqueando por IPv6
- Tente resetar a senha do banco no Supabase: **Settings > Database > Reset Password**
- Copie a nova connection string e atualize em `backend/.env`

### Erro: "Tabelas não encontradas"
- Confirme que executou o `supabase-schema.sql` primeiro
- Confirme que executou o `supabase-rls-final.sql` depois

### Erro: "Admin não consegue logar"
- Confirme que todas as variáveis estão corretas: `ADMIN_USERNAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
- Reinicie o backend: `npm start` no terminal

### Erro: "Failed to Fetch" no frontend
- Confirme que o backend está rodando em `http://localhost:5000`
- Confirme que `VITE_API_URL` não está conflitando

---

## 📋 Checklist Final

- [ ] Acessou `https://supabase.com/dashboard`
- [ ] Executou `supabase-schema.sql` via SQL Editor
- [ ] Executou `supabase-rls-final.sql` via SQL Editor
- [ ] Rodou `node test-db.js` e viu "✅ Todas as tabelas"
- [ ] Rodou `npm start` em `backend/` e viu "🚀 running on port 5000"
- [ ] Testou login com `ArchADM-123` / `#ADM123`
- [ ] Funcionou! ✅

---

**Pronto!** Se seguir esses passos na ordem, o banco de dados Archeon vai funcionar 100%.
