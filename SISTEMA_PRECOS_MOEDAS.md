# Sistema de Edição de Preços e Conversão de Moedas

## 📝 Visão Geral

Este documento descreve como o sistema de edição de preços e conversão de moedas funciona na loja digital do Archeon.

## 🎯 Funcionalidades

### 1. Edição de Preços (Admin)
- Apenas administradores podem editar preços dos produtos
- Ao clicar no ícone de edição próximo ao preço, abre um modal de edição
- Aceita apenas números válidos
- Validação de entrada (número positivo)

### 2. Cálculo Automático de Pontos
- Quando o admin define um novo preço, os **pontos para 10% desconto** são calculados automaticamente
- Fórmula: `points = Math.ceil(price * 0.1)`
- Exemplo: 
  - Preço R$ 100.00 → 10 pontos para 10% desconto
  - Preço R$ 49.90 → 5 pontos para 10% desconto

### 3. Conversão de Moedas
- Suporte para 3 moedas: Real (BRL), Dólar (USD), Euro (EUR)
- Seletor de moedas no topo da página da loja
- Conversão em tempo real (frontend)
- Todos os dados são armazenados em Real (BRL) no banco de dados

### 4. Taxas de Câmbio
Taxas de câmbio usadas (com base em Real como moeda base):

| Moeda | Código | Taxa  | Símbolo |
|-------|--------|-------|---------|
| Real | BRL | 1.0 | R$ |
| Dólar | USD | 5.20 | $ |
| Euro | EUR | 5.65 | € |

**Nota**: Essas taxas são fixas no código e devem ser atualizadas manualmente. Para um sistema de produção, considere usar uma API de câmbio em tempo real.

## 🛠️ Implementação

### Backend

#### Novo Endpoint
```
PUT /api/shop/products/:productId/price
```

**Request:**
```json
{
  "price": 99.90
}
```

**Response:**
```json
{
  "message": "Price updated successfully",
  "product": {
    "id": "...",
    "price": 99.90,
    "points_for_10_discount": 10,
    ...
  }
}
```

**Segurança**: Requer token JWT de admin

#### Arquivo: `backend/models/currency.js`
- Funções de conversão de moedas
- Cálculo de pontos
- Formatação de moeda

#### Arquivo: `backend/routes/shop.js`
- Endpoint `PUT /api/shop/products/:productId/price`
- Validação de preço
- Cálculo automático de pontos

### Frontend

#### Novo Componente: `EditablePrice.tsx`
- Exibe preço no formato apropriado da moeda
- Modo edição com botão flutuante
- Validação de entrada
- Seletor de moeda inline

#### Funções Utilitárias: `src/app/utils/currency.ts`
- `convertCurrency()`: Converte entre moedas
- `calculatePointsFor10Percent()`: Calcula pontos automaticamente
- `formatCurrency()`: Formata valor como moeda
- `getAvailableCurrencies()`: Retorna lista de moedas disponíveis

#### Modificações em `Shop.tsx`
- Adicionado estado `currency` 
- Novo seletor de moedas no header
- Substituído display de preço pelo `EditablePrice`
- Nova função `updateProductPrice()` que sincroniza com backend

## 📊 Fluxo de Edição de Preço

```
1. Admin enable "Modo Edição"
2. Admin clica ícone de edição próximo ao preço
3. Modal abre com:
   - Campo de entrada de preço (números apenas)
   - Seletor de moeda (BRL, USD, EUR)
4. Admin altera preço e seleciona moeda
5. Admin clica "Salvar"
6. Frontend:
   - Valida entrada
   - Se moeda diferente: converte para BRL
   - Calcula pontos automaticamente
   - Atualiza estado local
   - Envia PUT request para backend
7. Backend:
   - Valida autenticação (admin)
   - Valida preço
   - Calcula pontos para 10%
   - Atualiza banco de dados
   - Retorna produto atualizado
8. Frontend atualiza UI
```

## 🔄 Fluxo de Conversão de Moeda

```
1. Usuário seleciona nova moeda no dropdown
2. Estado de currency atualiza
3. Preços são reconvertidos para nova moeda
4. Display atualiza automaticamente
5. Nenhuma requisição ao backend (conversão local)
```

## 📝 Variáveis de Ambiente

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000
```

### Backend (`.env`)
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://...
JWT_SECRET=...
```

## 🧪 Teste Local

### Pré-requisitos
1. Backend rodando: `cd backend && npm run dev` (porta 5000)
2. Frontend rodando: `npm run dev` (porta 5173)
3. Login como admin (ArchADM-123 / #ADM123)

### Teste de Edição de Preço
1. Navegar para `/loja`
2. Habilitar "Modo Edição" (botão flutuante)
3. Passar mouse sobre preço do produto
4. Clicar no ícone de edição
5. Alterar preço e moeda
6. Clicar "Salvar"
7. Verificar se ponto foi recalculado automaticamente
8. Verificar no console se requisição foi enviada ao backend

### Teste de Conversão de Moeda
1. Navegar para `/loja`
2. Selecionar moeda diferente no dropdown (ex: USD)
3. Verificar se todos os preços foram convertidos
4. Selecionar outra moeda e verificar novamente
5. Retornar a BRL

## ⚠️ Limitações e Melhorias Futuras

### Limitações Atuais
- Taxas de câmbio são fixas (atualizadas manualmente)
- Conversão apenas visual no frontend (banco sempre em BRL)
- Não há histórico de mudanças de preço

### Melhorias Sugeridas
1. **API de Câmbio Real**
   - Integrar com Frefix.io ou Open Exchange Rates
   - Atualizar taxas automaticamente a cada hora

2. **Histórico de Preços**
   - Manter registro de mudanças de preço
   - Admin pode ver histórico na tela de edição

3. **Auditoria**
   - Log de quem mudou o preço e quando
   - Integrar com tabela `admin_logs`

4. **Notificações**
   - Alertar usuários sobre mudança de preço
   - Email para newsletter

5. **Estratégias de Preço**
   - Desconto por quantidade
   - Promoção temporária
   - Preço diferente por país/moeda

## 📞 Suporte

Para dúvidas sobre implementação, consulte:
- Backend: `backend/models/currency.js` e `backend/routes/shop.js`
- Frontend: `src/app/components/EditablePrice.tsx` e `src/app/utils/currency.ts`
- Componente: `src/app/pages/Shop.tsx`