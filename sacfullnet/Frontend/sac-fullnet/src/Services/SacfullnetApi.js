import axios from "axios";


const SacfullnetAPI = axios.create({
	baseURL: "http://localhost:8080/",
});


export default SacfullnetAPI;