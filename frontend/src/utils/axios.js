import axios from "axios";

const apiRequest = axios.create({
  baseURL: process.env.BACKEND_URL,
  withCredentials: true,
});

apiRequest.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)


export default apiRequest;
