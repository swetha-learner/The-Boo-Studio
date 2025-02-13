import axios from "axios"
 
//axios.create() --> takes obejct
//create Instance use it throughout the app
// baseURL --> url can b used based on production / development
export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "developement" ? "http://localhost:3000/api" : "/api",
    withCredentials: true, //true --> helps sending cookies for every req
    credentials: 'include'
})


  

// troubleshoot : localhost --> changed to local IPv4 address...