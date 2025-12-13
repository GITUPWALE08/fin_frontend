import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function QuoteModal({ isOpen, onClose }: Props) {
  const [symbol, setSymbol] = useState("");
  const [result, setResult] = useState<{ name: string; price: number } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // Use the POST route defined in app.py
      const res = await fetch("/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid symbol");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to close and reset
  const handleClose = () => {
    setSymbol("");
    setResult(null);
    setError("");
    onClose();
  };

  return (
    // 1. The Backdrop (Dark overlay)
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      
      {/* 2. The Floating Card */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Get Stock Quote</h2>
          <button onClick={handleClose} className="text-slate-400 hover:text-white transition">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form onSubmit={handleQuote} className="space-y-4">
            <div>
              <input
                type="text"
                required
                autoFocus
                placeholder="Enter Symbol (e.g. AAPL)"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none uppercase"
              />
            </div>

            {/* Results Area */}
            {error && (
              <div className="p-3 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {result && (
              <div className="p-4 bg-emerald-900/20 border border-emerald-900/50 rounded-lg text-center animate-in zoom-in-95">
                <div className="text-slate-400 text-sm">{result.name}</div>
                <div className="text-3xl font-bold text-emerald-400 mt-1">
                  ${result.price.toLocaleString()}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Searching..." : "Get Quote"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}