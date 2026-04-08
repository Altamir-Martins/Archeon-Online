# ✅ CHECKLIST DE VALIDAÇÃO - SISTEMA COMPLETO

## 🎯 TESTE 1: INFRAESTRUTURA BÁSICA

### 1.1 Frontend Rodando
- [ ] http://localhost:5173 carrega sem erro
- [ ] Navbar aparece com menu
- [ ] Sem erro vermelho no console (F12)

### 1.2 Backend Respondendo
- [ ] `curl http://localhost:5000/api/health` retorna `{"status":"ok"}`
- [ ] Terminal backend não mostra erros críticos
- [ ] Logs mostram "Server listening on port 5000"

### 1.3 Banco de Dados
- [ ] PostgreSQL está rodando
- [ ] `psql -U postgres -d archeon_db` conecta
- [ ] Schema foi importado (tabelas existem)

---

## 🔐 TESTE 2: AUTENTICAÇÃO

### 2.1 Página de Login
- [ ] Ir para `/login` 
- [ ] Formulário aparece (email + senha)
- [ ] Botão "ENTRAR" funciona

### 2.2 Registro de Novo Usuário
- [ ] Ir para `/cadastro`
- [ ] Preencher: nome, email, senha
- [ ] Clicar REGISTRAR
- [ ] Redirect para `/home` ✓
- [ ] Token aparece em localStorage (abrir DevTools → Application)

### 2.3 Persistência de Sessão
- [ ] Fazer login
- [ ] F5 recarregar página
- [ ] Usuário continua logado (sem pedir login novamente)
- [ ] Navbar mostra nome do usuário

### 2.4 Logout
- [ ] Clicar em "Logout" (se disponível)
- [ ] Redirect para `/login`
- [ ] localStorage vazio

---

## 🛍️ TESTE 3: SHOP (LOJA DIGITAL)

### 3.1 Carregamento
- [ ] Ir para `/shop`
- [ ] Produtos aparecem em cards
- [ ] Sem erro no console
- [ ] Imagens carregam corretamente

### 3.2 Carrinho
- [ ] Clicar "ADICIONAR" num produto
- [ ] Badge no carrinho mostra quantidade
- [ ] Clicar no carrinho = modal com itens
- [ ] Preço total calcula corretamente

### 3.3 Moeda
- [ ] Seletor de moeda (USD/BRL/EUR) aparece
- [ ] Trocar para BRL
- [ ] Preços convertem (USD ÷ 5.20)
- [ ] Trocar para EUR
- [ ] Preços convertem (USD ÷ 5.65)

### 3.4 Compra
- [ ] Com productos no carrinho
- [ ] Clicar "FINALIZAR COMPRA"
- [ ] ✅ Sucesso: "Compra realizada"
- [ ] Pontos foram creditados ao usuário
- [ ] Carrinho limpa

---

## 🏠 TESTE 4: HOME (EDIÇÃO DE CONTEÚDO)

### 4.1 Modo Admin
- [ ] Se usuário é admin, aparece botão "ADMIN MODE" na navbar
- [ ] Clicar ativa modo edição
- [ ] Botões amarelos EDITAR aparecem nos elementos

### 4.2 Editar Título Hero
- [ ] Clicar botão EDITAR no título
- [ ] Modal abre com campo de texto
- [ ] Mudar texto e clicar SALVAR
- [ ] ✅ Título atualiza imediatamente
- [ ] Recarregar página (F5)
- [ ] Novo título continua salvo ✓ BANCO OK

### 4.3 Editar Subtítulo
- [ ] Clicar EDITAR no subtítulo
- [ ] Modal abre
- [ ] Mudar e SALVAR
- [ ] ✅ Atualiza e persiste após F5

### 4.4 Editar Imagem Hero
- [ ] Clicar EDITAR na imagem
- [ ] Upload modal abre
- [ ] Inserir URL de imagem nova
- [ ] SALVAR
- [ ] ✅ Imagem atualiza
- [ ] F5 = continua salva

---

## 📚 TESTE 5: PORTFOLIO

### 5.1 Visualização
- [ ] Ir para `/portfolio`
- [ ] 4 projetos aparecem (Guerra das Sombras, etc)
- [ ] Layout correto

### 5.2 Abrir Projeto
- [ ] Clicar em projeto
- [ ] Modal abre com galeria
- [ ] Imagens carregam
- [ ] Descrição completa aparece

### 5.3 Admin Edita Portfolio
- [ ] Como admin, botões EDITAR aparecem
- [ ] Editar título do projeto
- [ ] SALVAR
- [ ] ✅ Persiste após F5

---

## 📝 TESTE 6: FORMULÁRIO DE CONTATO

