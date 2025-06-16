import axios, { AxiosError, AxiosResponse } from 'axios'

// On request rejected
const onRequestError = (axiosError: AxiosError) => {
  return axiosError
}

// On response fulfilled
const onResponseSuccess = (axiosResponse: AxiosResponse) => {
  return axiosResponse
}

// On response rejected
const onResponseError = (axiosError: AxiosError) => {
  console.log('onResponseError->>', axiosError)
  return Promise.reject(axiosError)
}

// create axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 20000,
})

// On request
axiosInstance.interceptors.request.use(
  async config => {
    return config
  },
  error => {
    return Promise.reject(onRequestError(error))
  }
)
// On response
axiosInstance.interceptors.response.use(
  async response => {
    return onResponseSuccess(response)
  },
  async error => {
    return onResponseError(error)
  }
)

export default axiosInstance
