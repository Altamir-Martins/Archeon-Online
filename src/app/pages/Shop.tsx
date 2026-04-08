import { useState, useEffect } from "react";
import { ShoppingCart, Sparkles, X, Check, Tag, Package, Globe, Plus, AlertCircle, Loader } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { EditableText } from "../components/EditableText";
import { EditableImage } from "../components/EditableImage";
import { EditablePrice } from "../components/EditablePrice";
import { useNavigate } from "react-router";
import { convertCurrency, calculatePointsFor10Percent, formatCurrency, getAvailableCurrencies, getCurrencySymbol } from "../utils/currency";
import { shopAPI, contentAPI } from "../services/api";
import { ShopBackground } from "../components/ShopBackground";

// ================= INTERFACE: PRODUTO DIGITAL =================
interface DigitalProduct {
  id: string;
  name: string;
  description: string;
  price: number; // Preço em dólares (USD base)
  image: string;
  category: "Assets" | "Templates" | "Tutorials" | "Brushes";
  pointsDiscount: number; // Quantos pontos necessários para 10% de desconto
}

// ================= INTERFACE: ITEM DO CARRINHO =================
interface CartItem {
  product: DigitalProduct;
  pointsUsed: number;
  finalPrice: number;
}

export function Shop() {
  const { user, addPoints, addPurchase, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // ================= ESTADO: COMPONENTE =================
  const [products, setProducts] = useState<DigitalProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageTitle, setPageTitle] = useState("LOJA DIGITAL");
  const [pageSubtitle, setPageSubtitle] = useState("Produtos e assets exclusivos para seus projetos");

  // ================= EFEITO: CARREGAR DADOS DA API =================
  useEffect(() => {
    const loadShopData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Buscar produtos da API
        const productsData = await shopAPI.getProducts();
        setProducts((productsData as any).products || []);

        // Buscar textos da página do conteúdo
        const contentData = await contentAPI.getAll();
        if ((contentData as any).content) {
          const pageContent = (contentData as any).content;
          if (pageContent['shop.page.title']) {
            setPageTitle(pageContent['shop.page.title'].value);
          }
          if (pageContent['shop.page.subtitle']) {
            setPageSubtitle(pageContent['shop.page.subtitle'].value);
          }
        }
      } catch (err: any) {
        console.error('Erro ao carregar dados da loja:', err);
        setError(err.message || 'Erro ao carregar dados');
        // Fallback para dados mock se API falhar
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    loadShopData();
  }, []);

  // ================= FUNÇÕES: WRAPPER PARA EDIÇÃO DA PÁGINA COM PERSISTÊNCIA ================= 
  const handleSavePageTitle = async (newValue: string) => {
    setPageTitle(newValue);
    try {
      await contentAPI.update('shop.page.title', newValue);
      console.log('✅ Título da loja salvo');
    } catch (err: any) {
      console.error('❌ Erro ao salvar título:', err);
      setError(`Erro ao salvar: ${err.message}`);
    }
  };

  const handleSavePageSubtitle = async (newValue: string) => {
    setPageSubtitle(newValue);
    try {
      await contentAPI.update('shop.page.subtitle', newValue);
      console.log('✅ Subtítulo da loja salvo');
    } catch (err: any) {
      console.error('❌ Erro ao salvar subtítulo:', err);
      setError(`Erro ao salvar: ${err.message}`);
    }
  };

  // ================= DADOS MOCK (Fallback) =================
  const mockProducts: DigitalProduct[] = [
    {
      id: "prod-001",
      name: "Pack de Texturas Medievais",
      description: "50+ texturas em alta resolução: pedra, madeira, metal envelhecido",
      price: 49.90,
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
      category: "Assets",
      pointsDiscount: 100, // 100 pontos = 10% desconto
    },
    {
      id: "prod-002",
      name: "Template de Personagem RPG",
      description: "Base editável para criação de personagens de fantasia",
      price: 79.90,
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80",
      category: "Templates",
      pointsDiscount: 150,
    },
    {
      id: "prod-003",
      name: "Tutorial: Concept Art Avançado",
      description: "Curso completo com 10 horas de vídeo aulas profissionais",
      price: 199.90,
      image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&q=80",
      category: "Tutorials",
      pointsDiscount: 300,
    },
    {
      id: "prod-004",
      name: "Brushes de Criaturas Fantásticas",
      description: "200+ pincéis customizados para Photoshop e Procreate",
      price: 39.90,
      image: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=800&q=80",
      category: "Brushes",
      pointsDiscount: 80,
    },
    {
      id: "prod-005",
      name: "Pack de Cenários de Castelos",
      description: "15 cenários prontos de castelos e fortalezas medievais",
      price: 89.90,
      image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80",
      category: "Assets",
      pointsDiscount: 180,
    },
    {
      id: "prod-006",
      name: "Template de Props & Itens",
      description: "Modelos editáveis de armas, armaduras e itens mágicos",
      price: 59.90,
      image: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=800&q=80",
      category: "Templates",
      pointsDiscount: 120,
    },
  ];

  // ================= ESTADO: CARRINHO E FILTROS =================
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [currency, setCurrency] = useState<string>("USD");  // Padrão em USD
  const currencySymbol = getCurrencySymbol(currency);
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [nextProductId, setNextProductId] = useState(7);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<DigitalProduct>>({
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "Assets",
    pointsDiscount: 0,
  });

  const categories = ["Todos", "Assets", "Templates", "Tutorials", "Brushes"];

  // Filtrar produtos por categoria
  const filteredProducts = selectedCategory === "Todos"
    ? products
    : products.filter(p => p.category === selectedCategory);

  // ================= FUNÇÃO: ADICIONAR AO CARRINHO =================
  const addToCart = (product: DigitalProduct) => {
    // Verifica se já está no carrinho
    if (cart.some(item => item.product.id === product.id)) {
      alert("Este produto já está no seu carrinho!");
      return;
    }

    // Adiciona com 0 pontos inicialmente
    setCart([...cart, {
      product,
      pointsUsed: 0,
      finalPrice: product.price,
    }]);
    setShowCart(true);
  };

  // ================= FUNÇÃO: REMOVER DO CARRINHO =================
  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  // ================= FUNÇÃO: USAR PONTOS NO PRODUTO =================
  const usePointsOnProduct = (productId: string, points: number) => {
    setCart(cart.map(item => {
      if (item.product.id !== productId) return item;

      // Máximo de pontos que podem ser usados (para 30% desconto)
      const maxPoints = item.product.pointsDiscount * 3;
      const usedPoints = Math.min(points, maxPoints, user?.points || 0);

      // Cada "pointsDiscount" pontos = 10% desconto
      const discountPercent = Math.floor(usedPoints / item.product.pointsDiscount) * 10;
      const maxDiscount = Math.min(discountPercent, 30); // Máximo 30% desconto

      const finalPrice = item.product.price * (1 - maxDiscount / 100);

      return {
        ...item,
        pointsUsed: usedPoints,
        finalPrice: Math.max(finalPrice, 0),
      };
    }));
  };

  // ================= CÁLCULOS DO CARRINHO =================
  const cartTotal = cart.reduce((sum, item) => sum + item.finalPrice, 0);
  const totalPointsUsed = cart.reduce((sum, item) => sum + item.pointsUsed, 0);
  const totalSaved = cart.reduce((sum, item) => sum + (item.product.price - item.finalPrice), 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price, 0);
  const displayCartTotal = convertCurrency(cartTotal, 'USD', currency);
  const displaySubtotal = convertCurrency(cartSubtotal, 'USD', currency);
  const displayTotalSaved = convertCurrency(totalSaved, 'USD', currency);

  // ================= FUNÇÃO: FINALIZAR COMPRA =================
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      alert("Faça login para comprar!");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    try {
      setCheckoutLoading(true);

      await shopAPI.purchase(
        cart.map(item => ({
          productId: item.product.id,
          pointsUsed: item.pointsUsed,
          finalPrice: convertCurrency(item.finalPrice, 'USD', 'BRL'),
        }))
      );

      // Calcula pontos ganhos (10% do valor em pontos)
      const pointsEarned = Math.floor(displayCartTotal * 0.1);

      // Adiciona cada produto ao histórico
      cart.forEach(item => {
        addPurchase({
          serviceName: item.product.name,
          pointsEarned: Math.floor(convertCurrency(item.finalPrice, 'USD', currency) * 0.1),
          status: "Concluído",
        });
      });

      // Adiciona pontos ganhos (mas remove os usados)
      const netPoints = pointsEarned - totalPointsUsed;
      if (netPoints > 0) {
        addPoints(netPoints);
      } else {
        addPoints(-Math.abs(netPoints)); // Remove pontos usados
      }

      // Limpa carrinho
      setCart([]);
      setShowCheckout(false);
      setShowCart(false);

      alert(`✅ Compra realizada com sucesso!\n\nVocê ganhou ${pointsEarned} pontos!\n(Usou ${totalPointsUsed} pontos)\n\nSaldo final: ${(user?.points || 0) + netPoints} pontos`);
    } catch (err: any) {
      alert(`❌ Erro na compra: ${err.message}`);
      console.error('Erro no checkout:', err);
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Atualizar produto (ADM)
  const updateProduct = (id: string, field: keyof DigitalProduct, value: any) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
    // INTEGRAÇÃO BANCO DE DADOS: Salvar alteração no banco
  };

  // Atualizar preço do produto (com cálculo automático de pontos)
  const updateProductPrice = async (productId: string, newPrice: number, newPoints: number, priceCurrency: string = 'USD') => {
    const priceInUSD = priceCurrency === 'USD' ? newPrice : convertCurrency(newPrice, priceCurrency, 'USD');
    const pointsForDiscount = calculatePointsFor10Percent(priceInUSD);

    updateProduct(productId, 'price', priceInUSD);
    updateProduct(productId, 'pointsDiscount', pointsForDiscount);

    // ================= INTEGRAÇÃO BANCO DE DADOS: Atualizar preço via API =================
    try {
      await shopAPI.updateProductPrice(productId, priceInUSD);
      console.log('✅ Preço do produto atualizado via API');
    } catch (error: any) {
      console.error('❌ Erro ao atualizar preço na API:', error);
      setError(`Erro ao salvar preço: ${error.message}`);
    }
  };

  // Criar novo produto (ADM)
  const handleCreateProduct = () => {
    if (!newProduct.name || !newProduct.image || newProduct.price === undefined || newProduct.price <= 0) {
      alert("Preencha todos os campos obrigatórios (nome, imagem, preço)!");
      return;
    }

    const pointsDiscount = calculatePointsFor10Percent(newProduct.price as number);
    const createdProduct: DigitalProduct = {
      id: `prod-${String(nextProductId).padStart(3, '0')}`,
      name: newProduct.name as string,
      description: newProduct.description || "",
      price: newProduct.price as number,
      image: newProduct.image as string,
      category: (newProduct.category || "Assets") as "Assets" | "Templates" | "Tutorials" | "Brushes",
      pointsDiscount,
    };

    setProducts([...products, createdProduct]);
    setNextProductId(nextProductId + 1);

    // Reset form
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      image: "",
      category: "Assets",
      pointsDiscount: 0,
    });
    setShowCreateProduct(false);

    // INTEGRAÇÃO BANCO DE DADOS: Enviar para API
    // TODO: POST /api/shop/products com os dados do novo produto
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* ===== BACKGROUND PERSONALIZADO DA LOJA ===== */}
      {/* REMOVER ESTA LINHA PARA VOLTAR AO FUNDO ORIGINAL */}
      <ShopBackground />

      <div className="container mx-auto px-6 relative z-10">
        {/* ================= INDICADOR DE ERRO ================= */}
        {error && (
          <div className="mb-6 p-4 border border-[#8b2c2c] bg-[#8b2c2c]/10 text-[#e8d5bb] flex items-center gap-2 relative z-20">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-auto text-[#a89677] hover:text-[#e8d5bb]">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ================= INDICADOR DE CARREGAMENTO ================= */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader className="w-12 h-12 text-[#b8964f] animate-spin mx-auto mb-4" />
              <p className="text-[#a89677]">Carregando loja...</p>
            </div>
          </div>
        ) : (
          <>
        {/* ================= INICIO AREA: HEADER DA LOJA ================= */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b8964f] to-[#b8964f]"></div>
            <p className="text-sm tracking-widest text-[#b8964f]">PRODUTOS</p>
            <div className="w-32 h-px bg-gradient-to-l from-transparent via-[#b8964f] to-[#b8964f]"></div>
          </div>

          <EditableText
            id="shop.page.title"
            value={pageTitle}
            onChange={handleSavePageTitle}
            label="Título da página"
          >
            <h1 className="text-5xl md:text-6xl text-[#e8d5bb] mb-4 font-['Cinzel']">
              {pageTitle}
            </h1>
          </EditableText>

          <EditableText
            id="shop.page.subtitle"
            value={pageSubtitle}
            onChange={handleSavePageSubtitle}
            label="Subtítulo da página"
          >
            <p className="text-lg text-[#c9b697]">
              {pageSubtitle}
            </p>
          </EditableText>

          {/* Seletor de Moedas */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2 bg-[#0a0604] border border-[#b8964f] px-4 py-2 rounded">
              <Globe className="w-4 h-4 text-[#b8964f]" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent text-[#e8d5bb] cursor-pointer outline-none"
              >
                {getAvailableCurrencies().map(curr => (
                  <option key={curr.code} value={curr.code} className="bg-[#0a0604] text-[#e8d5bb]">
                    {curr.code} - {curr.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* ================= FIM AREA: HEADER DA LOJA ================= */}

        {/* ================= INICIO AREA: BARRA DE PONTOS DO USUÁRIO ================= */}
        {isAuthenticated && user && (
          <div className="mb-8 p-6 border border-[#b8964f] bg-gradient-to-r from-[#b8964f]/10 to-transparent">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-[#b8964f]" />
                <div>
                  <p className="text-sm text-[#a89677]">Seus Pontos Disponíveis</p>
                  <p className="text-2xl text-[#e8d5bb] font-['Cinzel']">{user.points} pontos</p>
                </div>
              </div>
              <div className="text-sm text-[#a89677]">
                <p>💎 Use pontos para descontos de até 30%</p>
                <p>🎁 Ganhe 10% do valor da compra em pontos</p>
              </div>
            </div>
          </div>
        )}
        {/* ================= FIM AREA: BARRA DE PONTOS DO USUÁRIO ================= */}

        {/* ================= INICIO AREA: FILTROS DE CATEGORIA ================= */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center items-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 border transition-all tracking-wider ${
                selectedCategory === category
                  ? "border-[#b8964f] bg-[#b8964f] text-[#0a0604]"
                  : "border-[#8b6f47]/50 text-[#a89677] hover:border-[#b8964f] hover:text-[#b8964f]"
              }`}
            >
              {category}
            </button>
          ))}

          {/* Botão de Adicionar Produto (só visível para admin) */}
          {user?.isAdmin && (
            <button
              onClick={() => setShowCreateProduct(true)}
              className="px-6 py-2 border border-[#b8964f] bg-[#b8964f]/10 text-[#b8964f] hover:bg-[#b8964f]/20 transition-all tracking-wider flex items-center gap-2"
              title="Adicionar novo produto"
            >
              <Plus className="w-4 h-4" />
              Novo Produto
            </button>
          )}
        </div>
        {/* ================= FIM AREA: FILTROS DE CATEGORIA ================= */}

        {/* ================= INICIO AREA: GRID DE PRODUTOS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border border-[#8b6f47]/30 bg-gradient-to-br from-[#1a0f08]/40 to-transparent hover:border-[#b8964f] transition-all duration-300 group"
            >
              {/* Imagem do Produto */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <EditableImage
                  id={`shop.product.${product.id}.image`}
                  src={product.image}
                  alt={product.name}
                  onUpdate={(newSrc) => updateProduct(product.id, "image", newSrc)}
                  label={`Imagem do produto: ${product.name}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-2 left-2 px-3 py-1 bg-[#8b2c2c] text-[#e8d5bb] text-xs tracking-wider">
                  {product.category}
                </div>
              </div>

              {/* Informações do Produto */}
              <div className="p-6">
                <EditableText
                  id={`shop.product.${product.id}.name`}
                  value={product.name}
                  onChange={(newValue) => updateProduct(product.id, "name", newValue)}
                  label="Nome do produto"
                >
                  <h3 className="text-xl text-[#e8d5bb] mb-2 font-['Cinzel']">
                    {product.name}
                  </h3>
                </EditableText>

                <EditableText
                  id={`shop.product.${product.id}.description`}
                  value={product.description}
                  onChange={(newValue) => updateProduct(product.id, "description", newValue)}
                  label="Descrição do produto"
                  multiline
                >
                  <p className="text-sm text-[#a89677] mb-4 line-clamp-2">
                    {product.description}
                  </p>
                </EditableText>

                <div className="flex items-center justify-between mb-4">
                  <EditablePrice
                    id={`shop.product.${product.id}.price`}
                    value={product.price}
                    onChange={(newPrice, newPoints, priceCurrency) => updateProductPrice(product.id, newPrice, newPoints, priceCurrency)}
                    isEditMode={user?.isAdmin || false}
                    currency={currency}
                    displayValue={convertCurrency(product.price, 'USD', currency)}
                    calculatePoints={calculatePointsFor10Percent}
                  />
                  <p className="text-xs text-[#6b5742]">
                    {product.pointsDiscount} pts = -10%
                  </p>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-3 bg-[#8b2c2c] text-[#e8d5bb] hover:bg-[#6b1c1c] transition-all tracking-wider flex items-center justify-center gap-2"
                  disabled={cart.some(item => item.product.id === product.id)}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {cart.some(item => item.product.id === product.id) ? "NO CARRINHO" : "ADICIONAR"}
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* ================= FIM AREA: GRID DE PRODUTOS ================= */}

        {/* ================= BOTÃO FLUTUANTE DO CARRINHO ================= */}
        {cart.length > 0 && (
          <button
            onClick={() => setShowCart(true)}
            className="fixed bottom-8 right-8 p-4 bg-[#8b2c2c] text-[#e8d5bb] rounded-full shadow-2xl hover:bg-[#6b1c1c] transition-all z-40 flex items-center gap-2"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="font-bold">{cart.length}</span>
          </button>
        )}

        {/* ================= MODAL DO CARRINHO ================= */}
        {showCart && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
            <div className="bg-[#0a0604] border-2 border-[#b8964f] p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl text-[#e8d5bb] font-['Cinzel']">Carrinho de Compras</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-[#a89677] hover:text-[#b8964f] transition-colors text-3xl"
                >
                  ×
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-center text-[#a89677] py-12">Seu carrinho está vazio</p>
              ) : (
                <>
                  {/* Lista de Itens */}
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="border border-[#8b6f47]/30 p-4 bg-gradient-to-br from-[#1a0f08]/40 to-transparent"
                      >
                        <div className="flex gap-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-24 h-24 object-cover border border-[#8b6f47]/50"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg text-[#e8d5bb]">{item.product.name}</h3>
                                <p className="text-xs text-[#a89677]">{item.product.category}</p>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-[#8b2c2c] hover:text-[#6b1c1c]"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>

                            {/* Usar Pontos */}
                            <div className="mb-2">
                              <div className="flex items-center justify-between mb-1">
                                <label className="text-sm text-[#a89677]">Usar pontos:</label>
                                <p className="text-xs text-[#6b5742]">
                                  Máx: {Math.min(item.product.pointsDiscount * 3, user?.points || 0)} pts (-30%)
                                </p>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max={Math.min(item.product.pointsDiscount * 3, user?.points || 0)}
                                step={item.product.pointsDiscount}
                                value={item.pointsUsed}
                                onChange={(e) => usePointsOnProduct(item.product.id, Number(e.target.value))}
                                className="w-full"
                              />
                              <p className="text-xs text-[#b8964f] mt-1">
                                {item.pointsUsed} pontos = -{Math.floor(item.pointsUsed / item.product.pointsDiscount) * 10}% desconto
                              </p>
                            </div>

                            {/* Preços */}
                            <div className="flex items-center justify-between">
                              {item.pointsUsed > 0 && (
                                <p className="text-sm text-[#6b5742] line-through">
                                  {formatCurrency(convertCurrency(item.product.price, 'USD', currency), currency)}
                                </p>
                              )}
                              <p className="text-xl text-[#b8964f] font-['Cinzel']">
                                {formatCurrency(convertCurrency(item.finalPrice, 'USD', currency), currency)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Resumo */}
                  <div className="border-t border-[#8b6f47]/30 pt-6 space-y-2">
                    <div className="flex justify-between text-[#a89677]">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(displaySubtotal, currency)}</span>
                    </div>
                    {totalPointsUsed > 0 && (
                      <>
                        <div className="flex justify-between text-[#b8964f]">
                          <span>Desconto ({totalPointsUsed} pontos):</span>
                          <span>-{formatCurrency(displayTotalSaved, currency)}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between text-xl text-[#e8d5bb] font-['Cinzel'] pt-2 border-t border-[#8b6f47]/30">
                      <span>Total:</span>
                      <span>{formatCurrency(displayCartTotal, currency)}</span>
                    </div>
                    <p className="text-sm text-[#6b5742] text-center">
                      Você ganhará {Math.floor(displayCartTotal * 0.1)} pontos com esta compra
                    </p>
                  </div>

                  {/* Botão Finalizar */}
                  <button
                    onClick={handleCheckout}
                    className="w-full mt-6 py-4 bg-[#8b2c2c] text-[#e8d5bb] hover:bg-[#6b1c1c] transition-all tracking-wider text-lg flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    FINALIZAR COMPRA
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* ================= MODAL CRIAR PRODUTO ================= */}
        {showCreateProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
            <div className="bg-[#0a0604] border-2 border-[#b8964f] p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl text-[#e8d5bb] font-['Cinzel']">Criar Novo Produto</h2>
                <button
                  onClick={() => setShowCreateProduct(false)}
                  className="text-[#a89677] hover:text-[#b8964f] transition-colors text-3xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Nome do Produto */}
                <div>
                  <label className="block text-sm text-[#b8964f] mb-2 tracking-wider">NOME DO PRODUTO *</label>
                  <input
                    type="text"
                    value={newProduct.name || ""}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Ex: Pack de Texturas Medievais"
                    className="w-full px-4 py-2 bg-[#1a0f08] border border-[#8b6f47]/50 text-[#e8d5bb] placeholder-[#6b5742] focus:border-[#b8964f] focus:outline-none transition-colors"
                  />
                </div>

                {/* Descrição */}
                <div>
                  <label className="block text-sm text-[#b8964f] mb-2 tracking-wider">DESCRIÇÃO</label>
                  <textarea
                    value={newProduct.description || ""}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Descreva o produto em detalhes..."
                    rows={4}
                    className="w-full px-4 py-2 bg-[#1a0f08] border border-[#8b6f47]/50 text-[#e8d5bb] placeholder-[#6b5742] focus:border-[#b8964f] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* URL da Imagem */}
                <div>
                  <label className="block text-sm text-[#b8964f] mb-2 tracking-wider">URL DA IMAGEM *</label>
                  <input
                    type="url"
                    value={newProduct.image || ""}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    placeholder="https://exemplo.com/imagem.jpg"
                    className="w-full px-4 py-2 bg-[#1a0f08] border border-[#8b6f47]/50 text-[#e8d5bb] placeholder-[#6b5742] focus:border-[#b8964f] focus:outline-none transition-colors"
                  />
                  {newProduct.image && (
                    <img
                      src={newProduct.image}
                      alt="Preview"
                      className="mt-2 max-h-32 border border-[#8b6f47]/50"
                      onError={() => alert("Não foi possível carregar a imagem. Verifique a URL.")}
                    />
                  )}
                </div>

                {/* Preço */}
                <div>
                  <label className="block text-sm text-[#b8964f] mb-2 tracking-wider">PREÇO (USD) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={newProduct.price || ""}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    className="w-full px-4 py-2 bg-[#1a0f08] border border-[#8b6f47]/50 text-[#e8d5bb] placeholder-[#6b5742] focus:border-[#b8964f] focus:outline-none transition-colors"
                  />
                  {newProduct.price && newProduct.price > 0 && (
                    <p className="text-xs text-[#b8964f] mt-1">
                      Será gerado {calculatePointsFor10Percent(newProduct.price)} pontos para desconto de 10%
                    </p>
                  )}
                </div>

                {/* Categoria */}
                <div>
                  <label className="block text-sm text-[#b8964f] mb-2 tracking-wider">CATEGORIA</label>
                  <select
                    value={newProduct.category || "Assets"}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as DigitalProduct["category"] })}
                    className="w-full px-4 py-2 bg-[#1a0f08] border border-[#8b6f47]/50 text-[#e8d5bb] focus:border-[#b8964f] focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Assets">Assets</option>
                    <option value="Templates">Templates</option>
                    <option value="Tutorials">Tutorials</option>
                    <option value="Brushes">Brushes</option>
                  </select>
                </div>

                {/* Botões de Ação */}
                <div className="flex gap-4 pt-4 border-t border-[#8b6f47]/30">
                  <button
                    onClick={handleCreateProduct}
                    className="flex-1 py-3 bg-[#8b2c2c] text-[#e8d5bb] hover:bg-[#6b1c1c] transition-all tracking-wider flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    CRIAR PRODUTO
                  </button>
                  <button
                    onClick={() => setShowCreateProduct(false)}
                    className="flex-1 py-3 border border-[#8b6f47]/50 text-[#a89677] hover:border-[#b8964f] hover:text-[#b8964f] transition-all tracking-wider"
                  >
                    CANCELAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
}
