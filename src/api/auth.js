import { fetchApi } from "../helpers/fetchApi";

export const obtainToken = (login, password) => fetchApi("token/obtain", {
    method: "POST",
    body: JSON.stringify({ login, password })
});