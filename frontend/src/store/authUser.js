import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isAuthCheck: true,
  isLoggedIn: false,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Sign Up Failed");
      set({ isSigningUp: false, user: null });
    }
  },
  login: async (credentials) => {
    set({ isLoggedIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggedIn: false });
      toast.success("User Logged In");
    } catch (error) {
      set({ user: null, isLoggedIn: false });
      toast.error(error.response.data.message || "Logged In Failed");
    }
  },
  logout: async () => {
    set({ isLoggedOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggedOut: false });
      toast.success("Logged out Successfully");
    } catch (error) {
      set({ isLoggedOut: false });
      toast.error(error.response.data.message || "Logout Failed");
    }
  },
  authcheck: async () => {
    set({ isAuthCheck: true });
    try {
      const response = await axios.get("api/v1/auth/authcheck");
      set({ user: response.data.user, isAuthCheck: false });
    } catch (error) {
      set({ isAuthCheck: false, user: null });
      //   toast.error(error.response.data.message || "An error occurred");
    }
  },
}));
