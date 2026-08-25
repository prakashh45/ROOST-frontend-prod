import axios from "axios";

const client = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://13.51.13.251:5000/api/v1",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("roost_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("roost_token");
      localStorage.removeItem("roost_user");
    }

    return Promise.reject(error);
  }
);

export default client;