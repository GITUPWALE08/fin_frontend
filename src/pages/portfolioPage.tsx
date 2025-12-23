import { useEffect, useState } from "react";
import Layout from "../layouts/layout";
import { getPortfolio } from "../services/user";
import { Link } from "react-router-dom";
import QuoteModal from "../components/quoteModalPage";

// Types matching your Flask JSON response
type StockPosition = {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  total: number;
};

type PortfolioData = {
  portfolio: StockPosition[];
  cash: number;
  total: number; 
};

export default function PortfolioPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  // Function to fetch data
  const fetchData = async (isBackground = false) => {
    try {
      // Only show loading spinner on the very first load
      if (!isBackground) setLoading(true);
      
      const res = await getPortfolio();
      
      if (res.error) throw new Error(res.error);
      setData(res);
      setError("");
    } catch (err) {
      console.error("Update failed:", err);
      // Only set main error if we have no data at all
      if (!data) setError("Unable to load portfolio data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 1. Load data immediately when page opens
    fetchData();

    // Set up the Live Update timer (Polling)
    // I'm using 1000ms (5s) to be polite to the API. 
    const interval = setInterval(() => {
      fetchData(true); // true = silent update (no loading spinner)
    }, 1000); 

    // 3. Cleanup timer when user leaves the page
    return () => clearInterval(interval);
  }, []);

  const formatMoney = (amount: number) => 
    amount?.toLocaleString("en-US", { style: "currency", currency: "USD" }) || "$0.00";

  // --- RENDER HELPERS ---
  
  if (loading && !data) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center h-64 text-slate-400 space-y-4">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p>Loading market data...</p>
        </div>
      </Layout>
    );
  }

  if (error && !data) {
    return (
      <Layout>
        <div className="text-center mt-20">
            <h2 className="text-xl text-red-400 font-bold">Connection Error</h2>
            <p className="text-slate-500 mt-2">{error}</p>
            <button onClick={() => fetchData()} className="mt-4 px-4 py-2 bg-slate-800 rounded text-white hover:bg-slate-700">
                Retry
            </button>
        </div>
      </Layout>
    );
  }

  // Safe calculations
  const cash = data?.cash || 0;
  const netWorth = data?.total || 0;
  const stockValue = netWorth - cash;

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-500">

        <QuoteModal 
          isOpen={isQuoteOpen} 
          onClose={() => setIsQuoteOpen(false)} 
        />
        
        {/* --- LIVE INDICATOR --- */}
        <div className="flex justify-end items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs text-emerald-400 font-mono uppercase tracking-widest">Live Market Data</span>
        </div>

        {/* --- SUMMARY CARDS --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Cash Balance</h3>
            <p className="text-3xl font-bold text-white mt-2">{formatMoney(cash)}</p>
            <div className="mt-2 text-xs text-slate-500">Available to trade</div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Invested Assets</h3>
            <p className="text-3xl font-bold text-white mt-2">{formatMoney(stockValue)}</p>
            <div className="mt-2 text-xs text-slate-500">Total value of stocks</div>
          </div>

          <div className="bg-linear-to-br from-indigo-900/20 to-slate-900/60 border border-indigo-500/30 p-6 rounded-xl shadow-lg">
            <h3 className="text-indigo-300 text-sm font-medium uppercase tracking-wider">Net Worth</h3>
            <p className="text-3xl font-bold text-indigo-400 mt-2">{formatMoney(netWorth)}</p>
            <div className="mt-2 text-xs text-indigo-300/60">Cash + Investments</div>
          </div>
        </section>

        {/* --- HOLDINGS TABLE --- */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Current Holdings</h2>

            <button 
                onClick={() => setIsQuoteOpen(true)}
                className="text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg transition border border-slate-700"
              >
                Get Quote
              </button>

            <Link to="/buy" className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition shadow-lg shadow-indigo-900/20">
              Buy Stock
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-950/30 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Symbol</th>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold text-right">Shares</th>
                  <th className="px-6 py-4 font-semibold text-right">Price</th>
                  <th className="px-6 py-4 font-semibold text-right">Total Value</th>
                  <th className="px-6 py-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {(!data?.portfolio || data.portfolio.length === 0) ? (
                   <tr>
                     <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                       You don't own any stocks yet. <br/>
                       <Link to="/buy" className="text-indigo-400 hover:underline mt-2 inline-block">Start trading</Link>
                     </td>
                   </tr>
                ) : (
                  data.portfolio.map((stock, i) => (
                    <tr key={i} className="hover:bg-slate-800/40 transition group">
                      <td className="px-6 py-4 text-white font-bold">{stock.symbol}</td>
                      <td className="px-6 py-4 text-slate-300">{stock.name}</td>
                      <td className="px-6 py-4 text-right text-slate-300 font-mono">{stock.shares}</td>
                      <td className="px-6 py-4 text-right text-slate-300 font-mono">
                        {/* Price flashes/updates automatically via React state */}
                        {formatMoney(stock.price)}
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-emerald-400 font-mono">
                        {formatMoney(stock.total)}
                      </td>
                      <td className="px-6 py-4 text-center">
                         {/* Sell Button appears on hover */}
                         <Link to="/sell" className="text-xs font-semibold text-red-400 bg-red-900/10 px-2 py-1 rounded hover:bg-red-900/30 transition opacity-50 group-hover:opacity-100">
                          SELL
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-b border-slate-800 flex justify-between items-end">
            <Link to="/sell" className="text-xs font-semibold text-red-400 bg-red-900/10 px-2 py-1 rounded hover:bg-red-900/30 transition opacity-50 group-hover:opacity-100">
              SELL
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}