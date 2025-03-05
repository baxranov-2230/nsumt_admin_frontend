// import axios from "axios";
// // import { logout, refreshAccessToken } from "./AuthService/LoginApi";
// import { Toaster } from "react-hot-toast";
// import toast from "react-hot-toast";
//
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";
// export const API_URL = "http://127.0.0.1:8000/v1";
// const axiosInstance = axios.create({
//     baseURL: API_URL,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });
//
// export const isTokenExpired = (token) => {
//     if (!token) return true;
//     const decoded = jwtDecode(token);
//     const currentTime = Date.now() / 1000;
//     return decoded.exp < currentTime;
// };
//
// export const isTokenExpiredRefesh = (token) => {
//     if (!token) return true;
//     const decoded = jwtDecode(token);
//     const currentTime = Date.now() / 1000;
//     return decoded.exp < currentTime;
// };
//
// axiosInstance.interceptors.request.use(async (config) => {
//
//
//     const token = JSON.parse(localStorage.getItem("token"));
//     if (
//         token &&
//         token.access_token &&
//         !isTokenExpiredRefesh(token.refresh_token)
//     ) {
//         if (isTokenExpired(token.access_token)) {
//             const newAccessToken = await refreshAccessToken(token.refresh_token);
//             config.headers.Authorization = `Bearer ${newAccessToken}`;
//         } else {
//             config.headers.Authorization = `Bearer ${token.access_token}`;
//         }
//     } else {
//         toast.error("Token davri tugadi");
//         await logout();
//         window.location.href = "/login";
//         return config;
//     }
//
//     return config;
// }, Promise.reject);
//
// export default axiosInstance;
