import React, { useContext } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import FalconCardHeader from './utils/FalconCardHeader'
import './PatientSymptom.css'
import { Table } from 'react-bootstrap'
import AppContext from 'context/Context'
import { formatDate } from './utils/timeDateFunction'
import './TestResult.css'

// const SpcnameCheckbox = ({ handleCheckboxChange }) => {
//   const [urineChecked, setUrineChecked] = useState(true)
//   const [serumChecked, setSerumChecked] = useState(true)

//   useEffect(() => {
//     // 최초 렌더링 시 체크박스 상태를 true로 설정
//     setUrineChecked(true)
//     setSerumChecked(true)
//   }, [])

//   const handleUrineChange = e => {
//     const isChecked = e.target.checked
//     setUrineChecked(isChecked)
//     handleCheckboxChange({ urineChecked: isChecked, serumChecked })
//   }

//   const handleSerumChange = e => {
//     const isChecked = e.target.checked
//     setSerumChecked(isChecked)
//     handleCheckboxChange({ urineChecked, serumChecked: isChecked })
//   }

//   return (
//     <Flex direction="row" className="gap-4" alignItems="center">
//       <Form.Check
//         className="custom-label"
//         inline
//         type="checkbox"
//         id="urine"
//         label="R.Urine"
//         onChange={handleUrineChange}
//         checked={urineChecked}
//       />
//       <Form.Check
//         className="custom-label"
//         inline
//         type="checkbox"
//         id="serum"
//         label="Serum"
//         onChange={handleSerumChange}
//         checked={serumChecked}
//       />
//     </Flex>
//   )
// }

const TestResults = () => {
  const { noDataError, urineData, serumData } = useContext(AppContext)

  console.log(urineData)
  // const [filteredResult, setFilteredResult] = useState(testResultData)
  // const [checkboxState, setCheckboxState] = useState({
  //   urineChecked: true,
  //   serumChecked: true
  // })

  // useEffect(() => {
  //   // SpcnameCheckbox에서 체크박스 상태에 따라 데이터 필터링

  //   const filteredData = testResultData.filter(data => {
  //     if (checkboxState.urineChecked && checkboxState.serumChecked) {
  //       return true // 둘 다 체크된 경우 모든 데이터 표시
  //     } else if (checkboxState.urineChecked) {
  //       return data.spcname === 'R.Urine'
  //     } else if (checkboxState.serumChecked) {
  //       return data.spcname === 'Serum'
  //     } else {
  //       return false // 아무것도 체크하지 않은 경우 데이터 표시하지 않음
  //     }
  //   })
  //   setFilteredResult(filteredData)
  // }, [checkboxState, testResultData])

  // const handleCheckboxChange = newState => {
  //   setCheckboxState(newState)
  // }

  const unit = {
    Creatinine: 'mg/dL',
    estimated: 'ml/min/1.73m²',
    WBC: '/HPF',
    Bacteria: '(없음)'
  }

  return (
    <Card className="h-100 fs--1">
      <FalconCardHeader
        title="검사정보"
        titleClass="fs-0 fw-bold"
        // endEl={<SpcnameCheckbox handleCheckboxChange={handleCheckboxChange} />}
      />
      <Card.Body
        className="bg-white"
        style={{
          overflow: 'hidden',
          height: '41.5dvh'
        }}
      >
        {noDataError.urine && noDataError.serum ? (
          <div>해당 환자의 검사 내역이 없습니다.</div>
        ) : (
          <Row className="g-3 p-2">
            <Col>
              <Row className="g-3 mb-3 w-50">
                <div
                  className="fs--1 me-2 badge badge-soft-info h-100"
                  style={{ width: 'fit-content' }}
                >
                  Serum
                </div>
              </Row>
              <Row className="g-3">
                <div
                  className="scrollbar"
                  style={{
                    overflow: 'auto',
                    height: '30dvh'
                  }}
                >
                  <Table borderless size="sm">
                    <thead className="customFixedHeader text-600">
                      <tr>
                        {/* <th></th> */}
                        <th>검사일시</th>
                        <th>검사명</th>
                        <th>결과</th>
                        {/* <th>정상구분</th> */}
                        <th>단위</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="sticky-border"></tr>
                      {serumData.map((data, idx) => {
                        return (
                          <tr key={idx}>
                            {/* <td>
                            {data.spcname === 'R.Urine' ? (
                              <FontAwesomeIcon
                                icon={faVial}
                                style={{ color: '#c2b62e' }}
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faVial}
                                style={{ color: '#ff5252' }}
                              />
                            )}
                          </td> */}
                            <td>{formatDate(data.spcdate)}</td>
                            <td className="text-info">{data.ordname}</td>
                            <td>{data.rsltnum}</td>
                            {/* <td>{data.normalfg}</td> */}
                            <td>{unit[data.ordname.split(' ')[0]]}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </div>
              </Row>
            </Col>
            <Col>
              <Row className="g-3 mb-3 w-50">
                <div
                  className="fs--1 me-2 badge badge-soft-info h-100"
                  style={{ width: 'fit-content' }}
                >
                  Urine
                </div>
              </Row>
              <Row className="g-3">
                <div
                  className="scrollbar"
                  style={{
                    overflow: 'auto',
                    height: '30dvh'
                  }}
                >
                  <Table borderless size="sm">
                    <thead className="customFixedHeader text-600">
                      <tr>
                        {/* <th></th> */}
                        <th>검사일시</th>
                        <th>검사명</th>
                        <th>결과</th>
                        {/* <th>정상구분</th> */}
                        <th>단위</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="sticky-border"></tr>
                      {urineData.map((data, idx) => {
                        return (
                          <tr key={idx}>
                            {/* <td>
                            {data.spcname === 'R.Urine' ? (
                              <FontAwesomeIcon
                                icon={faVial}
                                style={{ color: '#c2b62e' }}
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faVial}
                                style={{ color: '#ff5252' }}
                              />
                            )}
                          </td> */}
                            <td>{formatDate(data.spcdate)}</td>
                            <td className="text-info">{data.examname}</td>
                            <td>{data.rsltnum}</td>
                            {/* <td>{data.normalfg}</td> */}
                            <td>{data.unit}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </div>
              </Row>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  )
}

// SpcnameCheckbox.propTypes = {
//   handleCheckboxChange: PropTypes.func
// }

export default TestResults
