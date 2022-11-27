import axios from "./axios";

export function login(params) {
    return axios.post('/api/login', params)
}

export const getCategoryList = async () => {
    return axios.get('/category/list');
}
