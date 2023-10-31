import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import FalconCardHeader from 'components/common/FalconCardHeader'
import './PatientInfo.css'
import { Dropdown } from 'react-bootstrap'
import SymptomSite from './SymptomSite'
import Flex from 'components/common/Flex'

const PatientInfo = ({ setShowResult }) => {
  const [isMedicated, setIsMedicated] = useState(false)
  console.log(isMedicated)
  const [formData, setFormData] = useState({
    birth: '1991. 11. 29 (만 31세)',
    period: '2023. 10. 15',
    medicineName: '',
    startDate: '2023. 10. 15',
    endDate: '입원중',
    gender: '남성',
    temperature: '36.7'
  })

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setShowResult(true)
  }

  return (
    <Card>
      <FalconCardHeader title="환자 기본 정보" titleClass="fs--2 fw-bold" />
      <Card.Body className="bg-white pb-2 pt-2">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={2} xs={12} controlId="selectPatient">
              <Form.Label className="fs--2 mb-0">환자 선택</Form.Label>
              <Form.Select
                size="m"
                className="fs--2 me-2 border-top-0 border-start-0 border-end-0 border-bottom-1 rounded-0 bg-transparent shadow-none"
              >
                <option>김나나</option>
                <option>이다다</option>
                <option>박라라</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} md={1} lg={1} xs={12} controlId="gender">
              <Form.Label className="fs--2 mb-0">성별</Form.Label>
              <Form.Control
                className="fs--2 me-2 border-top-0 border-start-0 border-end-0 border-bottom-1 rounded-0 bg-transparent shadow-none"
                type="text"
                placeholder="성별"
                value="남성"
                name="gender"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} lg={2} xs={12} controlId="birth">
              <Form.Label className="fs--2 mb-0">생년월일</Form.Label>
              <Form.Control
                className="fs--2 me-2 border-top-0 border-start-0 border-end-0 border-bottom-1 rounded-0 bg-transparent shadow-none"
                type="text"
                placeholder="생년월일"
                value={formData.birth}
                name="birth"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} lg={1} xs={12} controlId="temperature">
              <Form.Label className="fs--2 mb-0">체온</Form.Label>
              <Form.Control
                className="fs--2 me-2 border-top-0 border-start-0 border-end-0 border-bottom-1 rounded-0 bg-transparent shadow-none"
                type="text"
                placeholder="체온"
                value={formData.temperature}
                name="temperature"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={3} xs={12} controlId="period">
              <Form.Label className="fs--2 mb-0">입원 기간</Form.Label>
              <Flex direction="row" className="p-2 gap-2">
                <Col lg={5}>
                  <Form.Control
                    className="fs--2 me-2 border-top-0 border-start-0 border-end-0 border-bottom-1 rounded-0 bg-transparent shadow-none"
                    type="text"
                    placeholder="입원 날짜"
                    value={formData.startDate}
                    name="period"
                    onChange={handleChange}
                  />
                </Col>
                <Col lg={2}>
                  <span className="span-text">~</span>
                </Col>
                <Col lg={5}>
                  <Form.Control
                    className="fs--2 me-2 border-top-0 border-start-0 border-end-0 border-bottom-1 rounded-0 bg-transparent shadow-none"
                    type="text"
                    placeholder="퇴원 날짜"
                    value={formData.endDate}
                    name="period"
                    onChange={handleChange}
                  />
                </Col>
              </Flex>
            </Form.Group>
            <Form.Group as={Col} lg={2} controlId="medication">
              <Form.Label className="fs--2 mb-0">항생제 투약 여부</Form.Label>
              <Flex direction="row" className="p-2 gap-4" alignItems="center">
                <Form.Check
                  className="custom-label"
                  type="radio"
                  id="item1Radio"
                  label="yes"
                  name="medication"
                  onChange={() => {
                    setIsMedicated(true)
                  }}
                />
                <Form.Check
                  className="custom-label"
                  type="radio"
                  id="item2Radio"
                  label="no"
                  name="medication"
                  onChange={() => {
                    setIsMedicated(false)
                  }}
                />
              </Flex>
            </Form.Group>
            {isMedicated ? (
              <Form.Group as={Col} lg={2} controlId="medicineName">
                <Form.Label className="fs--2 mb-0">항생제 성분명</Form.Label>
                <Form.Control
                  className="fs--2 me-2 border-top-0 border-start-0 border-end-0 border-bottom-1 rounded-0 bg-transparent shadow-none"
                  type="text"
                  placeholder="항생제 성분명"
                  value={formData.medicineName}
                  name="medicineName"
                  onChange={handleChange}
                />
              </Form.Group>
            ) : null}
            <Col lg={2} md={4} className="custom-col">
              <Button
                variant="primary"
                type="submit"
                className="h-50 align-self-center"
              >
                항생제 내성 판단
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default PatientInfo
