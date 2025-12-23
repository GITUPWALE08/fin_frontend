import { useState } from "react";
import type { PropsWithChildren } from "react";
import { useAuth } from "../state/authState";
import QuoteModal from "../components/quoteModalPage";
import { Link } from "react-router-dom";

export default function Layout({ children }: PropsWithChildren<{}>) {
  const { user, logout } = useAuth();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  
  // 1. New State for Mobile Menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    // Note: 'bg-linear-to-b00' looks like a typo, assuming 'bg-gradient-to-b' or custom class
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 backdrop-blur-sm bg-black/30 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-r from-indigo-500 to-sky-400 flex items-center justify-center text-xl font-bold">
              E
            </div>
            <div>
              <div className="text-lg font-semibold">ESDAN</div>
              <div className="text-xs text-slate-400 -mt-0.5">Empowering Nigeria's Future</div>
            </div>
          </div>

          {/* 2. Desktop Navigation (Hidden on Mobile) */}
          <nav className="hidden md:flex items-center gap-4">
            <Link className="text-slate-300 hover:text-white transition" to={user ? "/" : "/welcome"}>Home</Link>
            <Link className="text-slate-300 hover:text-white transition" to="/about">About</Link>
            <Link className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-medium hover:bg-indigo-500 transition" to="/signin">
              {user ? user.username : "sign in"}
            </Link>
            
            <button 
                onClick={() => setIsQuoteOpen(true)}
                className="text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg transition border border-slate-700"
              >
                Get Quote
            </button>
            <Link className="text-slate-300 hover:text-white transition" to="/transactions">history</Link>
  
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

          {/* 3. Mobile Hamburger Button (Visible ONLY on Mobile) */}
          <button 
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              // X Icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* 4. Mobile Menu Dropdown (Shows when state is true) */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-900/95 backdrop-blur-xl">
            <nav className="flex flex-col px-4 py-4 space-y-4">
              <Link 
                className="text-slate-300 hover:text-white transition block" 
                to={user ? "/" : "/welcome"}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
              >
                Home
              </Link>
              <Link 
                className="text-slate-300 hover:text-white transition block" 
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                className="text-slate-300 hover:text-white transition block" 
                to="/transactions"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                History
              </Link>

              <button 
                onClick={() => {
                  setIsQuoteOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left text-slate-300 hover:text-white transition"
              >
                Get Quote
              </button>

              <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
                 {user ? (
                    <>
                      <span className="text-slate-400 text-sm">Signed in as {user.username}</span>
                      <button
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium hover:bg-indigo-500 transition text-white w-full"
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Sign Out
                      </button>
                    </>
                 ) : (
                    <div className="flex gap-3">
                       <Link
                        to="/signin"
                        className="flex-1 text-center rounded-md border border-slate-700 px-3 py-2 text-sm font-medium hover:bg-slate-800 transition text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className="flex-1 text-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium hover:bg-indigo-500 transition text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </div>
                 )}
              </div>
            </nav>
          </div>
        )}
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