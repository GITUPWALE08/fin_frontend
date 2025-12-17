import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL || "";
export const API = axios.create({
  baseURL: baseURL, 
  withCredentials: true, 
});

// Helpful wrapper functions
export const get = (url: string) => API.get(url).then(res => res.data);
export const post = (url: string, body?: any) =>
  API.post(url, body).then(res => res.data);

const baseURL = import.meta.env.VITE_API_URL || "";
export const API = axios.create({
  baseURL: baseURL, 
  withCredentials: true, 
});