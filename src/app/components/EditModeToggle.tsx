import { Edit2, Eye, Move } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useEditMode } from "../contexts/EditModeContext";

// ================= TOGGLE DE MODO DE EDIÇÃO ================= 
// Botão flutuante que aparece apenas para o ADM
// Ativa/desativa o modo de edição completo do site
export function EditModeToggle() {
  const { isAdmin } = useAuth();
  const { isEditMode, toggleEditMode, isDraggingEnabled, setIsDraggingEnabled } = useEditMode();

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[9998] flex flex-col gap-2">
      {/* Botão Principal - Ativar/Desativar Modo de Edição */}
      <button
        onClick={toggleEditMode}
        className={`p-4 rounded-full shadow-2xl transition-all duration-300 ${
          isEditMode
            ? "bg-[#8b2c2c] text-[#e8d5bb] ring-4 ring-[#b8964f]/50"
            : "bg-[#b8964f] text-[#0a0604] hover:bg-[#e8d5bb]"
        }`}
        title={isEditMode ? "Desativar Modo de Edição" : "Ativar Modo de Edição"}
      >
        {isEditMode ? <Eye className="w-6 h-6" /> : <Edit2 className="w-6 h-6" />}
      </button>

      {/* Botão de Arrastar - Aparece apenas quando modo de edição está ativo */}
      {isEditMode && (
        <button
          onClick={() => setIsDraggingEnabled(!isDraggingEnabled)}
          className={`p-4 rounded-full shadow-2xl transition-all duration-300 ${
            isDraggingEnabled
              ? "bg-[#6b5742] text-[#e8d5bb] ring-4 ring-[#8b6f47]/50"
              : "bg-[#4a3a2a] text-[#a89677] hover:bg-[#6b5742]"
          }`}
          title={isDraggingEnabled ? "Desativar Arrastar" : "Ativar Arrastar"}
        >
          <Move className="w-6 h-6" />
        </button>
      )}

      {/* Label informativo */}
      {isEditMode && (
        <div className="bg-[#0a0604] border border-[#b8964f] px-3 py-2 text-xs text-[#e8d5bb] text-center shadow-xl">
          <p className="font-bold mb-1">MODO EDIÇÃO ATIVO</p>
          <p className="text-[#a89677]">
            {isDraggingEnabled ? "Arraste os elementos" : "Clique em Editar"}
          </p>
        </div>
      )}
    </div>
  );
}
