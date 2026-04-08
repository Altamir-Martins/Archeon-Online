import { useState } from "react";
import { Link } from "react-router";
import { Send, CheckCircle } from "lucide-react";
import { formsAPI } from "../services/api";

export function RequestProject() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    description: "",
    references: "",
    budget: "",
    agreedToTerms: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const projectTypes = [
    "Concept Art",
    "Design de Criaturas",
    "Personagens",
    "Cenários",
    "Props & Itens",
    "Direção de Arte",
    "Pacote Completo",
    "Outro",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreedToTerms) {
      alert("Você precisa concordar com os Termos de Serviço para continuar.");
      return;
    }

    // ================= ENVIAR FORMULÁRIO PARA API =================
    try {
      setSubmitting(true);
      setError(null);

      await formsAPI.submitContact({
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
        description: formData.description,
        references: formData.references,
        budget: formData.budget,
      });

      setSubmitted(true);
      console.log('✅ Formulário enviado com sucesso');
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar formulário');
      console.error('❌ Erro ao enviar:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full border-2 border-[#5cb85c] bg-gradient-to-br from-[#5cb85c]/20 to-transparent">
            <CheckCircle className="w-10 h-10 text-[#5cb85c]" />
          </div>
          <h1 className="text-4xl text-[#e8d5bb] mb-4" style={{ fontFamily: 'serif' }}>
            Solicitação Enviada!
          </h1>
          <p className="text-lg text-[#a89677] mb-8">
            Recebemos sua solicitação e entraremos em contato em até 24 horas úteis.
          </p>
          <div className="p-6 border border-[#8b6f47]/30 bg-[#1a0f08]/50 mb-8">
            <p className="text-[#c9b697] mb-4">
              <span className="text-[#b8964f]">Próximos passos:</span>
            </p>
            <ol className="text-left text-[#a89677] space-y-2">
              <li className="flex gap-2">
                <span className="text-[#b8964f]">1.</span>
                <span>Analisaremos sua solicitação e referências</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#b8964f]">2.</span>
                <span>Enviaremos um orçamento detalhado</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#b8964f]">3.</span>
                <span>Agendaremos uma reunião de briefing</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#b8964f]">4.</span>
                <span>Iniciaremos o projeto após confirmação</span>
              </li>
            </ol>
          </div>
          <Link 
            to="/"
            className="inline-block px-8 py-3 border-2 border-[#b8964f] text-[#b8964f] hover:bg-[#b8964f] hover:text-[#1a0f08] transition-all duration-300 tracking-wider"
          >
            VOLTAR AO INÍCIO
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b8964f] to-[#b8964f]"></div>
            <p className="text-sm tracking-widest text-[#b8964f]">CONTATO</p>
            <div className="w-32 h-px bg-gradient-to-l from-transparent via-[#b8964f] to-[#b8964f]"></div>
          </div>
          <h1 className="text-5xl md:text-6xl text-[#e8d5bb] mb-4" style={{ fontFamily: 'serif' }}>
            SOLICITAR PROJETO
          </h1>
          <p className="text-lg text-[#a89677] max-w-2xl mx-auto">
            Conte-nos sobre seu projeto e vamos criar algo épico juntos
          </p>
        </div>

        {/* Form */}
        <div className="max-w-3xl mx-auto">
          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 border border-[#8b2c2c] bg-[#8b2c2c]/10 text-[#e8d5bb]">
              <p>❌ {error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-[#e8d5bb] mb-2 tracking-wider">
                NOME *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#1a0f08]/50 border border-[#8b6f47]/30 text-[#e8d5bb] placeholder-[#6b5742] focus:border-[#b8964f] focus:outline-none transition-colors"
                placeholder="Seu nome completo"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-[#e8d5bb] mb-2 tracking-wider">
                EMAIL *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#1a0f08]/50 border border-[#8b6f47]/30 text-[#e8d5bb] placeholder-[#6b5742] focus:border-[#b8964f] focus:outline-none transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            {/* Project Type */}
            <div>
              <label htmlFor="projectType" className="block text-[#e8d5bb] mb-2 tracking-wider">
                TIPO DE PROJETO *
              </label>
              <select
                id="projectType"
                name="projectType"
                required
                value={formData.projectType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#1a0f08]/50 border border-[#8b6f47]/30 text-[#e8d5bb] focus:border-[#b8964f] focus:outline-none transition-colors"
              >
                <option value="">Selecione o tipo de projeto</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-[#e8d5bb] mb-2 tracking-wider">
                DESCRIÇÃO DO PROJETO *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={6}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#1a0f08]/50 border border-[#8b6f47]/30 text-[#e8d5bb] placeholder-[#6b5742] focus:border-[#b8964f] focus:outline-none transition-colors resize-none"
                placeholder="Descreva seu projeto em detalhes: universo, estilo visual, objetivos, público-alvo, etc."
              />
            </div>

            {/* References */}
            <div>
              <label htmlFor="references" className="block text-[#e8d5bb] mb-2 tracking-wider">
                REFERÊNCIAS VISUAIS
              </label>
              <input
                type="text"
                id="references"
                name="references"
                value={formData.references}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#1a0f08]/50 border border-[#8b6f47]/30 text-[#e8d5bb] placeholder-[#6b5742] focus:border-[#b8964f] focus:outline-none transition-colors"
                placeholder="Link para Pinterest, Google Drive, ou outras referências"
              />
              <p className="text-sm text-[#6b5742] mt-2">
                Compartilhe links de imagens de referência, moodboards ou exemplos visuais
              </p>
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-[#e8d5bb] mb-2 tracking-wider">
                ORÇAMENTO ESTIMADO (OPCIONAL)
              </label>
              <input
                type="text"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#1a0f08]/50 border border-[#8b6f47]/30 text-[#e8d5bb] placeholder-[#6b5742] focus:border-[#b8964f] focus:outline-none transition-colors"
                placeholder="Ex: R$ 5.000 - R$ 10.000"
              />
              <p className="text-sm text-[#6b5742] mt-2">
                Nos ajuda a propor soluções adequadas ao seu investimento
              </p>
            </div>

            {/* Terms Checkbox - CRITICAL */}
            <div className="p-6 border-2 border-[#b8964f]/50 bg-[#1a0f08]/50">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 border-2 border-[#b8964f] bg-transparent checked:bg-[#b8964f] focus:outline-none focus:ring-2 focus:ring-[#b8964f] cursor-pointer"
                  required
                />
                <span className="text-[#c9b697] leading-relaxed">
                  <span className="text-[#e8d5bb]">*</span> Li e concordo com os{" "}
                  <Link 
                    to="/termos" 
                    target="_blank"
                    className="text-[#b8964f] underline hover:text-[#e8d5bb] transition-colors"
                  >
                    Termos de Serviço
                  </Link>
                </span>
              </label>
              <p className="text-sm text-[#6b5742] mt-3 ml-8">
                É obrigatório concordar com os termos antes de enviar a solicitação
              </p>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={!formData.agreedToTerms || submitting}
                className={`inline-flex items-center gap-2 px-10 py-4 border-2 transition-all duration-300 tracking-wider group ${
                  formData.agreedToTerms && !submitting
                    ? 'bg-[#8b2c2c] border-[#8b2c2c] text-[#e8d5bb] hover:bg-[#6b1c1c] cursor-pointer'
                    : 'bg-[#3a3a3a] border-[#3a3a3a] text-[#6b5742] cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
                {submitting ? 'ENVIANDO...' : 'INICIAR PROJETO'}
              </button>
              
              {!formData.agreedToTerms && (
                <p className="text-sm text-[#b8964f] mt-4">
                  Você precisa concordar com os Termos de Serviço
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="max-w-3xl mx-auto mt-12 p-6 border-l-4 border-[#b8964f] bg-[#1a0f08]/50">
          <h3 className="text-lg text-[#e8d5bb] mb-3">O que acontece depois?</h3>
          <ul className="space-y-2 text-[#a89677]">
            <li className="flex gap-2">
              <span className="text-[#b8964f]">→</span>
              <span>Analisamos sua solicitação em até 24h úteis</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#b8964f]">→</span>
              <span>Enviamos um orçamento detalhado e cronograma estimado</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#b8964f]">→</span>
              <span>Agendamos uma reunião de briefing (opcional, mas recomendada)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#b8964f]">→</span>
              <span>Iniciamos o projeto após confirmação e primeiro pagamento</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
