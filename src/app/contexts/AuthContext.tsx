import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authAPI, usersAPI } from "../services/api";

// ================= TIPOS DE DADOS DO USUÁRIO =================
interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  points: number;
  level: number;
  title: string;
  servicesCompleted: number;
  rewards: Reward[];
  purchaseHistory: Purchase[];
  createdAt?: string;
}

interface Reward {
  id: string;
  type: "caricature" | "cartoon" | "discount10" | "points";
  name: string;
  description: string;
  used: boolean;
  earnedAt: string;
}

interface Purchase {
  id: string;
  serviceName: string;
  amount?: number;
  pointsEarned: number;
  date: string;
  status: "Concluído" | "Pendente" | "Cancelado";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  login: (usernameOrEmail: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  registerWithGoogle: () => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  addPoints: (points: number) => void;
  addPurchase: (purchase: Omit<Purchase, "id" | "date">) => void;
  useReward: (rewardId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar usuário do token JWT ao iniciar
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          // Validar token com o backend
          const userData = await authAPI.validateToken();
          setUser(userData as User);
        }
      } catch (err) {
        console.error("Erro ao validar token:", err);
        localStorage.removeItem("authToken");
        localStorage.removeItem("archeon_user");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // ================= FUNÇÃO DE LOGIN =================
  const login = async (usernameOrEmail: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      const response = await authAPI.login({
        usernameOrEmail,
        password,
      });

      setUser(response.user as User);
      localStorage.setItem("archeon_user", JSON.stringify(response.user));
      return true;
    } catch (err: any) {
      const errorMsg = err.message || "Falha ao fazer login";
      setError(errorMsg);
      console.error("Erro no login:", err);
      return false;
    }
  };

  // ================= FUNÇÃO DE LOGIN COM GOOGLE =================
  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      setError(null);
      alert("Login com Google será implementado em breve");
      return false;
    } catch (err: any) {
      setError(err.message || "Falha ao fazer login com Google");
      return false;
    }
  };

  // ================= FUNÇÃO DE CADASTRO =================
  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      const response = await authAPI.register({
        username,
        email,
        password,
      });

      setUser(response.user as User);
      localStorage.setItem("archeon_user", JSON.stringify(response.user));
      return true;
    } catch (err: any) {
      const errorMsg = err.message || "Falha ao fazer cadastro";
      setError(errorMsg);
      console.error("Erro no cadastro:", err);
      return false;
    }
  };

  // ================= FUNÇÃO DE CADASTRO COM GOOGLE =================
  const registerWithGoogle = async (): Promise<boolean> => {
    try {
      setError(null);
      alert("Cadastro com Google será implementado em breve");
      return false;
    } catch (err: any) {
      setError(err.message || "Falha ao fazer cadastro com Google");
      return false;
    }
  };

  // ================= FUNÇÃO DE LOGOUT =================
  const logout = () => {
    setUser(null);
    setError(null);
    authAPI.logout();
  };

  // ================= FUNÇÃO DE ATUALIZAR PERFIL =================
  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      setError(null);
      if (!user) return false;

      const updatedUser = await usersAPI.updateProfile(data);
      setUser(updatedUser as User);
      localStorage.setItem("archeon_user", JSON.stringify(updatedUser));

      return true;
    } catch (err: any) {
      const errorMsg = err.message || "Falha ao atualizar perfil";
      setError(errorMsg);
      console.error("Erro ao atualizar perfil:", err);
      return false;
    }
  };

  // ================= FUNÇÃO DE ADICIONAR PONTOS =================
  const addPoints = (points: number) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      points: user.points + points,
    };

    setUser(updatedUser);
    localStorage.setItem("archeon_user", JSON.stringify(updatedUser));
  };

  // ================= FUNÇÃO DE ADICIONAR COMPRA/SERVIÇO =================
  const addPurchase = (purchase: Omit<Purchase, "id" | "date">) => {
    if (!user) return;

    const newPurchase: Purchase = {
      ...purchase,
      id: `purchase-${Date.now()}`,
      date: new Date().toISOString(),
    };

    const servicesCompleted = user.servicesCompleted + 1;
    const newPoints = user.points + purchase.pointsEarned;
    const rewards = [...user.rewards];

    // A cada 5 serviços, ganha um prêmio
    if (servicesCompleted % 5 === 0) {
      const rewardType = Math.random() > 0.5 ? "caricature" : "discount10";
      const newReward: Reward = {
        id: `reward-${Date.now()}`,
        type: rewardType as "caricature" | "discount10",
        name: rewardType === "caricature" ? "Caricatura Grátis" : "10% OFF",
        description:
          rewardType === "caricature"
            ? "Uma caricatura personalizada do seu personagem favorito"
            : "10% de desconto na próxima compra",
        used: false,
        earnedAt: new Date().toISOString(),
      };
      rewards.push(newReward);
    }

    const updatedUser = {
      ...user,
      points: newPoints,
      servicesCompleted,
      rewards,
      purchaseHistory: [newPurchase, ...user.purchaseHistory],
    };

    setUser(updatedUser);
    localStorage.setItem("archeon_user", JSON.stringify(updatedUser));
  };

  // ================= FUNÇÃO DE USAR RECOMPENSA =================
  const useReward = (rewardId: string) => {
    if (!user) return;

    const updatedRewards = user.rewards.map((r) =>
      r.id === rewardId ? { ...r, used: true } : r
    );

    const updatedUser = {
      ...user,
      rewards: updatedRewards,
    };

    setUser(updatedUser);
    localStorage.setItem("archeon_user", JSON.stringify(updatedUser));
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    loading,
    error,
    login,
    loginWithGoogle,
    register,
    registerWithGoogle,
    logout,
    updateProfile,
    addPoints,
    addPurchase,
    useReward,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
