// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import profileImg from 'assets/img/team/avatar.png'
import Avatar from 'components/common/Avatar'
import AppContext from 'context/Context'
import { logOut } from 'components/cdss/apis/Auth'

const ProfileDropdown = () => {
  const navigate = useNavigate()
  const { isLogin } = useContext(AppContext)
  const handleClickLogOutBtn = async () => {
    const res = await logOut()
    if (!res.status) {
      alert('문제가 발생했습니다. 다시 로그인해주세요.')
      navigate('/')
    }
    if (res.status === 'success') {
      navigate('/')
    } else {
      alert('문제가 발생했습니다. 다시 로그인해주세요.')
      navigate('/')
    }
  }
  return (
    <Dropdown navbar={true} as="li">
      <Dropdown.Toggle
        bsPrefix="toggle"
        as={Link}
        to="#!"
        className="pe-0 ps-2 nav-link"
      >
        <Avatar src={profileImg} />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-caret dropdown-menu-card  dropdown-menu-end">
        <div className="bg-white rounded-2 py-2 dark__bg-1000">
          {/* <Dropdown.Item className="fw-bold text-warning" href="#!">
            <FontAwesomeIcon icon="crown" className="me-1" />
            <span>Go Pro</span>
          </Dropdown.Item> */}
          {/* <Dropdown.Divider /> */}
          {/* <Dropdown.Item href="#!">Set status</Dropdown.Item>
          <Dropdown.Item as={Link} to="#">
            Profile &amp; account
          </Dropdown.Item>
          {/* <Dropdown.Item href="#!">Feedback</Dropdown.Item> */}
          {/* <Dropdown.Divider /> */}
          {/* <Dropdown.Item as={Link} to="#">
            Settings
          </Dropdown.Item> */}
          {!isLogin ? (
            <Dropdown.Item as={Link} to="/cdss-login">
              Log in
            </Dropdown.Item>
          ) : (
            <Dropdown.Item onClick={handleClickLogOutBtn}>
              Log out
            </Dropdown.Item>
          )}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default ProfileDropdown
