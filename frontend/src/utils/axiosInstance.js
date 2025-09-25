import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://movies-website-bice.vercel.app", // حط هنا لينك الباك إند بتاعك
  withCredentials: true, // لو بتستخدم cookies / jwt
});

export default axiosInstance;
