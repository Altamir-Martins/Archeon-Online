import { useState } from "react";
import { Edit2, Upload } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useEditMode } from "../contexts/EditModeContext";

interface EditableImageProps {
  id: string; // ID único do elemento (ex: "home.portfolio.image.01")
  src: string;
  alt: string;
  onUpdate: (newSrc: string) => void;
  label?: string;
  className?: string;
}

// ================= COMPONENTE: IMAGEM EDITÁVEL ================= 
// Permite editar qualquer imagem do site quando ADM ativa o modo de edição
// INTEGRAÇÃO BANCO DE DADOS: Conectar ao CMS (JSON / DATABASE)
export function EditableImage({
  id,
  src,
  alt,
  onUpdate,
  label,
  className = "",
}: EditableImageProps) {
  const { isAdmin } = useAuth();
  const { isEditMode, isModalOpen, setIsModalOpen } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [tempSrc, setTempSrc] = useState(src);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Se não for admin ou não estiver em modo de edição, mostra apenas a imagem
  if (!isAdmin || !isEditMode) {
    return <img src={src} alt={alt} className={className} />;
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setTempSrc(src);
    setPreviewImage(null);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const finalSrc = previewImage || tempSrc;
    onUpdate(finalSrc);
    setIsEditing(false);
    setIsModalOpen(false);
    setPreviewImage(null);
    // INTEGRAÇÃO BANCO DE DADOS: Salvar imagem no banco/cloud storage
    // Exemplo: await uploadImageToCloud(id, finalSrc);
  };

  const handleCancel = () => {
    setTempSrc(src);
    setPreviewImage(null);
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    // INTEGRAÇÃO BANCO DE DADOS: Fazer upload para servidor/cloud storage
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative group inline-block w-full">
      {/* Imagem Original */}
      <img src={src} alt={alt} className={className} />

      {/* Botão de Editar - Aparece apenas quando NÃO há modal aberto */}
      {!isModalOpen && (
        <button
          onClick={handleEdit}
          className="absolute top-2 right-2 p-1.5 bg-[#b8964f] text-[#0a0604] hover:bg-[#e8d5bb] transition-all shadow-lg opacity-0 group-hover:opacity-100 z-50"
          title="Editar imagem"
        >
          <Edit2 className="w-3 h-3" />
        </button>
      )}

      {/* Borda de destaque quando em modo de edição */}
      {!isModalOpen && (
        <div className="absolute inset-0 border border-dashed border-[#b8964f]/30 group-hover:border-[#b8964f] pointer-events-none transition-colors"></div>
      )}

      {/* Modal de Edição */}
      {isEditing && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4"
          onClick={handleCancel}
        >
          <div
            className="bg-[#0a0604] border-2 border-[#b8964f] p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl text-[#e8d5bb] font-['Cinzel']">Editar Imagem</h3>
              <button
                onClick={handleCancel}
                className="text-[#a89677] hover:text-[#b8964f] transition-colors text-3xl leading-none"
              >
                ×
              </button>
            </div>

            {label && <p className="text-[#a89677] mb-4 text-sm">{label}</p>}

            {/* ID do Elemento */}
            <p className="text-xs text-[#6b5742] mb-4 font-mono">ID: {id}</p>

            <div className="space-y-4">
              {/* Upload de Imagem */}
              <div>
                <label className="block text-sm text-[#c9b697] mb-2">Carregar Nova Imagem</label>
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#8b6f47] hover:border-[#b8964f] cursor-pointer bg-[#1a0f08]/40 transition-colors">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-12 h-12 text-[#b8964f] mb-2" />
                    <p className="text-sm text-[#a89677]">Clique para selecionar imagem</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Preview da Nova Imagem */}
              {previewImage && (
                <div>
                  <p className="text-sm text-[#c9b697] mb-2">Preview da Nova Imagem:</p>
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-auto border border-[#8b6f47]"
                  />
                </div>
              )}

              {/* URL da Imagem */}
              <div>
                <label className="block text-sm text-[#c9b697] mb-2">Ou insira URL da imagem</label>
                <input
                  type="text"
                  value={tempSrc}
                  onChange={(e) => setTempSrc(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1a0f08]/60 border border-[#8b6f47]/50 text-[#e8d5bb] focus:outline-none focus:border-[#b8964f]"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              {/* Preview da Imagem Atual */}
              {!previewImage && (
                <div>
                  <p className="text-sm text-[#c9b697] mb-2">Imagem Atual:</p>
                  <img
                    src={src}
                    alt="Atual"
                    className="w-full h-auto border border-[#8b6f47]"
                  />
                </div>
              )}
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 py-3 bg-[#8b2c2c] text-[#e8d5bb] hover:bg-[#6b1c1c] transition-all tracking-wider"
              >
                SALVAR
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 py-3 border border-[#8b6f47]/50 text-[#a89677] hover:border-[#b8964f] hover:text-[#b8964f] transition-all tracking-wider"
              >
                CANCELAR
              </button>
            </div>

            {/* Nota para Desenvolvedores */}
            <p className="text-xs text-[#6b5742] mt-4 text-center">
              INTEGRAÇÃO: Upload para cloud storage e salvar URL no banco (ID: {id})
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
