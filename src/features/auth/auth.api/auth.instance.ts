import axios from "axios"
export const authInstance = axios.create({
  baseURL: "https://neko-back.herokuapp.com/2.0/" + "auth/",
  /*baseURL: import.meta.env.VITE_BASE_URL + "auth/",*/
  withCredentials: true,
})
