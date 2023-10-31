import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import FalconCardHeader from './FalconCardHeader'
import './PatientSymptom.css'
import { Dropdown } from 'react-bootstrap'
import { Table } from 'react-bootstrap'

const AntibioticResistance = () => {

  return (
    <Card className="h-100 fs--1">
      <FalconCardHeader title="과거 항생제 내성 이력" titleClass="fs-0 fw-bold"/>
      <Card.Body className="bg-white">
        <Table borderless responsive size="sm">
          <thead className="border border-200 border-top-0 border-start-0 border-end-0 border-bottom-1 text-600">
            <tr>
              <th>검사일시</th>
              <th>성분명</th>
              <th>약제구분</th>
              <th>약제명 (일반명)</th>
              <th>특이사항</th>
            </tr>
          </thead>
          <tbody className="text-black">
            <tr>
              <td>2022-04-23</td>
              <td>asdff kaasdf</td>
              <td>주사/내복액</td>
              <td>dkasdj dfhjdkkd</td>
              <td>없음</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default AntibioticResistance
