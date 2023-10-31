import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import FalconCardHeader from 'components/common/FalconCardHeader'
import './PatientSymptom.css'
import { Dropdown } from 'react-bootstrap'
import { Table } from 'react-bootstrap'

const AdrHistory = () => {
  return (
    <Card className="h-100 fs--2">
      <FalconCardHeader title="과거 ADR 이력" titleClass="fs--2 fw-bold"/>
      <Card.Body className="bg-light">
        <Table borderless responsive size="sm">
          <thead className="border border-200 border-top-0 border-start-0 border-end-0 border-bottom-1">
            <tr>
              <th>ADR 발생일시</th>
              <th>성분명</th>
              <th>약제구분</th>
              <th>약제명 (일반명)</th>
            </tr>
          </thead>
          <tbody>
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
