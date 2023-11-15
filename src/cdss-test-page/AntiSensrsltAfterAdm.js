import React, { useContext } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import FalconCardHeader from './FalconCardHeader'
import './PatientSymptom.css'
import { Table } from 'react-bootstrap'

import AppContext from 'context/Context'
import { formatDate } from './timeDateFunction'
import { groupByMicname } from './transformData'

import './AntiSensrslt.css'

const AntiSensrsltAfterAdm = () => {
  const { sensAfterAdm, noDataError } = useContext(AppContext)
  const groupedData = groupByMicname(sensAfterAdm)

  return (
    <Card className="fs--1">
      <FalconCardHeader
        title="재원 중 항생제 내성 검사 결과"
        titleClass="fs-0 fw-bold"
      />
      <Card.Body
        className="bg-white scrollbar"
        style={{
          overflow: 'auto',
          height: '23dvh'
        }}
      >
        {noDataError.sensrslt ? (
          <div>해당 환자의 검사 내역이 없습니다.</div>
        ) : (
          Object.keys(groupedData).map(micname => {
            return (
              <div key={micname}>
                <div className="badge badge-soft-secondary w-100 fs--2">
                  <Row>
                    <Col lg={2} xs={2}>
                      <span>{groupedData[micname][0].spcname}</span>
                    </Col>
                    <Col lg={6} xs={6}>
                      <span>{micname}</span>
                    </Col>
                    <Col lg={4} xs={4}>
                      <span>{groupedData[micname][0].cntfgnm}</span>
                    </Col>
                  </Row>
                </div>
                <div
                  className="mb-3 fs--2 border-bottom-1"
                  // style={{
                  //   overflow: 'auto',
                  //   height: '18dvh'
                  // }}
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
                      {/* <tr className="sticky-border"></tr> */}
                      {groupedData[micname].map((data, idx) => (
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
                          <td>{data.sensrslt ? data.sensrslt : '없음'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            )
          })
        )}
      </Card.Body>
    </Card>
  )
}

export default AntiSensrsltAfterAdm
