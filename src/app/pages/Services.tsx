import { Scroll, Flame, Users, Eye, Package, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { EditableText } from "../components/EditableText";
import { EditableImage } from "../components/EditableImage";

export function Services() {
  // ================= INICIO AREA: TEXTOS EDITÁVEIS (ADM) ================= 
  const [pageTitle, setPageTitle] = useState("SERVIÇOS");
  const [pageSubtitle, setPageSubtitle] = useState("Do conceito à finalização, transformamos ideias em arte épica");

  // ================= INICIO AREA: DADOS DOS SERVIÇOS ================= 
  // Array com todos os serviços oferecidos - cada um tem uma imagem de exemplo
  // INTEGRAÇÃO BANCO DE DADOS: Buscar serviços do banco
  const [services, setServices] = useState([
    {
      id: "service-001",
      icon: Scroll,
      name: "Concept Art",
      problem: "Você tem uma ideia mas não sabe como visualizá-la?",
      included: [
        "Explorações visuais iniciais",
        "Múltiplas versões e variações",
        "Estudos de forma, cor e composição",
        "Moodboards e referências",
      ],
      ideal: "Desenvolvedores indie, estúdios pequenos, game designers que precisam visualizar suas ideias antes do desenvolvimento.",
      // IMAGEM: Herói/personagem de dark fantasy
      image: "https://images.unsplash.com/photo-1758850253805-8572b62e376d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZmFudGFzeSUyMGhlcm8lMjBjaGFyYWN0ZXJ8ZW58MXx8fHwxNzc0MDMxMzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "service-002",
      icon: Flame,
      name: "Design de Criaturas",
      problem: "Precisa de monstros e criaturas que sejam únicas e memoráveis?",
      included: [
        "Anatomia e estrutura criativa",
        "Variações de conceito",
        "Paleta de cores personalizada",
        "Vistas múltiplas (frente, perfil, costas)",
        "Detalhes de texturas e materiais",
      ],
      ideal: "Projetos de RPG, jogos com bestiários, narrativas que precisam de antagonistas visuais impactantes.",
      // IMAGEM: Dragão com fogo - criatura de fantasia
      image: "https://images.unsplash.com/photo-1765148754568-3bdda3dc843f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZHJhZ29uJTIwZmlyZSUyMGNyZWF0dXJlfGVufDF8fHx8MTc3NDAzMTMzMnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "service-003",
      icon: Users,
      name: "Personagens",
      problem: "Seus heróis e vilões precisam de personalidade visual?",
      included: [
        "Design completo de personagens",
        "Estudos de silhueta e pose",
        "Variações de trajes e equipamentos",
        "Expressões faciais e emoções",
        "Ficha técnica de personagem",
      ],
      ideal: "Narrativas ricas, RPGs com protagonistas complexos, jogos que dependem de conexão emocional com personagens.",
      // IMAGEM: Cavaleiro/guerreiro de dark fantasy com armadura
      image: "https://images.unsplash.com/photo-1773216344170-7fca0c1f83ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZmFudGFzeSUyMGtuaWdodCUyMHdhcnJpb3IlMjBhcm1vcnxlbnwxfHx8fDE3NzQwMzEzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "service-004",
      icon: Eye,
      name: "Direção de Arte",
      problem: "Seu projeto precisa de identidade visual consistente e coesa?",
      included: [
        "Desenvolvimento de paleta de cores",
        "Style guide completo",
        "Definição de linguagem visual",
        "Supervisão de consistência estética",
        "Guidelines para equipe",
      ],
      ideal: "Projetos grandes com múltiplos artistas, jogos que precisam de coesão visual, universos transmídia.",
      // IMAGEM: Castelo de fantasia com paisagem e montanhas
      image: "https://images.unsplash.com/photo-1758818908570-2392ce78580e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwY2FzdGxlJTIwbGFuZHNjYXBlJTIwbW91bnRhaW5zfGVufDF8fHx8MTc3NDAzMTMzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "service-005",
      icon: Package,
      name: "Assets para Jogos",
      problem: "Precisa de elementos visuais prontos para implementação?",
      included: [
        "Armas, armaduras e equipamentos",
        "Itens consumíveis e props",
        "Ícones de interface",
        "Elementos de cenário",
        "Arquivos otimizados para engine",
      ],
      ideal: "Desenvolvimento em fase de produção, jogos que precisam de biblioteca de assets, projetos com deadline apertado.",
      // IMAGEM: Espada medieval dourada / tesouro
      image: "https://images.unsplash.com/photo-1725434760261-c35d88b2e38b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMHN3b3JkJTIwZ29sZGVuJTIwdHJlYXN1cmV8ZW58MXx8fHwxNzc0MDMxMzMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ]);
  // ================= FIM AREA: DADOS DOS SERVIÇOS ================= 

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* ================= INICIO AREA: HEADER DA PÁGINA ================= */}
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b8964f] to-[#b8964f]"></div>
            <EditableText
              id="services.header.label"
              value="SERVIÇOS"
              onChange={(value) => setPageTitle(value)}
            >
              <p className="text-sm tracking-widest text-[#b8964f]">{pageTitle}</p>
            </EditableText>
            <div className="w-32 h-px bg-gradient-to-l from-transparent via-[#b8964f] to-[#b8964f]"></div>
          </div>
          <EditableText
            id="services.header.title"
            value="COMO PODEMOS AJUDAR"
            onChange={(value) => {/* TODO: Salvar no banco */}}
          >
            <h1 className="text-5xl md:text-6xl text-[#e8d5bb] mb-4" style={{ fontFamily: 'serif' }}>
              COMO PODEMOS AJUDAR
            </h1>
          </EditableText>
          <EditableText
            id="services.header.subtitle"
            value="Oferecemos soluções completas de arte e direção visual para dar vida ao seu universo"
            onChange={(value) => setPageSubtitle(value)}
          >
            <p className="text-lg text-[#a89677] max-w-2xl mx-auto">
              {pageSubtitle}
            </p>
          </EditableText>
        </div>
        {/* ================= FIM AREA: HEADER DA PÁGINA ================= */}

        {/* ================= INICIO AREA: LISTAGEM DE SERVIÇOS ================= */}
        {/* Services List - Cada serviço alterna entre imagem à esquerda e à direita */}
        <div className="space-y-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                {/* ================= INICIO: IMAGEM DO SERVIÇO ================= */}
                {/* Image - A posição alterna (esquerda/direita) dependendo se é par ou ímpar */}
                <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative aspect-[4/3] overflow-hidden border border-[#8b6f47]/30 group">
                    <EditableImage
                      id={`services.service.${service.id}.image`}
                      src={service.image}
                      alt={service.name}
                      onUpdate={(newImage) => {
                        setServices(services.map(s => 
                          s.id === service.id ? { ...s, image: newImage } : s
                        ));
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0604] via-transparent to-transparent"></div>
                  </div>
                </div>
                {/* ================= FIM: IMAGEM DO SERVIÇO ================= */}

                {/* ================= INICIO: CONTEÚDO DO SERVIÇO ================= */}
                {/* Content */}
                <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full border-2 border-[#b8964f] flex items-center justify-center bg-gradient-to-br from-[#b8964f]/20 to-transparent">
                      <Icon className="w-8 h-8 text-[#b8964f]" />
                    </div>
                    <EditableText
                      id={`services.service.${service.id}.name`}
                      value={service.name}
                      onChange={(value) => {
                        setServices(services.map(s => 
                          s.id === service.id ? { ...s, name: value } : s
                        ));
                      }}
                    >
                      <h2 className="text-3xl text-[#e8d5bb]" style={{ fontFamily: 'serif' }}>
                        {service.name}
                      </h2>
                    </EditableText>
                  </div>

                  {/* Problem */}
                  <div className="mb-6">
                    <h3 className="text-sm tracking-wider text-[#b8964f] mb-2">PROBLEMA QUE RESOLVE</h3>
                    <EditableText
                      id={`services.service.${service.id}.problem`}
                      value={service.problem}
                      onChange={(value) => {
                        setServices(services.map(s => 
                          s.id === service.id ? { ...s, problem: value } : s
                        ));
                      }}
                      multiline
                    >
                      <p className="text-[#c9b697]">{service.problem}</p>
                    </EditableText>
                  </div>

                  {/* Included */}
                  <div className="mb-6">
                    <h3 className="text-sm tracking-wider text-[#b8964f] mb-3">O QUE ESTÁ INCLUÍDO</h3>
                    <ul className="space-y-2">
                      {service.included.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#a89677]">
                          <span className="text-[#b8964f] mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal For */}
                  <div className="p-4 border-l-2 border-[#b8964f] bg-[#1a0f08]/30">
                    <h3 className="text-sm tracking-wider text-[#b8964f] mb-2">IDEAL PARA</h3>
                    <EditableText
                      id={`services.service.${service.id}.ideal`}
                      value={service.ideal}
                      onChange={(value) => {
                        setServices(services.map(s => 
                          s.id === service.id ? { ...s, ideal: value } : s
                        ));
                      }}
                      multiline
                    >
                      <p className="text-sm text-[#a89677]">{service.ideal}</p>
                    </EditableText>
                  </div>
                </div>
                {/* ================= FIM: CONTEÚDO DO SERVIÇO ================= */}
              </div>
            );
          })}
        </div>
        {/* ================= FIM AREA: LISTAGEM DE SERVIÇOS ================= */}

        {/* ================= INICIO AREA: CTA FINAL ================= */}
        {/* CTA Section */}
        <div className="mt-20 text-center p-12 border border-[#8b6f47]/30 bg-gradient-to-br from-[#1a0f08]/40 to-transparent">
          <EditableText
            id="services.cta.title"
            value="Não encontrou o que procura?"
            onChange={(value) => {/* TODO: Salvar no banco */}}
          >
            <h2 className="text-3xl text-[#e8d5bb] mb-4" style={{ fontFamily: 'serif' }}>
              Não encontrou o que procura?
            </h2>
          </EditableText>
          <EditableText
            id="services.cta.description"
            value="Cada projeto é único. Entre em contato e vamos conversar sobre suas necessidades específicas."
            onChange={(value) => {/* TODO: Salvar no banco */}}
            multiline
          >
            <p className="text-[#a89677] mb-8 max-w-2xl mx-auto">
              Cada projeto é único. Entre em contato e vamos conversar sobre suas necessidades específicas.
            </p>
          </EditableText>
          <Link 
            to="/solicitar-projeto"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#8b2c2c] border-2 border-[#8b2c2c] text-[#e8d5bb] hover:bg-[#6b1c1c] transition-all duration-300 tracking-wider group"
          >
            SOLICITAR ORÇAMENTO
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        {/* ================= FIM AREA: CTA FINAL ================= */}
      </div>
    </div>
  );
}