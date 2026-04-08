# 🎯 GUIA DE IMPLEMENTAÇÃO CMS GLOBAL - ARCHEON

## ✅ CONCLUÍDO

### 1. Sistema de Gamificação
- ✅ XP e Nível no perfil
- ✅ Barra de progresso animada
- ✅ Sistema de títulos baseado em nível
- ✅ Títulos: Aprendiz → Arquiteto Supremo (tabela completa)

### 2. Componentes de Edição Criados
- ✅ `/src/app/contexts/EditModeContext.tsx` - Contexto do modo de edição
- ✅ `/src/app/components/EditModeToggle.tsx` - Botão flutuante de ativar/desativar
- ✅ `/src/app/components/EditButton.tsx` - Botão simples de edição
- ✅ `/src/app/components/EditableText.tsx` - Texto editável com ID único
- ✅ `/src/app/components/EditableImage.tsx` - Imagem editável com ID único
- ✅ `/src/app/components/EditableElement.tsx` - Wrapper completo (drag-drop)

### 3. Loja Digital
- ✅ `/src/app/pages/Shop.tsx` - Página completa da loja
- ✅ Produtos digitais (Assets, Templates, Tutoriais, Brushes)
- ✅ Sistema de carrinho
- ✅ Desconto usando pontos (até 30%)
- ✅ Ganhar pontos em compras (10% do valor)
- ✅ Sistema de fidelização integrado
- ✅ Tudo editável pelo ADM

### 4. Integração
- ✅ Rota `/loja` adicionada
- ✅ Link no menu de navegação
- ✅ Link no footer

## 📋 PRÓXIMOS PASSOS PARA CMS GLOBAL COMPLETO

### Para aplicar o sistema de edição em TODAS as páginas:

#### 1. Substituir textos estáticos por `<EditableText>`

**Exemplo no Portfolio:**
```tsx
import { EditableText } from "../components/EditableText";

// Antes:
<h1>PORTFÓLIO</h1>

// Depois:
<EditableText
  id="portfolio.hero.title"
  value={portfolioTitle}
  onChange={setPortfolioTitle}
  label="Título da página de portfólio"
>
  <h1>{portfolioTitle}</h1>
</EditableText>
```

#### 2. Substituir imagens estáticas por `<EditableImage>`

**Exemplo em Serviços:**
```tsx
import { EditableImage } from "../components/EditableImage";

// Antes:
<img src={serviceImage} alt="Serviço" />

// Depois:
<EditableImage
  id="services.card.01.image"
  src={serviceImage}
  alt="Serviço"
  onUpdate={setServiceImage}
  label="Imagem do card de serviço"
/>
```

#### 3. Padrão de IDs Únicos

Use a convenção:
- `pagina.secao.elemento.numero`
- Exemplos:
  - `home.hero.title`
  - `portfolio.project.01.image`
  - `services.card.02.description`
  - `about.team.member.03.name`

#### 4. Estados Locais para Conteúdo Editável

Em cada página, criar estados para conteúdo editável:

```tsx
const [heroTitle, setHeroTitle] = useState("Título Inicial");
const [heroSubtitle, setHeroSubtitle] = useState("Subtítulo");
const [heroImage, setHeroImage] = useState(imageDefault);
```

## 🗂️ ESTRUTURA DE DADOS RECOMENDADA

Quando integrar com banco de dados, criar estrutura JSON:

```json
{
  "home": {
    "hero": {
      "title": "FORJANDO MUNDOS PARA JOGOS E RPG",
      "subtitle": "Concept art e direção visual...",
      "image": "url-da-imagem"
    },
    "portfolio": {
      "items": [
        {
          "id": 1,
          "title": "PERSONAGENS",
          "image": "url"
        }
      ]
    }
  },
  "shop": {
    "products": [
      {
        "id": "prod-001",
        "name": "Pack de Texturas",
        "price": 49.90,
        "image": "url"
      }
    ]
  }
}
```

## 🔧 INTEGRAÇÃO COM BACKEND

### 1. Salvar Alterações
Nos componentes EditableText e EditableImage, substituir:
```tsx
// ATUAL (local):
onChange(newValue);

// FUTURO (com banco):
const saved = await saveToDatabase(id, newValue);
if (saved) onChange(newValue);
```

### 2. Carregar Conteúdo
No início de cada página:
```tsx
useEffect(() => {
  const loadContent = async () => {
    const content = await fetchContentFromDatabase("home");
    setHeroTitle(content.hero.title);
    setHeroSubtitle(content.hero.subtitle);
    // etc...
  };
  loadContent();
}, []);
```

