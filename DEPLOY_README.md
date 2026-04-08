# 🚀 DEPLOYMENT RÁPIDO - Supabase + Vercel + Render

## 📋 PRÉ-REQUISITOS

- Conta no GitHub (repositório público)
- Conta no Supabase (já configurado)
- Conta no Vercel
- Conta no Render

## 🔄 FLUXO DE DEPLOY

```
Usuário → Vercel (Frontend)
         ↓
    Render (Backend API)
         ↓
   Supabase (Database)
```

## 📝 PASSO 1: BACKEND - Render

1. Acesse https://render.com
2. **New Web Service**
3. Conecte seu repositório GitHub
4. **Configurações:**
   - **Name:** archeon-backend
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Root Directory:** `backend`

5. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://seu-frontend-vercel.vercel.app
   DATABASE_URL=postgresql://postgres:GTAfbi1450.@db.pdrkasxpqrbnkxcidiyf.supabase.co:5432/postgres
   JWT_SECRET=archeon-prod-jwt-secret-key-2024-very-secure-random-string-change-this
   JWT_EXPIRES_IN=7d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=seu-email@gmail.com
   EMAIL_PASS=sua-senha-app
   EMAIL_FROM=seu-email@gmail.com
   ADMIN_EMAIL=seu-email-admin@example.com
   ```

6. **Deploy** - Render gera URL como: `https://archeon-backend.onrender.com`

## 🌐 PASSO 2: FRONTEND - Vercel

1. Acesse https://vercel.com
2. **Import Project** do GitHub
3. **Configurações:**
   - **Framework Preset:** Vite
   - **Root Directory:** `.` (raiz)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. **Environment Variables:**
   ```
   VITE_API_URL=https://archeon-backend.onrender.com
   ```

5. **Deploy** - Vercel gera URL como: `https://archeon-portfolio.vercel.app`

## 🔄 PASSO 3: ATUALIZAR CORS NO BACKEND

Após ter as URLs finais:

1. No Render, atualize `FRONTEND_URL` para a URL do Vercel
2. Redeploy o backend no Render

## ✅ VERIFICAÇÃO

1. **Backend:** `https://archeon-backend.onrender.com/api/health`
   - Deve retornar `{"status": "OK"}`

2. **Frontend:** `https://archeon-portfolio.vercel.app`
   - Deve carregar o site
   - Login deve funcionar
   - Dados devem vir do Supabase

## 🔧 AJUSTES FINAIS

- **Domínio personalizado:** Configure no Vercel se necessário
- **SSL:** Automático em ambos
- **Monitoramento:** Use logs no Render/Vercel

## 🚨 IMPORTANTE

- Mude o `JWT_SECRET` para algo único e seguro
- Configure emails reais se quiser notificações
- Teste todas as funcionalidades após deploy