### 6.1 Acessibilidade
- [ ] Ir para `/solicitar-projeto`
- [ ] Formulário aparece
- [ ] Campos: nome, email, tipo, descrição, referências, orçamento

### 6.2 Validação
- [ ] Deixar campos em branco
- [ ] Tentar enviar
- [ ] ❌ "Campo obrigatório" aparece

### 6.3 Envio
- [ ] Preencher tudo corretamente
- [ ] Marcar "Concordo com Termos"
- [ ] Clicar "INICIAR PROJETO"
- [ ] ✅ "Formulário enviado"
- [ ] Terminal backend mostra: "📧 Email enviado para..."

---

## 🎮 TESTE 7: GAMIFICAÇÃO

### 7.1 Sistema de Pontos
- [ ] Fazer 1ª compra = +10 pontos
- [ ] Ir para `/profile` ou verificar navbar
- [ ] Pontos aparecem corretamente
- [ ] Fazer 2ª compra = +10 pontos (total 20)

### 7.2 Levels
- [ ] Level 1 = Aprendiz (0-199 pontos)
- [ ] Acumular até 200 pontos
- [ ] Level aumenta para 2 = Artesão
- [ ] Title muda na navbar ✅

### 7.3 Badges
- [ ] Navbar mostra badge com level
- [ ] Ao atingir novo level, badge atualiza

---

## ⚡ TESTE 8: PERFORMANCE & ERROS

### 8.1 Console Limpo
- [ ] Abrir DevTools (F12)
- [ ] Aba Console
- [ ] ✅ Sem erros vermelhos
- [ ] Sem warnings críticos

### 8.2 Network
- [ ] Abrir DevTools → Network
- [ ] Recarregar página
- [ ] Requisições API devem ter status 200
- [ ] Nenhum 404 ou 500 warnings

### 8.3 Responsividade
- [ ] Abrir DevTools → Toggle device toolbar
- [ ] Testar em Mobile (375px)
- [ ] Layout responsivo ✓
- [ ] Botões funcionam em celular

---

## 🌐 TESTE 9: URLS CORRETAS

Verificar que cada página tem URL correta:

- [ ] `/` = Home
- [ ] `/login` = Login
- [ ] `/cadastro` = Registro
- [ ] `/home` = Home logado
- [ ] `/shop` = Loja
- [ ] `/portfolio` = Portfólio
- [ ] `/solicitar-projeto` = Contato
- [ ] `/profile` = Perfil do usuário
- [ ] `/sobre` = Sobre
- [ ] `/termos` = Termos de Serviço
- [ ] `/servicos` = Serviços

---

## 🔄 TESTE 10: FLUXO COMPLETO (Cenário Real)

```
Seguir este fluxo como novo usuário:

1. Acessar http://localhost:5173
   ✓ Home guest carrega

2. Clicar "VER PORTFÓLIO"
   ✓ Portfolio página abre

3. Clicar "SOLICITAR PROJETO"
   ✓ Ir para formulário

4. Preencher e enviar
   ✓ "Formulário enviado"
   ✓ Email aparece no backend

5. Clicar "ENTRAR" ou "REGISTRE-SE"
   ✓ Cadastro novo usuário

6. Após registro, redirect para /home
   ✓ Novo usuário vê conteúdo
   ✓ Navbar mostra nivel "Aprendiz"

7. Ir para /shop
   ✓ Adicionar produto ao carrinho
   ✓ Finalizar compra
   ✓ ✅ Pontos aparecem

8. F5 recarregar
   ✓ Session persiste
   ✓ Pontos continuam lá

9. Fazer logout
   ✓ Redirect para /login

10. Fazer login novamente
    ✓ ✅ Dados ainda estão (banco funcionando)

RESULTADO: ✅ SISTEMA COMPLETO FUNCIONANDO
```

---

## 📊 SUMÁRIO FINAL

### Se Todas as Caixas Estão Marcadas ✅
**PARABÉNS! Sistema está pronto para:**
- ✅ Testes com usuários
- ✅ Deploy em produção
- ✅ Compartilhar com cliente

### Se Faltam Algumas ❌
**Procure por:**
1. **Erro no Console (F12)?** → Procurar mensagem exata
2. **API não responde?** → Backend rodando? `npm run dev` no backend
3. **Banco dados?** → PostgreSQL rodando? Schema importado?
4. **Token inválido?** → Fazer login novamente
5. **CORS error?** → Backend permite: `origin: http://localhost:5173`

### Arquivo para Referência
- 📖 `TESTING_AND_DEPLOYMENT.md` = Guia completo
- 🚀 `start-dev.ps1` = Script para iniciar
- ✅ Este arquivo = Checklist

