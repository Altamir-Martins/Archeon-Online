/**
 * Camada centralizada de API para todas as chamadas ao backend
 * Handles authentication, error handling, e gerenciamento de tokens
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ================= TIPOS =================
export interface LoginCredentials {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
    points: number;
    level: number;
    title: string;
    servicesCompleted: number;
  };
  token: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  points: number;
  level: number;
  title: string;
  servicesCompleted: number;
}

export interface DigitalProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "Assets" | "Templates" | "Tutorials" | "Brushes";
  pointsDiscount: number;
}

export interface Purchase {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  productPrice: number;
  pointsUsed: number;
  finalPrice: number;
  purchaseDate: string;
  status: "Pendente" | "Concluído" | "Cancelado";
}

// ================= UTILITÁRIOS DE REQUISIÇÃO =================

/**
 * Wrapper para fetch que adiciona token JWT e trata erros
 */
async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const token = localStorage.getItem('authToken');
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: headers as HeadersInit,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

// ================= AUTENTICAÇÃO =================

export const authAPI = {
  /**
   * Login com email ou username
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const data = await fetchWithAuth('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Armazenar token JWT
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    
    return data;
  },

  /**
   * Registrar novo usuário
   */
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const data = await fetchWithAuth('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }

    return data;
  },

  /**
   * Fazer logout
   */
  logout: async (): Promise<void> => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('archeon_user');
  },

  /**
   * Validar token JWT
   */
  validateToken: async (): Promise<User> => {
    return fetchWithAuth('/api/auth/validate');
  },
};

// ================= LOJA (SHOP) =================

export const shopAPI = {
  /**
   * Obter todos os produtos da loja
   */
  getProducts: async (): Promise<DigitalProduct[]> => {
    return fetchWithAuth('/api/shop/products', {
      method: 'GET',
    });
  },

  /**
   * Atualizar preço do produto (apenas admin)
   */
  updateProductPrice: async (
    productId: string,
    price: number
  ): Promise<DigitalProduct> => {
    return fetchWithAuth(`/api/shop/products/${productId}/price`, {
      method: 'PUT',
      body: JSON.stringify({ price }),
    });
  },

  /**
   * Criar novo produto (apenas admin)
   */
  createProduct: async (product: Omit<DigitalProduct, 'id'>): Promise<DigitalProduct> => {
    return fetchWithAuth('/api/shop/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  },

  /**
   * Processar compra de produtos
   */
  purchase: async (items: Array<{
    productId: string;
    pointsUsed: number;
    finalPrice: number;
  }>): Promise<{ success: boolean; orderId: string }> => {
    return fetchWithAuth('/api/shop/purchase', {
      method: 'POST',
      body: JSON.stringify({ items }),
    });
  },

  /**
   * Obter histórico de compras do usuário
   */
  getPurchaseHistory: async (): Promise<Purchase[]> => {
    return fetchWithAuth('/api/shop/history', {
      method: 'GET',
    });
  },
};

// ================= USUÁRIOS =================

export const usersAPI = {
  /**
   * Obter dados do perfil do usuário logado
   */
  getProfile: async (): Promise<User> => {
    return fetchWithAuth('/api/users/profile', {
      method: 'GET',
    });
  },

  /**
   * Atualizar perfil do usuário
   */
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    return fetchWithAuth('/api/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  /**
   * Obter todas as recompensas do usuário
   */
  getRewards: async (): Promise<any[]> => {
    return fetchWithAuth('/api/users/rewards', {
      method: 'GET',
    });
  },

  /**
   * Marcar recompensa como usada
   */
  useReward: async (rewardId: string): Promise<{ success: boolean }> => {
    return fetchWithAuth(`/api/users/rewards/${rewardId}/use`, {
      method: 'PUT',
    });
  },
};

// ================= CONTEÚDO (CMS) =================

export const contentAPI = {
  /**
   * Obter todo o conteúdo editável do site
   */
  getAll: async (): Promise<any> => {
    return fetchWithAuth('/api/content', {
      method: 'GET',
    });
  },

  /**
   * Atualizar um elemento de conteúdo (apenas admin)
   */
  update: async (
    elementId: string,
    content: any
  ): Promise<{ success: boolean; data: any }> => {
    return fetchWithAuth('/api/content/update', {
      method: 'POST',
      body: JSON.stringify({ elementId, content }),
    });
  },

  /**
   * Fazer upload de imagem
   */
  uploadImage: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('authToken');
    const headers: Record<string, string> = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/content/upload`, {
        method: 'POST',
        headers: headers as HeadersInit,
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload falhou');
      }

      return await response.json();
    } catch (error) {
      console.error('Upload Error:', error);
      throw error;
    }
  },
};

// ================= FORMULÁRIOS =================

export const formsAPI = {
  /**
   * Enviar formulário de contato
   */
  submitContact: async (data: {
    name: string;
    email: string;
    phone?: string;
    serviceType: string;
    projectDescription: string;
    references?: string;
    budget?: string;
    deadline?: string;
  }): Promise<{ success: boolean; ticketId: string }> => {
    return fetchWithAuth('/api/contact/request', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// ================= VALIDADORES =================

/**
 * Verificar se usuário está autenticado
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('authToken');
};

/**
 * Obter token JWT armazenado
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

/**
 * Limpar todos os dados de autenticação
 */
export const clearAuth = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('archeon_user');
};
