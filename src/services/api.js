import axios from "axios";

const API = axios.create({
  baseURL: "https://be00.onrender.com/api",
});

export default API;