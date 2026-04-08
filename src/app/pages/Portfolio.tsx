import { useEffect, useState } from "react";
import { PortfolioSection, PortfolioSectionData } from "../components/PortfolioSection";
import { EditableText } from "../components/EditableText";
import { EditableImage } from "../components/EditableImage";
import { useAuth } from "../contexts/AuthContext";
import { useEditMode } from "../contexts/EditModeContext";
import { Plus, X } from "lucide-react";
import { contentAPI } from "../services/api";

export function Portfolio() {
  const { isAdmin } = useAuth();
  const { isEditMode } = useEditMode();
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [projects, setProjects] = useState<PortfolioSectionData[]>([
    {
      id: 1,
      thumb: {
        title: "Guerra das Sombras",
        description: "Prévia de personagens sombrios e concept art de combate.",
        category: "personagens",
        theme: "Dark Fantasy",
        images: [
          "https://images.unsplash.com/photo-1773216344170-7fca0c1f83ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZmFudGFzeSUyMGtuaWdodCUyMHdhcnJpb3IlMjBhcm1vcnxlbnwxfHx8fDE3NzQwMzEzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1758850253805-8572b62e376d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZmFudGFzeSUyMGhlcm8lMjBjaGFyYWN0ZXJ8ZW58MXx8fHwxNzc0MDMxMzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
        ],
      },
      content: {
        longDescription: "Projeto de personagens sombrios focado em atmosfera, postura e narrativa visual.",
        details: "Análises de cada personagem, referências de armaduras, poses e expressões. Inclui estudos de silhueta, paleta e composição.",
        images: [
          "https://images.unsplash.com/photo-1773216344170-7fca0c1f83ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZmFudGFzeSUyMGtuaWdodCUyMHdhcnJpb3IlMjBhcm1vcnxlbnwxfHx8fDE3NzQwMzEzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1758850253805-8572b62e376d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZmFudGFzeSUyMGhlcm8lMjBjaGFyYWN0ZXJ8ZW58MXx8fHwxNzc0MDMxMzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1555476266-9968413a9d8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
        ],
        process: "Sketch → Concept art → Refinamento → Arte final",
      },
    },
    {
      id: 2,
      thumb: {
        title: "Bestiário Arcano",
        description: "Capa com criaturas fantásticas e detalhes de bestiário.",
        category: "criaturas",
        theme: "Epic Fantasy",
        images: [
          "https://images.unsplash.com/photo-1765148754568-3bdda3dc843f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZHJhZ29uJTIwZmlyZSUyMGNyZWF0dXJlfGVufDF8fHx8MTc3NDAzMTMzMnww&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1770610973306-a09b57e6dc52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwY3JlYXR1cmUlMjBtb25zdGVyfGVufDF8fHx8MTc3NDAzMTMzNHww&ixlib=rb-4.1.0&q=80&w=1080",
        ],
      },
      content: {
        longDescription: "Estudos visuais de criaturas, anatomia fantástica e texturas para RPG.",
        details: "Inclui variantes, sketches de postura, vistas múltiplas e paletas de materiais para cada criatura.",
        images: [
          "https://images.unsplash.com/photo-1765148754568-3bdda3dc843f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZHJhZ29uJTIwZmlyZSUyMGNyZWF0dXJlfGVufDF8fHx8MTc3NDAzMTMzMnww&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1770610973306-a09b57e6dc52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwY3JlYXR1cmUlMjBtb25zdGVyfGVufDF8fHx8MTc3NDAzMTMzNHww&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1546748297-2b7b48b5ce04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
        ],
        process: "Ideação → Model sheet → Conceitos finais → Detalhes",
      },
    },
    {
      id: 3,
      thumb: {
        title: "Reino de Aethel",
        description: "Capa épica de arquitetura e cenários.",
        category: "cenarios",
        theme: "High Fantasy",
        images: [
          "https://images.unsplash.com/photo-1758818908570-2392ce78580e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwY2FzdGxlJTIwbGFuZHNjYXBlJTIwbW91bnRhaW5zfGVufDF8fHx8MTc3NDAzMTMzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1633364008865-d072dbd419ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMGZhbnRhc3klMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzc0MDMxMzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
        ],
      },
      content: {
        longDescription: "Desenvolvimento de locações épicas, arquitetura e paisagens de fantasia.",
        details: "Apresenta estudos de estrutura, atmosfera, linha de horizonte e layout de ambientes.",
        images: [
          "https://images.unsplash.com/photo-1758818908570-2392ce78580e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwY2FzdGxlJTIwbGFuZHNjYXBlJTIwbW91bnRhaW5zfGVufDF8fHx8MTc3NDAzMTMzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1633364008865-d072dbd419ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMGZhbnRhc3klMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzc0MDMxMzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
        ],
        process: "Conceito de mundo → Estudos de cenário → Layouts → Renderização final",
      },
    },
    {
      id: 4,
      thumb: {
        title: "Arsenal Lendário",
        description: "Capa com armas, props e itens para ambientação.",
        category: "props",
        theme: "Medieval Fantasy",
        images: [
          "https://images.unsplash.com/photo-1725434760261-c35d88b2e38b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMHN3b3JkJTIwZ29sZGVuJTIwdHJlYXN1cmV8ZW58MXx8fHwxNzc0MDMxMzMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        ],
      },
      content: {
        longDescription: "Design de props e itens para ambientação e gameplay.",
        details: "Inclui estudos de lâminas, equipamentos e objetos com narrativa visual.",
        images: [
          "https://images.unsplash.com/photo-1725434760261-c35d88b2e38b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMHN3b3JkJTIwZ29sZGVuJTIwdHJlYXN1cmV8ZW58MXx8fHwxNzc0MDMxMzMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1600789183604-65224d0a5877?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
        ],
        process: "Pesquisa → Modelagem visual → Variações de props → Arte final",
      },
    },
  ]);

  const selectedProject =
    selectedProjectId === null
      ? null
      : projects.find((project) => project.id === selectedProjectId) || null;

  // ================= EFEITO: CARREGAR PORTFÓLIOS DA API =================
  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        setLoading(true);
        setError(null);

        const contentData = await contentAPI.getAll();
        if ((contentData as any).content) {
          // Neste ponto, poderia parsear as chaves 'portfolio.*' do conteúdo
          // Por enquanto, usando os dados mockados como fallback
          console.log('✅ Conteúdo do portfólio carregado da API');
        }
      } catch (err: any) {
        console.error('Erro ao carregar portfólio:', err);
        setError(err.message || 'Erro ao carregar portfólio');
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, []);

  const openImageViewer = (imageIndex: number) => {
    setExpandedImageIndex(imageIndex);
  };

  const closeImageViewer = () => {
    setExpandedImageIndex(null);
  };

  const goPreviousImage = () => {
    if (!selectedProject || expandedImageIndex === null) return;
    setExpandedImageIndex((current) => {
      if (current === null) return null;
      return current === 0 ? selectedProject.content.images.length - 1 : current - 1;
    });
  };

  const goNextImage = () => {
    if (!selectedProject || expandedImageIndex === null) return;
    setExpandedImageIndex((current) => {
      if (current === null) return null;
      return current === selectedProject.content.images.length - 1 ? 0 : current + 1;
    });
  };

  useEffect(() => {
    if (expandedImageIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeImageViewer();
      }
      if (event.key === "ArrowLeft") {
        goPreviousImage();
      }
      if (event.key === "ArrowRight") {
        goNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedImageIndex, selectedProject]);

  const addNewSection = () => {
    const newId = projects.length > 0 ? Math.max(...projects.map((item) => item.id)) + 1 : 1;
    const newProject: PortfolioSectionData = {
      id: newId,
      thumb: {
        title: "Novo Projeto",
        description: "Descrição curta do projeto.",
        category: "personagens",
        theme: "Novo Tema",
        images: ["https://via.placeholder.com/800x600?text=Nova+Imagem"],
      },
      content: {
        longDescription: "Texto longo do projeto, com informações completas.",
        details: "Detalhes adicionais do projeto, estrutura de conceito e narrativa.",
        images: ["https://via.placeholder.com/1200x900?text=Galeria+do+Projeto"],
        process: "Sketch inicial → Concept art → Refinamento → Arte final",
      },
    };
    setProjects([...projects, newProject]);
  };

  const removeSection = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id));
    if (selectedProjectId === id) {
      setSelectedProjectId(null);
    }
  };

  const updateThumbField = async (id: number, field: keyof PortfolioSectionData["thumb"], value: string) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? { ...project, thumb: { ...project.thumb, [field]: value } }
          : project
      )
    );

    // ================= INTEGRAÇÃO BANCO DE DADOS: Salvar campo thumbnail via API =================
    try {
      const contentKey = `portfolio.${id}.thumb.${field}`;
      await contentAPI.update(contentKey, value);
      console.log(`✅ Campo thumbnail '${field}' do projeto ${id} salvo na API`);
    } catch (err: any) {
      console.error(`❌ Erro ao salvar thumb ${field}:`, err);
      setError(`Erro ao salvar: ${err.message}`);
    }
  };

  const updateThumbImage = async (projectId: number, imageIndex: number, value: string) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              thumb: {
                ...project.thumb,
                images: project.thumb.images.map((image, index) => (index === imageIndex ? value : image)),
              },
            }
          : project
      )
    );

    // ================= INTEGRAÇÃO BANCO DE DADOS: Salvar imagem thumbnail via API =================
    try {
      const contentKey = `portfolio.${projectId}.thumb.image.${imageIndex}`;
      await contentAPI.update(contentKey, value);
      console.log(`✅ Imagem thumbnail ${imageIndex} do projeto ${projectId} salva na API`);
    } catch (err: any) {
      console.error(`❌ Erro ao salvar imagem thumbnail:`, err);
      setError(`Erro ao salvar: ${err.message}`);
    }
  };

  const addThumbImage = (projectId: number, value: string) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? { ...project, thumb: { ...project.thumb, images: [...project.thumb.images, value] } }
          : project
      )
    );
  };

  const removeThumbImage = (projectId: number, imageIndex: number) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              thumb: {
                ...project.thumb,
                images: project.thumb.images.filter((_, index) => index !== imageIndex),
              },
            }
          : project
      )
    );
  };

  const updateContentField = async (
    projectId: number,
    field: keyof PortfolioSectionData["content"],
    value: string
  ) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? { ...project, content: { ...project.content, [field]: value } }
          : project
      )
    );

    // ================= INTEGRAÇÃO BANCO DE DADOS: Salvar conteúdo via API =================
    try {
      const contentKey = `portfolio.${projectId}.content.${field}`;
      await contentAPI.update(contentKey, value);
      console.log(`✅ Campo '${field}' do projeto ${projectId} salvo na API`);
    } catch (err: any) {
      console.error(`❌ Erro ao salvar ${field}:`, err);
      setError(`Erro ao salvar: ${err.message}`);
    }
  };

  const updateContentImage = async (projectId: number, imageIndex: number, value: string) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              content: {
                ...project.content,
                images: project.content.images.map((image, index) => (index === imageIndex ? value : image)),
              },
            }
          : project
      )
    );

    // ================= INTEGRAÇÃO BANCO DE DADOS: Salvar imagem de conteúdo via API =================
    try {
      const contentKey = `portfolio.${projectId}.content.image.${imageIndex}`;
      await contentAPI.update(contentKey, value);
      console.log(`✅ Imagem de conteúdo ${imageIndex} do projeto ${projectId} salva na API`);
    } catch (err: any) {
      console.error(`❌ Erro ao salvar imagem de conteúdo:`, err);
      setError(`Erro ao salvar: ${err.message}`);
    }
  };

  const addContentImage = (projectId: number, value: string) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? { ...project, content: { ...project.content, images: [...project.content.images, value] } }
          : project
      )
    );
    // NOTA: Para persistir nova imagem seria necessário fazer update ou criar estrutura específica
  };

  const removeContentImage = (projectId: number, imageIndex: number) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              content: {
                ...project.content,
                images: project.content.images.filter((_, index) => index !== imageIndex),
              },
            }
          : project
      )
    );
  };

  const openProjectModal = (id: number) => {
    setSelectedProjectId(id);
  };

  const closeProjectModal = () => {
    setSelectedProjectId(null);
  };

  const categories = [
    { id: "todos", label: "TODOS" },
    { id: "personagens", label: "PERSONAGENS" },
    { id: "criaturas", label: "CRIATURAS" },
    { id: "cenarios", label: "CENÁRIOS" },
    { id: "props", label: "PROPS" },
  ];

  const filteredProjects =
    selectedCategory === "todos"
      ? projects
      : projects.filter((project) => project.thumb.category === selectedCategory);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b8964f] to-[#b8964f]"></div>
            <EditableText
              id="portfolio.header.label"
              value="PORTFÓLIO"
              onChange={(value) => {}}
            >
              <p className="text-sm tracking-widest text-[#b8964f]">PORTFÓLIO</p>
            </EditableText>
            <div className="w-32 h-px bg-gradient-to-l from-transparent via-[#b8964f] to-[#b8964f]"></div>
          </div>
          <EditableText
            id="portfolio.header.title"
            value="NOSSOS TRABALHOS"
            onChange={(value) => {}}
          >
            <h1 className="text-5xl md:text-6xl text-[#e8d5bb] mb-4" style={{ fontFamily: "serif" }}>
              NOSSOS TRABALHOS
            </h1>
          </EditableText>
          <EditableText
            id="portfolio.header.subtitle"
            value="Explore nossa coleção de personagens, criaturas, cenários e props criados para jogos e universos de RPG"
            onChange={(value) => {}}
          >
            <p className="text-lg text-[#a89677] max-w-2xl mx-auto">
              Explore nossa coleção de personagens, criaturas, cenários e props criados para jogos e universos de RPG
            </p>
          </EditableText>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 border transition-all duration-300 tracking-wider text-sm ${
                selectedCategory === category.id
                  ? "border-[#b8964f] bg-[#b8964f] text-[#1a0f08]"
                  : "border-[#8b6f47]/30 text-[#a89677] hover:border-[#b8964f] hover:text-[#b8964f]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="space-y-20">
          {filteredProjects.map((project) => (
            <PortfolioSection
              key={project.id}
              project={project}
              isAdmin={isAdmin}
              isEditMode={isEditMode}
              onOpen={openProjectModal}
              onRemove={removeSection}
              onThumbFieldChange={updateThumbField}
              onThumbImageUpdate={updateThumbImage}
              onThumbImageAdd={addThumbImage}
              onThumbImageRemove={removeThumbImage}
            />
          ))}
        </div>

        {isAdmin && isEditMode && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={addNewSection}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#b8964f] bg-[#b8964f] text-[#1a0f08] hover:bg-[#e8d5bb] transition-all duration-300 tracking-wider"
            >
              <Plus className="w-4 h-4" />
              + Adicionar nova seção
            </button>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#a89677] text-lg">Nenhum projeto encontrado nesta categoria.</p>
          </div>
        )}

        {selectedProject && (
          <>
            <div className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-4">
              <div className="bg-[#0a0604] border-2 border-[#b8964f] max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8 border-b border-[#8b6f47]/30">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                  <div className="max-w-3xl">
                    <EditableText
                      id={`portfolio.content.${selectedProject.id}.title`}
                      value={selectedProject.thumb.title}
                      onChange={(value) => updateThumbField(selectedProject.id, "title", value)}
                    >
                      <h2 className="text-4xl text-[#e8d5bb] mb-4" style={{ fontFamily: "serif" }}>
                        {selectedProject.thumb.title}
                      </h2>
                    </EditableText>
                    <EditableText
                      id={`portfolio.content.${selectedProject.id}.theme`}
                      value={selectedProject.thumb.theme}
                      onChange={(value) => updateThumbField(selectedProject.id, "theme", value)}
                    >
                      <span className="inline-block px-4 py-1 border border-[#b8964f]/50 text-[#b8964f] text-sm tracking-wider">
                        {selectedProject.thumb.theme}
                      </span>
                    </EditableText>
                    <EditableText
                      id={`portfolio.content.${selectedProject.id}.longDescription`}
                      value={selectedProject.content.longDescription}
                      onChange={(value) => updateContentField(selectedProject.id, "longDescription", value)}
                      multiline
                    >
                      <p className="text-[#a89677] leading-relaxed mt-6">
                        {selectedProject.content.longDescription}
                      </p>
                    </EditableText>
                  </div>
                  <button
                    onClick={closeProjectModal}
                    className="text-[#a89677] hover:text-[#b8964f] transition-colors text-4xl leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedProject.content.images.map((image, index) => (
                    <div
                      key={index}
                      className="group relative aspect-[4/3] overflow-hidden border border-[#8b6f47]/30 hover:border-[#b8964f] transition-all duration-300 cursor-zoom-in"
                      onClick={() => openImageViewer(index)}
                    >
                      <EditableImage
                        id={`portfolio.content.${selectedProject.id}.image.${index}`}
                        src={image}
                        alt={`${selectedProject.thumb.title} - detalhe ${index + 1}`}
                        onUpdate={(value) => updateContentImage(selectedProject.id, index, value)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {isAdmin && isEditMode && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeContentImage(selectedProject.id, index);
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-600 text-white hover:bg-red-700 transition-colors rounded-full"
                          title="Remover imagem"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}

                  {isAdmin && isEditMode && (
                    <div className="aspect-[4/3] border-2 border-dashed border-[#b8964f]/50 flex items-center justify-center hover:border-[#b8964f] transition-colors">
                      <Plus className="w-6 h-6 text-[#b8964f]" />
                    </div>
                  )}
                </div>
                {isAdmin && isEditMode && (
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => addContentImage(selectedProject.id, "https://via.placeholder.com/1200x900?text=Nova+Imagem")}
                      className="inline-flex items-center gap-2 px-5 py-3 border border-[#b8964f] bg-[#b8964f] text-[#1a0f08] hover:bg-[#e8d5bb] transition-all duration-300 tracking-wider"
                    >
                      <Plus className="w-4 h-4" />
                      Adicionar imagem
                    </button>
                  </div>
                )}
              </div>

              <div className="p-8 border-t border-[#8b6f47]/30">
                <EditableText
                  id={`portfolio.content.${selectedProject.id}.details`}
                  value={selectedProject.content.details}
                  onChange={(value) => updateContentField(selectedProject.id, "details", value)}
                  multiline
                >
                  <p className="text-[#a89677] leading-relaxed">
                    {selectedProject.content.details}
                  </p>
                </EditableText>
              </div>

              <div className="p-8 border-t border-[#8b6f47]/30">
                <EditableText
                  id={`portfolio.content.${selectedProject.id}.process`}
                  value={selectedProject.content.process}
                  onChange={(value) => updateContentField(selectedProject.id, "process", value)}
                  multiline
                >
                  <div className="p-4 border-l-2 border-[#b8964f]/50 bg-[#1a0f08]/30">
                    <p className="text-sm text-[#a89677]">
                      <span className="text-[#b8964f] tracking-wider">PROCESSO:</span> {selectedProject.content.process}
                    </p>
                  </div>
                </EditableText>
              </div>
            </div>
          </div>

          {expandedImageIndex !== null && selectedProject && (
            <div
              className="fixed inset-0 z-[1100] bg-black/95 flex items-center justify-center p-4"
              onClick={closeImageViewer}
            >
              <div
                className="relative w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeImageViewer}
                  className="absolute top-4 right-4 z-20 rounded-full bg-[#0a0604]/90 p-3 text-[#e8d5bb] hover:bg-[#b8964f] transition-colors"
                  aria-label="Fechar imagem expandida"
                >
                  ×
                </button>

                <img
                  src={selectedProject.content.images[expandedImageIndex]}
                  alt={`${selectedProject.thumb.title} imagem expandida ${expandedImageIndex + 1}`}
                  className="w-full h-[70vh] object-contain rounded-xl border border-[#b8964f]/50 bg-[#0a0604]"
                />

                {selectedProject.content.images.length > 1 && (
                  <>
                    <button
                      onClick={goPreviousImage}
                      className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-[#0a0604]/90 p-3 text-[#e8d5bb] hover:bg-[#b8964f] transition-colors"
                      aria-label="Imagem anterior"
                    >
                      ‹
                    </button>
                    <button
                      onClick={goNextImage}
                      className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-[#0a0604]/90 p-3 text-[#e8d5bb] hover:bg-[#b8964f] transition-colors"
                      aria-label="Próxima imagem"
                    >
                      ›
                    </button>
                  </>
                )}

                <div className="mt-4 flex justify-center">
                  <button
                    onClick={closeImageViewer}
                    className="inline-flex items-center justify-center rounded-full border border-[#b8964f] bg-[#b8964f]/10 px-6 py-3 text-sm uppercase tracking-wider text-[#e8d5bb] hover:bg-[#b8964f] hover:text-[#0a0604] transition-all"
                  >
                    Fechar imagem
                  </button>
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
