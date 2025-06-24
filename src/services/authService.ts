import axiosInstance from "../utils/axiosInstance";

export const register = (email: string, password: string) => {
  return axiosInstance.post("/auth/signup", { email, password });
};

export const login = (email: string, password: string) => {
  return axiosInstance.post("/auth/signin", { email, password });
};

export const logout = () => {
  localStorage.removeItem("token");
};