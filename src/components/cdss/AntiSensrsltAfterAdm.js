import React, { useContext, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Accordion, Card } from 'react-bootstrap'
import FalconCardHeader from './utils/FalconCardHeader'
import './PatientSymptom.css'
import { Table } from 'react-bootstrap'

import AppContext from 'context/Context'
import { formatDate } from './utils/timeDateFunction'
import { splitDataByCategory } from './utils/transformData'

import './AntiSensrslt.css'

const AntiSensrsltAfterAdm = ({ isPatientSelected }) => {
  const { antiSensAfterAdm, noDataError } = useContext(AppContext)
  const groupedData = splitDataByCategory(antiSensAfterAdm)

  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [antiSensAfterAdm])

  return (
    <Card className="fs--1">
      <FalconCardHeader
        title="재원 중 항생제 내성 검사 결과"
        titleClass="fs-0 fw-bold"
      />
      <Card.Body className="bg-white scrollbar" ref={scrollRef}>
        <Accordion defaultActiveKey="0">
          {noDataError.sensrslt ||
          !isPatientSelected ||
          groupedData.length === 0 ? (
            <div>해당 환자의 검사 내역이 없습니다.</div>
          ) : (
            groupedData.map((group, groupIndex) => {
              // Assuming each group has at least one item and all items have the same spcname, micname, and cntfgnm
              const { spcname, micname, cntfgnm } = group[0]
              return (
                <Accordion.Item eventKey={String(groupIndex)} key={groupIndex}>
                  <Accordion.Header>
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

AntiSensrsltAfterAdm.propTypes = {
  isPatientSelected: PropTypes.bool.isRequired
}

export default AntiSensrsltAfterAdm
