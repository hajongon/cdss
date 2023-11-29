// login
// sign up
// change pw
// find pw
import { saveAccessTokenToLocalStorage } from '../utils/accessTokenHandler'
import { authInstance, axiosInstance } from './instance'

export const logIn = async (apiUrl, userInfo) => {
  try {
    const response = await axiosInstance.post(apiUrl, userInfo)
    const { grantType, accessToken, refreshToken } = response.data.data
    const newAccessToken = `${grantType} ${accessToken}`
    console.log(response.data.data)
    saveAccessTokenToLocalStorage(newAccessToken)
    return response.data
  } catch (error) {
    console.error(error)
    return error
  }
}
