import { createContext } from "react";
import type { UserData } from "../types/auth.types";

type AuthContextType = {
  user: UserData | null;
  setAuth: (user: UserData) => void;
  clear: () => void;
};
export const UserContext = createContext<AuthContextType | null>(null);
