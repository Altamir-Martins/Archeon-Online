import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Portfolio } from "./pages/Portfolio";
import { Services } from "./pages/Services";
import { HowWeWork } from "./pages/HowWeWork";
import { About } from "./pages/About";
import { Terms } from "./pages/Terms";
import { RequestProject } from "./pages/RequestProject";
import { Login } from "./pages/Login";
import { Cadastro } from "./pages/Cadastro";
import { Profile } from "./pages/Profile";
import { Shop } from "./pages/Shop";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "portfolio", Component: Portfolio },
      { path: "servicos", Component: Services },
      { path: "como-trabalhamos", Component: HowWeWork },
      { path: "sobre", Component: About },
      { path: "termos", Component: Terms },
      { path: "solicitar-projeto", Component: RequestProject },
      { path: "loja", Component: Shop },
      { path: "login", Component: Login },
      { path: "cadastro", Component: Cadastro },
      { path: "perfil", Component: Profile },
    ],
  },
]);