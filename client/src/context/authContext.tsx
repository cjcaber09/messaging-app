import { createContext } from "react";
import type { UserData } from "../types/auth.types";

type AuthContextType = {
  token: string | null;
  user: UserData | null;
  setAuth: (token: string, user: UserData) => void;
  clear: () => void;
};
export const UserContext = createContext<AuthContextType | undefined>(
  undefined,
);
