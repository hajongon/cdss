import { changeUserPassword } from 'components/user/apis/user'
import FalconCardHeader from 'components/common/FalconCardHeader'
import AppContext from 'context/Context'
import React, { useContext, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'

const ChangePassword = () => {
  const { userInfo } = useContext(AppContext)

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmPassword) {
      alert('입력한 두개의 새 비밀번호가 서로 일치하지 않습니다.')
    } else {
      const requestBody = JSON.stringify({
        email: userInfo.email,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword
      })
      const response = await changeUserPassword(
        `/user/${userInfo.idx}/pw`,
        requestBody
      )
      if (response === 'success') {
        alert('비밀번호가 변경되었습니다.')
        const resetFormData = {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        }
        setFormData(resetFormData)
      }
    }
  }

  return (
    <Card className="mb-3">
      <FalconCardHeader title="Change Password" />
      <Card.Body className="bg-light">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="oldPassword">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              value={formData.oldPassword}
              name="oldPassword"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={formData.newPassword}
              name="newPassword"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={formData.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
            />
          </Form.Group>
          <Button className="w-100" type="submit">
            Update Password
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default ChangePassword
