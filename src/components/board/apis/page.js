import { axiosInstance } from '../../authentication/apis/instance'

export const getBoard = async id => {
  try {
    const requestData = {
      boardId: id
    }

    const response = await axiosInstance.post(`/board/manage/get`, requestData)

    return { status: 'success', data: response.data.data }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { status: 'fail', error }
  }
}

export const getTree = async () => {
  try {
    const response = await axiosInstance.post(`/board/manage/tree`)
    const fetchedTree = response.data.data

    return { status: 'success', data: fetchedTree }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { status: 'fail', error }
  }
}

export const deleteTree = async id => {
  try {
    const requestData = {
      boardId: id
    }

    await axiosInstance.post(`/board/manage/delete`, requestData)
    return { status: 'success' }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { status: 'fail', error }
  }
}

export const addBoard = async requestData => {
  try {
    await axiosInstance.post(`/board/manage/save`, requestData)

    return { status: 'success' }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { status: 'fail', error }
  }
}

export const getArticles = async id => {
  try {
    const requestData = {
      boardId: id
    }

    const url = '/board/${id}/list'

    const response = await axiosInstance.post(url, requestData)

    return { status: 'success', data: response.data.data }
  } catch (error) {
    console.error('Error fetching data:', error)

    return { status: 'fail', error }
  }
}

export function selectCode(codes) {
  let systemCodes = {}

  let eachCodes = []
  let cdGroup = codes[0].cdGroup

  for (const code of codes) {
    if (cdGroup !== code.cdGroup) {
      systemCodes[cdGroup] = eachCodes
      eachCodes = []
    }

    cdGroup = code.cdGroup
    eachCodes.push(code)
  }

  if (eachCodes.length > 0) {
    systemCodes[cdGroup] = eachCodes
  }

  return systemCodes
}

export const getCodeALL = async () => {
  try {
    const response = await axiosInstance.post(`/system/code/list`)
    const codes = response.data.data

    return { status: 'success', data: codes }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { status: 'fail', error }
  }
}

export default [
  getCodeALL,
  getBoard,
  getArticles,
  selectCode,
  getTree,
  addBoard
]
