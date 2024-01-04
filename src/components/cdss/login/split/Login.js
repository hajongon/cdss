import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import LoginForm from '../LoginForm'
import AuthSplitLayout from 'layouts/AuthSplitLayout'
import bgImg from 'assets/img/cdss/login-bg-image.jpg'
import Flex from 'components/common/Flex'
import AppContext from 'context/Context'

const Login = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false)
  const { userInfo } = useContext(AppContext)

  useEffect(() => {
    if (userInfo.email) {
      setIsLogin(true)
    }
  }, [userInfo])

  useEffect(() => {
    if (isLogin) navigate('/system/cdss-main')
  }, [isLogin])

  return (
    <AuthSplitLayout bgProps={{ image: bgImg, position: '50% 20%' }}>
      <Flex alignItems="center" justifyContent="between">
        <h3>Login</h3>
        <p className="mb-0 fs--1">
          <span className="fw-semi-bold">New User? </span>
          <Link to="/authentication/split/register">Create account</Link>
        </p>
      </Flex>
      <LoginForm layout="split" hasLabel />
    </AuthSplitLayout>
  )
}

export default Login
