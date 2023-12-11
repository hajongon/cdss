import AppContext from 'context/Context'
import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { checkAutoLogin, logIn } from '../apis/Auth'

const LoginForm = ({ hasLabel, layout }) => {
  const navigate = useNavigate()

  const { setIsLogin } = useContext(AppContext)

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
      `${process.env.REACT_APP_API_USER_URL}/login`,
      userInfo
    )

    if (logInResponse.data === 'success') {
      navigate('/system/cdss-main')
      setIsLogin(true)
      toast.success(`Logged in as ${formData.email}`, {
        theme: 'colored'
      })
    } else if (logInResponse.data === 'email-error') {
      console.log(logInResponse)
      toast.error(`해당 유저가 존재하지 않습니다.`, {
        theme: 'colored'
      })
    } else if (logInResponse.data === 'pw-error') {
      toast.error(`비밀번호가 일치하지 않습니다.`, {
        theme: 'colored'
      })
    } else {
      toast.error(`문제가 발생했습니다. 잠시 후 다시 시도해주세요.`, {
        theme: 'colored'
      })
    }
  }

  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    const authCheck = async () => {
      const res = await checkAutoLogin()
      // console.log(res)
      if (res) {
        if (res.status === 'success') navigate('/system/cdss-main')
      }
    }
    authCheck()
  }, [])

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
