import React, { useState } from "react";
import Layout from "../layouts/layout";
import {post} from "../lib/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmation) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // USE 'post' helper
      await post("/register", { username, password, confirmation });
      
      // If successful, redirect
      window.location.href = "/signin";
      
    } catch (err: any) {
      const msg = err.response?.data?.error || "Unable to register";
      setError(msg);
    }

    setLoading(false);
};

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-slate-900/40 p-6 rounded-xl border border-slate-800 shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="password"
            required
            placeholder="Confirm password"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2 rounded-lg font-semibold"
          >
            {loading ? "Creating account…" : "Register"}
          </button>
        </form>

        {error && (
          <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
        )}
      </div>
    </Layout>
  );
}
