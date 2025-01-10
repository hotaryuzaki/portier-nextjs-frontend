import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', // Go backend URL
  // timeout: 20000, // Set timeout to 20000 milliseconds
})

export default axiosInstance