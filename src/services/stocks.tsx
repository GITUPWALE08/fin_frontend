import { get, post } from "../lib/api";

export const getPrice = (symbol: string) =>
  get(`/price?symbol=${symbol}`);

export const buyStock = (symbol: string, shares: number, password: string) =>
  post("/buy", { symbol, shares, password });

export const sellStock = (symbol: string, shares: number, password: string) =>
  post("/sell", { symbol, shares, password });
