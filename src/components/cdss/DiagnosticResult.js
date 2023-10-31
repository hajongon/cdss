import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import FalconCardHeader from 'components/common/FalconCardHeader'
import './DiagnosticResult.css'
import { Dropdown } from 'react-bootstrap'
import { Table } from 'react-bootstrap'

const DiagnosticResult = ({setShowResult}) => {
  return (
    <Card>
      <FalconCardHeader title="Result" titleClass="fs--2 fw-bold"/>
      <Card.Body className="bg-light">
        <div className="resultRow">
          <div className="resultCol">
            <div>예상되는 증상</div>
            <ul>
              <li>상복부 감염 예상</li>
              <li>요로 폐쇄 관련 복잡성 신우신염</li>
            </ul>
          </div>
          <div className="resultCol">
            <div>환자 증상</div>
            <ul>
              <li>배뇨시 통증</li>
              <li>부종</li>
              <li>허리 통증</li>
            </ul>
          </div>
          <div className="resultCol">
            <div>증상 부위</div>
            <ul>
              <li>상복부</li>
              <li>하복부</li>
            </ul>
          </div>
        </div>

        <div>권장 항생제 형태 및 기간</div>
        <Table size="sm">
          <thead>
            <tr>
              <th>추천 순위</th>
              <th>성분명</th>
              <th>투약 방법</th>
              <th>투약 약제</th>
              <th>처방 기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>

        <div>제외 항생제 목록</div>
        <Table size="sm">
          <thead>
            <tr>
              <th>추천 순위</th>
              <th>성분명</th>
              <th>투약 방법</th>
              <th>투약 약제</th>
              <th>사유</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
        <div className="text-end">
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => {
                    setShowResult(false)
                  }}
                >
                  결과 접기
                </Button>
              </div>
      </Card.Body>
    </Card>
  )
}

export default DiagnosticResult
