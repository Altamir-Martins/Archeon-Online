import { createContext, useContext, useState, ReactNode } from "react";
import { useAuth } from "./AuthContext";

// ================= CONTEXTO DE MODO DE EDIÇÃO ================= 
// Controla quando o ADM está editando o site
// Permite editar e arrastar elementos em tempo real

interface EditableElement {
  id: string;
  type: "image" | "text" | "icon";
  content: string;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
}

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  editableElements: Record<string, EditableElement>;
  updateElement: (id: string, updates: Partial<EditableElement>) => void;
  isDraggingEnabled: boolean;
  setIsDraggingEnabled: (enabled: boolean) => void;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export function EditModeProvider({ children }: { children: ReactNode }) {
  const { isAdmin } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDraggingEnabled, setIsDraggingEnabled] = useState(false);
  const [editableElements, setEditableElements] = useState<Record<string, EditableElement>>({});

  const toggleEditMode = () => {
    if (!isAdmin) return;
    setIsEditMode(!isEditMode);
  };

  // ================= ATUALIZAR ELEMENTO ================= 
  // INTEGRAÇÃO BANCO DE DADOS: Salvar alterações no banco
  const updateElement = (id: string, updates: Partial<EditableElement>) => {
    setEditableElements((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...updates } as EditableElement,
    }));
    // INTEGRAÇÃO: Aqui deve salvar no banco de dados
  };

  const value: EditModeContextType = {
    isEditMode: isAdmin && isEditMode,
    toggleEditMode,
    isModalOpen,
    setIsModalOpen,
    editableElements,
    updateElement,
    isDraggingEnabled,
    setIsDraggingEnabled,
  };

  return <EditModeContext.Provider value={value}>{children}</EditModeContext.Provider>;
}

export function useEditMode() {
  const context = useContext(EditModeContext);
  if (context === undefined) {
    throw new Error("useEditMode deve ser usado dentro de um EditModeProvider");
  }
  return context;
}
