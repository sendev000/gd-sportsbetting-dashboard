import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./store/authStore";
import { withAuth } from "./withAuth";
import "./index.css";

/**
 * Home Component - Redirects to login if not authenticated
 */
const Home = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <HomePage /> : <LoginPage />;
};

const AuthRedirect = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuthStore();
    return isAuthenticated ? <Navigate to="/" /> : children;
  };
  
const App: React.FC = () => {
return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<AuthRedirect><RegisterPage /></AuthRedirect>} />
    <Route path="/login" element={<AuthRedirect><LoginPage /></AuthRedirect>} />
    <Route path="/events" element={withAuth(<HomePage />)} />
    </Routes>
);
};

export default App;