import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  signup: (data) => api.post("/api/auth/signup", data),
  login: (data) => api.post("/api/auth/login", data),
};

export const fraudAPI = {
  reportFraud: (data) => api.post("/api/fraud/report", data),
  searchFraud: (params) => api.get("/api/fraud/search", { params }),
  getUserReports: () => api.get("/api/fraud/user/reports"),
  getAllReports: (params) => api.get("/api/fraud/all", { params }),
  verifyReport: (id, data) => api.put(`/api/fraud/verify/${id}`, data),
  deleteReport: (id) => api.delete(`/api/fraud/${id}`),
  getAnalytics: () => api.get("/api/fraud/analytics/data"),
};

export default api;
