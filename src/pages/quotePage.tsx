import React, { useState } from "react";
import Layout from "../layouts/layout";
// import { post } from "../lib/api";
import { getPrice } from "../services/stocks";

export default function Quote() {
  const [symbol, setSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrice(null);
  
    try {
      // 1. Call the API. If it fails (400/500), it jumps to 'catch' automatically.
      // const data = await getPrice(symbol);
      const data = await fetch(`/price?symbol=${symbol}`, {
        method: "GET",
        credentials: "include",
      });
  
      // 2. If we get here, it worked! 'data' is the JSON object.
      setPrice(data.price); 
  
    } catch (err: any) {
      // 3. Handle the error here
      setError(err);
      
      // Attempt to read the error message sent by Flask
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Network error or Invalid symbol.");
      }
    }
  
    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-slate-900/40 p-6 rounded-xl border border-slate-800 shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">Get Stock Quote</h1>

        <form className="space-y-4">
          <input
            type="text"
            required
            autoFocus
            placeholder="SYMBOL"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <button
            type="button"
            onClick={handleQuote}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2 rounded-lg font-semibold"
          >
            {loading ? "Loading…" : "Get Quote"}
          </button>
        </form>

        {error && (
          <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
        )}

        {price !== null && (
          <div className="mt-6 text-center text-lg font-medium">
            <span className="text-slate-300">Current Price:</span>{" "}
            <span className="text-indigo-400 font-semibold">${price}</span>
          </div>
        )}
      </div>
    </Layout>
  );
}
