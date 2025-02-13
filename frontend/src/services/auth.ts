import decode from "jwt-decode";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_WEB_SERVER_URL;
const tokenKey = "authToken";

/**
 * Store token in localStorage securely.
 */
const setToken = (token: string) => {
  localStorage.setItem(tokenKey, token);
};

/**
 * Retrieve the stored token.
 */
const getToken = (): string | null => {
  return localStorage.getItem(tokenKey);
};

/**
 * Remove token (logout).
 */
const logout = () => {
  localStorage.removeItem(tokenKey);
  toast.success("Logged out successfully!");
};

/**
 * Check if the user is logged in.
 */
const isLoggedIn = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
    const { exp } = decode<{ exp: number }>(token);
    if (exp < Date.now() / 1000) {
      logout();
      return false;
    }
    return true;
  } catch (error) {
    logout();
    return false;
  }
};

/**
 * Get user email from token.
 */
const getUserEmail = (): string => {
  const token = getToken();
  if (!token) return "";
  
  try {
    const { email } = decode<{ email: string }>(token);
    return email;
  } catch (error) {
    return "";
  }
};

/**
 * Login API call.
 */
const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    if (!data?.token) {
      throw new Error("Invalid response from server.");
    }

    setToken(data.token);
    toast.success("Login successful!");
  } catch (error: any) {
   
    toast.error(error.message || "An error occurred during login.");
    throw error;
  }
};

/**
 * Register API call.
 */
const register = async (email: string, password: string) => {
  try {
    const response = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    toast.success("Registration successful! You can now log in.");
  } catch (error: any) {
    toast.error(error.message || "An error occurred during registration.");
    throw error;
  }
};

export { login, register, logout, getToken, getUserEmail, isLoggedIn };
