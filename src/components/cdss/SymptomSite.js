import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import FalconCardHeader from 'components/common/FalconCardHeader'
import './PatientSymptom.css'
import { Dropdown } from 'react-bootstrap'

const SymptomSite = () => {
  return (
    <Card className="h-100 fs--2">
      <FalconCardHeader title="증상 위치" titleClass="fs--2 fw-bold" />
      <Card.Body className="bg-light">
        <Form>
          <Row>
            <Col md={4} xs={12}>
              <Form.Check
                className="custom-label mb-0"
                type="checkbox"
                id="defaultCheckbox"
                label="상복부"
              />
            </Col>
            <Col md={4} xs={12}>
              <Form.Check
                className="custom-label mb-0"
                type="checkbox"
                id="defaultCheckbox"
                label="하복부"
              />
            </Col>
            <Col md={4} xs={12}>
              <Form.Check
                className="custom-label mb-0"
                type="checkbox"
                id="defaultCheckbox"
                label="없음"
              />
            </Col>
          </Row>
          <Row>
            <Col md={4} xs={12}>
              <Form.Check
                className="custom-label mb-0"
                type="checkbox"
                id="defaultCheckbox"
                label="없음"
              />
            </Col>
            <Col md={4} xs={12}>
              <Form.Check
                className="custom-label mb-0"
                type="checkbox"
                id="defaultCheckbox"
                label="없음"
              />
            </Col>
            <Col md={4} xs={12}>
              <Form.Check
                className="custom-label mb-0"
                type="checkbox"
                id="defaultCheckbox"
                label="없음"
              />
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default SymptomSite
