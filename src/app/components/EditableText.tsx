import { useState } from "react";
import { Edit2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useEditMode } from "../contexts/EditModeContext";

interface EditableTextProps {
  id: string; // ID único do elemento (ex: "home.hero.title")
  value: string;
  onChange: (newValue: string) => void;
  multiline?: boolean;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

// ================= COMPONENTE: TEXTO EDITÁVEL ================= 
// Permite editar qualquer texto do site quando ADM ativa o modo de edição
// INTEGRAÇÃO BANCO DE DADOS: Conectar ao CMS (JSON / DATABASE)
export function EditableText({
  id,
  value,
  onChange,
  multiline = false,
  label,
  className = "",
  children,
}: EditableTextProps) {
  const { isAdmin } = useAuth();
  const { isEditMode, isModalOpen, setIsModalOpen } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  // Se não for admin ou não estiver em modo de edição, mostra apenas o conteúdo
  if (!isAdmin || !isEditMode) {
    return <>{children}</>;
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setTempValue(value);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    onChange(tempValue);
    setIsEditing(false);
    setIsModalOpen(false);
    // INTEGRAÇÃO BANCO DE DADOS: Salvar alteração no banco
    // Exemplo: await saveContentToDatabase(id, tempValue);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
    setIsModalOpen(false);
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Conteúdo Original */}
      {children}

      {/* Botão de Editar - Aparece apenas quando NÃO há modal aberto */}
      {!isModalOpen && (
        <button
          onClick={handleEdit}
          className="absolute -top-2 -right-2 p-1.5 bg-[#b8964f] text-[#0a0604] hover:bg-[#e8d5bb] transition-all shadow-lg opacity-0 group-hover:opacity-100 z-50"
          title="Editar texto"
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
            className="bg-[#0a0604] border-2 border-[#b8964f] p-8 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl text-[#e8d5bb] font-['Cinzel']">Editar Texto</h3>
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

            {/* Campo de Texto */}
            {multiline ? (
              <textarea
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 bg-[#1a0f08]/60 border border-[#8b6f47]/50 text-[#e8d5bb] focus:outline-none focus:border-[#b8964f] resize-none"
              />
            ) : (
              <input
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a0f08]/60 border border-[#8b6f47]/50 text-[#e8d5bb] focus:outline-none focus:border-[#b8964f]"
              />
            )}

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
              INTEGRAÇÃO: Conectar este elemento ao CMS (ID: {id})
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
