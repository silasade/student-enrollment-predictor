import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

type AuthContextProp = {
  currentUser: User | null;
  isLoggedIn: boolean;
  loading: boolean;
};

type AuthProviderProp = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextProp>({
  currentUser: null,
  isLoggedIn: false,
  loading: true,
});

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default function AuthProvider({ children }: AuthProviderProp) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
      } else {
        setCurrentUser(null);
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    isLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthContext, useAuth };
