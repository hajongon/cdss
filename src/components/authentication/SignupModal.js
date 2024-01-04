import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import FalconCloseButton from 'components/common/FalconCloseButton'
import Registration from 'components/authentication/simple/Registration'

const SignupModal = ({ show, setShow }) => {
  const handleClose = () => setShow(false)
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>관리페이지 사용자</Modal.Title>
          <FalconCloseButton onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Registration setShow={setShow} />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer> */}
      </Modal>
    </>
  )
}

// Define propTypes
SignupModal.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func.isRequired // Assuming setShow is a function and is required
}

export default SignupModal
