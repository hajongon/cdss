import React from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Card } from 'react-bootstrap'

const BoardMain = () => {
  const { boardId } = useParams()

  return (
    <div className="contetnt">
      <input type="hidden" id="board_id" value={boardId} />

      <Row className="g-5" xl={8}>
        <Col xl={12}>
          <Card>
            <Card.Header className="border-0 pt-6">
              <Card.Title className="flex-wrap"></Card.Title>
            </Card.Header>
            <p>boardId : {boardId} </p>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default BoardMain
