import type React from "react";

import { createContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { TOKEN_STORAGE_KEY } from "../constants/storage-keys";
import { usersApi } from "../lib/api/users";

type AuthContextData = {
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadStoredData() {
      setLoading(true);
      try {
        const token = localStorage.getItem(TOKEN_STORAGE_KEY);
        if (token) {
          console.log("Token encontrado:", token);

          navigate("/home");
        } else {
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          navigate("/login");
        }
      } catch (error) {
        console.error("Erro ao carregar dados armazenados:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    loadStoredData();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);

      console.log("Tentando fazer login com:", { email, password });

      const token = await usersApi.login({ email, password });

      console.log("Login bem-sucedido, token:", token);

      localStorage.setItem(TOKEN_STORAGE_KEY, token);

      navigate("/home");
    } catch (error) {
      toast.error(`Erro ao fazer login: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);

      localStorage.removeItem(TOKEN_STORAGE_KEY);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
