import { get, post } from "../lib/api";

export const getPrice = (symbol: string) =>
  get(`api/price?symbol=${symbol}`);

export const buyStock = (symbol: string, shares: number, password: string) =>
  post("/buy", { symbol, shares, password });
