import PropTypes from 'prop-types'
import React, { useState, useEffect, useContext } from 'react'
import { Card, Form } from 'react-bootstrap'
import FalconCardHeader from './FalconCardHeader'
import './PatientSymptom.css'
import { Table } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVial } from '@fortawesome/free-solid-svg-icons'

import AppContext from 'context/Context'
import Flex from './Flex'
import { formatDate } from './timeDateFunction'
import './TestResult.css'

const SpcnameCheckbox = ({ handleCheckboxChange }) => {
  const [urineChecked, setUrineChecked] = useState(true)
  const [serumChecked, setSerumChecked] = useState(true)

  useEffect(() => {
    // 최초 렌더링 시 체크박스 상태를 true로 설정
    setUrineChecked(true)
    setSerumChecked(true)
  }, [])

  const handleUrineChange = e => {
    const isChecked = e.target.checked
    setUrineChecked(isChecked)
    handleCheckboxChange({ urineChecked: isChecked, serumChecked })
  }

  const handleSerumChange = e => {
    const isChecked = e.target.checked
    setSerumChecked(isChecked)
    handleCheckboxChange({ urineChecked, serumChecked: isChecked })
  }

  return (
    <Flex direction="row" className="gap-4" alignItems="center">
      <Form.Check
        className="custom-label"
        inline
        type="checkbox"
        id="urine"
        label="R.Urine"
        onChange={handleUrineChange}
        checked={urineChecked}
      />
      <Form.Check
        className="custom-label"
        inline
        type="checkbox"
        id="serum"
        label="Serum"
        onChange={handleSerumChange}
        checked={serumChecked}
      />
    </Flex>
  )
}

const TestResults = () => {
  const { testResultData, noDataError } = useContext(AppContext)
  const [filteredResult, setFilteredResult] = useState(testResultData)
  const [checkboxState, setCheckboxState] = useState({
    urineChecked: true,
    serumChecked: true
  })

  useEffect(() => {
    // SpcnameCheckbox에서 체크박스 상태에 따라 데이터 필터링

    const filteredData = testResultData.filter(data => {
      if (checkboxState.urineChecked && checkboxState.serumChecked) {
        return true // 둘 다 체크된 경우 모든 데이터 표시
      } else if (checkboxState.urineChecked) {
        return data.spcname === 'R.Urine'
      } else if (checkboxState.serumChecked) {
        return data.spcname === 'Serum'
      } else {
        return false // 아무것도 체크하지 않은 경우 데이터 표시하지 않음
      }
    })
    setFilteredResult(filteredData)
  }, [checkboxState, testResultData])

  const handleCheckboxChange = newState => {
    setCheckboxState(newState)
  }

  return (
    <Card className="h-100 fs--1">
      <FalconCardHeader
        title="검사정보"
        titleClass="fs-0 fw-bold"
        endEl={<SpcnameCheckbox handleCheckboxChange={handleCheckboxChange} />}
      />
      <Card.Body className="bg-white">
        {noDataError.urine && noDataError.serum ? (
          <div>해당 환자의 검사 내역이 없습니다.</div>
        ) : (
          <div
            className="scrollbar"
            style={{
              overflow: 'auto',
              height: '15dvh'
            }}
          >
            <Table borderless size="sm">
              <thead className="customFixedHeader text-600">
                <tr>
                  <th></th>
                  <th>orddate</th>
                  <th>ordname</th>
                  <th>spcname</th>
                  <th>normalfg</th>
                  <th>procstat</th>
                  <th>rslttype</th>
                  <th>rsltnum</th>
                  <th>examtyp</th>
                </tr>
              </thead>
              <tbody>
                <tr className="sticky-border"></tr>
                {filteredResult.map((data, idx) => {
                  return (
                    <tr key={idx}>
                      <td>
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
                      </td>
                      <td>{formatDate(data.orddate)}</td>
                      <td className="text-info">{data.ordname}</td>
                      <td>{data.spcname}</td>
                      <td>{data.normalfg}</td>
                      <td>{data.procstat}</td>
                      <td>{data.rslttype}</td>
                      <td>{data.rsltnum}</td>
                      <td>{data.examtyp}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

SpcnameCheckbox.propTypes = {
  handleCheckboxChange: PropTypes.func
}

export default TestResults
