import axios from "axios";

const BASE_URL: string = "http://localhost:3000";

const article = axios.create({
    baseURL: BASE_URL
});

export default article;