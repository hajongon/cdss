// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import profileImg from 'assets/img/team/avatar.png'
import Avatar from 'components/common/Avatar'

const ProfileDropdown = () => {
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
          <Dropdown.Item as={Link} to="/cdss-login">
            Login
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default ProfileDropdown
