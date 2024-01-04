import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'
import { signUp } from 'components/authentication/apis/auth'

const RegistrationForm = ({ hasLabel, setShow }) => {
  // State
  const [formData, setFormData] = useState({
    userNm: '',
    nickname: '',
    email: ''
    // isAdmin: false
  })

  // Handler
  const handleSubmit = async e => {
    e.preventDefault()
    const response = await signUp(JSON.stringify(formData))
    console.log(response)
    if (response.status === 'success') {
      alert(`${formData.email}로 임시 비밀번호를 전송했습니다.`)
      setShow(false)
    } else if (response.data === 'email-error') {
      alert(`이미 존재하는 이메일입니다.`)
    } else if (response.data === 'id-error') {
      alert(`이미 존재하는 ID입니다.`)
    } else {
      alert(`메일 전송에 실패했습니다.`)
    }
  }

  const handleFieldChange = e => {
    if (e.target.name === 'isAdmin') {
      setFormData({
        ...formData,
        isAdmin: !formData.isAdmin
      })
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>사용자 ID</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? '사용자 ID' : ''}
          value={formData.name}
          name="userNm"
          onChange={handleFieldChange}
          type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>사용자 이름</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? '사용자 이름' : ''}
          value={formData.nickname}
          name="nickname"
          onChange={handleFieldChange}
          type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Email address</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Email address' : ''}
          value={formData.email}
          name="email"
          onChange={handleFieldChange}
          type="text"
        />
      </Form.Group>

      {/* <Form.Group className="mb-4">
        <Form.Check
          type="switch"
          id="custom-switch"
          label="이 사용자를 관리자로 지정합니다."
          className="form-label-nogutter"
          name="isAdmin"
          onChange={handleFieldChange}
          checked={formData.isAdmin === true}
        />
      </Form.Group> */}
      <Form.Group className="mb-4">
        <Button
          className="w-100"
          type="submit"
          disabled={!formData.userNm || !formData.nickname || !formData.email}
        >
          Register
        </Button>
      </Form.Group>
    </Form>
  )
}

RegistrationForm.propTypes = {
  hasLabel: PropTypes.bool,
  setShow: PropTypes.func.isRequired
}

export default RegistrationForm
