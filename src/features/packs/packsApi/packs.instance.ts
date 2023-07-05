import axios from "axios"
export const packsInstance = axios.create({
  baseURL: "https://neko-back.herokuapp.com/2.0/" + "cards/",
  /*baseURL: import.meta.env.VITE_BASE_URL + "auth/",*/
  withCredentials: true,
})
