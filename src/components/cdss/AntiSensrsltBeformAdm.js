import React, { useContext, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card, Accordion } from 'react-bootstrap'
import FalconCardHeader from './utils/FalconCardHeader'
import './PatientSymptom.css'
import { Table } from 'react-bootstrap'

import AppContext from 'context/Context'
import { formatDate } from './utils/timeDateFunction'
import { splitDataByCategory } from './utils/transformData'

import './AntiSensrslt.css'

const AntiSensrsltBeforeAdm = ({ isPatientSelected }) => {
  const { antiSensBeforeAdm, noDataError } = useContext(AppContext)
  const groupedData = splitDataByCategory(antiSensBeforeAdm)

  // // 상태 변수 추가
  // const [visibleGroups, setVisibleGroups] = useState({})

  // // 클릭 핸들러 구현
  // const toggleGroupVisibility = groupIndex => {
  //   setVisibleGroups(prevVisibleGroups => ({
  //     ...prevVisibleGroups,
  //     [groupIndex]: !prevVisibleGroups[groupIndex]
  //   }))
  // }

  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [antiSensBeforeAdm])

  return (
    <Card className="fs--1">
      <FalconCardHeader
        title="과거 항생제 내성 이력"
        titleClass="fs-0 fw-bold"
      />
      <Card.Body
        className="bg-white scrollbar"
        // style={{
        //   overflow: 'auto',
        //   height: '23dvh'
        // }}
        ref={scrollRef}
      >
        {/* {noDataError.sensrslt ||
        !isPatientSelected ||
        groupedData.length === 0 ? (
          <div>해당 환자의 검사 내역이 없습니다.</div>
        ) : (
          groupedData.map((group, groupIndex) => {
            // Assuming each group has at least one item and all items have the same spcname, micname, and cntfgnm
            const { spcname, micname, cntfgnm } = group[0]
            const badgeClass = `badge w-100 ${
              visibleGroups[groupIndex]
                ? 'badge-soft-info'
                : 'badge-soft-secondary'
            }` // 조건부 클래스 이름 설정

            return (
              <div key={groupIndex}>
                <div
                  className={badgeClass}
                  // className="badge badge-soft-secondary w-100 sticky-top"
                  style={{
                    // top: '-1.29rem',
                    fontSize:
                      window.innerWidth >= 576 ? '0.694444rem' : '0.6rem'
                  }}
                  onClick={() => toggleGroupVisibility(groupIndex)}
                >
                  <Row>
                    <Col lg={2} xs={12}>
                      <span>{spcname}</span>
                    </Col>
                    <Col lg={6} xs={12}>
                      <span>{micname}</span>
                    </Col>
                    <Col lg={4} xs={12}>
                      <span>{cntfgnm}</span>
                    </Col>
                  </Row>
                </div>
                {visibleGroups[groupIndex] && (
                  <div
                    className="mb-3 border-bottom-1"
                    style={{
                      fontSize:
                        window.innerWidth >= 576 ? '0.694444rem' : '0.6rem'
                    }}
                  >
                    <Table size="sm">
                      <thead className="text-600">
                        <tr>
                          <th className="column-date">검사일시</th>
                          <th className="column-antiname">항생제명</th>
                          <th className="column-result">결과</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.map((data, idx) => (
                          <tr
                            key={idx}
                            style={
                              data.sensrslt === 'R'
                                ? { backgroundColor: '#ffa5a5', color: 'black' }
                                : {}
                            }
                          >
                            <td>{formatDate(data.spcdate)}</td>
                            <td>{data.antiname}</td>
                            <td>{data.sensrslt ? data.sensrslt : ''}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </div>
            )
          })
        )} */}
        <Accordion>
          {noDataError.sensrslt ||
          !isPatientSelected ||
          groupedData.length === 0 ? (
            <div>해당 환자의 검사 내역이 없습니다.</div>
          ) : (
            groupedData.map((group, groupIndex) => {
              // Assuming each group has at least one item and all items have the same spcname, micname, and cntfgnm
              const { spcname, micname, cntfgnm } = group[0]
              return (
                <Accordion.Item eventKey={groupIndex} key={groupIndex}>
                  <Accordion.Header>
                    {/* {`${spcname}, ${micname}, ${cntfgnm}`} */}
                    <Table
                      borderless
                      style={{
                        marginBottom: '0',
                        width: '100%',
                        fontSize:
                          window.innerWidth >= 576 ? '0.694444rem' : '0.6rem'
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              width: '20%',
                              padding: '0'
                            }}
                          >
                            {spcname}
                          </th>
                          <th
                            style={{
                              width: '40%',
                              padding: '0'
                            }}
                          >
                            {micname}
                          </th>
                          <th
                            style={{
                              width: '40%',
                              padding: '0'
                            }}
                          >
                            {cntfgnm}
                          </th>
                        </tr>
                      </thead>
                    </Table>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Table
                      size="sm"
                      style={{
                        fontSize:
                          window.innerWidth >= 576 ? '0.694444rem' : '0.6rem'
                      }}
                    >
                      <thead className="text-600">
                        <tr>
                          <th className="column-date">검사일시</th>
                          <th className="column-antiname">항생제명</th>
                          <th className="column-result">결과</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.map((data, idx) => (
                          <tr
                            key={idx}
                            style={
                              data.sensrslt === 'R'
                                ? { backgroundColor: '#FFC1C1', color: 'black' }
                                : {}
                            }
                          >
                            <td>{formatDate(data.spcdate)}</td>
                            <td>{data.antiname}</td>
                            <td>{data.sensrslt ? data.sensrslt : ''}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
              )
            })
          )}
        </Accordion>
      </Card.Body>
    </Card>
  )
}

AntiSensrsltBeforeAdm.propTypes = {
  isPatientSelected: PropTypes.bool.isRequired
}

export default AntiSensrsltBeforeAdm
