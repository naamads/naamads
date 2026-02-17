import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  userName?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>({
    userName: "Demo User",
    email: "demo@mail.com",
  });
  const [isLoading, setIsLoading] = useState(false);

  const signOut = async () => {
    setUser(null);
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Placeholder sign-in logic. Replace with real auth call.
      await new Promise((res) => setTimeout(res, 500));
      setUser({ userName: email.split('@')[0], email });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Placeholder sign-up logic. Replace with real auth call.
      await new Promise((res) => setTimeout(res, 600));
      setUser({ userName: email.split('@')[0], email });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, signOut, signIn, signUp, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
