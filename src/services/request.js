import axios from "./axios";

export function login(params) {
    return axios.post('/api/login', params)
}

export const getCategoryList = () => {
    return axios.get('/category/list');
}

export const getTagListByCategoryId = (categoryId) => {
  return axios.get(`/category/${categoryId}/tag-list`)
}

export const getArticleList = (payload) => {
  return axios.post(`/article/filter`, payload)
}