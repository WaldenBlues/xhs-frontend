import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://192.168.42.210:8080", // 替换为你的后端API地址
});

apiClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${window.localStorage.getItem(
      "Authorization"
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // 如果未授权，清除本地存储的token并重定向到登录页
      window.localStorage.removeItem("Authorization");
      window.location.href = "/login"; // 重定向到登录页
    }
    return Promise.reject(error);
  }
);

export default apiClient;
