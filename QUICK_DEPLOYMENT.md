# 🚀 DEPLOYMENT RÁPIDO - 4 PASSOS PARA PRODUÇÃO

## OPÇÃO 1: DEPLOYMENT GRÁTIS (RECOMENDADO)
### Stack: Vercel (Frontend) + Railway (Backend) + Supabase (DB)
**Tempo total:** ~15 minutos | **Custo:** Grátis (primeiros meses)

---

### PASSO 1️⃣: Preparar Repositório GitHub

```powershell
# 1. Criar repo GitHub (se não tiver)
# https://github.com/new
# Nome: archeon-portfolio
# Descrição: Portfolio com CMS e Loja Digital

# 2. Fazer push do código
cd "C:\Users\Altamir Martins\Desktop\Faculdade\Programação\Site-2.0\Site-1.0"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU_USER/archeon-portfolio.git
git push -u origin main
```

---

### PASSO 2️⃣: Frontend - Deploy no Vercel

**5 passos:**

1. Acesso: https://vercel.com/login
2. "Sign up" → "Continue with GitHub"
3. Autorizar Vercel
4. Clicar "New Project"
5. Selecionar seu repo `archeon-portfolio`

**Configurar:**
```
Framework Preset: Vite ✓
Build Command: npm run build ✓
Output Directory: dist ✓
```

**Environment Variables:**
```
VITE_API_URL = https://seu-backend-railway.up.railway.app
```

Clicar **Deploy** ✅

**Esperado após ~2min:**
- ✅ Deploy completo
- ✅ URL pública: `https://archeon-portfolio.vercel.app`

---

### PASSO 3️⃣: Backend - Deploy no Railway

**5 passos:**

1. Acesso: https://railway.app/login
2. "Continue with GitHub"
3. Autorizar Railway
4. Dashboard → "New Project"
5. Selecionar GitHub repo

**Configurar Deploy:**
```
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

**Environment Variables → Adicionar:**
```
NODE_ENV = production
PORT = 8000
FRONTEND_URL = https://archeon-portfolio.vercel.app
JWT_SECRET = SEU_SECRET_ALEATORIO_LONGO
JWT_EXPIRES_IN = 7d
```

**Stripe (opcional por agora):**
```
STRIPE_SECRET_KEY = sk_test_...
```

**Cloudinary (opcional por agora):**
```
CLOUDINARY_CLOUD_NAME = seu-nome
CLOUDINARY_API_KEY = sua-key
```

Clicar **Deploy** ✅

**Esperado após ~3min:**
- ✅ Backend rodando
- ✅ URL: `https://seu-backend-railway.up.railway.app`

---

### PASSO 4️⃣: Database - Setup no Supabase

**7 passos:**

1. Acesso: https://supabase.com/login
2. "Sign up" → "Continue with GitHub"
3. Dashboard → "New Project"
4. Selecionar organização
5. Preencher:
   - Name: `archeon-db`
   - Database Password: `SEU_PASSWORD_FORTE`
   - Region: `North America` (mais perto)
6. Clicar "Create new project" (aguarde ~2min)

**Importar Schema:**

7. Abrir projeto → "SQL Editor"
8. Clicar "New Query"
9. Copiar conteúdo de `backend/models/schema.sql`
10. Colar na query e clicar "Run"

**Esperado:**
- ✅ Tabelas criadas
- ✅ Sem erros

**Pegar Connection String:**

1. Settings → Database → Connection String
2. Selecionar "Nodejs"
3. Copiar URL inteira

**Adicionar ao Railway Backend:**
```
Environment Variables → DATABASE_URL = [COLA_AQUI_A_URL]
```

Clicar "Deploy" ou redeployar ✅

---

### VERIFICAÇÃO PÓS-DEPLOY

```powershell
# Testar Backend
curl https://seu-backend-railway.up.railway.app/api/health
# Esperado: {"status":"ok"}

# Testar Frontend
# Abrir: https://archeon-portfolio.vercel.app
# Esperado: Site carrega
```

**Se houver erro:**
1. Railway Dashboard → Logs
2. Procurar erro "DATABASE_URL" ou "PORT"
3. Verificar se variáveis estão certas
4. Redeployar

