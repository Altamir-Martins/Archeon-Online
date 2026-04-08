import { Outlet, Link, useLocation } from "react-router";
import { Mail, Clock, User, ScrollText, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import Particles from "./Particles";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Layout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { t } = useTranslation();

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/portfolio", label: t("nav.portfolio") },
    { path: "/servicos", label: t("nav.services") },
    { path: "/loja", label: t("nav.shop") },
    { path: "/como-trabalhamos", label: t("nav.howWeWork") },
    { path: "/sobre", label: t("nav.about") },
    { path: "/termos", label: t("nav.terms") },
  ];

  return (
    <div className="min-h-screen bg-[#0a0604] text-[#e8d5bb]">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0604]/95 backdrop-blur-sm border-b border-[#8b6f47]/20' : 'bg-gradient-to-b from-[#0a0604] to-transparent'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* ================= INICIO AREA: LOGO DO HEADER ================= */}
            {/* Logo principal no topo - Ícone de escudo dourado com símbolo + texto "ARCHEON" */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full border-2 border-[#b8964f] flex items-center justify-center bg-gradient-to-br from-[#b8964f]/20 to-transparent">
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#b8964f]" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4v8.82c0 4.52-3.12 8.75-7.5 9.86V4.18h-.5z"/>
                  <circle cx="12" cy="11" r="3"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl tracking-wider font-['Cinzel']">ARCHEON</h1>
                <p className="text-xs text-[#b8964f] tracking-wide">ART & DIREÇÃO CRIATIVA</p>
              </div>
            </Link>
            {/* ================= FIM AREA: LOGO DO HEADER ================= */}

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm tracking-wider transition-colors hover:text-[#b8964f] ${
                    location.pathname === link.path ? 'text-[#b8964f]' : 'text-[#e8d5bb]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ================= INICIO AREA: BOTÕES DE AÇÃO DO HEADER ================= */}
            {/* Botões de Cadastro, Login, Perfil e Solicitar Projeto */}
            <div className="hidden sm:flex items-center gap-3">
              <LanguageSwitcher />
            </div>
            <div className="flex items-center gap-3">
              {!isAuthenticated ? (
                <>
                  {/* ================= BOTÃO DE CADASTRO ================= */}
                  {/* Ícone: Papiro com pena */}
                  <Link 
                    to="/cadastro"
                    className="px-4 py-2 bg-transparent border border-[#8b6f47]/50 text-[#a89677] hover:border-[#b8964f] hover:text-[#b8964f] transition-all duration-300 tracking-wider text-sm flex items-center gap-2 group"
                    title={t("auth.signUp")}
                  >
                    <ScrollText className="w-4 h-4" />
                    <span className="hidden xl:inline">{t("auth.signUp")}</span>
                  </Link>

                  {/* ================= BOTÃO DE LOGIN ================= */}
                  {/* Ícone: Capacete medieval */}
                  <Link 
                    to="/login"
                    className="px-4 py-2 bg-transparent border border-[#8b6f47]/50 text-[#a89677] hover:border-[#b8964f] hover:text-[#b8964f] transition-all duration-300 tracking-wider text-sm flex items-center gap-2 group"
                    title={t("auth.loginTitle")}
                  >
                    <Shield className="w-4 h-4" />
                    <span className="hidden xl:inline">{t("auth.loginTitle")}</span>
                  </Link>
                </>
              ) : (
                <>
                  {/* ================= BOTÃO DE PERFIL (quando logado) ================= */}
                  <Link 
                    to="/perfil"
                    className="px-4 py-2 bg-transparent border border-[#b8964f] text-[#b8964f] hover:bg-[#b8964f] hover:text-[#1a0f08] transition-all duration-300 tracking-wider text-sm flex items-center gap-2"
                    title="Meu Perfil"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden xl:inline">{user?.username}</span>
                  </Link>
                </>
              )}

              {/* ================= BOTÃO SOLICITAR PROJETO ================= */}
              <Link 
                to="/solicitar-projeto"
                className="px-6 py-2 bg-transparent border-2 border-[#b8964f] text-[#b8964f] hover:bg-[#b8964f] hover:text-[#1a0f08] transition-all duration-300 tracking-wider text-sm"
              >
                {t("nav.requestProject")}
              </Link>
            </div>
            {/* ================= FIM AREA: BOTÕES DE AÇÃO DO HEADER ================= */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
        <Particles />
      </main>

      {/* Footer */}
      <footer className="relative border-t border-[#8b6f47]/30 bg-gradient-to-b from-transparent to-[#0a0604] mt-20">
        {/* Decorative border */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-64 h-px bg-gradient-to-r from-transparent via-[#b8964f] to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rotate-45 border border-[#b8964f] bg-[#0a0604]"></div>
        </div>

        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo and description */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#b8964f] flex items-center justify-center bg-gradient-to-br from-[#b8964f]/20 to-transparent">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#b8964f]" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4v8.82c0 4.52-3.12 8.75-7.5 9.86V4.18h-.5z"/>
                    <circle cx="12" cy="11" r="3"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg" style={{ fontFamily: 'serif' }}>ARCHEON</h3>
                  <p className="text-xs text-[#b8964f]">ART & DIREÇÃO CRIATIVA</p>
                </div>
              </div>
              <p className="text-sm text-[#a89677] leading-relaxed">
                Criando arte épica para jogos, RPG e mundos imaginários.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-sm mb-4 tracking-wider" style={{ fontFamily: 'serif' }}>NAVEGAÇÃO</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-sm text-[#a89677] hover:text-[#b8964f] transition-colors">Home</Link></li>
                <li><Link to="/portfolio" className="text-sm text-[#a89677] hover:text-[#b8964f] transition-colors">Portfólio</Link></li>
                <li><Link to="/servicos" className="text-sm text-[#a89677] hover:text-[#b8964f] transition-colors">Serviços</Link></li>
                <li><Link to="/loja" className="text-sm text-[#a89677] hover:text-[#b8964f] transition-colors">Loja</Link></li>
                <li><Link to="/como-trabalhamos" className="text-sm text-[#a89677] hover:text-[#b8964f] transition-colors">Como Trabalhamos</Link></li>
                <li><Link to="/sobre" className="text-sm text-[#a89677] hover:text-[#b8964f] transition-colors">Sobre o Estúdio</Link></li>
                <li><Link to="/termos" className="text-sm text-[#a89677] hover:text-[#b8964f] transition-colors">Termos & Contrato</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm mb-4 tracking-wider" style={{ fontFamily: 'serif' }}>SERVIÇOS</h4>
              <ul className="space-y-2">
                <li className="text-sm text-[#a89677]">Concept Art</li>
                <li className="text-sm text-[#a89677]">Criaturas</li>
                <li className="text-sm text-[#a89677]">Personagens</li>
                <li className="text-sm text-[#a89677]">Direção de Arte</li>
                <li className="text-sm text-[#a89677]">Assets para Jogos</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm mb-4 tracking-wider" style={{ fontFamily: 'serif' }}>CONTATO</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#b8964f]" />
                  <a href="mailto:contato@archeon.art" className="text-sm text-[#a89677] hover:text-[#b8964f] transition-colors">
                    contato@archeon.art
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#b8964f]" />
                  <span className="text-sm text-[#a89677]">Resposta em até 24h</span>
                </div>
                <Link 
                  to="/solicitar-projeto"
                  className="inline-block mt-4 px-6 py-2 bg-transparent border border-[#b8964f] text-[#b8964f] hover:bg-[#b8964f] hover:text-[#1a0f08] transition-all duration-300 text-sm tracking-wider"
                >
                  SOLICITAR PROJETO
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-[#8b6f47]/20 text-center">
            <p className="text-xs text-[#6b5742]">
              © 2024 Archeon Art & Direção Criativa. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}