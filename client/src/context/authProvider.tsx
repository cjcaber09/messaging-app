import { useContext, useState, useEffect } from "react";
import { UserContext } from "./authContext";
import type { UserData } from "../types/auth.types";
import { authApi } from "../api/auth.api";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData>(null);
  // Rehydrate on refresh
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await authApi.refresh();
        if (res.data) {
          const user = res.data;
          setUser(user.data);
        } else {
          setUser(null);
        }
      } catch {
        // ✅ no cookie / unauthorized, clear state
        setUser(null);
      }
    };

    restoreSession();
  }, []);

  const setAuth = (user: UserData) => {
    setUser(user);
  };

  const clear = () => {
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ user, setAuth, clear }}>
      {children}
    </UserContext.Provider>
  );
};;
export const UseAuth = () => {
  const user = useContext(UserContext);
  if (!user) throw new Error("user context needs to have a value");
  return user;
};
