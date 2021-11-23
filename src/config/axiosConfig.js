import axios from "axios";

const LOCAL_PREFIX = 'http://localhost';

export const api = axios.create();

api.interceptors.request.use(request => {

    const token = localStorage.getItem("token");

    if (token) {
        request.headers.Authorization = `Bearer ${token}`
    }

    return request;
});


export const microservicesUri = {

    login: `${LOCAL_PREFIX}:8000/auth/login`,
    products: `${LOCAL_PREFIX}:8002/products/`,

}