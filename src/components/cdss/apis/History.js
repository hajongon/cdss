import axios from 'axios'

export const getUrineTestData = async apiUrl => {
  try {
    const response = await axios.get(apiUrl)
    return { status: 'success', data: response.data }
  } catch (error) {
    console.error(error)
    return { status: 'fail', error }
  }
}

export const getSerumTestData = async apiUrl => {
  try {
    const response = await axios.get(apiUrl)
    return { status: 'success', data: response.data }
  } catch (error) {
    console.error(error)
    return { status: 'fail', error }
  }
}

export const getAntiSensRsltData = async apiUrl => {
  try {
    const response = await axios.get(apiUrl)
    return { status: 'success', data: response.data }
  } catch (error) {
    console.error(error)
    return { status: 'fail', error }
  }
}

export const getAdrData = async apiUrl => {
  try {
    const response = await axios.get(apiUrl)
    return { status: 'success', data: response.data }
  } catch (error) {
    console.error(error)
    return { status: 'fail', error }
  }
}
