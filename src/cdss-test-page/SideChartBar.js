import React from 'react'
import SimpleBarReact from 'simplebar-react'
import { Card, Row } from 'react-bootstrap'
import BasicBarChart from './BasicBarChart'
import PackedBubble from './PackedBubble'
import ChartSample from './ChartSample'

const SideChartBar = ({ showResult }) => {
  return (
    <Card className="course-filter bg-transparent border border-0 shadow-none">
      <SimpleBarReact style={{ height: '100%' }}>
        <Card.Body className="py-0">
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
      </SimpleBarReact>
    </Card>
  )
}

export default SideChartBar
