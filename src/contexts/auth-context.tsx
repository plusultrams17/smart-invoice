"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { User } from "@/types/user";
import { useRouter } from "@/i18n/navigation";
import { PLANS } from "@/lib/constants";

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
  invoiceCount: number;
  login: () => void;
  logout: () => void;
  updatePlan: (plan: User["plan"]) => void;
  incrementInvoiceCount: () => void;
  canCreateInvoice: () => boolean;
  canUseAi: () => boolean;
  getRemainingInvoices: () => number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading] = useState(false);
  const [invoiceCount, setInvoiceCount] = useState(3); // Mock: already used 3 this month
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

  const incrementInvoiceCount = useCallback(() => {
    setInvoiceCount((prev) => prev + 1);
  }, []);

  const canCreateInvoice = useCallback(() => {
    if (!user) return false;
    const plan = PLANS[user.plan];
    return invoiceCount < plan.invoiceLimit;
  }, [user, invoiceCount]);

  const canUseAi = useCallback(() => {
    if (!user) return false;
    return PLANS[user.plan].hasAi;
  }, [user]);

  const getRemainingInvoices = useCallback(() => {
    if (!user) return 0;
    const plan = PLANS[user.plan];
    if (plan.invoiceLimit === Infinity) return Infinity;
    return Math.max(0, plan.invoiceLimit - invoiceCount);
  }, [user, invoiceCount]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        invoiceCount,
        login,
        logout,
        updatePlan,
        incrementInvoiceCount,
        canCreateInvoice,
        canUseAi,
        getRemainingInvoices,
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
