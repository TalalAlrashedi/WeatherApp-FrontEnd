import axiosInstance from "../utils/axiosInstance";

export const getWeather = (lat: string, lon: string) => {
  return axiosInstance.get(`/weather?lat=${lat}&lon=${lon}`);
};