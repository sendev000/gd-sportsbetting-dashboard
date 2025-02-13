import { create } from "zustand";
import { login, register, logout, isLoggedIn, getToken, getUserEmail } from "../services/auth";

/**
 * Authentication State Interface
 */
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userEmail: string | null;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

/**
 * Zustand Authentication Store with Persistent State
 */
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: isLoggedIn(),
  token: getToken(),
  userEmail: getUserEmail(),
  /**
   * Handle User Login
   */
  loginUser: async (email, password) => {
    try {
      await login(email, password);
      set({ isAuthenticated: true, token: getToken(), userEmail: getUserEmail() });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Handle User Registration
   */
  registerUser: async (email, password) => {
    try {
      await register(email, password);
    //   set({ isAuthenticated: true, token: getToken(), userEmail: getUserEmail() });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Handle User Logout
   */
  logoutUser: () => {
    logout();
    set({ isAuthenticated: false, token: null, userEmail: null });
  },
}));
