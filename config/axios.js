import axios from "axios";

const clientesAxios = axios.create({
    baseURL: 'http://localhost:4000'
})

export default clientesAxios;