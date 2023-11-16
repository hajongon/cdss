import axios from 'axios'

export const getPatientsInfo = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/patients`
    )
    return { status: 'success', data: response.data }
  } catch (error) {
    console.error(error)
    return { status: 'fail', error }
  }
}
