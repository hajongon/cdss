import { authInstance } from './instance'

export const getTestData = async apiUrl => {
  try {
    const response = await authInstance.get(apiUrl)
    return { status: 'success', data: response.data }
  } catch (error) {
    console.error(error)
    return { status: 'fail', error }
  }
}
