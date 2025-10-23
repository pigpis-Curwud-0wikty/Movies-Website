import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'), // Get token from localStorage
  isSigningUp: false,
  isAuthCheck: true,
  isLoggedIn: false,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials, {
        withCredentials: true,
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token); // Store token in localStorage
      set({ user, token, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Sign Up Failed");
      set({ isSigningUp: false, user: null, token: null });
    }
  },

  login: async (credentials) => {
    set({ isLoggedIn: true });
    try {
      console.log("Attempting login with credentials:", credentials);
      const response = await axios.post("/api/v1/auth/login", credentials, {
        withCredentials: true, // 👈 أضفها هنا
      });
      console.log("Login successful, response:", response.data);
      console.log("Response headers:", response.headers);
      
      const { token, user } = response.data;
      localStorage.setItem('token', token); // Store token in localStorage
      console.log("Token stored in localStorage:", token);
      
      set({ user, token, isLoggedIn: false });
      toast.success("User Logged In");
    } catch (error) {
      console.error("Login failed:", error);
      console.error("Error response:", error.response?.data);
      set({ user: null, token: null, isLoggedIn: false });
      toast.error(error.response?.data?.message || "Logged In Failed");
    }
  },

  logout: async () => {
    set({ isLoggedOut: true });
    try {
      await axios.post("/api/v1/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem('token'); // Remove token from localStorage
      set({ user: null, token: null, isLoggedOut: false });
      toast.success("Logged out Successfully");
    } catch (error) {
      set({ isLoggedOut: false });
      toast.error(error.response?.data?.message || "Logout Failed");
    }
  },

  authcheck: async () => {
    set({ isAuthCheck: true });
    try {
      const response = await axios.get("/api/v1/auth/authcheck", {
        withCredentials: true,
      });
      set({ user: response.data.user, isAuthCheck: false });
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem('token'); // Remove invalid token
      set({ isAuthCheck: false, user: null, token: null });
      //   toast.error(error.response.data.message || "An error occurred");
    }
  },
}));
