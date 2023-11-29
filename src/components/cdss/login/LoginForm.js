import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logIn } from '../apis/Auth'

const LoginForm = ({ hasLabel, layout }) => {
  const navigate = useNavigate()

  // State
  const [formData, setFormData] = useState({
    email: '',
    password: ''
    // remember: false
  })

  // Handler
  const handleSubmit = async e => {
    e.preventDefault()
    navigate('/')

    const inputData = {
      email: formData.email,
      password: formData.password
    }
    // POST 요청 설정
    const userInfo = JSON.stringify(inputData) // FormData를 요청의 본문으로 사용합니다.

    const logInResponse = await logIn(
      'http://localhost:8080/api/user/login',
      userInfo
    )
    if (logInResponse.data === 'success') navigate('/')
    else console.log(logInResponse)

    // POST 요청 보내기
    // fetch('http://localhost:8080/api/user/login', requestOptions)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok')
    //     }
    //     return response.json()
    //   })
    //   .then(data => {
    //     // 서버로부터 받은 데이터(data)를 처리합니다.
    //     console.log('Response Data:', data)
    //     // 원하는 동작을 수행하세요.
    //     if (data.result === 'success') {
    //       navigate('/')
    //       console.log(
    //         'accessToken:',
    //         data.data.accessToken,
    //         '\n\nrefreshToken:',
    //         data.data.refreshToken
    //       )
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Error:', error)
    //     // 오류 처리를 수행하세요.
    //   })

    toast.success(`Logged in as ${formData.email}`, {
      theme: 'colored'
    })
  }

  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Email address</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Email address' : ''}
          value={formData.email}
          name="email"
          onChange={handleFieldChange}
          type="email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Password</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Password' : ''}
          value={formData.password}
          name="password"
          onChange={handleFieldChange}
          type="password"
        />
      </Form.Group>

      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <Form.Check type="checkbox" id="rememberMe" className="mb-0">
            <Form.Check.Input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={e =>
                setFormData({
                  ...formData,
                  remember: e.target.checked
                })
              }
            />
            <Form.Check.Label className="mb-0 text-700">
              Remember me
            </Form.Check.Label>
          </Form.Check>
        </Col>

        <Col xs="auto">
          <Link
            className="fs--1 mb-0"
            to={`/authentication/${layout}/forgot-password`}
          >
            Forgot Password?
          </Link>
        </Col>
      </Row>

      <Form.Group>
        <Button
          type="submit"
          color="primary"
          className="mt-3 w-100"
          disabled={!formData.email || !formData.password}
        >
          Log in
        </Button>
      </Form.Group>

      {/* <Divider className="mt-4">or log in with</Divider> */}
      {/* <SocialAuthButtons /> */}
    </Form>
  )
}

LoginForm.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
}

LoginForm.defaultProps = {
  layout: 'simple',
  hasLabel: false
}

export default LoginForm
