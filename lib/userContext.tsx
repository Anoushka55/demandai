"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface UserContextValue {
  name: string | null;
  role: string;
  setName: (n: string | null) => void;
  isReady: boolean;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [name, setNameState] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("demandiq_user") : null;
    if (stored) setNameState(stored);
    setIsReady(true);
  }, []);

  const setName = (n: string | null) => {
    setNameState(n);
    if (typeof window !== "undefined") {
      if (n) window.localStorage.setItem("demandiq_user", n);
      else window.localStorage.removeItem("demandiq_user");
    }
  };

  return (
    <UserContext.Provider value={{ name, role: "Demand & Supply Planner", setName, isReady }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}
