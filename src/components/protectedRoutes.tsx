import { Navigate } from "react-router-dom";
import { useAuth } from "../state/authState";
import type { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();

  if (!user?.id) return <Navigate to="/signin" replace />;

  return children;
}
