import { Edit2, Upload, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

interface AdminEditButtonProps {
  type: "image" | "text";
  currentValue: string;
  onSave: (newValue: string) => void;
  label?: string;
}

// ================= COMPONENTE DE EDIÇÃO PARA ADMINISTRADORES ================= 
// Este botão aparece APENAS quando o administrador está logado
// Permite editar imagens e textos diretamente no site
export function AdminEditButton({ type, currentValue, onSave, label }: AdminEditButtonProps) {
  const { isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(currentValue);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Não renderiza nada se não for admin
  if (!isAdmin) return null;

  const handleSave = () => {
    onSave(previewImage || newValue);
    setIsEditing(false);
    setPreviewImage(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewValue(currentValue);
    setPreviewImage(null);
  };

  // ================= UPLOAD DE IMAGEM ================= 
  // INTEGRAÇÃO BANCO DE DADOS: Fazer upload para servidor/storage
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // INTEGRAÇÃO: Aqui deve fazer upload para servidor/cloud storage
    // Exemplo: const url = await uploadToStorage(file);
    
    // Por enquanto, criar preview local
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {/* Edit Button - Ícone de lápis */}
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="inline-flex items-center gap-1 px-2 py-1 bg-[#b8964f] text-[#0a0604] hover:bg-[#e8d5bb] transition-all text-xs tracking-wider ml-2"
          title={`Editar ${type === "image" ? "imagem" : "texto"}`}
        >
          <Edit2 className="w-3 h-3" />
          EDITAR
        </button>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#0a0604] border-2 border-[#b8964f] p-8 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl text-[#e8d5bb] font-['Cinzel']">
                Editar {type === "image" ? "Imagem" : "Texto"}
              </h3>
              <button
                onClick={handleCancel}
                className="text-[#a89677] hover:text-[#b8964f] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {label && <p className="text-[#a89677] mb-4">{label}</p>}

            {type === "image" ? (
              <div className="space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm text-[#c9b697] mb-2">
                    Carregar Nova Imagem
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#8b6f47] hover:border-[#b8964f] cursor-pointer bg-[#1a0f08]/40 transition-colors">
                    <Upload className="w-12 h-12 text-[#b8964f] mb-2" />
                    <p className="text-sm text-[#a89677]">Clique para selecionar imagem</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Image Preview */}
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

                {/* Current Image URL (for direct URL input) */}
                <div>
                  <label className="block text-sm text-[#c9b697] mb-2">
                    Ou insira URL da imagem
                  </label>
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
                  rows={4}
                  className="w-full px-4 py-3 bg-[#1a0f08]/60 border border-[#8b6f47]/50 text-[#e8d5bb] focus:outline-none focus:border-[#b8964f] resize-none"
                />
              </div>
            )}

            {/* Action Buttons */}
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

            {/* Note */}
            <p className="text-xs text-[#6b5742] mt-4 text-center">
              NOTA: Em produção, as alterações serão salvas no banco de dados
            </p>
          </div>
        </div>
      )}
    </>
  );
}
