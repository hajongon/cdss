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
    const url = '/board/' + id + '/list'

    const response = await axiosInstance.post(url)

    return { status: 'success', data: response.data.data }
  } catch (error) {
    console.error('Error fetching data:', error)

    return { status: 'fail', error }
  }
}

export const addArticles = async requestData => {
  try {
    await axiosInstance.post(`/board/article`, requestData)

    return { status: 'success' }
  } catch (error) {
    console.error('Error fetching data:', error)

    return { status: 'fail', error }
  }
}

export const getArticle = async (id, idx) => {
  try {
    const requestData = {
      boardId: id,
      articleIdx: idx
    }

    const response = await axiosInstance.post(`/board/article/get`, requestData)

    return { status: 'success', data: response.data.data }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { status: 'fail', error }
  }
}

export const deleteArticle = async idx => {
  try {
    const requestData = {
      articleIdx: idx
    }

    await axiosInstance.post(`/board/article/delete`, requestData)
    return { status: 'success' }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { status: 'fail', error }
  }
}

export const getComments = async idx => {
  try {
    const requestData = {
      articleIdx: idx
    }

    const response = await axiosInstance.post('/board/comments', requestData)

    return { status: 'success', data: response.data.data }
  } catch (error) {
    console.error('Error fetching data:', error)

    return { status: 'fail', error }
  }
}

export const addComment = async requestData => {
  try {
    await axiosInstance.post(`/board/comment`, requestData)

    return { status: 'success' }
  } catch (error) {
    console.error('Error adding comment:', error)

    return { status: 'fail', error }
  }
}

export const getComment = async (id, idx) => {
  try {
    const requestData = {
      boardId: id,
      commentIdx: idx
    }

    const response = await axiosInstance.post(`/board/comment/get`, requestData)

    return { status: 'success', data: response.data.data }
  } catch (error) {
    console.error('Error fetching comment:', error)
    return { status: 'fail', error }
  }
}

export const deleteComment = async idx => {
  try {
    const requestData = {
      commentIdx: idx
    }

    await axiosInstance.post(`/board/comment/delete`, requestData)
    return { status: 'success' }
  } catch (error) {
    console.error('Error deleting comment:', error)
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

export const uploadImage = async formData => {
  try {
    const res = await axiosInstance.post(
      `/board/service/uploadImage`,
      formData,
      {
        headers: { 'content-type': 'multipart/form-data' }
      }
    )
    const url = res.data

    return { status: 'success', data: url }
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
