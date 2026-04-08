import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { User, Award, ShoppingBag, Sparkles, Gift, Edit2, Zap } from "lucide-react";
import { useNavigate } from "react-router";

// ================= FUNÇÃO: MAPEAR NÍVEL → TÍTULO ================= 
// Retorna o título do usuário baseado no nível atual
// INTEGRAÇÃO BANCO DE DADOS: Esta função pode ser movida para o backend
function getTitleByLevel(level: number): string {
  if (level >= 45) return "Arquiteto Supremo";
  if (level >= 40) return "Lenda Viva";
  if (level >= 35) return "Guardião de Relíquias";
  if (level >= 30) return "Mestre Criador";
  if (level >= 25) return "Arquiteto de Mundos";
  if (level >= 20) return "Invocador";
  if (level >= 15) return "Forjador";
  if (level >= 10) return "Artesão";
  if (level >= 5) return "Iniciado";
  return "Aprendiz";
}

export function Profile() {
  const { user, updateProfile, logout, useReward } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [activeTab, setActiveTab] = useState<"info" | "chest">("info");

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleUpdateProfile = async () => {
    const success = await updateProfile({ username, email });
    if (success) {
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const availableRewards = user.rewards.filter((r) => !r.used);
  const usedRewards = user.rewards.filter((r) => r.used);

  // Calcular quantos serviços faltam para o próximo prêmio
  const servicesUntilReward = 5 - (user.servicesCompleted % 5);

  // ================= SISTEMA DE XP E NÍVEL ================= 
  // INSERIR LÓGICA DE CÁLCULO DE XP E LEVEL NO BACKEND
  // Por enquanto, simula XP baseado em pontos (pode ser alterado)
  const currentXP = user.points * 10; // Exemplo: 10 XP por ponto
  const currentLevel = Math.floor(currentXP / 200) + 1; // Exemplo: 200 XP por nível
  const xpForNextLevel = currentLevel * 200;
  const xpInCurrentLevel = currentXP % 200;
  const xpProgressPercent = (xpInCurrentLevel / 200) * 100;
  
  // Obter título baseado no nível
  const userTitle = user.isAdmin ? "ADMINISTRADOR" : getTitleByLevel(currentLevel);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#b8964f] to-[#b8964f]"></div>
            <p className="text-sm tracking-widest text-[#b8964f]">MEU PERFIL</p>
            <div className="w-32 h-px bg-gradient-to-l from-transparent via-[#b8964f] to-[#b8964f]"></div>
          </div>
          <h1 className="text-5xl md:text-6xl text-[#e8d5bb] mb-4 font-['Cinzel']">
            {user.username}
          </h1>
          {/* ================= TÍTULO DO USUÁRIO ================= */}
          {/* Reutiliza o componente visual de ADMINISTRADOR mas com texto dinâmico */}
          <span className="inline-block px-4 py-2 border-2 border-[#b8964f] text-[#b8964f] text-sm tracking-wider bg-[#b8964f]/10 mb-6">
            ⚔ {userTitle} ⚔
          </span>

          {/* ================= BARRA DE XP E NÍVEL ================= */}
          {/* Sistema de progressão visual do usuário */}
          <div className="max-w-2xl mx-auto mt-6">
            {/* Label do Nível */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#b8964f]" />
                <span className="text-[#e8d5bb] font-['Cinzel']">Nível {currentLevel}</span>
              </div>
              <span className="text-sm text-[#a89677]">
                {xpInCurrentLevel} / {200} XP
              </span>
            </div>

            {/* Barra de Progresso do XP */}
            <div className="w-full h-3 bg-[#1a0f08] border border-[#8b6f47]/50 overflow-hidden relative">
              {/* Barra de progresso animada */}
              <div 
                className="h-full bg-gradient-to-r from-[#b8964f] to-[#e8d5bb] transition-all duration-700 ease-out relative overflow-hidden"
                style={{ width: `${xpProgressPercent}%` }}
              >
                {/* Efeito de brilho animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>

            {/* Texto de próximo nível */}
            <p className="text-xs text-[#6b5742] mt-2 text-center">
              Continue conquistando para alcançar o Nível {currentLevel + 1}
            </p>

            {/* COMENTÁRIO PARA DESENVOLVEDORES */}
            {/* INTEGRAÇÃO BANCO DE DADOS: */}
            {/* - Salvar XP e Level no banco de dados */}
            {/* - Calcular XP baseado em ações do usuário (compras, serviços, etc) */}
            {/* - Atualizar título automaticamente quando o nível mudar */}
            {/* - Fórmula sugerida: level = floor(sqrt(XP / 100)) */}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Points Card */}
          <div className="p-6 border border-[#8b6f47]/30 bg-gradient-to-br from-[#1a0f08]/40 to-transparent">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-[#b8964f] flex items-center justify-center bg-gradient-to-br from-[#b8964f]/20 to-transparent">
                <Sparkles className="w-6 h-6 text-[#b8964f]" />
              </div>
              <div>
                <p className="text-sm text-[#a89677]">Pontos Acumulados</p>
                <p className="text-3xl text-[#e8d5bb] font-['Cinzel']">{user.points}</p>
              </div>
            </div>
            <p className="text-xs text-[#6b5742]">Use seus pontos para descontos</p>
          </div>

          {/* Services Card */}
          <div className="p-6 border border-[#8b6f47]/30 bg-gradient-to-br from-[#1a0f08]/40 to-transparent">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-[#b8964f] flex items-center justify-center bg-gradient-to-br from-[#b8964f]/20 to-transparent">
                <ShoppingBag className="w-6 h-6 text-[#b8964f]" />
              </div>
              <div>
                <p className="text-sm text-[#a89677]">Serviços Contratados</p>
                <p className="text-3xl text-[#e8d5bb] font-['Cinzel']">{user.servicesCompleted}</p>
              </div>
            </div>
            <p className="text-xs text-[#6b5742]">
              Faltam {servicesUntilReward} para o próximo prêmio
            </p>
          </div>

          {/* Rewards Card */}
          <div className="p-6 border border-[#8b6f47]/30 bg-gradient-to-br from-[#1a0f08]/40 to-transparent">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-[#b8964f] flex items-center justify-center bg-gradient-to-br from-[#b8964f]/20 to-transparent">
                <Gift className="w-6 h-6 text-[#b8964f]" />
              </div>
              <div>
                <p className="text-sm text-[#a89677]">Prêmios Disponíveis</p>
                <p className="text-3xl text-[#e8d5bb] font-['Cinzel']">{availableRewards.length}</p>
              </div>
            </div>
            <p className="text-xs text-[#6b5742]">Abra o baú para resgatar</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[#8b6f47]/30">
          <button
            onClick={() => setActiveTab("info")}
            className={`px-6 py-3 tracking-wider transition-all ${
              activeTab === "info"
                ? "border-b-2 border-[#b8964f] text-[#b8964f]"
                : "text-[#a89677] hover:text-[#b8964f]"
            }`}
          >
            INFORMAÇÕES
          </button>
          <button
            onClick={() => setActiveTab("chest")}
            className={`px-6 py-3 tracking-wider transition-all ${
              activeTab === "chest"
                ? "border-b-2 border-[#b8964f] text-[#b8964f]"
                : "text-[#a89677] hover:text-[#b8964f]"
            }`}
          >
            BAÚ DO AVENTUREIRO
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "info" && (
          <div className="max-w-2xl">
            {/* Profile Info */}
            <div className="p-8 border border-[#8b6f47]/30 bg-gradient-to-br from-[#1a0f08]/40 to-transparent mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-[#e8d5bb] font-['Cinzel']">Dados do Perfil</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-[#b8964f] text-[#b8964f] hover:bg-[#b8964f] hover:text-[#1a0f08] transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#c9b697] mb-2">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1a0f08]/60 border border-[#8b6f47]/50 text-[#e8d5bb] focus:outline-none focus:border-[#b8964f]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#c9b697] mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1a0f08]/60 border border-[#8b6f47]/50 text-[#e8d5bb] focus:outline-none focus:border-[#b8964f]"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleUpdateProfile}
                      className="px-6 py-2 bg-[#8b2c2c] text-[#e8d5bb] hover:bg-[#6b1c1c] transition-all"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setUsername(user.username);
                        setEmail(user.email);
                      }}
                      className="px-6 py-2 border border-[#8b6f47]/50 text-[#a89677] hover:border-[#b8964f] hover:text-[#b8964f] transition-all"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-[#a89677]">Username</p>
                    <p className="text-[#e8d5bb]">{user.username}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#a89677]">Email</p>
                    <p className="text-[#e8d5bb]">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#a89677]">Membro desde</p>
                    <p className="text-[#e8d5bb]">
                      {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full py-3 border border-[#8b2c2c] text-[#8b2c2c] hover:bg-[#8b2c2c] hover:text-[#e8d5bb] transition-all"
            >
              SAIR DA CONTA
            </button>
          </div>
        )}

        {activeTab === "chest" && (
          <div>
            {/* ================= INICIO AREA: BAÚ DO AVENTUREIRO ================= */}
            {/* Available Rewards */}
            {availableRewards.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl text-[#e8d5bb] mb-6 font-['Cinzel']">Prêmios Disponíveis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableRewards.map((reward) => (
                    <div
                      key={reward.id}
                      className="p-6 border-2 border-[#b8964f] bg-gradient-to-br from-[#b8964f]/20 to-transparent relative overflow-hidden group"
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#b8964f]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <Award className="w-8 h-8 text-[#b8964f]" />
                          <h3 className="text-xl text-[#e8d5bb] font-['Cinzel']">{reward.name}</h3>
                        </div>
                        <p className="text-[#c9b697] mb-4">{reward.description}</p>
                        <p className="text-xs text-[#a89677] mb-4">
                          Conquistado em {new Date(reward.earnedAt).toLocaleDateString("pt-BR")}
                        </p>
                        <button
                          onClick={() => useReward(reward.id)}
                          className="w-full py-2 bg-[#8b2c2c] text-[#e8d5bb] hover:bg-[#6b1c1c] transition-all tracking-wider"
                        >
                          USAR PRÊMIO
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Purchase History */}
            <div className="mb-12">
              <h2 className="text-3xl text-[#e8d5bb] mb-6 font-['Cinzel']">Histórico de Serviços</h2>
              {user.purchaseHistory.length > 0 ? (
                <div className="space-y-4">
                  {user.purchaseHistory.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="p-6 border border-[#8b6f47]/30 bg-gradient-to-br from-[#1a0f08]/40 to-transparent"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-xl text-[#e8d5bb] mb-2">{purchase.serviceName}</h3>
                          <p className="text-sm text-[#a89677]">
                            {new Date(purchase.date).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                          <p className="text-[#b8964f]">+{purchase.pointsEarned} pontos</p>
                          <p className="text-sm text-[#a89677]">
                            Status: <span className="text-[#e8d5bb]">{purchase.status}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-[#8b6f47]/30">
                  <p className="text-[#a89677]">Você ainda não contratou nenhum serviço</p>
                </div>
              )}
            </div>

            {/* Used Rewards */}
            {usedRewards.length > 0 && (
              <div>
                <h2 className="text-3xl text-[#e8d5bb] mb-6 font-['Cinzel']">Prêmios Utilizados</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {usedRewards.map((reward) => (
                    <div
                      key={reward.id}
                      className="p-6 border border-[#8b6f47]/30 bg-gradient-to-br from-[#1a0f08]/40 to-transparent opacity-60"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Award className="w-8 h-8 text-[#6b5742]" />
                        <h3 className="text-xl text-[#a89677] font-['Cinzel']">{reward.name}</h3>
                      </div>
                      <p className="text-[#6b5742] mb-4">{reward.description}</p>
                      <p className="text-xs text-[#6b5742]">Já utilizado</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* ================= FIM AREA: BAÚ DO AVENTUREIRO ================= */}
          </div>
        )}
      </div>
    </div>
  );
}