---

## OPÇÃO 2: DEPLOYMENT COM DigitalOcean (~$6/mês)
### Stack: DigitalOcean App Platform (Full Stack)

**1. Criar droplet:**
```
- Plan: $6/mês (1GB RAM)
- OS: Ubuntu 22.04
- Region: São Paulo
```

**2. SSH conectar:**
```bash
ssh root@SEU_IP_AQUI

# Instalar Node
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PostgreSQL
sudo apt install postgresql postgresql-contrib

# Clonar repo
git clone https://github.com/user/archeon-portfolio.git
cd archeon-portfolio
```

**3. Setup:**
```bash
# Backend
cd backend
npm install
npm start &

# Frontend (build)
npm install
npm run build

# Nginx para servir dist/
sudo apt install nginx
# Copiar dist/ para /var/www/html
```

---

## OPÇÃO 3: Deploy com Heroku (Pago: $7/mês)

Heroku descontinuou free tier, mas ainda é fácil:

```bash
# 1. Instalar Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# 2. Login
heroku login

# 3. Criar app
heroku create archeon-production

# 4. Adicionar PostgreSQL
heroku addons:create heroku-postgresql:mini

# 5. Fazer push
git push heroku main
```

---

## ✅ CHECKLIST PÓS-DEPLOYMENT

```
VERIFICAR ANTES DE LIBERAR:

Frontend (Vercel):
- [ ] https://seu-dominio.vercel.app carrega
- [ ] Redirecionam correto
- [ ] Sem erro console (F12)

Backend (Railway):
- [ ] /api/health retorna 200
- [ ] Login funciona na produção
- [ ] Banco de dados conectado

Database (Supabase):
- [ ] Dados persistem após compra
- [ ] Edições admin salvas
- [ ] Backup automático ativado

Integrações:
- [ ] Stripe em modo teste? (ou remover por agora)
- [ ] Emails enviando? (verificar logs)
- [ ] CORS: Frontend → Backend = ✓

Segurança:
- [ ] JWT_SECRET é texto ALEATÓRIO longo
- [ ] NODE_ENV = production
- [ ] Sem console.log() de debug
```

---

## 🎯 URL FINAL

Após tudo pronto:

```
🌐 Frontend: https://archeon-portfolio.vercel.app
🔌 Backend:  https://seu-backend-railway.up.railway.app
🗄️  Database: Supabase (automático)
```

**Compartilhar com cliente:**
```
"Seu site está em produção! 🎉"
"Link: https://archeon-portfolio.vercel.app"
```

---

## 🔧 TROUBLESHOOTING DEPLOYMENT

### ❌ "Cannot find module 'pg'"
```bash
# Railway não instalou dependências
# Solução: Adicionar ao root package.json ou 
# verificar: backend/package.json tem "pg"?
```

### ❌ "Database connection refused"
```bash
# DATABASE_URL incorreta em Railway
# Solução:
# 1. Supabase → Settings → Connection String
# 2. Railway → Environment → DATABASE_URL
# 3. Redeployar
```

### ❌ "CORS error" no frontend
```javascript
// Backend → server.js
// Adicionar:
app.use(cors({
  origin: 'https://archeon-portfolio.vercel.app',
  credentials: true
}));
```

### ❌ "Build failed"
```bash
# Verificar logs:
# Vercel: Deployments → Details
# Railway: Deploy Logs → Recent
```

---

## 💡 DICAS FINAIS

1. **Usar Custom Domain?**
   - Vercel: Settings → Domains → Add
   - Railway: Settings → Public Networking

2. **Monitorar Erros?**
   - Sentry.io (grátis até 5k events/mês)
   - LogRocket (para frontend)

3. **Analytics?**
   - Vercel incluiu analytics
   - Adicionar: Google Analytics no HTML

4. **Próximos passos após produção?**
   - [ ] Coletar feedback de usuários
   - [ ] Otimizar Performance
   - [ ] Implementar Stripe completo
   - [ ] SEO (meta tags, sitemap)
   - [ ] Tests automatizados

