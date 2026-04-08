# 🎮 ATUALIZAÇÃO — SISTEMA DE GAMIFICAÇÃO (SIMPLIFICADO E FUNCIONAL)

⚠️ IMPORTANTE:
O sistema de usuário já possui:

* Login
* Cadastro
* Perfil
* Pontos
* Histórico de serviços
* Recompensas

👉 NÃO recriar esses elementos
👉 Apenas complementar com XP, nível e título

---

# 🧠 IMPLEMENTAR:

## 1. BARRA DE XP

No perfil do usuário, adicionar:

* Barra de progresso visual (horizontal)
* Indicando XP atual / XP necessário para próximo nível

### Elementos:

* valor numérico (ex: 120 / 200 XP)
* barra animada suave
* label: “Nível X”

---

## 2. SISTEMA DE NÍVEL

* baseado em XP acumulado
* exibir nível atual no perfil

Adicionar comentário:

“INSERIR LÓGICA DE CÁLCULO DE XP E LEVEL NO BACKEND”

---

## 3. SISTEMA DE TÍTULO (REUTILIZAÇÃO DE COMPONENTE)

Reutilizar o componente existente:

“ADMINISTRADOR”

---

## Novo comportamento:

* mesmo design visual
* mesma posição (abaixo do nome)
* alterar apenas o texto dinamicamente

---

## 📊 TABELA DE TÍTULOS

Aplicar a seguinte progressão:

* Nível 1–4 → Aprendiz
* Nível 5–9 → Iniciado
* Nível 10–14 → Artesão
* Nível 15–19 → Forjador
* Nível 20–24 → Invocador
* Nível 25–29 → Arquiteto de Mundos
* Nível 30–34 → Mestre Criador
* Nível 35–39 → Guardião de Relíquias
* Nível 40–44 → Lenda Viva
* Nível 45–50 → Arquiteto Supremo

---

## Regra:

* atualizar título automaticamente conforme o nível
* mudança a cada 5 níveis

---

## Comentários para DEV:

* “MAPEAR LEVEL → TÍTULO VIA FUNÇÃO”
* “INSERIR LÓGICA DE XP AQUI”
* “CONECTAR COM DATABASE (SUPABASE)”


Atue como um **Diretor de Produto Digital, UX/UI Designer Sênior e Arquiteto de Sistemas Frontend**, com foco em criação de plataformas escaláveis, CMS visuais e sistemas administrativos completos.

⚠️ ESTE É UM REQUISITO CRÍTICO:

Você deve projetar um **SISTEMA GLOBAL DE EDIÇÃO (CMS VISUAL)** que funcione:

* EM TODAS AS PÁGINAS DO SITE
* EM TODOS OS COMPONENTES
* EM TODOS OS ELEMENTOS EDITÁVEIS
* SEM EXCEÇÃO

Isso inclui obrigatoriamente:

* Home
* Portfólio
* Serviços
* Como Trabalhamos
* Sobre
* Termos
* Solicitar Projeto
* Perfil do Usuário

👉 NÃO limitar o sistema à Home
👉 NÃO criar versões parciais
👉 NÃO omitir páginas

O sistema deve ser **reutilizável, modular e aplicado globalmente via componentes compartilhados**.

---

# 🧠 OBJETIVO DO SISTEMA

Transformar o site em um **CMS visual completo**, permitindo que o administrador:

* Edite qualquer conteúdo diretamente na interface
* Altere textos, imagens, fundos e botões
* Gerencie conteúdo sem necessidade de código

---

# 🧱 SISTEMA GLOBAL DE EDIÇÃO (OBRIGATÓRIO)

## 🔁 REGRA FUNDAMENTAL

Todo elemento visual do site deve ser:

* Editável
* Identificável por ID único
* Conectado a um sistema de dados

---

## 🧩 IMPLEMENTAÇÃO GLOBAL

Criar um sistema baseado em:

