import React, { useContext } from 'react'
import { Card } from 'react-bootstrap'
import FalconCardHeader from './FalconCardHeader'
import './PatientSymptom.css'
import { Table } from 'react-bootstrap'

import AppContext from 'context/Context'
import { formatDate } from './timeDateFunction'

const AntiSensrslt = () => {
  const { snsrsltData, noDataError } = useContext(AppContext)

  return (
    <Card className="h-100 fs--1">
      <FalconCardHeader title="항생제 감수성" titleClass="fs-0 fw-bold" />
      <Card.Body className="bg-white h-100">
        {noDataError.sensrslt ? (
          <div>해당 환자의 검사 내역이 없습니다.</div>
        ) : (
          <div
            className="scrollbar"
            style={{
              maxHeight: '15dvh',
              overflow: 'auto'
            }}
          >
            <Table borderless responsive size="sm">
              <tbody>
                {snsrsltData.map((data, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{formatDate(data.orddate)}</td>
                      <td className="text-info">{data.ordcode}</td>
                      <td>{data.spcname}</td>
                      <td>{data.normalfg}</td>
                      <td>{data.procstat}</td>
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

export default AntiSensrslt
