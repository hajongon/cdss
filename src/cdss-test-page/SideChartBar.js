import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { Card, Row } from 'react-bootstrap'
import BasicBarChart from './BasicBarChart'
import FalconCardHeader from './FalconCardHeader'
import Treemap from './Treemap'
import AppContext from 'context/Context'
import Prescription from './Prescription'

const SideChartBar = ({ isPatientSelected }) => {
  const {
    allOrdCount,
    ordCount,
    treemapDataRange,
    barChartEntireData,
    barChartPersonalData
  } = useContext(AppContext)

  return (
    <Card className="course-filter overflow-hidden">
      <FalconCardHeader title="Charts" titleClass="fs-0 fw-semi-bold" />
      <Card.Body className="py-0 bg-white overflow-auto scrollbar">
        <Row className="mb-3">
          {isPatientSelected ? (
            <BasicBarChart
              title="항생제 처방 이력"
              chartData={barChartPersonalData}
            />
          ) : (
            <BasicBarChart
              title="전체 환자 항생제 처방 이력"
              chartData={barChartEntireData}
            />
          )}
        </Row>

        {isPatientSelected ? (
          <Row className="mb-3">
            <Prescription />
          </Row>
        ) : null}
        <Row className="mb-3">
          {treemapDataRange === 'entire' ? (
            <Treemap data={allOrdCount} height={400} />
          ) : (
            <Treemap data={ordCount} height={200} width={420} />
          )}
        </Row>
        {/* <Row className="mb-3">
          <PackedBubble />
        </Row> */}
      </Card.Body>
    </Card>
  )
}

// Add PropTypes validation
SideChartBar.propTypes = {
  isPatientSelected: PropTypes.bool.isRequired
}

export default SideChartBar
