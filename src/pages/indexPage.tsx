import { useEffect, useState } from "react";
import type { JSX } from "react";
import Layout from "../layouts/layout";
import { getPortfolio } from "../services/user";
import { useAuth } from "../state/authState";

export default function IndexPage(): JSX.Element {
  // sample KPI data - you can replace with API calls
  const kpis = [
    { label: "Portfolio Value", value: "₦ 3,420,000", sub: "+3.4% (30d)" },
    { label: "Capital", value: "₦ 1,200,000", sub: "Available" },
    { label: "Invested", value: "₦ 2,220,000", sub: "Active positions" },
  ];

  const [data, setData] = useState<any[]>([]);
  
    useEffect(() => {
      getPortfolio().then((res) => setData(res.portfolio));
    }, []);
  

  const { user } = useAuth();
  {data ? console.log(data) : console.log ("no data")}

  return (
    <Layout>
      <section className="mb-8">
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 shadow-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Welcome back {user?.username} </h1>
              <p className="text-slate-400 mt-1">Overview of your portfolio and latest activity</p>
            </div>

            <div className="flex items-center gap-3">
              <button className="bg-slate-800/60 text-slate-200 px-3 py-2 rounded-lg hover:bg-slate-700 transition">Quick buy</button>
              <button className="bg-indigo-600 px-4 py-2 rounded-lg text-white font-medium hover:bg-indigo-500 transition">New transaction</button>
            </div>
          </div>

          { user?.id ? 
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="p-4 rounded-lg bg-linear-to-b from-slate-800/40 to-slate-900/40 border border-slate-700">
                  <div className="text-sm text-slate-400">{kpi.label}</div>
                  <div className="mt-2 text-2xl font-bold">{kpi.value}</div>
                  <div className="mt-1 text-xs text-green-400">{kpi.sub}</div>
                </div>
              ))}
            </div> 
            :
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="p-4 rounded-lg bg-linear-to-b from-slate-800/40 to-slate-900/40 border border-slate-700">
                  <div className="text-sm text-slate-400">{kpi.label}</div>
                  <div className="mt-2 text-2xl font-bold">{kpi.value}</div>
                  <div className="mt-1 text-xs text-green-400">{kpi.sub}</div>
                </div>
              ))}
            </div> 
          }
        </div>
      </section>

      <section>
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Holdings</h2>
            <div className="text-sm text-slate-400">Updated a few seconds ago</div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left table-fixed">
              <thead className="text-slate-400 text-sm">
                <tr>
                  <th className="pb-3">Symbol</th>
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Shares</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Total</th>
                </tr>
              </thead>
              <tbody className="mt-2">
                {/* Example static rows — replace with map from your API */}
                <tr className="border-t border-slate-800">
                  <td className="py-3 font-medium">AAPL</td>
                  <td className="py-3 text-slate-300">Apple Inc.</td>
                  <td className="py-3">12</td>
                  <td className="py-3">₦ 420,000</td>
                  <td className="py-3 font-semibold">₦ 5,040,000</td>
                </tr>
                <tr className="border-t border-slate-800 bg-slate-900/20">
                  <td className="py-3 font-medium">TSLA</td>
                  <td className="py-3 text-slate-300">Tesla</td>
                  <td className="py-3">3</td>
                  <td className="py-3">₦ 3,200,000</td>
                  <td className="py-3 font-semibold">₦ 9,600,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Layout>
  );
}
