import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Form, Row, Col, Button } from 'react-bootstrap'
import FalconCardHeader from '../cdss/utils/FalconCardHeader'

const CodeDetail = ({ selectedItem }) => {
  const [currentItem, setCurrentItem] = useState(selectedItem)
  const onItemClick = e => {
    setCurrentItem(prev => {
      let newItem = { ...prev }
      newItem.name = e.target.value
      return newItem
    })
  }

  useEffect(() => {
    setCurrentItem(selectedItem)
  }, [selectedItem])

  return (
    <Card>
      <FalconCardHeader
        title="Code Tree"
        titleClass="fs-0 fw-semi-bold bg-light"
      />
      <Card.Body className="fs--1">
        <Form.Group as={Row} className="mb-3" controlId="codeGroup">
          <Form.Label column sm="2">
            그룹 코드
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Code Group"
              disabled
              value={selectedItem?.codeGroup || ''}
              className="fs--1"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="codeGroupName">
          <Form.Label column sm="2">
            그룹 코드 설명
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Code Group Name"
              value={currentItem?.name || ''}
              className="fs--1"
              onChange={e => onItemClick(e)}
            />
          </Col>
        </Form.Group>

        <Col lg={12} xl={12} className="text-end">
          <Button variant="primary" className="mt-2 me-0 mb-1 w-10">
            저장
          </Button>
        </Col>
      </Card.Body>
    </Card>
  )
}

export default CodeDetail

CodeDetail.propTypes = {
  selectedItem: PropTypes.shape({
    codeGroup: PropTypes.string,
    name: PropTypes.string
  })
}
