import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./services/auth";

export const withAuth = (WrappedComponent: JSX.Element) =>
  isLoggedIn() ? WrappedComponent : <Navigate to="/login" />;
