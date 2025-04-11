import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "/notes", // proxy handles the actual target (http://localhost:4000)
})

// Automatically attach token to every request if available
axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default axiosInstance
