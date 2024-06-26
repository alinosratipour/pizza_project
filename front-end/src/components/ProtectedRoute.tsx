import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "./Hooks/useAuth";

const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
