//import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import IndexPage from "./pages/indexPage";
import LoginPage from "./pages/loginPage";
import BuyPage from "./pages/buyPage";
import SellPage from './pages/sellPage';
import ChangePasswordPage from "./pages/changePasswordPage";
import HistoryPage from "./pages/historyPage";
import Portfolio from "./pages/portfolioPage";
import Quote from './pages/quotePage';
import ProtectedRoute from "./components/protectedRoutes";
import "./index.css";
import Register from './pages/registerPage';
import { useAuth } from "./state/authState";

function App() {
//   const [count, setCount] = useState(0)
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen"
      style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
                <Route path="/signin" element={!user ? <LoginPage /> : <Navigate to="/" />} />
                <Route path="/signup" element={!user ? <Register /> : <Navigate to="/" />} />
                
                {/* Optional: If IndexPage is just a landing page for logged-out users */}
                <Route path="/welcome" element={<IndexPage />} />
        
        
                {/* --- PROTECTED ROUTES --- */}
                {/* 2. GROUP ALL PRIVATE ROUTES */}
                {/* This assumes your ProtectedRoute component renders {children} */}
                
                <Route path="/" element={
                  <ProtectedRoute>
                    <Portfolio />
                  </ProtectedRoute>
                } />
        
                <Route path="/buy" element={
                  <ProtectedRoute>
                    <BuyPage />
                  </ProtectedRoute>
                } />
        
                <Route path="/sell" element={
                  <ProtectedRoute>
                    {/* You need a SellPage component here eventually */}
                    <SellPage /> 
                  </ProtectedRoute>
                } />
        
                <Route path="/transactions" element={
                  <ProtectedRoute>
                    <HistoryPage />
                  </ProtectedRoute>
                } />
        
                <Route path="/quote" element={
                  <ProtectedRoute>
                    <Quote />
                  </ProtectedRoute>
                } />
        
                <Route path="/change_password" element={
                  <ProtectedRoute>
                    <ChangePasswordPage />
                  </ProtectedRoute>
                } />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
