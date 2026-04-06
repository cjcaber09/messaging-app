import { useContext, useState } from "react";
import { UserContext } from "./authContext";
import type { UserData } from "../types/auth.types";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData>(null);
  const [token, setToken] = useState<string | null>(null);

  const setAuth = (token: string, user: UserData) => {
    setToken(token);
    setUser(user);
  };

  const clear = () => {
    setToken(null);
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ token, user, setAuth, clear }}>
      {children}
    </UserContext.Provider>
  );
};
export const UseAuth = () => {
  const user = useContext(UserContext);
  if (!user) throw new Error("user context needs to have a value");
  return user;
};
