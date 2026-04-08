import { FileText } from "lucide-react";

export function Terms() {
  const sections = [
    {
      title: "1. Direitos Autorais e Propriedade Intelectual",
      content: [
        "Após o pagamento integral do projeto, todos os direitos de uso comercial da arte criada são transferidos ao cliente.",
        "O estúdio Archeon retém o direito de usar as artes criadas em seu portfólio, materiais de marketing e redes sociais.",
        "O cliente não pode revender, redistribuir ou licenciar as artes para terceiros sem autorização prévia por escrito.",
        "Arquivos fonte (PSD, AI, etc.) são fornecidos, mas o cliente não pode usá-los para criar trabalhos derivados para outros projetos sem novo contrato.",
      ],
    },
    {
      title: "2. Uso Comercial",
      content: [
        "O cliente pode usar as artes para fins comerciais no projeto contratado (jogos, RPGs, materiais relacionados).",
        "Merchandising (camisetas, pôsteres, produtos físicos) está incluído desde que relacionado ao projeto original.",
        "Para uso em projetos diferentes do original, é necessário novo acordo e possível taxa adicional.",
        "O cliente deve dar crédito ao Archeon em materiais promocionais quando possível (não obrigatório, mas apreciado).",
      ],
    },
    {
      title: "3. Revisões e Modificações",
      content: [
        "Cada projeto inclui até 3 rodadas de revisão sem custo adicional.",
        "Revisões devem ser solicitadas em até 7 dias após a apresentação de cada etapa.",
        "Mudanças de escopo (ex: adicionar elementos não previstos) são consideradas trabalho adicional e cobradas separadamente.",
        "Após aprovação final, modificações adicionais são cobradas como novo trabalho.",
      ],
    },
    {
      title: "4. Prazos e Entregas",
      content: [
        "Os prazos acordados no briefing são estimativas baseadas no escopo inicial.",
        "Atrasos causados por revisões extensas ou mudanças de escopo podem estender o prazo.",
        "O estúdio se compromete a comunicar qualquer atraso previsto com antecedência mínima de 48 horas.",
        "Entregas são feitas via WeTransfer, Google Drive ou plataforma acordada, em alta resolução.",
      ],
    },
    {
      title: "5. Pagamento",
      content: [
        "50% do valor total deve ser pago no início do projeto (antes de iniciarmos o trabalho).",
        "50% restante deve ser pago antes da entrega dos arquivos finais.",
        "Para projetos acima de R$ 10.000, podemos dividir em 3 ou mais parcelas vinculadas a milestones.",
        "Pagamentos aceitos via PIX, transferência bancária ou PayPal (taxas aplicáveis).",
        "Atraso de pagamento superior a 7 dias pausa o projeto até regularização.",
      ],
    },
    {
      title: "6. Cancelamento e Reembolso",
      content: [
        "Cliente pode cancelar o projeto a qualquer momento, mas o valor já pago não é reembolsável.",
        "Em caso de cancelamento, o cliente recebe todo o trabalho desenvolvido até o momento.",
        "Se o estúdio cancelar o projeto por motivos internos, 100% do valor pago é devolvido.",
        "Projetos parados por mais de 60 dias por falta de resposta do cliente são considerados cancelados.",
      ],
    },
    {
      title: "7. Confidencialidade",
      content: [
        "Todas as informações compartilhadas sobre o projeto são tratadas como confidenciais.",
        "O estúdio não divulgará detalhes do projeto antes do lançamento público sem autorização.",
        "NDA (acordo de confidencialidade) pode ser assinado mediante solicitação, sem custo adicional.",
      ],
    },
    {
      title: "8. Qualidade e Padrões",
      content: [
        "Todas as artes são entregues em resolução mínima de 300 DPI para impressão.",
        "Formatos padrão: PSD (com camadas), PNG (transparente quando aplicável) e JPG (preview).",
        "Cores em RGB para uso digital; CMYK disponível sob solicitação para materiais impressos.",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b8964f] to-[#b8964f]"></div>
            <p className="text-sm tracking-widest text-[#b8964f]">LEGAL</p>
            <div className="w-32 h-px bg-gradient-to-l from-transparent via-[#b8964f] to-[#b8964f]"></div>
          </div>
          <h1 className="text-5xl md:text-6xl text-[#e8d5bb] mb-4" style={{ fontFamily: 'serif' }}>
            TERMOS & CONTRATO
          </h1>
          <p className="text-lg text-[#a89677] max-w-2xl mx-auto">
            Transparência total sobre como trabalhamos e o que você pode esperar
          </p>
        </div>

        {/* Notice */}
        <div className="max-w-4xl mx-auto mb-12 p-6 border-l-4 border-[#b8964f] bg-[#1a0f08]/50">
          <div className="flex gap-4">
            <FileText className="w-6 h-6 text-[#b8964f] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg text-[#e8d5bb] mb-2">Importante</h3>
              <p className="text-[#a89677] leading-relaxed">
                Ao solicitar um projeto, você concorda com os termos abaixo. Leia com atenção. Se tiver dúvidas, entre em contato antes de iniciar o projeto.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="border border-[#8b6f47]/30 bg-gradient-to-br from-[#1a0f08]/40 to-transparent"
            >
              <div className="p-6 border-b border-[#8b6f47]/30">
                <h2 className="text-2xl text-[#e8d5bb]" style={{ fontFamily: 'serif' }}>
                  {section.title}
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex gap-3 text-[#a89677]">
                      <span className="text-[#b8964f] mt-1.5 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto mt-16 p-8 border border-[#8b6f47]/30 bg-gradient-to-br from-[#1a0f08]/40 to-transparent text-center">
          <h2 className="text-3xl text-[#e8d5bb] mb-4" style={{ fontFamily: 'serif' }}>
            Dúvidas sobre os Termos?
          </h2>
          <p className="text-[#a89677] mb-6">
            Estamos aqui para esclarecer qualquer questão antes de você iniciar seu projeto.
          </p>
          <a 
            href="mailto:contato@archeon.art"
            className="inline-block px-8 py-3 border-2 border-[#b8964f] text-[#b8964f] hover:bg-[#b8964f] hover:text-[#1a0f08] transition-all duration-300 tracking-wider"
          >
            ENTRE EM CONTATO
          </a>
        </div>

        {/* Last Updated */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <p className="text-sm text-[#6b5742]">
            Última atualização: 20 de Março de 2026
          </p>
        </div>
      </div>
    </div>
  );
}
