import React, { useContext, useState, useEffect } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import FalconCardHeader from 'components/common/FalconCardHeader'
import AppContext from 'context/Context'
import { changeUserNickname } from 'components/user/apis/user'

const ProfileSettings = () => {
  const { userInfo, setUserInfo } = useContext(AppContext)
  const [formData, setFormData] = useState({
    nickname: '',
    // lastName: 'Hopkins',
    email: ''
    // phone: '+44098098304',
    // heading: 'Software Engineer',
    // intro:
    //  'Dedicated, passionate, and accomplished Full Stack Developer with 9+ years of progressive experience working as an Independent Contractor for Google and developing and growing my educational social network that helps others learn programming, web design, game development, networking. I’ve acquired a wide depth of knowledge and expertise in using my technical skills in programming, computer science, software development, and mobile app development to developing solutions to help organizations increase productivity, and accelerate business performance. It’s great that we live in an age where we can share so much with technology but I’m but I’m ready for the next phase of my career, with a healthy balance between the virtual world and a workplace where I help others face-to-face. There’s always something new to learn, especially in IT-related fields. People like working with me because I can explain technology to everyone, from staff to executives who need me to tie together the details and the big picture. I can also implement the technologies that successful projects need.'
  })

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const response = await changeUserNickname(
      `/user/${userInfo.idx}/nickname`,
      formData
    )
    if (response === 'success') {
      alert('회원정보가 변경되었습니다.')
      const newUserInfo = {
        ...userInfo,
        nickname: formData.nickname
      }
      setUserInfo(newUserInfo)
    } else {
      alert('회원 정보 변경에 실패했습니다.')
    }
  }

  // userInfo가 변경될 때마다 formData 업데이트
  useEffect(() => {
    if (userInfo) {
      setFormData({
        nickname: userInfo.nickname || '',
        email: userInfo.email || ''
      })
    }
  }, [userInfo])

  return (
    <Card>
      <FalconCardHeader title="Profile Settings" />
      <Card.Body className="bg-light">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={6} controlId="firstName">
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nickname"
                value={formData.nickname}
                name="nickname"
                onChange={handleChange}
              />
            </Form.Group>
            {/* 
            <Form.Group as={Col} lg={6} controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                name="lastName"
                onChange={handleChange}
              />
            </Form.Group> */}
          </Row>
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={6} controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={formData.email}
                disabled
                name="email"
                onChange={handleChange}
              />
            </Form.Group>
            {/*             
            <Form.Group as={Col} lg={6} controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone"
                value={formData.phone}
                name="phone"
                onChange={handleChange}
              />
            </Form.Group> */}
          </Row>

          {/* <Form.Group className="mb-3" controlId="heading">
            <Form.Label>Heading</Form.Label>
            <Form.Control
              type="text"
              placeholder="Heading"
              value={formData.heading}
              name="heading"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="intro">
            <Form.Label>Intro</Form.Label>
            <Form.Control
              as="textarea"
              rows={13}
              placeholder="Intro"
              value={formData.intro}
              name="intro"
              onChange={handleChange}
            />
          </Form.Group> */}
          <div className="text-end">
            <Button variant="primary" type="submit">
              Update
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default ProfileSettings
