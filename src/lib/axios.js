import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

/*
|--------------------------------------------------------------------------
| NProgress
|--------------------------------------------------------------------------
*/

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

/*
|--------------------------------------------------------------------------
| API URL
|--------------------------------------------------------------------------
*/

const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://bytecode-server-6h8p.onrender.com/api/v1"
    : "http://localhost:5001/api/v1");

/*
|--------------------------------------------------------------------------
| Axios instance
|--------------------------------------------------------------------------
*/

const api = axios.create({
  baseURL: API_URL,

  /*
  | Important:
  | Allows the browser to send the HttpOnly
  | client/admin session cookies.
  */
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 15000,
});

/*
|--------------------------------------------------------------------------
| Request interceptor
|--------------------------------------------------------------------------
*/

api.interceptors.request.use(
  (config) => {
    NProgress.start();

    return config;
  },
  (error) => {
    NProgress.done();

    return Promise.reject(error);
  },
);

/*
|--------------------------------------------------------------------------
| Response interceptor
|--------------------------------------------------------------------------
*/

api.interceptors.response.use(
  (response) => {
    NProgress.done();

    return response;
  },

  (error) => {
    NProgress.done();

    /*
    | Normalize the API error so components
    | can consistently access:
    |
    | error.response.data.message
    | error.response.data.code
    */

    if (error.response) {
      console.error("API Error", {
        status: error.response.status,
        method: error.config?.method?.toUpperCase(),
        url: error.config?.url,
        message: error.response.data?.message || "Request failed.",
        code: error.response.data?.code,
      });
    } else if (error.request) {
      console.error("API Network Error:", error.message);
    } else {
      console.error("API Request Error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
