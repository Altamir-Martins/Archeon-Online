# Script para configurar Supabase no projeto Archeon
param(
    [Parameter(Mandatory=$true)]
    [string]$ConnectionString
)

Write-Host "=== CONFIGURANDO SUPABASE PARA ARCHEON ===" -ForegroundColor Cyan
Write-Host ""

# Verificar formato da connection string
if ($ConnectionString -match 'postgresql://postgres\.([^:]+):([^@]+)@db\.([^:]+)\.supabase\.co:5432/postgres') {
    $projectId = $matches[1]
    $password = $matches[2]
    $dbHost = "db.$($matches[3]).supabase.co"

    Write-Host "✅ Connection String válida detectada" -ForegroundColor Green
    Write-Host "   Project ID: $projectId" -ForegroundColor Gray
    Write-Host "   Database Host: $dbHost" -ForegroundColor Gray
    Write-Host ""

    # Criar backend/.env
    $envContent = "# Environment Configuration`n"
    $envContent += "NODE_ENV=development`n"
    $envContent += "PORT=5000`n"
    $envContent += "FRONTEND_URL=http://localhost:5173`n"
    $envContent += "`n"
    $envContent += "# Database`n"
    $envContent += "DATABASE_URL=$ConnectionString`n"
    $envContent += "`n"
    $envContent += "# JWT`n"
    $envContent += "JWT_SECRET=archeon-dev-jwt-secret-key-2024-very-secure-random-string`n"
    $envContent += "JWT_EXPIRES_IN=7d`n"
    $envContent += "`n"
    $envContent += "# Cloudinary (Opcional - para upload de imagens)`n"
    $envContent += "CLOUDINARY_CLOUD_NAME=your-cloud-name`n"
    $envContent += "CLOUDINARY_API_KEY=your-api-key`n"
    $envContent += "CLOUDINARY_API_SECRET=your-api-secret`n"
    $envContent += "`n"
    $envContent += "# Stripe (Opcional - para pagamentos)`n"
    $envContent += "STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key`n"
    $envContent += "STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key`n"

    $envContent | Out-File -FilePath "backend\.env" -Encoding UTF8
    Write-Host "✅ Arquivo backend/.env atualizado!" -ForegroundColor Green

    # Criar .env do frontend
    $frontendEnvContent = "VITE_API_URL=http://localhost:5000"
    $frontendEnvContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "✅ Arquivo .env do frontend atualizado!" -ForegroundColor Green

    Write-Host ""
    Write-Host "🎯 PRÓXIMOS PASSOS:" -ForegroundColor Yellow
    Write-Host "1. Execute o arquivo supabase-schema.sql no SQL Editor do Supabase" -ForegroundColor White
    Write-Host "2. Reinicie o backend: cd backend; node server.js" -ForegroundColor White
    Write-Host "3. Teste as páginas - os erros 'Failed to fetch' devem desaparecer!" -ForegroundColor White
    Write-Host ""

} else {
    Write-Host "❌ Formato de Connection String inválido!" -ForegroundColor Red
    Write-Host "Exemplo correto: postgresql://postgres.abc123:password@db.abc123.supabase.co:5432/postgres" -ForegroundColor Yellow
    exit 1
}