import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pt: {
    translation: {
      nav: {
        home: 'HOME',
        portfolio: 'PORTFÓLIO',
        services: 'SERVIÇOS',
        shop: 'LOJA',
        howWeWork: 'COMO TRABALHAMOS',
        about: 'SOBRE',
        terms: 'TERMOS',
        requestProject: 'SOLICITAR PROJETO',
      },
      auth: {
        loginTitle: 'Login',
        usernameOrEmail: 'Username / Email',
        password: 'Senha',
        forgotPassword: 'Esqueceu sua senha?',
        loginButton: 'ENTRAR',
        registerLink: 'Cadastre-se aqui',
        pleaseFillFields: 'Por favor, preencha todos os campos',
        invalidCredentials: 'Usuário ou senha incorretos',
        signUp: 'CADASTRO',
      },
      footer: {
        navigation: 'NAVEGAÇÃO',
        services: 'SERVIÇOS',
        contact: 'CONTATO',
        copyright: '© 2024 Archeon Art & Direção Criativa. Todos os direitos reservados.',
        responseTime: 'Resposta em até 24h',
      },
      language: {
        label: 'Idioma',
        pt: 'PT',
        en: 'EN',
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: 'HOME',
        portfolio: 'PORTFOLIO',
        services: 'SERVICES',
        shop: 'SHOP',
        howWeWork: 'HOW WE WORK',
        about: 'ABOUT',
        terms: 'TERMS',
        requestProject: 'REQUEST PROJECT',
      },
      auth: {
        loginTitle: 'Login',
        usernameOrEmail: 'Username / Email',
        password: 'Password',
        forgotPassword: 'Forgot password?',
        loginButton: 'SIGN IN',
        registerLink: 'Register here',
        pleaseFillFields: 'Please fill in all fields',
        invalidCredentials: 'Invalid username or password',
        signUp: 'REGISTER',
      },
      footer: {
        navigation: 'NAVIGATION',
        services: 'SERVICES',
        contact: 'CONTACT',
        copyright: '© 2024 Archeon Art & Creative Direction. All rights reserved.',
        responseTime: 'Reply within 24h',
      },
      language: {
        label: 'Language',
        pt: 'PT',
        en: 'EN',
      },
    },
  },
};

const defaultLanguage = typeof window !== 'undefined' && window.localStorage
  ? window.localStorage.getItem('archeonLanguage') || 'pt'
  : 'pt';

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: 'pt',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
