import PropTypes from 'prop-types'
import React, { useContext } from 'react'

import AppContext from 'context/Context'

import AntiSensrslt from './AntiSensrsltAfterAdm'

const SideChartBar = ({ isPatientSelected }) => {
  const {
    allOrdCount,
    ordCount,
    treemapDataRange,
    barChartEntireData,
    barChartPersonalData
  } = useContext(AppContext)

  return (
    <div className="py-0 overflow-auto scrollbar">
      <AntiSensrslt />

      {/* <Card className="course-filter overflow-hidden">
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
        </Card.Body>
      </Card> */}
    </div>
  )
}

// Add PropTypes validation
SideChartBar.propTypes = {
  isPatientSelected: PropTypes.bool.isRequired
}

export default SideChartBar
