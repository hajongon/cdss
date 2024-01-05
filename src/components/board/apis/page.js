import { axiosInstance } from '../../authentication/apis/instance'

export const getBoard = async (id) => {
    try {
        const requestData = {
            "boardId" : id,
          }
        const response = await axiosInstance.post(`/system/manage/get`, requestData)

    return { status: 'success', data: response.data.data }
    } catch (error) {
        console.error('Error fetching data:', error)
        return { status: 'fail', error }
    }
}

export function selectCode(codes) {
    let systemCodes = {};
    
    let eachCodes = [];
    let cdGroup = codes[0].cdGroup;
  
    for (const code of codes) {
      if (cdGroup !== code.cdGroup) {
        systemCodes[cdGroup] = eachCodes;
        eachCodes = [];
      }
  
      cdGroup = code.cdGroup;
      eachCodes.push(code);
    }
  
    if (eachCodes.length > 0) {
      systemCodes[cdGroup] = eachCodes;
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

export default [getCodeALL]