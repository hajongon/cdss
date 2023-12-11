/* eslint-disable no-param-reassign */
import axios from 'axios'
import {
  getAccessTokenFromLocalStorage,
  saveAccessTokenToLocalStorage
} from '../utils/tokenHandler'

const instanceOptions = {
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
}

const setAccessTokenOnHeader = config => {
  config.headers.Authorization = getAccessTokenFromLocalStorage() || ''
  return config
}

function createAxiosInstance() {
  const instance = axios.create(instanceOptions)
  instance.interceptors.request.use(setAccessTokenOnHeader)
  return instance
}

function createFileAxiosInstance() {
  const instance = axios.create({
    ...instanceOptions,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  instance.interceptors.request.use(setAccessTokenOnHeader)
  return instance
}

function createAuthAxiosInstance() {
  const instance = axios.create(instanceOptions)
  instance.interceptors.request.use(setAccessTokenOnHeader)
  instance.interceptors.response.use(
    response => response,
    async error => {
      const { config, response } = error
      if (response.status === 401) {
        console.log('401 에러 잡힘')
        try {
          const currentAccessToken = getAccessTokenFromLocalStorage() || ''
          // const currentRefreshToken =
          //   getTokenFromLocalStorage('refreshToken') || ''
          const requestBody = JSON.stringify({
            accessToken: currentAccessToken.slice(7)
            // refreshToken: currentRefreshToken
          })
          const refreshRes = await axiosInstance.post(
            `/user/reissue`,
            requestBody
          )
          console.log('refresh 요청에 대한 응답:', refreshRes)
          if (refreshRes.data.success) {
            console.log(refreshRes.data)
            const { grantType, accessToken } = refreshRes.data
            const newAccessToken = `${grantType} ${accessToken}`
            saveAccessTokenToLocalStorage(newAccessToken)

            config.headers.Authorization = newAccessToken
            return await axios(config)
          }
        } catch (error) {
          console.log('refresh token error')
        }
      }
      return Promise.reject(error)
    }
  )
  return instance
}

const axiosInstance = createAxiosInstance()
const fileAxios = createFileAxiosInstance()
const authInstance = createAuthAxiosInstance()

export { axiosInstance, fileAxios, authInstance }
