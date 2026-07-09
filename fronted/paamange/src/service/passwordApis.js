import axios from "axios";

const API = "https://manager-4pee.onrender.com";

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
