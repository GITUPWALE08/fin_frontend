import { post, get } from "../lib/api";

export const login = (username: string, password: string) =>
  post("/login", { username, password });

export const register = (username: string, password: string, confirm: string) =>
  post("/register", { username, password, confirm });

export const log_out = () => get("/logout");