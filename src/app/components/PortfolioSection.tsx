import { EditableImage } from "./EditableImage";
import { EditableText } from "./EditableText";
import { EditButton } from "./EditButton";
import { Plus, X, Eye } from "lucide-react";

export interface PortfolioSectionData {
  id: number;
  thumb: {
    title: string;
    description: string;
    category: string;
    theme: string;
    images: string[];
  };
  content: {
    longDescription: string;
    details: string;
    images: string[];
    process: string;
  };
}

interface PortfolioSectionProps {
  project: PortfolioSectionData;
  isAdmin: boolean;
  isEditMode: boolean;
  onOpen: (id: number) => void;
  onRemove: (id: number) => void;
  onThumbFieldChange: (id: number, field: keyof PortfolioSectionData["thumb"], value: string) => void;
  onThumbImageUpdate: (id: number, index: number, value: string) => void;
  onThumbImageAdd: (id: number, value: string) => void;
  onThumbImageRemove: (id: number, index: number) => void;
}

export function PortfolioSection({
  project,
  isAdmin,
  isEditMode,
  onOpen,
  onRemove,
  onThumbFieldChange,
  onThumbImageUpdate,
  onThumbImageAdd,
  onThumbImageRemove,
}: PortfolioSectionProps) {
  const { thumb } = project;

  return (
    <div
      className="relative border border-[#8b6f47]/30 p-8 bg-gradient-to-br from-[#1a0f08]/40 to-transparent hover:border-[#b8964f]/50 transition-all duration-500 cursor-pointer"
      onClick={() => onOpen(project.id)}
    >
      {isAdmin && isEditMode && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(project.id);
          }}
          className="absolute top-4 right-4 p-2 bg-red-600 text-white hover:bg-red-700 transition-colors rounded-full z-10"
          title="Excluir seção"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <EditableText
            id={`portfolio.thumb.${project.id}.title`}
            value={thumb.title}
            onChange={(value) => onThumbFieldChange(project.id, "title", value)}
          >
            <h2 className="text-3xl text-[#e8d5bb] mb-2 md:mb-0" style={{ fontFamily: "serif" }}>
              {thumb.title}
            </h2>
          </EditableText>

          <EditableText
            id={`portfolio.thumb.${project.id}.theme`}
            value={thumb.theme}
            onChange={(value) => onThumbFieldChange(project.id, "theme", value)}
          >
            <span className="inline-block px-4 py-1 border border-[#b8964f]/50 text-[#b8964f] text-sm tracking-wider">
              {thumb.theme}
            </span>
          </EditableText>
        </div>

        <EditableText
          id={`portfolio.thumb.${project.id}.description`}
          value={thumb.description}
          onChange={(value) => onThumbFieldChange(project.id, "description", value)}
          multiline
        >
          <p className="text-[#a89677] leading-relaxed">
            {thumb.description}
          </p>
        </EditableText>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <EditableText
          id={`portfolio.thumb.${project.id}.category`}
          value={thumb.category}
          onChange={(value) => onThumbFieldChange(project.id, "category", value)}
        >
          <span className="inline-block px-4 py-1 border border-[#b8964f]/50 text-[#b8964f] text-sm tracking-wider">
            {thumb.category.toUpperCase()}
          </span>
        </EditableText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {thumb.images.slice(0, 2).map((image, index) => (
          <div
            key={index}
            className="group relative aspect-[4/3] overflow-hidden border border-[#8b6f47]/30 hover:border-[#b8964f] transition-all duration-300"
          >
            <EditableImage
              id={`portfolio.thumb.${project.id}.image.${index}`}
              src={image}
              alt={`${thumb.title} - imagem ${index + 1}`}
              onUpdate={(newImage) => onThumbImageUpdate(project.id, index, newImage)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {isAdmin && isEditMode && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onThumbImageRemove(project.id, index);
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
            <EditButton
              type="image"
              currentValue=""
              onSave={(newImage) => onThumbImageAdd(project.id, newImage)}
              label="Adicionar imagem à capa"
            />
          </div>
        )}
      </div>

      <div className="mt-6 p-4 border-l-2 border-[#b8964f]/50 bg-[#1a0f08]/30">
        <p className="text-sm text-[#a89677]">
          <span className="text-[#b8964f] tracking-wider">Clique para ver Mais</span>
        </p>
      </div>
    </div>
  );
}
