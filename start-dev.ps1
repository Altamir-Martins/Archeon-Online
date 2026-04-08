# Script para INICIAR PROJETO COMPLETO LOCALMENTE
# Uso: ./start-dev.ps1

Write-Host "="*60 -ForegroundColor Cyan
Write-Host "🚀 INICIANDO ARCHEON - DESENVOLVIMENTO LOCAL" -ForegroundColor Cyan
Write-Host "="*60 -ForegroundColor Cyan
Write-Host ""

$projectRoot = Get-Location

# ============================================================================
# 1. VERIFICAÇÕES PRÉ-REQUISITOS
# ============================================================================

Write-Host "📋 Verificando pré-requisitos..." -ForegroundColor Yellow

# Verificar Node.js
$nodeCheck = node --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js não instalado. Download: https://nodejs.org/" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Node.js $nodeCheck" -ForegroundColor Green

# Verificar npm
$npmCheck = npm --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm não instalado" -ForegroundColor Red
    exit 1
}
Write-Host "✓ npm $npmCheck" -ForegroundColor Green

# Verificar PostgreSQL
$pgCheck = psql --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  PostgreSQL não encontrado (opcional)" -ForegroundColor Yellow
    Write-Host "   Você pode pular testes de banco de dados" -ForegroundColor Yellow
} else {
    Write-Host "✓ PostgreSQL $pgCheck" -ForegroundColor Green
}

# Verificar package.json
if (-not (Test-Path "package.json")) {
    Write-Host "❌ package.json não encontrado na raiz" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Frontend package.json encontrado" -ForegroundColor Green

if (-not (Test-Path "backend/package.json")) {
    Write-Host "❌ backend/package.json não encontrado" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Backend package.json encontrado" -ForegroundColor Green

Write-Host ""
Write-Host "✅ Todos os pré-requisitos OK!" -ForegroundColor Green
Write-Host ""

# ============================================================================
# 2. INSTALAR DEPENDÊNCIAS (se necessário)
# ============================================================================

Write-Host "📦 Verificando dependências..." -ForegroundColor Yellow

if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependências frontend..." -ForegroundColor Cyan
    npm install
}
Write-Host "✓ Frontend pronto" -ForegroundColor Green

if (-not (Test-Path "backend/node_modules")) {
    Write-Host "Instalando dependências backend..." -ForegroundColor Cyan
    cd backend
    npm install
    cd $projectRoot
}
Write-Host "✓ Backend pronto" -ForegroundColor Green

Write-Host ""

# ============================================================================
# 3. VERIFICAR .env FILES
# ============================================================================

Write-Host "🔐 Verificando variáveis de ambiente..." -ForegroundColor Yellow

if (-not (Test-Path ".env")) {
    Write-Host "⚠️  .env frontend não encontrado"
    "VITE_API_URL=http://localhost:5000" | Out-File -Encoding UTF8 ".env"
    Write-Host "✓ Criado .env padrão" -ForegroundColor Green
}

if (-not (Test-Path "backend/.env")) {
    Write-Host "⚠️  backend/.env não encontrado"
    Write-Host "Criando com valores padrão dev..." -ForegroundColor Cyan
    
    @"
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

DATABASE_URL=postgresql://postgres:password@localhost:5432/archeon_db

JWT_SECRET=dev-secret-key-12345
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=dev
CLOUDINARY_API_KEY=dev
CLOUDINARY_API_SECRET=dev

STRIPE_SECRET_KEY=sk_test_dev
STRIPE_PUBLISHABLE_KEY=pk_test_dev
"@ | Out-File -Encoding UTF8 "backend/.env"
    
    Write-Host "⚠️  IMPORTANTE: Atualize backend/.env com credenciais reais" -ForegroundColor Yellow
    Write-Host "✓ Criado backend/.env" -ForegroundColor Green
}

Write-Host ""

# ============================================================================
# 4. INICIAR SERVIÇOS EM PARALELO
# ============================================================================

Write-Host "🔥 Iniciando serviços..." -ForegroundColor Cyan
Write-Host ""

# Criar jobs para terminal
Write-Host "Terminal 1: FRONTEND (Vite Dev Server)" -ForegroundColor Magenta
Write-Host "Terminal 2: BACKEND (Node.js Express)" -ForegroundColor Magenta
Write-Host ""

# Iniciar Frontend
Write-Host "▶️  Iniciando Frontend... (aguarde)" -ForegroundColor Cyan
$frontendJob = Start-Job -ScriptBlock {
    Set-Location $using:projectRoot
    npm run dev
} -Name "Frontend"

Start-Sleep -Seconds 3

# Iniciar Backend
Write-Host "▶️  Iniciando Backend... (aguarde)" -ForegroundColor Cyan
$backendJob = Start-Job -ScriptBlock {
    Set-Location "$using:projectRoot\backend"
    npm run dev
} -Name "Backend"

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "="*60 -ForegroundColor Green
Write-Host "✅ SISTEMA INICIADO COM SUCESSO!" -ForegroundColor Green
Write-Host "="*60 -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Acesso Frontend: " -ForegroundColor Green -NoNewline
Write-Host "http://localhost:5173" -ForegroundColor Cyan
Write-Host "🔌 Acesso Backend:  " -ForegroundColor Green -NoNewline
Write-Host "http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Checklist rápido:" -ForegroundColor Yellow
Write-Host "  [ ] Frontend carrega em http://localhost:5173"
Write-Host "  [ ] Backend responde em http://localhost:5000/api/health"
Write-Host "  [ ] Pode fazer login"
Write-Host "  [ ] Produtos carregam na /shop"
Write-Host "  [ ] Admin mode ativa botões EDITAR"
Write-Host ""
Write-Host "Para parar: CTRL+C ou feche os terminais" -ForegroundColor Yellow
Write-Host ""
Write-Host "Veja TESTING_AND_DEPLOYMENT.md para testes completos" -ForegroundColor Cyan
Write-Host ""

# Manter jobs rodando
Wait-Job -Job $frontendJob, $backendJob
