import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Form } from 'react-bootstrap'
import { findPassword } from 'components/user/apis/user'

const ForgetPasswordForm = () => {
  // State
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const [loadingToastId, setLoadingToastId] = useState(null) // 추가된 부분

  const handleSubmit = async e => {
    e.preventDefault()
    setIsButtonClicked(true)
    setIsLoading(true)

    if (email) {
      const reqBody = {
        email
      }
      const res = await findPassword(JSON.stringify(reqBody))

      if (res.status === 'success') {
        toast.success(`${email} 로 임시 비밀번호를 전송했습니다.`, {
          theme: 'colored'
        })
        // navigate('/')
      } else {
        toast.error(`메일 발송에 실패했습니다.`, {
          theme: 'colored'
        })
      }
      setIsButtonClicked(false)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isButtonClicked && isLoading) {
      const toastId = toast.loading(
        `${email} 로 메일을 전송중입니다. 잠시만 기다려주세요.`
      )
      setLoadingToastId(toastId)
    }
  }, [isButtonClicked, isLoading])

  // New useEffect hook to dismiss the toast
  useEffect(() => {
    if (!isLoading && loadingToastId) {
      toast.dismiss(loadingToastId)
      setLoadingToastId(null)
    }
  }, [isLoading, loadingToastId])

  return (
    <Form className="mt-4" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          placeholder={'Email address'}
          value={email}
          name="email"
          onChange={({ target }) => setEmail(target.value)}
          type="email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Button className="w-100" type="submit" disabled={!email}>
          Send reset link
        </Button>
      </Form.Group>

      <Link className="fs--1 text-600" to="#!">
        I can't recover my account using this page
        <span className="d-inline-block ms-1"> &rarr;</span>
      </Link>
    </Form>
  )
}

ForgetPasswordForm.propTypes = {
  layout: PropTypes.string
}

ForgetPasswordForm.defaultProps = { layout: 'simple' }

export default ForgetPasswordForm
