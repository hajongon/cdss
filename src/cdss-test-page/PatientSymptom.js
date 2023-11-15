import React from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import FalconCardHeader from './FalconCardHeader'
import './PatientSymptom.css'

const PatientSymptom = () => {
  return (
    <Card className="fs--1 h-100">
      <FalconCardHeader title="환자 증상" titleClass="fs-0 fw-semi-bold" />
      <Card.Body className="bg-white fs--1 text-black">
        <Form>
          <Row>
            <Col md={4} xs={12}>
              <Form.Check
                className="custom-label mb-0"
                type="checkbox"
                id="defaultCheckbox"
                label="배뇨통"
              />
            </Col>
            <Col md={4} xs={12}>
              <Form.Check
                className="custom-label mb-0"
                type="checkbox"
                id="defaultCheckbox"
                label="절박뇨"
              />
            </Col>
            <Col md={4} xs={12}>
              <Form.Check
                className="custom-label mb-0"
                type="checkbox"
                id="defaultCheckbox"
                label="빈뇨"
              />
            </Col>
          </Row>
          <Row>
            <Col md={4} xs={12}>
              <Form.Check
                className="custom-label mb-0"
                type="checkbox"
                id="defaultCheckbox"
                label="치골 상부 압통"
              />
            </Col>
            <Col md={4} xs={12}>
              <Form.Check
                className="custom-label mb-0"
                type="checkbox"
                id="defaultCheckbox"
                label="혈뇨"
              />
            </Col>
            <Col md={4} xs={12}>
              <Form.Check
                className="custom-label mb-0"
                type="checkbox"
                id="defaultCheckbox"
                label="구역, 구토"
              />
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default PatientSymptom
