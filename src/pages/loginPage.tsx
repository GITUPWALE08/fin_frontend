import React, { useState } from "react";
import Layout from "../layouts/layout";
import type { JSX } from "react";
import { useAuth } from "../state/authState";
import { useNavigate } from "react-router-dom";

export default function LoginPage(): JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // FIX: Use relative path (Proxy) instead of absolute URL
      const res = await fetch("/login", {
        method: "POST",
        credentials: "include", // Required for cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid login credentials");
      }

      // Save authenticated user
      // Ensure these keys match exactly what your Python 'login' returns
      const userObj = {
          id: data.user_id,
          username: data.user_name
      };
      
      setUser(userObj);
      
      // Navigate to dashboard
      nav("/");

    } catch (err: any) {
      setError(err.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-12">
        <div className="rounded-2xl bg-linear-to-b from-slate-900/60 to-slate-950/50 p-8 border border-slate-800 shadow-xl">
          <form onSubmit={submit} className="space-y-4">
            <h1 className="text-2xl font-bold text-white mb-6">Sign in</h1>

            <label className="block">
              <span className="text-sm text-slate-300">Username</span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <span className="text-sm text-slate-300">Password</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••"
              />
            </label>

            {error && <div className="text-sm text-red-400">{error}</div>}

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 disabled:opacity-60 transition"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-5 text-sm text-slate-400 text-center">
            Don't have an account? <a className="text-indigo-400 underline" href="/signup">Create one</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}