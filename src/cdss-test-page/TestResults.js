import React, { useState, useEffect, useContext } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import FalconCardHeader from './FalconCardHeader'
import './PatientSymptom.css'
import { Table } from 'react-bootstrap'
import { testResultData } from './dummyData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVial, faBacterium } from '@fortawesome/free-solid-svg-icons'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import AppContext from 'context/Context'
import Flex from './Flex'
import { formatDate, sortByDate } from './timeDateFunction'

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
  const { testResultData, setTestResultData } = useContext(AppContext)
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
      <Card.Body
        className="bg-white"
        style={{
          maxHeight: '160px',
          overflowY: 'scroll'
        }}
      >
        <Table borderless responsive size="sm">
          <thead className="border border-top-0 border-start-0 border-end-0 border-bottom-0">
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
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
                  <td className="text-info">
                    {data.spcname === 'R.Urine' ? data.examcode : data.ordcode}
                  </td>
                  <td>{data.spcname}</td>
                  <td>{data.normalfg}</td>
                  <td>{data.procstat}</td>
                  <td>{data.examtyp}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default TestResults
