import axios from 'axios';

export const appAxios = axios.create({
    baseURL : "http://localhost:8080",
    headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
});