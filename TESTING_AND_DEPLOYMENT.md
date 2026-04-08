# ✅ GUIA COMPLETO: TESTES & DEPLOYMENT

## 📋 PRÉ-REQUISITOS

### ✓ Backend & Database
- [ ] **Node.js v16+** instalado
- [ ] **PostgreSQL 12+** instalado e rodando
- [ ] **Variáveis de Ambiente** (.env) configuradas
- [ ] **Dependências** instaladas: `npm install` no `/backend`

### ✓ Frontend  
- [ ] **Node.js** (mesmo requisito acima)
- [ ] **Dependências**: `npm install` na raiz
- [ ] **Variáveis Frontend** (.env) configuradas

### ✓ Serviços Externos (Opcionais, podem usar mock)
- [ ] Cloudinary (para upload de imagens) - OU use URLs locais
- [ ] Stripe (para pagamentos) - OU use modo teste
- [ ] Nodemailer (para emails) - OU desabilite em dev

---

## 🧪 FASE 1: TESTES LOCAIS (SEM BANCO DE DADOS)

### 1.1 Setup Inicial
```powershell
# Terminal 1 - Frontend
cd "c:\Users\Altamir Martins\Desktop\Faculdade\Programação\Site-2.0\Site-1.0"
npm install
npm run dev
# Acesso: http://localhost:5173
```

```powershell
# Terminal 2 - Backend (SEM banco inicialmente)
cd backend
npm install
npm run dev
# Backend rodará em http://localhost:5000
```

### 1.2 Verificar Conexão
```powershell
# Terminal 3 - Testar conexão
curl http://localhost:5000/api/health
```

**Esperado:** 
```json
{ "status": "ok" }
```

---

## 🗄️ FASE 2: CONFIGURAR BANCO DE DADOS

### 2.1 Opção A: PostgreSQL Local (Recomendado para Dev)

**Windows - Instalar PostgreSQL:**
1. Download: https://www.postgresql.org/download/windows/
2. Executar installer (escolha senha admin)
3. Usar pgAdmin ou linha de comando:

```sql
-- Abrir psql (Command Line PostgreSQL)
psql -U postgres

-- Criar novo database
CREATE DATABASE archeon_db;

-- Verificar criação
\l

-- Sair
\q
```

**2.2 Atualizar `.env` Backend:**
```env
DATABASE_URL=postgresql://postgres:SEU_PASSWORD@localhost:5432/archeon_db
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=dev-secret-key-12345
JWT_EXPIRES_IN=7d
```

**2.3 Importar Schema:**
```powershell
# No terminal
cd backend
psql -U postgres -d archeon_db -f models/schema.sql
```

**Esperado:** "No errors" ou "Queries executed successfully"

### 2.2 Opção B: PostgreSQL Cloud (Recomendado para Produção)

Use **Supabase** (free tier com 500MB):
1. Ir para https://supabase.com
2. Criar projeto novo
3. Copiar `Connection String` em Settings → Database
4. Colar em `.env`:
```env
DATABASE_URL=postgresql://postgres:PASSWORD@db.supabase.co:5432/postgres
```

---

## ✅ FASE 3: TESTES UNITÁRIOS (CADA FUNCIONALIDADE)

### 3.1 Testar Autenticação

```powershell
# Setup: Frontend já em http://localhost:5173

1. Ir para /login
2. Testar login com credenciais Mock (se disponível):
   - Email: admin@archeon.com
   - Senha: admin123

3. Esperado:
   ✓ Token JWT salvo em localStorage
   ✓ Redirect para /home
   ✓ Navbar mostra "ADMIN" ou nome do usuário
```

**Se Backend + DB OK:**
```powershell
# Terminal - Registrar novo usuário
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{ \"username\":\"testuser\", \"email\":\"test@email.com\", \"password\":\"Test123\" }"
```

