import { Route, Routes } from "react-router";
import { DocumentationPage } from "./pages/(auth)/documentation";
import { HomePage } from "./pages/(auth)/home";
import { AuthLayout } from "./pages/(auth)/layout";
import { UsersPage } from "./pages/(auth)/users";
import { LoginPage } from "./pages/login";
import { RedirectPage } from "./pages/redirect";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RedirectPage />} />
      <Route path="login" element={<LoginPage />} />

      <Route element={<AuthLayout />}>
        <Route path="home" element={<HomePage />} />
        <Route path="documentation" element={<DocumentationPage />} />
        <Route path="users" element={<UsersPage />} />
      </Route>
    </Routes>
  );
}

export default App;
