import axios, { AxiosInstance } from "axios";

const APP_API: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}`,
//   withCredentials: true,
  timeout: 10000, //in 10 secs
});


export default APP_API;