**Esperado:**
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@email.com",
    "isAdmin": false,
    "points": 0,
    "level": 1,
    "title": "Aprendiz"
  }
}
```

### 3.2 Testar Shop (Produtos & Compras)

**Na página /shop:**
```
1. ✓ Produtos carregam da API
2. ✓ Pode adicionar produtos ao carrinho
3. ✓ Preço converte corretamente (USD/BRL/EUR)
4. ✓ Admin pode editar preço com botão EDITAR
5. ✓ Após compra: pontos aparecem no perfil
```

**Comando manual (se necessário):**
```powershell
curl -X GET http://localhost:5000/api/shop/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 3.3 Testar Home (Edição de Conteúdo)

**Como Admin (Editar Mode ligado):**
```
1. Quando ativar "ADMIN MODE", aparecem botões amarelos EDITAR
2. Clicar em EDITAR no título/subtítulo/imagem do hero
3. Modal abre para edição
4. Após SALVAR: 
   ✓ Conteúdo atualiza imediatamente
   ✓ Recarregar página → continua salvo = ✅ Banco funcionando
```

### 3.4 Testar Portfolio

**Na página /portfolio:**
```
1. ✓ 4 projetos carregam
2. ✓ Clicar em projeto = modal abre
3. ✓ Como Admin: editar títulos/descrições
4. ✓ Recarregar = edições persistem ✅
```

### 3.5 Testar Formulário de Contato

**Na página /solicitar-projeto:**
```
1. ✓ Preencher formulário completo
2. ✓ Marcar checkbox de termos
3. ✓ Clicar INICIAR PROJETO
4. ✓ "Mensagem enviada com sucesso" aparece
5. ✓ Email de confirmação é enviado (se Nodemailer OK)
```

**Validar email enviado:**
```powershell
# Verificar logs do terminal backend
# Deve conter: "✅ Email enviado para: admin@archeon.com"
```

### 3.6 Testar Gamificação

**Perfil do usuário:**
```
1. Fazer uma compra na loja = +10 pontos
2. ✓ Level aumenta a cada 200 pontos
3. ✓ Título muda: Aprendiz → Artesão → Mestre → Lendário
4. ✓ Badge aparece na navbar
```

---

## 🐛 CHECKLIST DE VALIDAÇÃO

### Backend Rodando?
```powershell
# Deve retornar status 200
curl http://localhost:5000/api/health
```

### Banco de Dados Conectado?
```powershell
# Deve retornar lista de users (vazio inicialmente)
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer INVALID_TOKEN"
# Deve retornar 401 (não autorizado), não erro de conexão
```

### JWT Token Válido?
```powershell
# Fazer login primeiro, copiar token
$token = "seu_jwt_aqui"

curl -X GET http://localhost:5000/api/auth/validate \
  -H "Authorization: Bearer $token"
# Deve retornar dados do usuário
```

### API Responde Corretamente?
```powershell
# Testar cada rota chave
curl http://localhost:5000/api/content          # Content API
curl http://localhost:5000/api/shop/products    # Shop API
```

---

## 🚀 FASE 4: DEPLOYMENT NA WEB

### Opção 1: Deployment GRÁTIS (Recomendado Iniciantes)

#### Frontend: Vercel (Recomendado)
1. **Criar conta:** https://vercel.com
2. **Conectar GitHub:** Importar repositório
3. **Configurar:** 
   - Framework: Vite
   - Build: `npm run build`
   - Output: `dist`
4. **Environment:** Adicionar `.env.production`:
   ```env
   VITE_API_URL=https://seu-backend.com
   ```
5. **Deploy:** Automático a cada push no `main`

#### Backend: Railway ou Render
**Railway (mais fácil):**
1. Acesso: https://railway.app
2. Deploy em 2 cliques
3. Conectar PostgreSQL automática
4. Variáveis de ambiente na dashboard

**OU Render:**
1. Acesso: https://render.com
2. New Web Service
3. Conectar GitHub repo `/backend`
4. Build: `npm install`
5. Start: `npm start`

