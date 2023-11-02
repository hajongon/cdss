import React from 'react'
import SimpleBarReact from 'simplebar-react'
import { Card, Row } from 'react-bootstrap'
import BasicBarChart from './BasicBarChart'
import PackedBubble from './PackedBubble'
import ChartSample from './ChartSample'
import FalconCardHeader from './FalconCardHeader'

const SideChartBar = ({ showResult }) => {
  return (
    <Card className="course-filter overflow-hidden">
      <FalconCardHeader title="Charts" titleClass="fs-0 fw-semi-bold" />
      <Card.Body className="py-0 bg-white overflow-scroll">
        <Row className="mb-3">
          {!showResult ? (
            <BasicBarChart title="2023년 항생제 처방 순위" />
          ) : (
            <ChartSample />
          )}
        </Row>

        <Row className="mb-3">
          <PackedBubble />
        </Row>
      </Card.Body>
    </Card>
  )
}

export default SideChartBar
