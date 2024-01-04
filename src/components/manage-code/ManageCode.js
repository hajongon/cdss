import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import CodeDetail from './CodeDetail'
import CodeTree from './CodeTree'

const ManageCode = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  return (
    <div className="p-2">
      <Row className="g-3 mb-3">
        <Col xl={4} lg={4} xs={12} md={4}>
          <CodeTree setSelectedItem={setSelectedItem} />
          {/* <Treemap data={allOrdCount} height={400} /> */}
        </Col>
        <Col xl={8} lg={8} xs={12} md={8}>
          <CodeDetail selectedItem={selectedItem} />
        </Col>
      </Row>
    </div>
  )
}

export default ManageCode
