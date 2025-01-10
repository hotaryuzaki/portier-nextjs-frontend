import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', // Go backend URL
  timeout: 5000, // Set timeout to 5000 milliseconds (5 seconds)
})

export default axiosInstance