#### Banco de Dados: Supabase (Grátis + Poderoso)
1. https://supabase.com → Create Project
2. Copiar URL PostgreSQL
3. Importar schema: `schema.sql`
4. Railway/Render → Environment:
   ```env
   DATABASE_URL=postgresql://...@supabase.co:5432/postgres
   ```

### Opção 2: Deployment PAGO (Produção)

**AWS Lightsail** (~$5/mês):
- Node.js preconfigurado
- Banco incluso
- SSL automático

**DigitalOcean** (~$6/mês):
- Ubuntu droplet
- PostgreSQL separado
- Maior controle

**Heroku** (agora pago):
- Antes era grátis, agora $7/mês
- Ainda é fácil para iniciantes

---

## ⚙️ CHECKLIST PRÉ-DEPLOYMENT

```
ANTES DE COLOCAR NO AR:

Frontend:
- [ ] Remover console.log() de debug
- [ ] .env produção com URL correta
- [ ] Build local: npm run build → dist/ gerado
- [ ] Testar build localmente: preview mode
- [ ] CORS habilitado no backend

Backend:
- [ ] NODE_ENV=production no .env
- [ ] JWT_SECRET mudado (não use dev)
- [ ] Database backup feito
- [ ] Rate limiting ativado (proteção DDoS)
- [ ] Helmet segurança headers
- [ ] Logs estruturados

Banco:
- [ ] Backup PostgreSQL criado
- [ ] SSL habilitado
- [ ] Connections limit configurado
- [ ] Schema migrations testadas
```

---

## 🔧 TROUBLESHOOTING COMUM

### ❌ "Cannot find module"
```powershell
# Solução: Reinstalar dependências
cd backend
rm -r node_modules package-lock.json
npm install
```

### ❌ "Port 5000 already in use"
```powershell
# Matar processo na porta
netstat -ano | findstr 5000
taskkill /PID <PID> /F
```

### ❌ "Database connection refused"
```powershell
# PostgreSQL não está rodando
# Windows: Iniciar via Services ou:
pg_ctl -D "C:\Program Files\PostgreSQL\data" start

# Verificar:
psql -U postgres -c "SELECT 1"
```

### ❌ "CORS error" no frontend
**Backend precisa:**
```javascript
// server.js
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### ❌ "JWT token expired"
**Fazer login novamente:**
```javascript
// AuthContext valida automaticamente ao recarregar
// Se token morrer: localStorage.clear() + login novamente
```

### ❌ "Image upload fails"
```javascript
// Usar Cloudinary OU URLs públicas
// Em dev: usar URLs de exemplo (unsplash, etc)
// Em prod: configurar CLOUDINARY_API_KEY
```

---

## 📊 TESTE DE PERFORMANCE

Depois que tudo funciona, testar velocidade:

```powershell
# Terminal - Medir tempo de resposta
Measure-Command {
  curl http://localhost:5000/api/shop/products
} | Select-Object TotalMilliseconds

# Esperado: < 200ms para queries simples
```

---

## ✅ CHECKLIST FINAL: "TUDO FUNCIONA?"

```javascript
✓ Frontend carrega em http://localhost:5173
✓ Backend responde em http://localhost:5000
✓ Login funciona e salva JWT
✓ Produtos carregam do banco
✓ Editar conteúdo persiste após recarregar
✓ Compras registram pontos
✓ Formulário envia emails
✓ Imagens carregam corretamente
✓ Sem erros no console (F12 DevTools)
✓ Sem erros no terminal do backend
✓ Código pronto para produção (sem console.log debug)

Se tudo acima está ✓ = PRONTO PARA PRODUCTION!
```

---

## 🎯 PRÓXIMOS PASSOS

1. **Rodar localmente** seguindo FASE 1-3
2. **Validar tudo** com CHECKLIST FINAL
3. **Escolher provedor** (Vercel + Railway é mais fácil)
4. **Fazer deploy** e compartilhar URL
5. **Monitorar** erros em produção

