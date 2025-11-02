import React from "react";
import { useAuth } from "react-oidc-context";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const auth = useAuth();
  return auth.isAuthenticated ? (
    <Navigate to="/" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoutes;
