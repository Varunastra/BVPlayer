import { fetchApi } from "../helpers/fetchApi";

export const getUserProfile = (id) => fetchApi(`users/${id}`);

export const addUser = (user) => fetchApi("users", {
    method: "POST",
    body: JSON.stringify(user)
});