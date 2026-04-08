import { ReactNode, useState, useRef, useEffect } from "react";
import { Edit2, Move, Trash2, Save } from "lucide-react";
import { useEditMode } from "../contexts/EditModeContext";
import { useAuth } from "../contexts/AuthContext";

interface EditableElementProps {
  id: string;
  type: "image" | "text" | "icon";
  children: ReactNode;
  onSave: (newValue: string) => void;
  currentValue: string;
  label?: string;
  className?: string;
  canDrag?: boolean;
  canDelete?: boolean;
  onDelete?: () => void;
}

// ================= COMPONENTE DE ELEMENTO EDITÁVEL ================= 
// Permite editar, arrastar e reposicionar qualquer elemento do site
// Visível apenas para administradores
export function EditableElement({
  id,
  type,
  children,
  onSave,
  currentValue,
  label,
  className = "",
  canDrag = true,
  canDelete = false,
  onDelete,
}: EditableElementProps) {
  const { isAdmin } = useAuth();
  const { isEditMode, isModalOpen, setIsModalOpen, isDraggingEnabled } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  // Não renderiza controles se não for admin ou se não estiver em modo de edição
  if (!isAdmin || !isEditMode) {
    return <>{children}</>;
  }

  const handleEdit = () => {
    setIsModalOpen(true);
    setIsEditing(true);
  };

  const handleDragStart = (e: React.MouseEvent) => {
    if (!isDraggingEnabled || !canDrag) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!isDragging || !isDraggingEnabled) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleDragEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      // INTEGRAÇÃO BANCO DE DADOS: Salvar nova posição
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
      return () => {
        window.removeEventListener("mousemove", handleDragMove);
        window.removeEventListener("mouseup", handleDragEnd);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <div
      ref={elementRef}
      className={`relative ${isDraggingEnabled && canDrag ? "cursor-move" : ""} ${className}`}
      style={
        isDraggingEnabled && position.x !== 0 && position.y !== 0
          ? {
              transform: `translate(${position.x}px, ${position.y}px)`,
              transition: isDragging ? "none" : "transform 0.2s",
            }
          : {}
      }
    >
      {/* Overlay de Edição - Visível apenas quando NÃO há modal aberto */}
      {!isModalOpen && (
        <div className="absolute -top-2 -right-2 z-50 flex gap-1">
          {/* Botão de Editar */}
          <button
            onClick={handleEdit}
            className="p-1.5 bg-[#b8964f] text-[#0a0604] hover:bg-[#e8d5bb] transition-all shadow-lg"
            title="Editar"
          >
            <Edit2 className="w-3 h-3" />
          </button>

          {/* Botão de Arrastar */}
          {canDrag && (
            <button
              onMouseDown={handleDragStart}
              className="p-1.5 bg-[#6b5742] text-[#e8d5bb] hover:bg-[#8b6f47] transition-all shadow-lg cursor-move"
              title="Arrastar"
            >
              <Move className="w-3 h-3" />
            </button>
          )}

          {/* Botão de Deletar */}
          {canDelete && onDelete && (
            <button
              onClick={onDelete}
              className="p-1.5 bg-[#8b2c2c] text-[#e8d5bb] hover:bg-[#6b1c1c] transition-all shadow-lg"
              title="Deletar"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      {/* Borda de destaque quando em modo de edição */}
      {!isModalOpen && (
        <div className="absolute inset-0 border-2 border-dashed border-[#b8964f]/50 pointer-events-none"></div>
      )}

      {/* Conteúdo original */}
      {children}

      {/* Modal de Edição */}
      {isEditing && <EditModal />}
    </div>
  );

  function EditModal() {
    const [newValue, setNewValue] = useState(currentValue);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleSaveEdit = () => {
      onSave(previewImage || newValue);
      setIsEditing(false);
      setIsModalOpen(false);
      setPreviewImage(null);
    };

    const handleCancel = () => {
      setIsEditing(false);
      setIsModalOpen(false);
      setNewValue(currentValue);
      setPreviewImage(null);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // INTEGRAÇÃO BANCO DE DADOS: Fazer upload para servidor/cloud storage
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    };

    return (
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
        onClick={(e) => {
          // Fecha o modal se clicar no fundo
          if (e.target === e.currentTarget) {
            handleCancel();
          }
        }}
      >
        <div 
          className="bg-[#0a0604] border-2 border-[#b8964f] p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl text-[#e8d5bb] font-['Cinzel']">
              Editar {type === "image" ? "Imagem" : type === "text" ? "Texto" : "Ícone"}
            </h3>
            <button
              onClick={handleCancel}
              className="text-[#a89677] hover:text-[#b8964f] transition-colors text-2xl"
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
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-12 h-12 text-[#b8964f] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
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
              <label className="block text-sm text-[#c9b697] mb-2">
                {type === "text" ? "Novo Texto" : "Novo Ícone"}
              </label>
              <textarea
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                rows={type === "text" ? 6 : 2}
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
        </div>
      </div>
    );
  }
}
