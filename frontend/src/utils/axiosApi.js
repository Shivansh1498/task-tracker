import axios from "axios";
const API_ENDPOINT = import.meta.env.VITE_APP_API_ENDPOINT;

export default axios.create({
  baseURL: API_ENDPOINT,
});
