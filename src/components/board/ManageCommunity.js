import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import CommunityDetail from './CommunityDetail'
import CommunityTree from './CommunityTree'
import { axiosInstance } from 'components/authentication/apis/instance'

const ManageCommunity = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [data, setData] = useState([])
  const fetchData = async () => {
    try {
      const response = await axiosInstance.post(`/system/manage/tree`)
      const fetchedData = response.data.data

      // 데이터 변환
      const modData = fetchedData.map(item => ({
        icon: 'file',
        id: item.boardId,
        name: item.boardName,
        usecomment: item.isUseComment === 1,
        rud: item.userRud
      }))

      // 데이터 상태에 저장
      setData(modData)
      setSelectedItem(modData[0])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    console.log(selectedItem) // 업데이트된 값이 출력됨
  }, [selectedItem])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="p-2">
      <Row className="g-3 mb-3">
        <Col xl={4} lg={4} xs={12} md={4}>
          <CommunityTree
            setSelectedItem={setSelectedItem}
            data={data}
            selectedItem={selectedItem}
            updateTree={fetchData}
          />
          {/* <Treemap data={allOrdCount} height={400} /> */}
        </Col>
        <Col xl={8} lg={8} xs={12} md={8}>
          <CommunityDetail selectedItem={selectedItem} updateTree={fetchData} />
        </Col>
      </Row>
    </div>
  )
}

export default ManageCommunity
