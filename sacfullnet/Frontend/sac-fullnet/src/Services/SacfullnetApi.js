import axios from "axios";
import { getToken } from "./TokenService";


const SacfullnetAPI = axios.create({
  headers: {'Access-Control-Allow-Origin': '*'}
});

SacfullnetAPI.interceptors.request.use(async config => {
    const token = getToken();
    console.log(`Bearer ${token}`);
    console.log("AAAAAAAAAH:"+ token);
    if (token.length >0) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
});





export default SacfullnetAPI;