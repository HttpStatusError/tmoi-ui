import axios from "./axios";

export const getCategoryList = () => {
    return axios.get('/category/list');
}

export const getTagListByCategoryId = (categoryId) => {
  return axios.get(`/category/${categoryId}/tag-list`)
}

export const getArticleList = (payload) => {
  return axios.post(`/article/filter`, payload)
}

export const getArticleHottest = () => {
  return axios.get(`/article/hottest`)
}