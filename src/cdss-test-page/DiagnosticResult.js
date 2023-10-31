import React, { useState, useEffect } from 'react'
import { Button, Card, Row, Col } from 'react-bootstrap'
import FalconCardHeader from './FalconCardHeader'
import './DiagnosticResult.css'
import { Table } from 'react-bootstrap'
import TopPages from './TopPages'
import { topPagesTableData } from './dummyData'

const DiagnosticResult = ({ setShowResult }) => {
  return (
    <Card>
      <FalconCardHeader title="Result" titleClass="fs-0 fw-bold" />
      <Card.Body className="bg-light fs--1">
        <Row className="mb-3 g-3">
          <Col xs={1} md={4}>
            <div className="mb-2">감염 예상 부위</div>
            <ul className="fs--1 text-info">
              <li>상복부</li>
              <li>요로 폐쇄 관련 복잡성 신우신염</li>
            </ul>
          </Col>
          <Col xs={1} md={4}>
            <div className="mb-2">환자 증상</div>
            <ul>
              <li>배뇨시 통증</li>
              <li>부종</li>
              <li>허리 통증</li>
            </ul>
          </Col>
          <Col xs={1} md={4}>
            <div className="mb-2">증상 부위</div>
            <ul>
              <li>상복부</li>
            </ul>
          </Col>
        </Row>
        <Row className="mb-3 g-3">
          <Col xs={12} md={6}>
            <TopPages
              title="권장 항생제 형태 및 기간"
              tableData={topPagesTableData}
            />
          </Col>{' '}
          <Col xs={12} md={6}>
            <TopPages title="제외 항생제 목록" tableData={topPagesTableData} />
          </Col>
        </Row>

        <Row className="mb-3 g-3">
          <Col xs={1} md={8} className="text-end"></Col>
          <Col xs={1} md={4} className="text-end">
            <Button
              className="fs--1"
              variant="primary"
              type="button"
              onClick={() => {
                setShowResult(false)
              }}
            >
              결과 접기
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default DiagnosticResult
