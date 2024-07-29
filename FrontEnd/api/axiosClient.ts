import axios from "axios";
const baseURL = "http://localhost:5278/api/v1";

//json
export const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosClient.interceptors.request.use((config) => {
//   const jwt = getLocalToken().jwt;
//   if (jwt) {
//     config.headers.Authorization = `Bearer ${jwt}`;
//   }
//   return config;
// });
