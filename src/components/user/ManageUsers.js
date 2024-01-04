import React from 'react'
import { Card, Row } from 'react-bootstrap'
import UsersTable from './utils/UsersTable'

const ManageUsers = () => {
  return (
    <Row className="g-3">
      <Card>
        {/* <FalconCardHeader title="" titleClass="fs-0 fw-semi-bold" /> */}
        <Card.Body className="bg-white pb-2 pt-2">
          <UsersTable />
        </Card.Body>
      </Card>
    </Row>
  )
}

export default ManageUsers
