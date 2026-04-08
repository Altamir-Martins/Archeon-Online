import { FileText, Search, Palette, RotateCcw, CheckCircle } from "lucide-react";

export function HowWeWork() {
  const timeline = [
    {
      icon: FileText,
      title: "Briefing",
      description: "Entendemos profundamente seu projeto, objetivos, público-alvo e referências visuais. Definimos escopo, prazos e expectativas.",
      duration: "1-2 dias",
    },
    {
      icon: Search,
      title: "Pesquisa Visual",
      description: "Mergulhamos em referências, estudamos o universo do seu projeto e criamos moodboards que capturam a essência visual desejada.",
      duration: "2-3 dias",
    },
    {
      icon: Palette,
      title: "Concept Inicial",
      description: "Desenvolvemos os primeiros sketches e concepts, explorando diferentes direções visuais para você escolher a mais adequada.",
      duration: "3-5 dias",
    },
    {
      icon: RotateCcw,
      title: "Revisões",
      description: "Refinamos o conceito escolhido com base no seu feedback. Incluímos até 3 rodadas de revisão para garantir perfeição.",
      duration: "2-4 dias",
    },
    {
      icon: CheckCircle,
      title: "Entrega Final",
      description: "Arte finalizada em alta resolução, com todos os arquivos fonte, variações e documentação técnica necessária.",
      duration: "1-2 dias",
    },
  ];

  const principles = [
    {
      title: "Comunicação Transparente",
      description: "Mantemos você atualizado em cada etapa do processo. Você sempre saberá em que estágio seu projeto está.",
    },
    {
      title: "Qualidade Garantida",
      description: "Não entregamos nada abaixo do nosso padrão de excelência. Se não estamos satisfeitos, você também não estará.",
    },
    {
      title: "Prazos Respeitados",
      description: "Planejamos cronogramas realistas e cumprimos o que prometemos. Seu projeto nunca fica parado sem explicação.",
    },
    {
      title: "Foco em Narrativa",
      description: "Cada elemento visual conta uma história. Criamos arte que não é apenas bonita, mas significativa.",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b8964f] to-[#b8964f]"></div>
            <p className="text-sm tracking-widest text-[#b8964f]">PROCESSO</p>
            <div className="w-32 h-px bg-gradient-to-l from-transparent via-[#b8964f] to-[#b8964f]"></div>
          </div>
          <h1 className="text-5xl md:text-6xl text-[#e8d5bb] mb-4" style={{ fontFamily: 'serif' }}>
            COMO TRABALHAMOS
          </h1>
          <p className="text-lg text-[#a89677] max-w-2xl mx-auto">
            Um processo transparente e colaborativo, do primeiro contato até a entrega final
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#b8964f] via-[#b8964f]/50 to-transparent hidden md:block"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {timeline.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative flex gap-8">
                    {/* Icon */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-16 h-16 rounded-full border-2 border-[#b8964f] flex items-center justify-center bg-[#0a0604]">
                        <Icon className="w-7 h-7 text-[#b8964f]" />
                      </div>
                      {/* Step number */}
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#b8964f] flex items-center justify-center text-[#0a0604] text-sm" style={{ fontFamily: 'serif' }}>
                        {index + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-12">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h3 className="text-2xl text-[#e8d5bb]" style={{ fontFamily: 'serif' }}>
                          {step.title}
                        </h3>
                        <span className="text-sm text-[#b8964f] tracking-wider mt-2 md:mt-0">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-[#a89677] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Principles Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-[#e8d5bb] mb-4" style={{ fontFamily: 'serif' }}>
              Nossos Princípios
            </h2>
            <p className="text-[#a89677] max-w-2xl mx-auto">
              Valores que guiam cada decisão e entrega
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((principle, index) => (
              <div 
                key={index}
                className="p-8 border border-[#8b6f47]/30 bg-gradient-to-br from-[#1a0f08]/40 to-transparent hover:border-[#b8964f]/50 transition-all duration-300"
              >
                <h3 className="text-xl text-[#e8d5bb] mb-3" style={{ fontFamily: 'serif' }}>
                  {principle.title}
                </h3>
                <p className="text-[#a89677] leading-relaxed">
                  {principle.description}
                </p>
                {/* Decorative corner */}
                <div className="mt-4 w-12 h-px bg-gradient-to-r from-[#b8964f] to-transparent"></div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-[#e8d5bb] mb-4" style={{ fontFamily: 'serif' }}>
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-6">
            <div className="border-l-2 border-[#b8964f] pl-6 py-4 bg-[#1a0f08]/30">
              <h3 className="text-lg text-[#e8d5bb] mb-2">Quanto tempo leva um projeto completo?</h3>
              <p className="text-[#a89677]">
                Depende do escopo, mas em média um projeto de personagem completo leva de 10 a 15 dias úteis. Projetos maiores como direção de arte podem levar de 4 a 8 semanas.
              </p>
            </div>

            <div className="border-l-2 border-[#b8964f] pl-6 py-4 bg-[#1a0f08]/30">
              <h3 className="text-lg text-[#e8d5bb] mb-2">Quantas revisões estão incluídas?</h3>
              <p className="text-[#a89677]">
                Cada projeto inclui até 3 rodadas de revisão sem custo adicional. Revisões além disso são cobradas separadamente.
              </p>
            </div>

            <div className="border-l-2 border-[#b8964f] pl-6 py-4 bg-[#1a0f08]/30">
              <h3 className="text-lg text-[#e8d5bb] mb-2">Qual formato de arquivo vocês entregam?</h3>
              <p className="text-[#a89677]">
                Entregamos arquivos em alta resolução nos formatos PSD, PNG e JPG. Para projetos de interface, também fornecemos SVG quando aplicável.
              </p>
            </div>

            <div className="border-l-2 border-[#b8964f] pl-6 py-4 bg-[#1a0f08]/30">
              <h3 className="text-lg text-[#e8d5bb] mb-2">Como funciona o pagamento?</h3>
              <p className="text-[#a89677]">
                50% no início do projeto e 50% na entrega final. Para projetos grandes, podemos dividir em mais parcelas vinculadas a milestones específicos.
              </p>
            </div>

            <div className="border-l-2 border-[#b8964f] pl-6 py-4 bg-[#1a0f08]/30">
              <h3 className="text-lg text-[#e8d5bb] mb-2">Os direitos autorais ficam comigo?</h3>
              <p className="text-[#a89677]">
                Sim. Após o pagamento completo, todos os direitos de uso comercial são transferidos para você. Detalhes completos nos Termos de Serviço.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
