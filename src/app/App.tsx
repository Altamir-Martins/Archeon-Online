import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { EditModeProvider } from "./contexts/EditModeContext";
import { EditModeToggle } from "./components/EditModeToggle";

export default function App() {
  return (
    <AuthProvider>
      <EditModeProvider>
        <RouterProvider router={router} />
        <EditModeToggle />
      </EditModeProvider>
    </AuthProvider>
  );
}