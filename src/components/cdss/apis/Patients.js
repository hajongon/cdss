import { authInstance } from '../../authentication/apis/instance'

export const getPatientsInfo = async () => {
  try {
    const response = await authInstance.get(`/cdss/patients`)
    return { status: 'success', data: response.data }
  } catch (error) {
    console.error(error)
    return { status: 'fail', error }
  }
}
