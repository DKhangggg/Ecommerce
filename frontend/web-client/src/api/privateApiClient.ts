import axios, {type InternalAxiosRequestConfig} from "axios";

export const PrivateApiClient=axios.create(
    {
        baseURL: 'http://localhost:8080/api',
        headers: {
            'Content-Type': 'application/json',
        },
    }
)

PrivateApiClient.interceptors.request.use(
    (config:InternalAxiosRequestConfig)=>{
        const token = localStorage.getItem("accessToken");
        if(token){
            config.headers.Authorization=`Bear${token}`;
        } else{
            console.error("Token not found!");
            return Promise.reject(new Error("Token not found"));
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
);

export default PrivateApiClient;