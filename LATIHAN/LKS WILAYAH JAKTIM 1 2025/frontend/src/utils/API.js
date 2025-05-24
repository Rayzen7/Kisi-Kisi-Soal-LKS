import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:8000/api/v3'
});

export default API;