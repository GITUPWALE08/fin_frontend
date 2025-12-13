// src/services/user.ts
import { get } from "../lib/api";

export const getPortfolio = () => get("/portfolio");
export const getHistory = () => get("/history");