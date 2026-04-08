import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, Scroll, Flame, Crown, Eye, BookOpen, Sparkles, Target, Workflow, Loader, AlertCircle, X } from "lucide-react";
import heroImageDefault from "../../assets/490dd39d6d3512acda9746c81ce4d76eef31379a.png";
import { EditButton } from "../components/EditButton";
import { contentAPI } from "../services/api";

export function Home() {
  // ================= ESTADO: CARREGAMENTO ================= 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ================= INICIO AREA: DADOS EDITÁVEIS (ADM) ================= 
  // Estes estados permitem que o ADM edite conteúdo diretamente
  const [heroImage, setHeroImage] = useState(heroImageDefault);
  const [heroTitle, setHeroTitle] = useState("FORJANDO MUNDOS\nPARA JOGOS E RPG");
  const [heroSubtitle, setHeroSubtitle] = useState("Concept art e direção visual para projetos\nque exigem identidade forte e imersão.");
  
  // ================= EFEITO: CARREGAR CONTEÚDO DA API =================
  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);

        const contentData = await contentAPI.getAll();
        if ((contentData as any).content) {
          const pageContent = (contentData as any).content;
          
          if (pageContent['home.hero.title']) {
            setHeroTitle(pageContent['home.hero.title'].value);
          }
          if (pageContent['home.hero.subtitle']) {
            setHeroSubtitle(pageContent['home.hero.subtitle'].value);
          }
          if (pageContent['home.hero.image']) {
            setHeroImage(pageContent['home.hero.image'].value);
          }
        }
      } catch (err: any) {
        console.error('Erro ao carregar conteúdo:', err);
        setError(err.message || 'Erro ao carregar página');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  // ================= FUNÇÕES: WRAPPER PARA EDIÇÃO COM PERSISTÊNCIA ================= 
  const handleSaveHeroTitle = async (newValue: string) => {
    setHeroTitle(newValue);
    try {
      await contentAPI.update('home.hero.title', newValue);
      console.log('✅ Título do hero salvo');
    } catch (err: any) {
      console.error('❌ Erro ao salvar título:', err);
      setError(`Erro ao salvar: ${err.message}`);
    }
  };

  const handleSaveHeroSubtitle = async (newValue: string) => {
    setHeroSubtitle(newValue);
    try {
      await contentAPI.update('home.hero.subtitle', newValue);
      console.log('✅ Subtítulo do hero salvo');
    } catch (err: any) {
      console.error('❌ Erro ao salvar subtítulo:', err);
      setError(`Erro ao salvar: ${err.message}`);
    }
  };

  const handleSaveHeroImage = async (newValue: string) => {
    setHeroImage(newValue);
    try {
      await contentAPI.update('home.hero.image', newValue);
      console.log('✅ Imagem do hero salva');
    } catch (err: any) {
      console.error('❌ Erro ao salvar imagem:', err);
      setError(`Erro ao salvar: ${err.message}`);
    }
  };

  // ================= INICIO AREA: DADOS PORTFOLIO PREVIEW ================= 
  // Array com 4 imagens do portfólio (Personagens, Criaturas, Cenários, Props)
  // Estas imagens aparecem na seção de preview do portfólio na home
  const [portfolioItems, setPortfolioItems] = useState([
    {
      id: 1,
      title: "PERSONAGENS",
      // IMAGEM: Cavaleiro/guerreiro de dark fantasy com armadura
      image: "https://images.unsplash.com/photo-1773216344170-7fca0c1f83ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZmFudGFzeSUyMGtuaWdodCUyMHdhcnJpb3IlMjBhcm1vcnxlbnwxfHx8fDE3NzQwMzEzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      title: "CRIATURAS",
      // IMAGEM: Dragão com fogo - criatura de fantasia
      image: "https://images.unsplash.com/photo-1765148754568-3bdda3dc843f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZHJhZ29uJTIwZmlyZSUyMGNyZWF0dXJlfGVufDF8fHx8MTc3NDAzMTMzMnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      title: "CENÁRIOS",
      // IMAGEM: Castelo de fantasia com paisagem e montanhas
      image: "https://images.unsplash.com/photo-1758818908570-2392ce78580e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwY2FzdGxlJTIwbGFuZHNjYXBlJTIwbW91bnRhaW5zfGVufDF8fHx8MTc3NDAzMTMzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 4,
      title: "PROPS & ITENS",
      // IMAGEM: Espada medieval dourada / tesouro
      image: "https://images.unsplash.com/photo-1725434760261-c35d88b2e38b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMHN3b3JkJTIwZ29sZGVuJTIwdHJlYXN1cmV8ZW58MXx8fHwxNzc0MDMxMzMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ]);
  // ================= FIM AREA: DADOS PORTFOLIO PREVIEW ================= 

  const services = [
    {
      icon: Scroll,
      title: "CONCEPT ART",
      description: "Explorações visuais para personagens, cenários e itens",
    },
    {
      icon: Flame,
      title: "DESIGN DE CRIATURAS",
      description: "Monstros e beasts únicas e memoráveis",
    },
    {
      icon: Crown,
      title: "PERSONAGENS",
      description: "Heróis, vilões e NPCs cheios de personalidade",
    },
    {
      icon: Eye,
      title: "DIREÇÃO DE ARTE",
      description: "Consistência visual e identidade para seu universo",
    },
  ];

  const differentials = [
    {
      icon: BookOpen,
      title: "Especialistas em Jogos & RPG",
    },
    {
      icon: Sparkles,
      title: "Foco em Narrativa Visual",
    },
    {
      icon: Target,
      title: "Consistência Estética",
    },
    {
      icon: Workflow,
      title: "Processo Profissional",
    },
  ];

  // Função para atualizar imagem do portfólio
  const updatePortfolioImage = (id: number, newImage: string) => {
    setPortfolioItems(items =>
      items.map(item => item.id === id ? { ...item, image: newImage } : item)
    );
    // INTEGRAÇÃO BANCO DE DADOS: Salvar alteração no banco
  };

  // Função para atualizar conteúdo na API
  const updateHomeContent = async (elementId: string, value: string) => {
    try {
      await contentAPI.update(elementId, value);
    } catch (err: any) {
      console.error('Erro ao salvar:', err);
      setError(`Erro ao salvar: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* ================= INDICADOR DE ERRO ================= */}
      {error && (
        <div className="fixed top-20 left-0 right-0 z-50 mx-4 p-4 border border-[#8b2c2c] bg-[#8b2c2c]/10 text-[#e8d5bb] flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-auto text-[#a89677] hover:text-[#e8d5bb]">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ================= INDICADOR DE CARREGAMENTO ================= */}
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader className="w-12 h-12 text-[#b8964f] animate-spin mx-auto mb-4" />
            <p className="text-[#a89677]">Carregando portal...</p>
          </div>
        </div>
      ) : (
        <>
      {/* ================= INICIO AREA: HERO SECTION (SEÇÃO PRINCIPAL/TOPO) ================= */}
      {/* Esta é a primeira seção que o usuário vê - Hero com imagem de fundo */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* ================= INICIO: IMAGEM DE FUNDO DO HERO ================= */}
        {/* IMAGEM DE FUNDO: Personagem/guerreiro épico de fantasia - ocupa toda a tela */}
        <div className="absolute inset-0">
          <img 
            src={heroImage}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          {/* BOTÃO DE EDIÇÃO ADM - IMAGEM HERO */}
          <div className="absolute top-24 right-4 z-9999">
            <EditButton
              type="image"
              currentValue={heroImage}
              onSave={handleSaveHeroImage}
              label="Imagem de fundo do Hero"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0604]/60 via-[#0a0604]/40 to-[#0a0604]"></div>
        </div>
        {/* ================= FIM: IMAGEM DE FUNDO DO HERO ================= */}

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-7xl mb-6 text-[#e8d5bb] leading-tight font-['Cinzel']">
              {heroTitle.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < heroTitle.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h1>
            {/* BOTÃO DE EDIÇÃO ADM - TÍTULO HERO */}
            <div className="absolute -top-2 -right-2 z- [9999]">
              <EditButton
                type="text"
                currentValue={heroTitle}
                onSave={handleSaveHeroTitle}
                label="Título principal do Hero"
              />
            </div>
          </div>

          <div className="relative inline-block max-w-3xl mx-auto mb-10">
            <p className="text-lg md:text-xl text-[#c9b697] leading-relaxed">
              {heroSubtitle.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < heroSubtitle.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
            {/* BOTÃO DE EDIÇÃO ADM - SUBTÍTULO HERO */}
            <div className="absolute -top-2 -right-2 z- [9999]">
              <EditButton
                type="text"
                currentValue={heroSubtitle}
                onSave={handleSaveHeroSubtitle}
                label="Subtítulo do Hero"
              />
            </div>
          </div>
          
          {/* ================= INICIO: BOTÕES DE AÇÃO DO HERO ================= */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/solicitar-projeto"
              className="px-8 py-4 bg-[#8b2c2c] border-2 border-[#8b2c2c] text-[#e8d5bb] hover:bg-[#6b1c1c] transition-all duration-300 tracking-wider inline-flex items-center justify-center gap-2 group"
            >
              SOLICITAR PROJETO
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/portfolio"
              className="px-8 py-4 bg-transparent border-2 border-[#b8964f] text-[#b8964f] hover:bg-[#b8964f] hover:text-[#1a0f08] transition-all duration-300 tracking-wider"
            >
              VER PORTFÓLIO
            </Link>
          </div>
          {/* ================= FIM: BOTÕES DE AÇÃO DO HERO ================= */}
        </div>

        {/* Decorative ornament */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-16 bg-gradient-to-b from-[#b8964f] to-transparent"></div>
          <div className="w-2 h-2 rotate-45 border border-[#b8964f]"></div>
        </div>
      </section>
      {/* ================= FIM AREA: HERO SECTION (SEÇÃO PRINCIPAL/TOPO) ================= */}

      {/* ================= INICIO AREA: PORTFOLIO PREVIEW SECTION ================= */}
      <section className="py-20 relative">
        {/* Decorative header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b8964f] to-[#b8964f]"></div>
            <p className="text-sm tracking-widest text-[#b8964f]">PORTFÓLIO</p>
            <div className="w-32 h-px bg-gradient-to-l from-transparent via-[#b8964f] to-[#b8964f]"></div>
          </div>
          <h2 className="text-4xl md:text-5xl text-[#e8d5bb] mb-4" style={{ fontFamily: 'serif' }}>
            ÚLTIMOS TRABALHOS
          </h2>
        </div>

        {/* ================= INICIO: GRID DE IMAGENS DO PORTFOLIO ================= */}
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioItems.map((item) => (
              <div 
                key={item.id}
                className="group relative aspect-[3/4] overflow-hidden border-2 border-[#8b6f47]/30 hover:border-[#b8964f] transition-all duration-500"
              >
                {/* CARD DE IMAGEM: Cada categoria do portfólio */}
                <Link to="/portfolio" className="block w-full h-full">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0604] via-[#0a0604]/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl tracking-wider text-[#e8d5bb]" style={{ fontFamily: 'serif' }}>
                      {item.title}
                    </h3>
                  </div>
                </Link>

                {/* BOTÃO DE EDIÇÃO ADM - IMAGEM DO PORTFÓLIO */}
                <div
                  className="absolute top-2 right-2 z-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <EditButton
                    type="image"
                    currentValue={item.image}
                    onSave={(newValue) => updatePortfolioImage(item.id, newValue)}
                    label={`Imagem de ${item.title}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* View Full Portfolio */}
          <div className="text-center mt-12">
            <Link 
              to="/portfolio"
              className="inline-flex items-center gap-2 text-[#b8964f] hover:text-[#e8d5bb] transition-colors group"
            >
              <span className="tracking-wider">VER PORTFÓLIO COMPLETO</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
      {/* ================= FIM AREA: PORTFOLIO PREVIEW SECTION ================= */}

      {/* ================= INICIO AREA: SERVICES SECTION ================= */}
      <section className="py-20 relative">
        {/* Decorative header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b8964f] to-[#b8964f]"></div>
            <p className="text-sm tracking-widest text-[#b8964f]">SERVIÇOS</p>
            <div className="w-32 h-px bg-gradient-to-l from-transparent via-[#b8964f] to-[#b8964f]"></div>
          </div>
          <h2 className="text-4xl md:text-5xl text-[#e8d5bb]" style={{ fontFamily: 'serif' }}>
            COMO PODEMOS AJUDAR SEU PROJETO
          </h2>
        </div>

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index}
                  className="group relative p-8 border border-[#8b6f47]/30 bg-gradient-to-b from-[#1a0f08]/40 to-transparent hover:border-[#b8964f] transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="w-16 h-16 mb-6 rounded-full border-2 border-[#b8964f] flex items-center justify-center bg-gradient-to-br from-[#b8964f]/20 to-transparent group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-[#b8964f]" />
                  </div>
                  
                  <h3 className="text-lg mb-3 tracking-wider text-[#e8d5bb]" style={{ fontFamily: 'serif' }}>
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#a89677] leading-relaxed">
                    {service.description}
                  </p>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#b8964f]/30 group-hover:border-[#b8964f] transition-colors"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#b8964f]/30 group-hover:border-[#b8964f] transition-colors"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* ================= FIM AREA: SERVICES SECTION ================= */}

      {/* ================= INICIO AREA: DIFFERENTIALS SECTION ================= */}
      <section className="py-20 bg-gradient-to-b from-transparent via-[#1a0f08]/40 to-transparent">
        <div className="container mx-auto px-6">
          {/* Decorative header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b8964f] to-[#b8964f]"></div>
              <p className="text-sm tracking-widest text-[#b8964f]">POR QUE NOS ESCOLHER</p>
              <div className="w-32 h-px bg-gradient-to-l from-transparent via-[#b8964f] to-[#b8964f]"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {differentials.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full border border-[#b8964f] bg-gradient-to-br from-[#b8964f]/10 to-transparent group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-[#b8964f]" />
                  </div>
                  <h3 className="text-sm tracking-wider text-[#e8d5bb]">
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* ================= FIM AREA: DIFFERENTIALS SECTION ================= */}

      {/* ================= INICIO AREA: CTA FINAL SECTION ================= */}
      <section className="py-20 relative overflow-hidden">
        {/* Background effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a0f08]/60 to-transparent"></div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl text-[#e8d5bb] mb-6" style={{ fontFamily: 'serif' }}>
            VAMOS DAR VIDA AO SEU MUNDO?
          </h2>
          <p className="text-lg text-[#c9b697] mb-10 max-w-2xl mx-auto">
            Entre em contato e receba um orçamento personalizado
          </p>
          
          {/* ================= BOTÃO CTA FINAL ================= */}
          <Link 
            to="/solicitar-projeto"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#8b2c2c] border-2 border-[#8b2c2c] text-[#e8d5bb] hover:bg-[#6b1c1c] transition-all duration-300 tracking-wider group"
          >
            INICIAR PROJETO
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          {/* ================= FIM BOTÃO CTA FINAL ================= */}
        </div>
      </section>
      {/* ================= FIM AREA: CTA FINAL SECTION ================= */}
        </>
      )}
    </div>
  );
}
