import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import modalBg from "../../assets/a05e6c531f0d60f5cec552a18288e9e62219f81c.png";

export function Cadastro() {
  const navigate = useNavigate();
  const { register, registerWithGoogle } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validações
    if (!username || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setLoading(false);
      return;
    }

    const success = await register(username, email, password);
    
    if (success) {
      navigate("/");
    } else {
      setError("Username ou email já cadastrado");
    }
    
    setLoading(false);
  };

  const handleGoogleRegister = async () => {
    setError("");
    setLoading(true);
    const success = await registerWithGoogle();
    if (success) {
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
      <div className="container mx-auto px-6 max-w-2xl">
        {/* Modal Container */}
        <div className="relative">
          {/* Background Image */}
          <div className="absolute inset-0">

            <div className="absolute inset-0 bg-[#0a0604]/40"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-12">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl text-[#e8d5bb] mb-2 font-['Cinzel']">
                Cadastro
              </h1>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="w-16 h-px bg-[#b8964f]"></div>
                <div className="w-2 h-2 rotate-45 border border-[#b8964f]"></div>
                <div className="w-16 h-px bg-[#b8964f]"></div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 border border-[#8b2c2c] bg-[#8b2c2c]/20 text-[#e8d5bb] text-center">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label className="block text-sm text-[#c9b697] mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1a0f08]/60 border border-[#8b6f47]/50 text-[#e8d5bb] placeholder-[#6b5742] focus:outline-none focus:border-[#b8964f] transition-colors"
                  placeholder="Escolha seu nome de usuário"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm text-[#c9b697] mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1a0f08]/60 border border-[#8b6f47]/50 text-[#e8d5bb] placeholder-[#6b5742] focus:outline-none focus:border-[#b8964f] transition-colors"
                  placeholder="Digite seu email"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm text-[#c9b697] mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1a0f08]/60 border border-[#8b6f47]/50 text-[#e8d5bb] placeholder-[#6b5742] focus:outline-none focus:border-[#b8964f] transition-colors"
                  placeholder="Crie uma senha (mín. 6 caracteres)"
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm text-[#c9b697] mb-2">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1a0f08]/60 border border-[#8b6f47]/50 text-[#e8d5bb] placeholder-[#6b5742] focus:outline-none focus:border-[#b8964f] transition-colors"
                  placeholder="Digite a senha novamente"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#8b2c2c] border-2 border-[#8b2c2c] text-[#e8d5bb] hover:bg-[#6b1c1c] transition-all duration-300 tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "CRIANDO CONTA..." : "CRIAR CONTA"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-[#8b6f47]/30"></div>
              <span className="text-sm text-[#a89677]">OU</span>
              <div className="flex-1 h-px bg-[#8b6f47]/30"></div>
            </div>

            {/* Google Register */}
            <button
              type="button"
              onClick={handleGoogleRegister}
              disabled={loading}
              className="w-full py-3 bg-transparent border border-[#8b6f47]/50 text-[#c9b697] hover:border-[#b8964f] hover:text-[#b8964f] transition-all duration-300 tracking-wider disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Cadastrar com Google
            </button>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-[#a89677]">
                Já tem uma conta?{" "}
                <Link 
                  to="/login" 
                  className="text-[#b8964f] hover:text-[#e8d5bb] transition-colors"
                >
                  Faça login aqui
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
