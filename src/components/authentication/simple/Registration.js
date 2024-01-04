import React from 'react'
import PropTypes from 'prop-types' // Import PropTypes
import { Col, Row } from 'react-bootstrap'
import RegistrationForm from 'components/authentication/RegistrationForm'

const Registration = ({ setShow }) => (
  <>
    <Row className="align-items-center mb-2">
      <Col>
        <h5 id="modalLabel">사용자 정보</h5>
      </Col>
      {/* <Col xs="auto">
        <p className="fs--1 text-600 mb-0">
          Have an account? <Link to="/authentication/simple/login">Login</Link>
        </p>
      </Col> */}
    </Row>
    <RegistrationForm setShow={setShow} />
  </>
)

// Define propTypes
Registration.propTypes = {
  setShow: PropTypes.func.isRequired // Assuming setShow is a function and is required
}

export default Registration
