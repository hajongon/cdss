import React from 'react'
import { Col, Row } from 'react-bootstrap'
import ChangePassword from 'components/pages/user/settings/ChangePassword'
import ProfileSettings from 'components/pages/user/settings/ProfileSettings'

const MyPage = () => {
  return (
    <Row className="g-3">
      <Col lg={6}>
        <ProfileSettings />
      </Col>
      <Col lg={6}>
        <ChangePassword />
      </Col>
    </Row>
  )
}

export default MyPage
