import React, { useState } from "react";
import Layout from "../layouts/layout";
import type { JSX } from "react";
import { sellStock } from "../services/stocks";

export default function SellPage(): JSX.Element {
  const [symbol, setSymbol] = useState("");
  const [shares, setShares] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      // const res = await fetch("/sell", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ symbol, shares, password }),
      // });

      const res = await sellStock(symbol, Number(shares), password);

      if (res.error) throw new Error(res.error || "Failed to sell stock.");
      setSuccess("Purchase completed successfully.");
      setSymbol("");
      setShares("");
      setPassword("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10">
        <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-xl shadow-xl">
          <h1 className="text-2xl font-bold mb-4">Sell Stock</h1>

          <form onSubmit={submit} className="space-y-4">
            <input
              type="text"
              placeholder="SYMBOL"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2"
            />

            <input
              type="number"
              step="0.001"
              placeholder="SHARES"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2"
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}
            {success && <p className="text-green-400 text-sm">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded-lg font-semibold"
            >
              {loading ? "Processing..." : "SELL"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
