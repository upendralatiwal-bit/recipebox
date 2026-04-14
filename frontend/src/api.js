import axios from "axios"

const API = axios.create({
  baseURL:"https://recipebox-0k0q.onrender.com/api"
})

export default API