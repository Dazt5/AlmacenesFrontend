import axios from "axios";

const AUTHENTICATION_URI = 'http://localhost:8000';

export const api = axios.create({
    baseURL: AUTHENTICATION_URI
});