import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import IndexPage from "./pages/indexPage";
// import LoginPage from "./pages/loginPage";
// import BuyPage from "./pages/buyPage";
// import ChangePasswordPage from "./pages/changePasswordPage";
// import HistoryPage from "./pages/historyPage";
// import "./index.css";
import App from "./App";
import { AuthProvider } from "./state/authState";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
  </AuthProvider>
  </React.StrictMode>
);
