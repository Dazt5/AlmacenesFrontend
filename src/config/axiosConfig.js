import axios from "axios";

const HOST_PREFIX = 'http://localhost';

export const api = axios.create();

api.interceptors.request.use(request => {

    const token = localStorage.getItem("token");

    if (token) {
        request.headers.Authorization = `Bearer ${token}`
    }

    return request;
});


export const microservicesUri = {

    login: `${HOST_PREFIX}:8000/auth/login`,
    customers: `${HOST_PREFIX}:8001/customers/`,
    products: `${HOST_PREFIX}:8001/products/`,
    providers: `${HOST_PREFIX}:8001/providers/`,
    sales: `${HOST_PREFIX}:8002/sales/`,

}