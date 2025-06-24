import axiosInstance from "../utils/axiosInstance";
type ApiResponse<T> = {
  data: T;
};

type AuthResponse = {
  token: string;
};

export const register = (email: string, password: string) => {
  return axiosInstance.post<ApiResponse<AuthResponse>>("/auth/signup", {
    email,
    password,
  });
};

export const login = (email: string, password: string) => {
  return axiosInstance.post<ApiResponse<AuthResponse>>("/auth/signin", {
    email,
    password,
  });
};

export const logout = () => {
  localStorage.removeItem("token");
};