import PropTypes from 'prop-types'
import React from 'react'
import { Button, Card, Row, Col, Table } from 'react-bootstrap'
import FalconCardHeader from './utils/FalconCardHeader'
import './DiagnosticResult.css'

const DiagnosticResult = ({ setShowResult }) => {
  5
  return (
    <Card>
      <FalconCardHeader title="추천 항생제" titleClass="fs-0 fw-bold" />
      <Card.Body className={'bg-white fs--1'}>
        {/* <Row className="mb-3 g-3">
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
            <RcmndAntiSens title="권장 항생제" tableData={topPagesTableData} />
          </Col>{' '}
          <Col xs={12} md={6}>
            <FrbdnAntiSens title="제외 항생제" tableData={topPagesTableData} />
          </Col>
        </Row> */}
        <Table size={window.innerWidth >= 576 ? 'm' : 's'}>
          <thead>
            <tr>
              <th></th>
              <th>항생제명</th>
              <th>특이사항</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Trimethoprim 80mg+Sulfamethoxazole 400mg /5ml/A</td>
              <td>none</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Ceftriaxone Na</td>
              <td>none</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Ampicillin sodium + Sulbactam sodium</td>
              <td className="text-youtube">항생제 감수성 결과 내성 있음</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Colistimethate sodium</td>
              <td>none</td>
            </tr>
          </tbody>
        </Table>

        <Row className="mb-3 g-3">
          <Col md={8} className="text-end"></Col>
          <Col xs={12} md={4} className="text-end">
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

// Add PropTypes validation
DiagnosticResult.propTypes = {
  setShowResult: PropTypes.func.isRequired
}

export default DiagnosticResult
