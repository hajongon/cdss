// login
// sign up
// change pw
// find pw
import {
  getAccessTokenFromLocalStorage,
  removeAccessTokenFromLocalStorage,
  saveAccessTokenToLocalStorage
} from '../utils/tokenHandler'
import { axiosInstance } from './instance'

export const logIn = async (apiUrl, userInfo) => {
  try {
    const response = await axiosInstance.post(apiUrl, userInfo)
    if (response.data.success) {
      const { grantType, accessToken } = response.data
      const newAccessToken = `${grantType} ${accessToken}`
      saveAccessTokenToLocalStorage(newAccessToken)
      return { status: response.status, data: response.data.message }
    }
  } catch (error) {
    return { status: error.response.status, data: error.response.data }
  }
}

export const logOut = async () => {
  const currentAccessToken = getAccessTokenFromLocalStorage() || ''
  // const currentRefreshToken = getTokenFromLocalStorage('refreshToken') || ''
  const requestBody = JSON.stringify({
    accessToken: currentAccessToken.slice(7)
    // refreshToken: currentRefreshToken
  })

  try {
    const response = await axiosInstance.post('/user/logout', requestBody)
    if (response.data.state === 400) {
      return { status: 'fail', data: '' }
    }
    if (response.data.state === 200) {
      removeAccessTokenFromLocalStorage()
      // removeTokenFromLocalStorage('refreshToken')
      return { status: 'success', data: '로그아웃' }
    }
  } catch (error) {
    removeAccessTokenFromLocalStorage()
    return { status: 'fail', data: error }
  }
  // removeTokenFromLocalStorage('accessToken')
  // removeTokenFromLocalStorage('refreshToken')
}

export const checkAutoLogin = async () => {
  const currentAccessToken = getAccessTokenFromLocalStorage() || ''
  const requestBody = JSON.stringify({
    accessToken: currentAccessToken.slice(7)
  })
  try {
    const response = await axiosInstance.post(`/user/reissue`, requestBody)
    if (response.data.state === 200) {
      return { status: 'success', data: response.data }
    }
  } catch (error) {
    console.error(error)
    return { status: 'fail', data: error }
  }
}
