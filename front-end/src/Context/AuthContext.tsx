import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


interface UserProfile {
  userName: string;
  email: string;
  phone: string;
  date_time: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  user: UserProfile | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

    const baseUrl = import.meta.env.VITE_LOCAL_URL;

  // ----------------------------------------------------
  // Check if user is authenticated
  // ----------------------------------------------------
  const checkAuth = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${baseUrl}/user/profile`, {
        withCredentials: true,
      });

      if (response.data.success) {
      setUser(response.data.data);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    } catch (error) {
    
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // Login
  // ----------------------------------------------------
  const login = async () => {
    await checkAuth();
  };

  // ----------------------------------------------------
  // Logout
  // ----------------------------------------------------
  const logout = async () => {
    try {
      await axios.get(`${baseUrl}/user/logout`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // ----------------------------------------------------
  // Run authentication check on application startup
  // ----------------------------------------------------
  useEffect(() => {
    const initializeAuth = async () => {
    await checkAuth();
  };

  initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        login,
        logout,
        checkAuth,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