### COMPONENTES REUTILIZÁVEIS

Cada elemento deve ser um componente com:

* estado normal
* estado de edição
* propriedades editáveis

---

## 🆔 IDENTIFICAÇÃO UNIVERSAL

Todo elemento deve conter:

* ID único (ex: services.card.title.01)
* tipo (text, image, background, button)
* valor atual

Adicionar anotação:

“CONECTAR ESTE ELEMENTO AO CMS (JSON / DATABASE)”

---

# ✏️ MODO DE EDIÇÃO GLOBAL

## Ativação:

* Botão flutuante (ícone de lápis)
* Visível apenas para ADMIN
* Deve afetar TODAS as páginas simultaneamente

---

## Comportamento:

Ao ativar:

* TODOS os elementos editáveis do site devem mostrar:

  * borda leve
  * label “Editar”
  * highlight no hover

👉 Isso deve funcionar em TODAS as páginas, sem exceção

---

## Interação:

Ao clicar em qualquer elemento:

Abrir painel de edição com:

* campo editável
* preview
* botão de upload (imagem)
* botão reset

---

## Barra global de controle:

Fixa:

* “Salvar alterações”
* “Descartar alterações”
* indicador: “Modo edição ativo”

---

# 💾 SISTEMA DE SAVE (IMPORTANTE)

## Regras:

* Alterações NÃO são salvas automaticamente
* Criar estado de “draft”

---

## Botões:

* Salvar → envia para backend
* Cancelar → descarta mudanças

---

## Comentários obrigatórios:

* “INSERIR FUNÇÃO SAVE NO BANCO DE DADOS AQUI”
* “IMPLEMENTAR FETCH GLOBAL DE CONTEÚDO AQUI”
* “INTEGRAR COM SUPABASE”

---

# 🗃️ ESTRUTURA DE DADOS (CMS)

Adicionar instrução:

“ESTRUTURAR TODO O CONTEÚDO COMO JSON CENTRALIZADO”

Exemplo:

* home.hero.title
* portfolio.project.01.image
* services.card.02.description

---

# 🌐 APLICAÇÃO EM TODAS AS PÁGINAS (OBRIGATÓRIO)

## Para CADA página, implementar:

### HOME

* hero editável
* textos editáveis
* imagens editáveis

---

### PORTFÓLIO

* projetos editáveis
* imagens editáveis
* descrições editáveis

---

### SERVIÇOS

* títulos editáveis
* descrições editáveis
* ícones editáveis

---

### COMO TRABALHAMOS

* etapas editáveis
* textos editáveis

---

### SOBRE

* narrativa editável
* equipe editável

---

### TERMOS

* conteúdo editável

---

### SOLICITAR PROJETO

* textos editáveis
* labels editáveis

---

### PERFIL DO USUÁRIO

* labels editáveis
* seções editáveis

---

⚠️ REFORÇO:

O sistema DEVE funcionar em TODAS essas páginas, sem exceção.

---

# 🧠 SISTEMA DE USUÁRIO E GAMIFICAÇÃO

Preparar UI para:


* nível
* XP


---

## Comentários:

* “INSERIR LÓGICA DE XP AQUI”
* “INSERIR SISTEMA DE RECOMPENSA AQUI”
* “CONECTAR COM DATABASE”

---

# 🗂️ ORGANIZAÇÃO PARA DEV

Adicionar instruções claras:

* separar componentes
* usar IDs consistentes
* organizar dados por página
* centralizar conteúdo

---

# 🎯 RESULTADO FINAL

O sistema deve:

* funcionar como CMS visual completo
* permitir edição TOTAL do site
* ser consistente em TODAS as páginas
* ser preparado para backend
* ser escalável e organizado

---

⚠️ NÃO ENTREGAR:

* soluções parciais
* edição apenas na Home
* componentes isolados

---

ENTREGAR:

Um sistema global, modular e completo.

---