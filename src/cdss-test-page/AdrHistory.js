import React, { useContext } from 'react'
import { Card } from 'react-bootstrap'
import FalconCardHeader from './FalconCardHeader'
import './PatientSymptom.css'
import { Table } from 'react-bootstrap'
import AppContext from 'context/Context'
import { formatDate } from './timeDateFunction'

const AdrHistory = () => {
  const { adrs, noDataError } = useContext(AppContext)
  return (
    <Card className="h-100 fs--2">
      <FalconCardHeader title="ADR" titleClass="fs-0 fw-bold" />
      <Card.Body
        className="bg-white"
        style={{
          overflow: 'auto',
          height: '20dvh'
        }}
      >
        {noDataError.adrs ? (
          <div className="fs--1">해당 환자의 검사 내역이 없습니다.</div>
        ) : (
          <div>
            <Table borderless size="sm">
              <thead className="border border-200 border-top-0 border-start-0 border-end-0 border-bottom-1 text-600">
                <tr>
                  <th>의뢰날짜</th>
                  <th>의심약제</th>
                  <th>성분명</th>
                  <th>증상</th>
                  <th>중증도</th>
                  <th>인과성</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {adrs.map((adr, idx) => (
                  <tr key={idx}>
                    <td>{formatDate(adr.orddate)}</td>
                    <td>{adr.ordname}</td>
                    <td>{adr.igrdname}</td>
                    <td>
                      {adr.symptom1 && (
                        <p style={{ marginBottom: '0' }}>1{adr.symptom1}</p>
                      )}
                      {adr.symptom2 && (
                        <p style={{ marginBottom: '0' }}>2{adr.symptom2}</p>
                      )}
                      {adr.symptom3 && <p>3{adr.symptom3}</p>}
                    </td>
                    <td>{adr.naranjo}</td>
                    <td>{adr.whoumc}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export default AdrHistory
