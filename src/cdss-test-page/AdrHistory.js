import React from 'react'
import { Card } from 'react-bootstrap'
import FalconCardHeader from './FalconCardHeader'
import './PatientSymptom.css'
import { Table } from 'react-bootstrap'

const AdrHistory = () => {
  return (
    <Card className="h-100 fs--1">
      <FalconCardHeader title="과거 ADR 이력" titleClass="fs-0 fw-bold"/>
      <Card.Body className="bg-white">
        <Table borderless responsive size="sm">
          <thead className="border border-200 border-top-0 border-start-0 border-end-0 border-bottom-1 text-600">
            <tr>
              <th>ADR 발생일시</th>
              <th>성분명</th>
              <th>약제구분</th>
              <th>약제명 (일반명)</th>
            </tr>
          </thead>
          <tbody className="text-black">
            <tr>
              <td>2022-03-25</td>
              <td>asdff kaasdf</td>
              <td>주사/내복액</td>
              <td>dkasdj dfhjdkkd</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default AdrHistory
