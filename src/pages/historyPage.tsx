import React, { useEffect, useState } from "react";
import Layout from "../layouts/layout";
import type { JSX } from "react";
import { getHistory } from "../services/user";

type HistoryItem = {
  stock: string;
  shares: number;
  price: number;
  buy: string; // class
};

export default function HistoryPage(): JSX.Element {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHistory()
      // .then((res) => res.json())
      .then((data) => setHistory(data.history || []))
      .finally(() => setLoading(false));
  }, []);
  
  console.log(history);

  return (
    <Layout>
      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4">History</h1>

        {loading ? (
          <p className="text-slate-400">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="text-slate-400">
                <tr>
                  <th className="pb-2">Stock</th>
                  <th className="pb-2">Shares</th>
                  <th className="pb-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {history.map((row, i) => (
                  <tr key={i} className="border-t border-slate-800">
                    <td className="py-2">
                      {row.stock} <span className="text-slate-400">({row.stock})</span>
                    </td>
                    <td className="py-2">{row.shares || "nothing"}</td>
                    <td className="py-2">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
