import React, { useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import FalconCardHeader from './FalconCardHeader'
import './PatientSymptom.css'

const SymptomSite = () => {
  return (
    <Card className="h-100 fs--1">
      <FalconCardHeader title="증상 위치" titleClass="fs-0 fw-semi-bold" />
      <Card.Body className="bg-white text-black">
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
