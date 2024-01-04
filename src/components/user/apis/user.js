import { axiosInstance, authInstance } from '../../authentication/apis/instance'

export const findPassword = async email => {
  try {
    const response = await axiosInstance.post(`/user/newpassword`, email, {
      timeout: 20000
    })
    if (response.data.state === 200) {
      return { status: 'success', data: response.data.message }
    }
    if (response) return {}
  } catch (error) {
    console.log(error)
    return { status: 'fail', data: error }
  }
}

export const getCurrentUserInfo = async () => {
  try {
    const response = await authInstance.get('/user/profile')
    return response.data
  } catch (error) {
    return null
  }
}

export const changeUserPassword = async (url, passwordData) => {
  try {
    await authInstance.patch(url, passwordData)
    return 'success'
  } catch (error) {
    console.log(error)
    return 'fail'
  }
}

export const changeUserNickname = async (url, nicknameData) => {
  try {
    await authInstance.patch(url, nicknameData)
    return 'success'
  } catch (error) {
    console.log(error)
    return 'fail'
  }
}

export const getUsersList = async () => {
  try {
    const response = await axiosInstance.get('/user/userslist')
    return { status: 'success', data: response.data }
  } catch (error) {
    return { status: 'fail', data: error }
  }
}
