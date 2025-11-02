import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { useAuth } from "react-oidc-context";

const App = () => {
  const auth = useAuth();

  if (auth.isLoading) return <div>Loading…</div>;
  if (auth.error) return <div>Auth error: {auth.error.message}</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            auth.isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            auth.isAuthenticated ? <Navigate to="/" replace /> : <Login />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
