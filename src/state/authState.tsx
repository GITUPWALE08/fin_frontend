// src/state/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type AuthContextType = {
  user: { id: number; username: string } | null;
  setUser: (u: AuthContextType["user"]) => void;
  logout: () => void;
  loading: boolean; // <--- ADD THIS
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [loading, setLoading] = useState(true); // <--- Start as true

  // Check for session when app loads
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/current_user", {
            credentials: "include" // <--- CRITICAL: Sends the cookie to backend
        });
        
        const data = await res.json();
        
        if (data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.log("Not logged in");
      } finally {
        setLoading(false); // <--- Finish loading regardless of result
      }
    };

    checkUser();
  }, []);

  const logout = async () => {
     await fetch("http://localhost:5000/logout", { credentials: "include" });
     setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