### 3. Supabase Integration (exemplo)
```tsx
import { supabase } from "../lib/supabase";

// Salvar conteúdo
const saveContent = async (id: string, value: string) => {
  const { error } = await supabase
    .from("cms_content")
    .upsert({ id, value, updated_at: new Date() });
  
  return !error;
};

// Carregar conteúdo
const loadContent = async (pageId: string) => {
  const { data } = await supabase
    .from("cms_content")
    .select("*")
    .eq("page_id", pageId);
  
  return data;
};
```

## 🎨 PÁGINAS QUE PRECISAM DE EDIÇÃO CMS

### Home ✅ PARCIALMENTE IMPLEMENTADO
- [x] Hero title e subtitle
- [x] Hero background image
- [x] Portfolio preview images
- [ ] Textos de serviços
- [ ] Textos de diferenciais

### Portfolio
- [ ] Título e descrição da página
- [ ] Imagens de projetos
- [ ] Nomes e descrições de projetos
- [ ] Categorias

### Serviços
- [ ] Título da página
- [ ] Descrições de cada serviço
- [ ] Preços
- [ ] Lista de itens inclusos

### Como Trabalhamos
- [ ] Título de cada etapa
- [ ] Descrição de cada etapa
- [ ] Imagens ilustrativas

### Sobre
- [ ] História do estúdio
- [ ] Membros da equipe
- [ ] Fotos da equipe

### Termos
- [ ] Todo o conteúdo textual
- [ ] Cláusulas e condições

### Solicitar Projeto
- [ ] Textos introdutórios
- [ ] Labels dos campos
- [ ] Mensagens de confirmação

### Perfil do Usuário ✅ IMPLEMENTADO
- [x] Sistema de XP e níveis
- [x] Títulos baseados em progresso
- [x] Barra de progresso

### Loja ✅ IMPLEMENTADO
- [x] Produtos editáveis
- [x] Imagens de produtos
- [x] Nomes e descrições
- [x] Preços

## 🚀 COMO USAR O SISTEMA

1. **Faça login como ADM**: `ArchADM-123` / `#ADM123`
2. **Ative o modo de edição**: Clique no botão flutuante dourado (canto inferior direito)
3. **Edite qualquer elemento**: Passe o mouse sobre elementos editáveis e clique em "Editar"
4. **Salve as alterações**: No modal, faça suas mudanças e clique em "SALVAR"
5. **Desative o modo**: Clique novamente no botão flutuante

## 💡 FUNCIONALIDADES AVANÇADAS JÁ PREPARADAS

- **EditableElement.tsx**: Suporta drag-and-drop (ativar botão "Arrastar")
- **IDs únicos**: Todos os elementos têm IDs para mapeamento no banco
- **Preview em tempo real**: Mudanças aparecem instantaneamente
- **Modal com z-index alto**: Sempre aparece acima de todo conteúdo
- **Comentários no código**: Tudo comentado em português

## 📊 SISTEMA DE PONTOS E FIDELIZAÇÃO

### Como Funciona:
1. **Ganhar Pontos**: 10% do valor de cada compra
2. **Usar Pontos**: Desconto de até 30% em produtos
3. **Conversão**: Cada produto tem `pointsDiscount` (ex: 100 pts = 10% off)
4. **Limite**: Máximo 30% de desconto por produto

### Exemplo:
- Produto de R$ 100,00
- Cliente tem 300 pontos
- Usa 300 pontos = 30% desconto
- Paga R$ 70,00
- Ganha 7 pontos de volta (10% de R$ 70)
- Saldo final: 7 pontos

## ✅ RESUMO DO QUE FOI ENTREGUE

1. ✅ Sistema de XP, Nível e Títulos no perfil
2. ✅ CMS Global preparado (contexto, componentes reutilizáveis)
3. ✅ Loja completa com sistema de fidelização
4. ✅ Edição aplicada em Home (exemplo)
5. ✅ Edição aplicada em Shop (completo)
6. ✅ Botão flutuante de modo de edição
7. ✅ Componentes modulares prontos para usar em todas as páginas
8. ✅ Código comentado em português
9. ✅ IDs únicos para mapeamento no banco
10. ✅ Preparado para integração com Supabase

---

**NOTA IMPORTANTE**: Todo o código está preparado para integração com banco de dados. Procure por comentários `// INTEGRAÇÃO BANCO DE DADOS:` para saber onde adicionar as chamadas reais de API.

---

**Desenvolvido para Archeon Art Studio** 🎨⚔️
