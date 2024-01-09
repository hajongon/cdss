import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import CommunityDetail from './CommunityDetail'
import CommunityTree from './CommunityTree'
import { getTree } from './apis/page'

const ManageCommunity = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  console.log('변경 후:', selectedItem)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchTreeInfo = async () => {
      const fetchedTree = await getTree()
      const fetchedTreeData = fetchedTree.data
      // 데이터 변환
      const modData = fetchedTreeData.map(item => ({
        icon: 'file',
        id: item.boardId,
        name: item.boardName,
        usecomment: item.isUseComment === 1,
        rud: item.userRud
      }))
      if (fetchedTree.status === 'success') {
        setData(modData)
        setSelectedItem(modData[0])
      } else {
        console.log(fetchedTree.error)
      }
    }
    fetchTreeInfo()
  }, [])

  useEffect(() => {
    // console.log(selectedItem) // 업데이트된 값이 출력됨
  }, [selectedItem])

  return (
    <div className="p-2">
      <Row className="g-3 mb-3">
        <Col xl={4} lg={4} xs={12} md={4}>
          <CommunityTree
            setSelectedItem={setSelectedItem}
            data={data}
            selectedItem={selectedItem}
            setData={setData}
          />
          {/* <Treemap data={allOrdCount} height={400} /> */}
        </Col>
        <Col xl={8} lg={8} xs={12} md={8}>
          <CommunityDetail selectedItem={selectedItem} setData={setData} />
        </Col>
      </Row>
    </div>
  )
}

export default ManageCommunity
