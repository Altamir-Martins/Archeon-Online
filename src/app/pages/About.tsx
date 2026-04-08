import { Target, Heart, Sparkles } from "lucide-react";
import { EditableText } from "../components/EditableText";

export function About() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b8964f] to-[#b8964f]"></div>
            <EditableText
              id="about.header.label"
              value="SOBRE NÓS"
              onChange={(value) => {/* TODO: Salvar no banco */}}
            >
              <p className="text-sm tracking-widest text-[#b8964f]">SOBRE NÓS</p>
            </EditableText>
            <div className="w-32 h-px bg-gradient-to-l from-transparent via-[#b8964f] to-[#b8964f]"></div>
          </div>
          <EditableText
            id="about.header.title"
            value="O ESTÚDIO"
            onChange={(value) => {/* TODO: Salvar no banco */}}
          >
            <h1 className="text-5xl md:text-6xl text-[#e8d5bb] mb-4" style={{ fontFamily: 'serif' }}>
              O ESTÚDIO
            </h1>
          </EditableText>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="prose prose-invert max-w-none">
            <EditableText
              id="about.story.paragraph1"
              value="Em uma época onde cada detalhe pode fazer a diferença entre um mundo esquecível e um universo inesquecível, nasceu Archeon."
              onChange={(value) => {/* TODO: Salvar no banco */}}
              multiline
            >
              <p className="text-lg text-[#c9b697] leading-relaxed mb-6">
                Em uma época onde cada detalhe pode fazer a diferença entre um mundo esquecível e um universo inesquecível, nasceu <span className="text-[#b8964f]" style={{ fontFamily: 'serif' }}>Archeon</span>.
              </p>
            </EditableText>
            
            <EditableText
              id="about.story.paragraph2"
              value="Somos mais do que um estúdio de arte. Somos contadores de histórias visuais, forjadores de mundos e criadores de criaturas que habitam os sonhos e pesadelos dos jogadores. Nossa missão é simples, mas profunda: dar forma ao imaginário."
              onChange={(value) => {/* TODO: Salvar no banco */}}
              multiline
            >
              <p className="text-[#a89677] leading-relaxed mb-6">
                Somos mais do que um estúdio de arte. Somos contadores de histórias visuais, forjadores de mundos e criadores de criaturas que habitam os sonhos e pesadelos dos jogadores. Nossa missão é simples, mas profunda: <span className="text-[#e8d5bb]">dar forma ao imaginário</span>.
              </p>
            </EditableText>

            <EditableText
              id="about.story.paragraph3"
              value="Nascemos da paixão por jogos de RPG, narrativas épicas e universos de fantasia que transcendem o comum. Cada membro da nossa guilda – porque é assim que nos vemos, como uma guilda de artesãos visuais – traz consigo anos de experiência em concept art, ilustração e direção criativa."
              onChange={(value) => {/* TODO: Salvar no banco */}}
              multiline
            >
              <p className="text-[#a89677] leading-relaxed mb-6">
                Nascemos da paixão por jogos de RPG, narrativas épicas e universos de fantasia que transcendem o comum. Cada membro da nossa guilda – porque é assim que nos vemos, como uma guilda de artesãos visuais – traz consigo anos de experiência em concept art, ilustração e direção criativa.
              </p>
            </EditableText>

            <EditableText
              id="about.story.paragraph4"
              value="Trabalhamos com desenvolvedores indie, estúdios de médio porte e criadores apaixonados que entendem que arte não é apenas decoração – é identidade, é imersão, é a diferença entre jogar um jogo e viver uma aventura."
              onChange={(value) => {/* TODO: Salvar no banco */}}
              multiline
            >
              <p className="text-[#a89677] leading-relaxed">
                Trabalhamos com desenvolvedores indie, estúdios de médio porte e criadores apaixonados que entendem que <span className="text-[#e8d5bb]">arte não é apenas decoração</span> – é identidade, é imersão, é a diferença entre "jogar um jogo" e "viver uma aventura".
              </p>
            </EditableText>
          </div>
        </div>

        {/* Mission, Vision, Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-8 border border-[#8b6f47]/30 bg-gradient-to-b from-[#1a0f08]/40 to-transparent">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full border-2 border-[#b8964f] bg-gradient-to-br from-[#b8964f]/20 to-transparent">
              <Target className="w-8 h-8 text-[#b8964f]" />
            </div>
            <EditableText
              id="about.mission.title"
              value="Missão"
              onChange={(value) => {/* TODO: Salvar no banco */}}
            >
              <h3 className="text-xl text-[#e8d5bb] mb-4" style={{ fontFamily: 'serif' }}>
                Missão
              </h3>
            </EditableText>
            <EditableText
              id="about.mission.description"
              value="Criar arte visual que eleva a narrativa, fortalece a identidade e torna mundos imaginários inesquecíveis."
              onChange={(value) => {/* TODO: Salvar no banco */}}
              multiline
            >
              <p className="text-[#a89677] leading-relaxed">
                Criar arte visual que eleva a narrativa, fortalece a identidade e torna mundos imaginários inesquecíveis.
              </p>
            </EditableText>
          </div>

          <div className="text-center p-8 border border-[#8b6f47]/30 bg-gradient-to-b from-[#1a0f08]/40 to-transparent">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full border-2 border-[#b8964f] bg-gradient-to-br from-[#b8964f]/20 to-transparent">
              <Eye className="w-8 h-8 text-[#b8964f]" />
            </div>
            <EditableText
              id="about.vision.title"
              value="Visão"
              onChange={(value) => {/* TODO: Salvar no banco */}}
            >
              <h3 className="text-xl text-[#e8d5bb] mb-4" style={{ fontFamily: 'serif' }}>
                Visão
              </h3>
            </EditableText>
            <EditableText
              id="about.vision.description"
              value="Ser a referência em arte para RPG e jogos narrativos, reconhecidos pela excelência e consistência visual."
              onChange={(value) => {/* TODO: Salvar no banco */}}
              multiline
            >
              <p className="text-[#a89677] leading-relaxed">
                Ser a referência em arte para RPG e jogos narrativos, reconhecidos pela excelência e consistência visual.
              </p>
            </EditableText>
          </div>

          <div className="text-center p-8 border border-[#8b6f47]/30 bg-gradient-to-b from-[#1a0f08]/40 to-transparent">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full border-2 border-[#b8964f] bg-gradient-to-br from-[#b8964f]/20 to-transparent">
              <Heart className="w-8 h-8 text-[#b8964f]" />
            </div>
            <EditableText
              id="about.philosophy.title"
              value="Filosofia"
              onChange={(value) => {/* TODO: Salvar no banco */}}
            >
              <h3 className="text-xl text-[#e8d5bb] mb-4" style={{ fontFamily: 'serif' }}>
                Filosofia
              </h3>
            </EditableText>
            <EditableText
              id="about.philosophy.description"
              value="Cada pixel importa. Cada cor conta uma história. Cada personagem merece profundidade."
              onChange={(value) => {/* TODO: Salvar no banco */}}
              multiline
            >
              <p className="text-[#a89677] leading-relaxed">
                Cada pixel importa. Cada cor conta uma história. Cada personagem merece profundidade.
              </p>
            </EditableText>
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="max-w-4xl mx-auto mb-20">
          <EditableText
            id="about.differences.title"
            value="O Que Nos Diferencia"
            onChange={(value) => {/* TODO: Salvar no banco */}}
          >
            <h2 className="text-4xl text-[#e8d5bb] mb-8 text-center" style={{ fontFamily: 'serif' }}>
              O Que Nos Diferencia
            </h2>
          </EditableText>

          <div className="space-y-6">
            <div className="flex gap-6 p-6 border-l-2 border-[#b8964f] bg-[#1a0f08]/30">
              <Sparkles className="w-6 h-6 text-[#b8964f] flex-shrink-0 mt-1" />
              <div>
                <EditableText
                  id="about.differences.specialization.title"
                  value="Especialização em Fantasia e RPG"
                  onChange={(value) => {/* TODO: Salvar no banco */}}
                >
                  <h3 className="text-xl text-[#e8d5bb] mb-2">Especialização em Fantasia e RPG</h3>
                </EditableText>
                <EditableText
                  id="about.differences.specialization.description"
                  value="Não somos um estúdio genérico. Vivemos e respiramos universos de fantasia. Entendemos a linguagem visual de dragões, runas, magias e espadas lendárias porque fazemos parte desse mundo."
                  onChange={(value) => {/* TODO: Salvar no banco */}}
                  multiline
                >
                  <p className="text-[#a89677]">
                    Não somos um estúdio genérico. Vivemos e respiramos universos de fantasia. Entendemos a linguagem visual de dragões, runas, magias e espadas lendárias porque fazemos parte desse mundo.
                  </p>
                </EditableText>
              </div>
            </div>

            <div className="flex gap-6 p-6 border-l-2 border-[#b8964f] bg-[#1a0f08]/30">
              <Sparkles className="w-6 h-6 text-[#b8964f] flex-shrink-0 mt-1" />
              <div>
                <EditableText
                  id="about.differences.narrative.title"
                  value="Narrativa Visual em Primeiro Lugar"
                  onChange={(value) => {/* TODO: Salvar no banco */}}
                >
                  <h3 className="text-xl text-[#e8d5bb] mb-2">Narrativa Visual em Primeiro Lugar</h3>
                </EditableText>
                <EditableText
                  id="about.differences.narrative.description"
                  value="Cada elemento que criamos tem um propósito narrativo. Uma cicatriz conta uma batalha. Uma armadura revela status. Um olhar transmite motivação. Arte funcional que serve à história."
                  onChange={(value) => {/* TODO: Salvar no banco */}}
                  multiline
                >
                  <p className="text-[#a89677]">
                    Cada elemento que criamos tem um propósito narrativo. Uma cicatriz conta uma batalha. Uma armadura revela status. Um olhar transmite motivação. Arte funcional que serve à história.
                  </p>
                </EditableText>
              </div>
            </div>

            <div className="flex gap-6 p-6 border-l-2 border-[#b8964f] bg-[#1a0f08]/30">
              <Sparkles className="w-6 h-6 text-[#b8964f] flex-shrink-0 mt-1" />
              <div>
                <EditableText
                  id="about.differences.consistency.title"
                  value="Consistência Obsessiva"
                  onChange={(value) => {/* TODO: Salvar no banco */}}
                >
                  <h3 className="text-xl text-[#e8d5bb] mb-2">Consistência Obsessiva</h3>
                </EditableText>
                <EditableText
                  id="about.differences.consistency.description"
                  value="Criamos style guides, paletas de cores e diretrizes técnicas para garantir que cada asset, personagem ou cenário pertença ao mesmo universo. Seu mundo nunca parecerá desconexo."
                  onChange={(value) => {/* TODO: Salvar no banco */}}
                  multiline
                >
                  <p className="text-[#a89677]">
                    Criamos style guides, paletas de cores e diretrizes técnicas para garantir que cada asset, personagem ou cenário pertença ao mesmo universo. Seu mundo nunca parecerá desconexo.
                  </p>
                </EditableText>
              </div>
            </div>

            <div className="flex gap-6 p-6 border-l-2 border-[#b8964f] bg-[#1a0f08]/30">
              <Sparkles className="w-6 h-6 text-[#b8964f] flex-shrink-0 mt-1" />
              <div>
                <EditableText
                  id="about.differences.collaboration.title"
                  value="Colaboração Verdadeira"
                  onChange={(value) => {/* TODO: Salvar no banco */}}
                >
                  <h3 className="text-xl text-[#e8d5bb] mb-2">Colaboração Verdadeira</h3>
                </EditableText>
                <EditableText
                  id="about.differences.collaboration.description"
                  value="Não somos prestadores de serviço que apenas executam. Somos parceiros criativos. Questionamos, sugerimos, exploramos. Porque seu projeto merece mais do que execução – merece evolução."
                  onChange={(value) => {/* TODO: Salvar no banco */}}
                  multiline
                >
                  <p className="text-[#a89677]">
                    Não somos prestadores de serviço que apenas executam. Somos parceiros criativos. Questionamos, sugerimos, exploramos. Porque seu projeto merece mais do que execução – merece evolução.
                  </p>
                </EditableText>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-4xl mx-auto">
          <EditableText
            id="about.team.title"
            value="A Guilda"
            onChange={(value) => {/* TODO: Salvar no banco */}}
          >
            <h2 className="text-4xl text-[#e8d5bb] mb-8 text-center" style={{ fontFamily: 'serif' }}>
              A Guilda
            </h2>
          </EditableText>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-[#8b6f47]/30 bg-gradient-to-b from-[#1a0f08]/40 to-transparent">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-[#b8964f] bg-gradient-to-br from-[#b8964f]/20 to-transparent flex items-center justify-center">
                <span className="text-3xl text-[#b8964f]" style={{ fontFamily: 'serif' }}>M</span>
              </div>
              <EditableText
                id="about.team.concept.title"
                value="Mestres do Conceito"
                onChange={(value) => {/* TODO: Salvar no banco */}}
              >
                <h3 className="text-lg text-[#e8d5bb] mb-2">Mestres do Conceito</h3>
              </EditableText>
              <EditableText
                id="about.team.concept.description"
                value="Especialistas em concept art e exploração visual"
                onChange={(value) => {/* TODO: Salvar no banco */}}
                multiline
              >
                <p className="text-sm text-[#a89677]">
                  Especialistas em concept art e exploração visual
                </p>
              </EditableText>
            </div>

            <div className="text-center p-6 border border-[#8b6f47]/30 bg-gradient-to-b from-[#1a0f08]/40 to-transparent">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-[#b8964f] bg-gradient-to-br from-[#b8964f]/20 to-transparent flex items-center justify-center">
                <span className="text-3xl text-[#b8964f]" style={{ fontFamily: 'serif' }}>F</span>
              </div>
              <EditableText
                id="about.team.creatures.title"
                value="Forjadores de Criaturas"
                onChange={(value) => {/* TODO: Salvar no banco */}}
              >
                <h3 className="text-lg text-[#e8d5bb] mb-2">Forjadores de Criaturas</h3>
              </EditableText>
              <EditableText
                id="about.team.creatures.description"
                value="Designers especializados em anatomia fantástica"
                onChange={(value) => {/* TODO: Salvar no banco */}}
                multiline
              >
                <p className="text-sm text-[#a89677]">
                  Designers especializados em anatomia fantástica
                </p>
              </EditableText>
            </div>

            <div className="text-center p-6 border border-[#8b6f47]/30 bg-gradient-to-b from-[#1a0f08]/40 to-transparent">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-[#b8964f] bg-gradient-to-br from-[#b8964f]/20 to-transparent flex items-center justify-center">
                <span className="text-3xl text-[#b8964f]" style={{ fontFamily: 'serif' }}>D</span>
              </div>
              <EditableText
                id="about.team.directors.title"
                value="Diretores de Arte"
                onChange={(value) => {/* TODO: Salvar no banco */}}
              >
                <h3 className="text-lg text-[#e8d5bb] mb-2">Diretores de Arte</h3>
              </EditableText>
              <EditableText
                id="about.team.directors.description"
                value="Guardiões da consistência e identidade visual"
                onChange={(value) => {/* TODO: Salvar no banco */}}
                multiline
              >
                <p className="text-sm text-[#a89677]">
                  Guardiões da consistência e identidade visual
                </p>
              </EditableText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Eye({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
}
