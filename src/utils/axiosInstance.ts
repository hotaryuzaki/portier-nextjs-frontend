import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', // Go backend URL
})

export default axiosInstance