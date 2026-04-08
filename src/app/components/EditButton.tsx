import { Edit2, Upload, X, Save } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useEditMode } from "../contexts/EditModeContext";

interface EditButtonProps {
  type: "image" | "text";
  currentValue: string;
  onSave: (newValue: string) => void;
  label?: string;
  className?: string;
}

// ================= BOTÃO DE EDIÇÃO SIMPLES ================= 
// Aparece apenas para o ADM quando o modo de edição está ativo
export function EditButton({ type, currentValue, onSave, label, className = "" }: EditButtonProps) {
  const { isAdmin } = useAuth();
  const { isEditMode, isModalOpen, setIsModalOpen } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(currentValue);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Não renderiza se não for admin ou não estiver em modo de edição
  if (!isAdmin || !isEditMode) return null;

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsModalOpen(true);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onSave(previewImage || newValue);
    setIsEditing(false);
    setIsModalOpen(false);
    setPreviewImage(null);
    setNewValue(currentValue);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsModalOpen(false);
    setNewValue(currentValue);
    setPreviewImage(null);
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
    <>
      {/* Botão de Editar - Só aparece quando não há modal aberto */}
      {!isModalOpen && (
        <button
          onClick={handleEdit}
          className={`inline-flex items-center gap-1 px-2 py-1 bg-[#b8964f] text-[#0a0604] hover:bg-[#e8d5bb] transition-all text-xs tracking-wider shadow-lg z-50 ${className}`}
          title="Editar"
        >
          <Edit2 className="w-3 h-3" />
          EDITAR
        </button>
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
              <h3 className="text-2xl text-[#e8d5bb] font-['Cinzel']">
                Editar {type === "image" ? "Imagem" : "Texto"}
              </h3>
              <button
                onClick={handleCancel}
                className="text-[#a89677] hover:text-[#b8964f] transition-colors text-3xl leading-none"
              >
                ×
              </button>
            </div>

            {label && <p className="text-[#a89677] mb-4">{label}</p>}

            {type === "image" ? (
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

                {/* Preview da Imagem */}
                {previewImage && (
                  <div>
                    <p className="text-sm text-[#c9b697] mb-2">Preview:</p>
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
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="w-full px-4 py-3 bg-[#1a0f08]/60 border border-[#8b6f47]/50 text-[#e8d5bb] focus:outline-none focus:border-[#b8964f]"
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm text-[#c9b697] mb-2">Novo Texto</label>
                <textarea
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 bg-[#1a0f08]/60 border border-[#8b6f47]/50 text-[#e8d5bb] focus:outline-none focus:border-[#b8964f] resize-none"
                />
              </div>
            )}

            {/* Botões de Ação */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSaveEdit}
                className="flex-1 py-3 bg-[#8b2c2c] text-[#e8d5bb] hover:bg-[#6b1c1c] transition-all tracking-wider flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                SALVAR
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 py-3 border border-[#8b6f47]/50 text-[#a89677] hover:border-[#b8964f] hover:text-[#b8964f] transition-all tracking-wider"
              >
                CANCELAR
              </button>
            </div>

            <p className="text-xs text-[#6b5742] mt-4 text-center">
              NOTA: Em produção, as alterações serão salvas no banco de dados
            </p>
          </div>
        </div>
      )}
    </>
  );
}
