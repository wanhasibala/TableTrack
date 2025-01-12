// AuthProvider.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/db/supabaseClient"; // Adjust the import path as needed
import { useNavigate } from "react-router";

// Define the context types
interface AuthContextType {
  user: any; // Replace with your Supabase User type if available
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loading: boolean;
}

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        setLoading(false);

        if (event === "SIGNED_IN") {
          navigate("/dashboard"); // Redirect after login
        }
        if (event === "SIGNED_OUT") {
          navigate("/"); // Redirect after logout
        }
      },
    );

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error.message);
      setLoading(false);
      throw new Error("Failed to login");
    }
    setLoading(false);
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error.message);
      setLoading(false);
      throw new Error("Failed to logout");
    }
    setLoading(false);
  };

  // Register function
  const register = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error(error.message);
      setLoading(false);
      throw new Error("Failed to register");
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};
