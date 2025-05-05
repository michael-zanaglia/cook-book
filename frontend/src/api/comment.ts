import axios from "axios";

const BASE_URL: string = "http://localhost:3000";

const comment = axios.create({
    baseURL: BASE_URL
});

export default comment;