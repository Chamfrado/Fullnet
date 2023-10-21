import axios from "axios";
import { getToken } from "./TokenService";


const SacfullnetAPI = axios.create({
	baseURL: "http://localhost:8080/",
});

SacfullnetAPI.interceptors.request.use(async config => {
    const token = getToken();
    console.log(`Bearer ${token}`);
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
});





export default SacfullnetAPI;