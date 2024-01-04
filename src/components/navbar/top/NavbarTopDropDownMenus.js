import React, { useContext, useEffect } from 'react'
import NavbarDropdown from './NavbarDropdown'
import {
  dashboardRoutes,
  appRoutes,
  pagesRoutes,
  modulesRoutes,
  documentationRoutes,
  systemRoutes
} from 'routes/siteMaps'
import { Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { flatRoutes } from 'helpers/utils'
import NavbarDropdownApp from './NavbarDropdownApp'
import NavbarDropdownPages from './NavbarDropdownPages'
import NavbarDropdownModules from './NavbarDropdownModules'
import AppContext from 'context/Context'
import communityMaps from 'routes/communityMaps'

const NavbarTopDropDownMenus = () => {
  const {
    config: { navbarCollapsed, showBurgerMenu },
    setConfig,
    communityRoutes,
    setCommunityRoutes,
    comNavData
  } = useContext(AppContext)

  const handleDropdownItemClick = () => {
    if (navbarCollapsed) {
      setConfig('navbarCollapsed', !navbarCollapsed)
    }
    if (showBurgerMenu) {
      setConfig('showBurgerMenu', !showBurgerMenu)
    }
  }

  const { fetchComNavData } = communityMaps()

  useEffect(() => {
    fetchComNavData()
  }, [])

  useEffect(() => {
    const newRoutes = {
      label: 'Community',
      children: comNavData
    }
    setCommunityRoutes(newRoutes)
  }, [comNavData])
  return (
    <>
      <NavbarDropdown title="dashboard">
        {dashboardRoutes.children[0].children.map(route => (
          <Dropdown.Item
            key={route.name}
            as={Link}
            className={route.active ? 'link-600' : 'text-500'}
            to={route.to}
            onClick={handleDropdownItemClick}
          >
            {route.name}
          </Dropdown.Item>
        ))}
      </NavbarDropdown>

      <NavbarDropdown title="app">
        <NavbarDropdownApp items={appRoutes.children} />
      </NavbarDropdown>

      <NavbarDropdown title="pages">
        <NavbarDropdownPages items={pagesRoutes.children} />
      </NavbarDropdown>
      <NavbarDropdown title="modules">
        <NavbarDropdownModules items={modulesRoutes.children} />
      </NavbarDropdown>

      <NavbarDropdown title="documentation">
        {flatRoutes(documentationRoutes.children).map(route => (
          <Dropdown.Item
            key={route.name}
            as={Link}
            className={route.active ? 'link-600' : 'text-500'}
            to={route.to}
            onClick={handleDropdownItemClick}
          >
            {route.name}
          </Dropdown.Item>
        ))}
      </NavbarDropdown>
      <NavbarDropdown title="community">
        {flatRoutes(communityRoutes.children).map(route => (
          <Dropdown.Item
            key={route.name}
            as={Link}
            className={route.active ? 'link-600' : 'text-500'}
            to={route.to}
            onClick={handleDropdownItemClick}
          >
            {route.name}
          </Dropdown.Item>
        ))}
      </NavbarDropdown>

      <NavbarDropdown title="system">
        {flatRoutes(systemRoutes.children).map(route => (
          <Dropdown.Item
            key={route.name}
            as={Link}
            className={route.active ? 'link-600' : 'text-500'}
            to={route.to}
            onClick={handleDropdownItemClick}
          >
            {route.name}
          </Dropdown.Item>
        ))}
      </NavbarDropdown>
    </>
  )
}

export default NavbarTopDropDownMenus
