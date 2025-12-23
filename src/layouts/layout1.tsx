import { useState } from "react";
import type { PropsWithChildren } from "react";
import { useAuth } from "../state/authState";
import QuoteModal from "../components/quoteModalPage";
import { Link } from "react-router-dom";

export default function Layout({ children }: PropsWithChildren<{}>) {
  const { user, logout } = useAuth();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-b00 via-slate-800 to-slate-950 text-slate-100">
      <header className="backdrop-blur-sm bg-black/30 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-r from-indigo-500 to-sky-400 flex items-center justify-center text-xl font-bold">
              E
            </div>
            <div>
              <div className="text-lg font-semibold">ESDAN</div>
              <div className="text-xs text-slate-400 -mt-0.5">Empowering Nigeria's Future</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            <a className="text-slate-300 hover:text-white transition" href={user ? "/" : "/welcome"}>Home</a>
            <a className="text-slate-300 hover:text-white transition" href="/about">About</a>
            <a className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-medium hover:bg-indigo-500 transition" href="/signin">{user ? user.username : "sign in"}</a>
            
            <button 
                onClick={() => setIsQuoteOpen(true)}
                className="text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg transition border border-slate-700"
              >
                Get Quote
              </button>
            <a className="text-slate-300 hover:text-white transition" href="/transactions">history</a>
  
            {user ? (
            <button
              className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-medium hover:bg-indigo-500 transition text-white"
              onClick={logout}
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/signup"
              className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-medium hover:bg-indigo-500 transition text-white"
            >
              Sign Up
            </Link>
          )}

          </nav>
        </div>
      </header>

      <QuoteModal 
        isOpen={isQuoteOpen} 
        onClose={() => setIsQuoteOpen(false)} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="mt-16 border-t border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-slate-400 flex flex-col md:flex-row justify-between items-center gap-3">
          <div>© {new Date().getFullYear()} ESDAN. All rights reserved.</div>
          <div className="flex gap-4">
            <a className="hover:text-white transition" href="/privacy">Privacy</a>
            <a className="hover:text-white transition" href="/terms">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
