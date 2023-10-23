import axios from "axios";
import { getToken } from "./TokenService";


const SacfullnetAPI = axios.create({
  headers: {'Access-Control-Allow-Origin': '*'}
});

SacfullnetAPI.interceptors.request.use(async config => {
    const token = getToken();
    if (token != null) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config
});





export default SacfullnetAPI;