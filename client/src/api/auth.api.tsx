import type { LoginData, RegisterData } from "../types/auth.types";
import { client } from "./client";

export const authApi = {
  login: (data: LoginData) => client.post("/user/login", data),
  register: (data: RegisterData) => client.post("/user/register", data),
  logout: () => client.post("/user/logout"),
};
