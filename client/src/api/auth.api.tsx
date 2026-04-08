import type { LoginData, RegisterData } from "../types/auth.types";
import { client } from "./client";

export const authApi = {
  login: (data: LoginData) => client.post("/users/login", data),
  register: (data: RegisterData) => client.post("/users/register", data),
  logout: () => client.post("/users/logout"),
  refresh: () => client.get("/users/refresh"),
};
