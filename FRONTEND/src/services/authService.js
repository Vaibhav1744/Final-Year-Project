import api from "./api";

export const signup = (data) => api.post("/auth/signup", data);
export const login = (data) => api.post("/auth/login", data);
export const verifyEmail = (token) =>
  api.get(`/auth/verify?token=${token}`);
