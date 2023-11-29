import axios from 'axios'
import { authInstance, axiosInstance } from './instance'
import {
  removeAccessTokenFromLocalStorage,
  saveAccessTokenToLocalStorage
} from '../utils/accessTokenHandler'

export const getTestData = async apiUrl => {
  try {
    const response = await axiosInstance.get(apiUrl)
    return { status: 'success', data: response.data }
  } catch (error) {
    console.error(error)
    return { status: 'fail', error }
  }
}

export const getAntiSensRsltData = async apiUrl => {
  try {
    const response = await axiosInstance.get(apiUrl)
    return { status: 'success', data: response.data }
  } catch (error) {
    console.error(error)
    return { status: 'fail', error }
  }
}

export const getAdrData = async apiUrl => {
  try {
    const response = await axiosInstance.get(apiUrl)
    return { status: 'success', data: response.data }
  } catch (error) {
    console.error(error)
    return { status: 'fail', error }
  }
}
