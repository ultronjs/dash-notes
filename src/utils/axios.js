import axios from 'axios'
export const publicInstance = axios.create({
  baseURL: '/api/',
  timeout: 1000,
  headers: {'Accept': '*/*'}
});

export const privateInstance = axios.create({
  baseURL: "/api/",
  timeout: 1000,
  headers: { Accept: "*/*", authorization: localStorage.getItem("token") },
});

