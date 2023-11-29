import React, { useContext } from 'react'
import { Card, Row } from 'react-bootstrap'
import FalconCardHeader from './utils/FalconCardHeader'
import './PatientSymptom.css'
import AppContext from 'context/Context'
import './TestResult.css'
import TestResultsDataTable from './TestResultsDataTable'

const TestResults = () => {
  const { noDataError, urineData, serumData, periphData } =
    useContext(AppContext)

  return (
    <Card className="h-100 fs--1">
      <FalconCardHeader
        title="검사정보"
        titleClass="fs-0 fw-bold"
        // endEl={<SpcnameCheckbox handleCheckboxChange={handleCheckboxChange} />}
      />
      <Card.Body
        className="bg-white"
        style={
          {
            // overflow: 'hidden',
            // height: window.innerWidth >= 576 ? '41.5dvh' : '40rem'
          }
        }
      >
        <Row className="g-3 p-2">
          <TestResultsDataTable
            title="자동화학면역검사"
            data={serumData}
            hasNoDataError={noDataError.serum}
          />
          <TestResultsDataTable
            title="말초혈액검사"
            data={periphData}
            hasNoDataError={noDataError.periph}
          />
          <TestResultsDataTable
            title="통상뇨검사"
            data={urineData}
            hasNoDataError={noDataError.urine}
          />
        </Row>
      </Card.Body>
    </Card>
  )
}

// SpcnameCheckbox.propTypes = {
//   handleCheckboxChange: PropTypes.func
// }

export default TestResults
