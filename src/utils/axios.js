import axios from 'axios'
export const publicInstance = axios.create({
  baseURL: '/api/',
  timeout: 1000,
  headers: {'Accept': '*/*'}
});
publicInstance.interceptors.request.use(request => {
  console.log("request",request)
  return request
})
publicInstance.interceptors.response.use((response) => {
  console.log("response", response);
  return response;
});

export const privateInstance = axios.create({
  baseURL: "/api/",
  timeout: 1000,
  headers: { Accept: "*/*", authorization: localStorage.getItem("token") },
});
privateInstance.interceptors.request.use((request) => {
  console.log("request", request);
  return request;
});
privateInstance.interceptors.response.use((response) => {
  console.log("response", response);
  return response;
});
