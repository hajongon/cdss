import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import FalconCardHeader from 'components/common/FalconCardHeader'
import './PatientSymptom.css'
import { Dropdown } from 'react-bootstrap'
import { Table } from 'react-bootstrap'

const TestResults = () => {
  return (
    <Card className="h-100 fs--2">
      <FalconCardHeader title="검사정보" titleClass="fs--2 fw-bold"/>
      <Card.Body className="bg-light">
        <div>소변검사</div>
        <Table borderless responsive size="sm">
          <thead className="border border-200 border-top-0 border-start-0 border-end-0 border-bottom-1">
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2023-06-06</td>
              <td>B004400102</td>
              <td>R.Urine</td>
              <td>H / H / SL</td>
              <td>1.2</td>
            </tr>
          </tbody>
        </Table>

        <div>혈액검사</div>
        <Table borderless responsive size="sm">
          <thead className="border border-200 border-top-0 border-start-0 border-end-0 border-bottom-1">
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2023-06-06</td>
              <td>B004400102</td>
              <td>R.Urine</td>
              <td>H / H / SL</td>
              <td>1.2</td>
            </tr>
          </tbody>
        </Table>

        <div>미생물검사</div>
        <Table borderless responsive size="sm">
          <thead className="border border-200 border-top-0 border-start-0 border-end-0 border-bottom-1">
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2023-06-06</td>
              <td>B004400102</td>
              <td>R.Urine</td>
              <td>H / H / SL</td>
              <td>1.2</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default TestResults
