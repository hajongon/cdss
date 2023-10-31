import React, { useState, useEffect, useRef } from 'react'
import { Card, Form } from 'react-bootstrap'
import FalconCardHeader from './FalconCardHeader'
import './PatientSymptom.css'
import { Table } from 'react-bootstrap'
import TopPages from './TopPages'
import { testResultData, topPagesTableData } from './dummyData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVial, faBacterium } from '@fortawesome/free-solid-svg-icons'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const CategoryFilter = ({ setSelectedCategory }) => {
  const onOptionChange = e => {
    setSelectedCategory(e.target.value)
  }

  return (
    <>
      <Form.Select size="sm" onChange={e => onOptionChange(e)}>
        <option value="none">검사 종류</option>
        <option value="all">전체</option>
        <option value="urine">Urine</option>
        <option value="serum">Serum</option>
        <option value="anti_sensrslt">Anti_sensrslt</option>
      </Form.Select>
    </>
  )
}

const TestResults = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [resultTableData, setResultTableData] = useState(testResultData)

  const tdIconElementRef = useRef(null); // useRef로 td 요소의 참조 생성


  useEffect(() => {
    if (selectedCategory === 'all' || selectedCategory === 'none') setResultTableData(testResultData)
    else {
      const filteredData = testResultData.filter(
        data => data.category === selectedCategory
      )
      setResultTableData(filteredData)
    }
  }, [selectedCategory])

  return (
    <Card className="h-100 fs--1">
      <FalconCardHeader
        title="검사정보"
        titleClass="fs-0 fw-bold"
        endEl={<CategoryFilter setSelectedCategory={setSelectedCategory} />}
      />
      <Card.Body className="bg-white">
        <Table borderless responsive size="sm">
          <thead className="border border-top-0 border-start-0 border-end-0 border-bottom-0">
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="d-flex flex-column align-items-start text-black">
            {resultTableData.map(data => {
              const tooltip = (
                <Tooltip
                  id={`svg-tooltip-${data.idx}`} // 고유한 ID 생성
                  style={{ position: 'relative' }}
                >
                  {data.category}
                </Tooltip>
              )
              let icon = null // 초기 아이콘 값은 null로 설정

              if (data.category === 'urine') {
                icon = (
                  <OverlayTrigger overlay={tooltip}>
                    <FontAwesomeIcon
                      icon={faVial}
                      style={{ color: '#c2b62e' }}
                    />
                  </OverlayTrigger>
                )
              } else if (data.category === 'serum') {
                icon = (
                  <OverlayTrigger overlay={tooltip}>
                    <FontAwesomeIcon
                      icon={faVial}
                      style={{ color: '#ff5252' }}
                    />
                  </OverlayTrigger>
                )
              } else if (data.category === 'anti_sensrslt') {
                icon = (
                  <OverlayTrigger overlay={tooltip}>
                    <FontAwesomeIcon
                      icon={faBacterium}
                    />
                  </OverlayTrigger>
                )
              }

              return (
                <tr key={data.idx} ref={tdIconElementRef}>
                  <td>{icon}</td> {/* 아이콘 렌더링 */}
                  <td>{data.testDate}</td>
                  <td className="text-info">{data.testCode}</td>
                  <td>{data.resultName}</td>
                  <td>{data.resultDetail}</td>
                  <td className="text-info">{data.resultNum}</td>
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
