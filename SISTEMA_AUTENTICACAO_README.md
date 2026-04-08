# Sistema de Autenticação e Administração - Archeon

## 📋 Resumo do Sistema

Este documento descreve todo o sistema de autenticação, cadastro, perfil de usuário e modo administrador implementado no site Archeon.

## 🔐 Autenticação

### Páginas Criadas:
1. **Login** (`/login`) - Página de autenticação de usuários
2. **Cadastro** (`/cadastro`) - Página de registro de novos usuários
3. **Perfil** (`/perfil`) - Página de perfil do usuário logado

### Conta de Administrador:
- **Username:** `ArchADM-123`
- **Senha:** `#ADM123`

### Funcionalidades de Login/Cadastro:
- ✅ Login com username ou email
- ✅ Cadastro com validação de dados
- ✅ Opção de login/cadastro com Google (preparado para integração)
- ✅ Validação de campos obrigatórios
- ✅ Verificação de senha (mínimo 6 caracteres)
- ✅ Verificação de username/email duplicados

## 👤 Sistema de Perfil

### Informações do Usuário:
- Username
- Email
- Data de cadastro
- Nível de acesso (usuário comum ou administrador)

### Sistema de Pontos e Recompensas:
- **Pontos acumulados:** Ganhe pontos a cada serviço contratado
- **A cada 5 serviços:** Ganhe um prêmio especial
- **Tipos de prêmios:**
  - Caricatura gratuita
  - Desenho cartoon de personagem
  - 10% de desconto na próxima compra

### Baú do Aventureiro:
- Visualização de prêmios disponíveis
- Histórico de serviços contratados
- Prêmios já utilizados
- Contador de serviços até o próximo prêmio

## ⚙️ Modo Administrador

### Acesso ao Modo ADM:
Ao fazer login com a conta `ArchADM-123`, o site entra automaticamente em modo desenvolvedor.

### Funcionalidades do ADM:
- ✏️ **Edição de imagens:** Botões de lápis aparecem em todas as imagens
- ✏️ **Edição de textos:** Botões de edição em títulos e descrições
- 📤 **Upload de imagens:** Carregar novas imagens diretamente
- 🔗 **Inserir URL:** Opção de inserir URL de imagem externa

### Áreas Editáveis (Home):
1. **Hero Section:**
   - Imagem de fundo principal
   - Título principal
   - Subtítulo

2. **Portfolio Preview:**
   - Imagem de Personagens
   - Imagem de Criaturas
   - Imagem de Cenários
   - Imagem de Props & Itens

### Como Editar (ADM):
1. Faça login com a conta de administrador
2. Navegue até a área que deseja editar
3. Clique no botão "EDITAR" (ícone de lápis) que aparecerá
4. Faça a alteração desejada:
   - **Para imagens:** Faça upload ou insira URL
   - **Para textos:** Edite diretamente no campo
5. Clique em "SALVAR"

## 🗂️ Estrutura de Arquivos

### Contextos:
- `/src/app/contexts/AuthContext.tsx` - Gerenciamento de autenticação e usuários

### Componentes:
- `/src/app/components/AdminEditButton.tsx` - Botão de edição para administradores
- `/src/app/components/Layout.tsx` - Layout com botões de Login/Cadastro/Perfil

### Páginas:
- `/src/app/pages/Login.tsx` - Tela de login
- `/src/app/pages/Cadastro.tsx` - Tela de cadastro
- `/src/app/pages/Profile.tsx` - Tela de perfil do usuário
- `/src/app/pages/Home.tsx` - Home com botões de edição ADM

## 🔌 Integração com Banco de Dados

### Locais marcados para integração:

#### AuthContext.tsx:
```typescript
// ================= FUNÇÃO DE LOGIN ================= 
// INTEGRAÇÃO BANCO DE DADOS: Substituir por chamada à API/Supabase

// ================= FUNÇÃO DE CADASTRO ================= 
// INTEGRAÇÃO BANCO DE DADOS: Substituir por chamada à API/Supabase

// ================= FUNÇÃO DE ATUALIZAR PERFIL ================= 
// INTEGRAÇÃO BANCO DE DADOS: Substituir por UPDATE no banco
```

#### AdminEditButton.tsx:
```typescript
// ================= UPLOAD DE IMAGEM ================= 
// INTEGRAÇÃO BANCO DE DADOS: Fazer upload para servidor/storage
```

#### Home.tsx:
```typescript
// INTEGRAÇÃO BANCO DE DADOS: Salvar alteração no banco
```

### Dados Temporários:
Atualmente, os dados são armazenados no `localStorage` do navegador.
Para produção, **TODOS** os dados devem ser migrados para um banco de dados real (Supabase, PostgreSQL, MongoDB, etc.).

### Schema Sugerido (Banco de Dados):

#### Tabela `users`:
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  points INTEGER DEFAULT 0,
  services_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabela `rewards`:
```sql
CREATE TABLE rewards (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  used BOOLEAN DEFAULT FALSE,
  earned_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabela `purchases`:
```sql
CREATE TABLE purchases (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  service_name VARCHAR(100) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  points_earned INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabela `site_content` (para edições do ADM):
```sql
CREATE TABLE site_content (
  id UUID PRIMARY KEY,
  content_key VARCHAR(100) UNIQUE NOT NULL,
  content_type VARCHAR(20) NOT NULL, -- 'image' ou 'text'
  content_value TEXT NOT NULL,
  updated_by UUID REFERENCES users(id),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🎨 Ícones dos Botões

### Header:
- **Cadastro:** Ícone de papiro com pena (ScrollText)
- **Login:** Ícone de capacete medieval (Shield)
- **Perfil:** Ícone de usuário (User)

## 🔒 Segurança

### Avisos Importantes:
⚠️ **NUNCA armazene senhas em texto simples em produção!**
⚠️ **Use hash bcrypt ou similar para senhas**
⚠️ **Implemente HTTPS em produção**
⚠️ **Valide TODOS os inputs do usuário**
⚠️ **Use tokens JWT para autenticação**
⚠️ **Implemente rate limiting para evitar ataques de força bruta**

## 📱 Responsividade

Todas as páginas e componentes são totalmente responsivos:
- Mobile first
- Breakpoints: sm, md, lg, xl
- Textos adaptáveis
- Botões otimizados para touch

## 🎯 Próximos Passos

### Para Integração Completa:
1. [ ] Configurar banco de dados (Supabase recomendado)
2. [ ] Implementar API endpoints para CRUD de usuários
3. [ ] Implementar upload de imagens para cloud storage
4. [ ] Implementar autenticação OAuth com Google
5. [ ] Adicionar recuperação de senha
6. [ ] Implementar sistema de emails transacionais
7. [ ] Adicionar logs de auditoria para ações do ADM
8. [ ] Implementar cache para melhor performance
9. [ ] Adicionar testes automatizados

### Melhorias Futuras:
- [ ] Sistema de notificações para usuários
- [ ] Dashboard de analytics para ADM
- [ ] Sistema de mensagens entre usuário e estúdio
- [ ] Galeria de trabalhos favoritos do usuário
- [ ] Sistema de avaliações e reviews
- [ ] Programa de indicação/referral

## 📞 Suporte

Para dúvidas sobre implementação ou integração, consulte os comentários no código marcados com:
- `// INTEGRAÇÃO BANCO DE DADOS:`
- `// ================= INICIO AREA:`
- `// ================= FIM AREA:`

---

**Desenvolvido para Archeon Art & Direção Criativa**
