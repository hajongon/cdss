import { axiosInstance } from 'components/authentication/apis/instance'
import { useContext } from 'react'
import AppContext from 'context/Context'

const communityMaps = () => {
  const { setComNavData } = useContext(AppContext)

  const fetchComNavData = async () => {
    try {
      const response = await axiosInstance.post(`/system/manage/tree`)
      const fetchedData = response.data.data

      // 데이터 변환
      const modData = fetchedData.map(item => ({
        name: item.boardName,
        icon: 'rocket',
        to: '/board/main/' + item.boardId,
        active: true
      }))

      setComNavData(modData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return {
    fetchComNavData
  }
}

export default communityMaps
