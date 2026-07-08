import axios from "axios";

const API = "http://localhost:5000/api/password/";

export const getpassword = () => {
    return axios.get(API)
}
export const createpassword = (data) => {
    return axios.post(API, data)
}
export const deletepassword = (id) => {
    return axios.delete(`${API}/${id}`)
}
export const updatepassword = (id, data) => {
    return axios.put(`${API}/${id}`, data)
}