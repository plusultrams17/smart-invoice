"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { User } from "@/types/user";
import { useRouter } from "@/i18n/navigation";

const mockUser: User = {
  id: "user-001",
  email: "tanaka@example.com",
  name: "田中太郎",
  plan: "free",
  avatar_url: null,
  created_at: "2025-01-15T00:00:00Z",
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  updatePlan: (plan: User["plan"]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading] = useState(false);
  const router = useRouter();

  const login = useCallback(() => {
    setUser(mockUser);
    router.push("/dashboard");
  }, [router]);

  const logout = useCallback(() => {
    setUser(null);
    router.push("/");
  }, [router]);

  const updatePlan = useCallback((plan: User["plan"]) => {
    setUser((prev) => (prev ? { ...prev, plan } : null));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updatePlan,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
