import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
// IMPORT YOUR API HELPER
import { get, post } from "../lib/api";

type AuthContextType = {
  user: { id: number; username: string } | null;
  setUser: (u: AuthContextType["user"]) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        // USE 'get' INSTEAD OF 'fetch'
        // This automatically uses the correct Vercel/Render URL
        const data = await get("/current_user");
        
        if (data.user) {
          setUser(data.user);
        }
      } catch (error) {
        // console.log("Not logged in");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const logout = async () => {
     try {
       // USE 'post' helper
       await post("/logout");

       window.location.href = "/";
     } catch (e) {
       console.error(e);
     }
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