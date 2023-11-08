import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import FalconCardHeader from './FalconCardHeader'
import './PatientSymptom.css'
import { Dropdown } from 'react-bootstrap'

const PatientSymptom = () => {
  return (
    <Card className="h-100 fs--1">
      <FalconCardHeader title="환자 증상" titleClass="fs-0 fw-semi-bold" />
      <Card.Body className="bg-white fs--1 text-black">
        <Form>
          <Row>
            <Col md={4} xs={12}>
              <Form.Check
                className="custom-label mb-0"
                type="checkbox"
                id="defaultCheckbox"
                label="배뇨시 통증"
              />
            </Col>
            <Col md={4} xs={12}>
              <Form.Check
                className="custom-label mb-0"
                type="checkbox"
                id="defaultCheckbox"
                label="빈번한 배뇨"
              />
            </Col>
            <Col md={4} xs={12}>
              <Form.Check
                className="custom-label mb-0"
                type="checkbox"
                id="defaultCheckbox"
                label="발열"
              />
            </Col>
          </Row>
          <Row>
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
                label="하복부 통증"
              />
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default PatientSymptom
