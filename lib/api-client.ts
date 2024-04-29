import axios, { AxiosError } from "axios";

const client = axios.create({ baseURL: "/api/" });



export default client;
