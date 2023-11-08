import React, { useContext } from 'react'
import { Card, Row } from 'react-bootstrap'
import BasicBarChart from './BasicBarChart'
import PackedBubble from './PackedBubble'
import FalconCardHeader from './FalconCardHeader'
import Treemap from './Treemap'
import AppContext from 'context/Context'

const SideChartBar = () => {
  const { allOrdCount, ordCount, treemapDataRange } = useContext(AppContext)

  return (
    <Card className="course-filter overflow-hidden">
      <FalconCardHeader title="Charts" titleClass="fs-0 fw-semi-bold" />
      <Card.Body className="py-0 bg-white overflow-scroll">
        <Row className="mb-3">
          {treemapDataRange === 'entire' ? (
            <Treemap data={allOrdCount} height={400} />
          ) : (
            <Treemap data={ordCount} height={200} width={420} />
          )}
        </Row>
        <Row className="mb-3">
          <BasicBarChart title="2023년 항생제 처방 순위" />
        </Row>

        <Row className="mb-3">
          <PackedBubble />
        </Row>
      </Card.Body>
    </Card>
  )
}

export default SideChartBar
