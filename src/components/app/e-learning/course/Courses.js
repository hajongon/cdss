import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  Button,
  Card,
  Col,
  Form,
  Offcanvas,
  OverlayTrigger,
  Row,
  Tooltip
} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames'
import AppContext, { CourseContext } from 'context/Context'
import usePagination from 'hooks/usePagination'
import CourseGrid from './CourseGrid'
import CourseList from './CourseList'
import CourseHeader from './CourseHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Flex from 'components/common/Flex'
import CourseFilters from './CourseFilters'
import { useBreakpoints } from 'hooks/useBreakpoints'
import PatientInfo from 'components/cdss/PatientInfo'
import PatientSymptom from 'components/cdss/PatientSymptom'
import SymptomSite from 'components/cdss/SymptomSite'
import TestResults from 'components/cdss/TestResults'
import AdrHistory from 'components/cdss/AdrHistory'
import AntibioticResistance from 'components/cdss/AntibioticResistance'

const Courses = () => {
  const [showFilterOffcanvas, setShowFilterOffcanvas] = useState(false)
  const [coursePerPage, setCoursePerPage] = useState(6)
  const navigate = useNavigate()
  const { breakpoints } = useBreakpoints()
  const { courseLayout } = useParams()
  const {
    coursesState: { courses }
  } = useContext(CourseContext)

  const {
    config: { isNavbarVerticalCollapsed },
    setConfig
  } = useContext(AppContext)
  const coursesNavbarVerticalCollapsed = useRef(isNavbarVerticalCollapsed)

  const {
    paginationState: {
      data: paginatedCourses,
      totalItems,
      itemsPerPage,
      currentPage,
      canNextPage,
      canPreviousPage,
      paginationArray
    },
    nextPage,
    prevPage,
    goToPage,
    setItemsPerPage
  } = usePagination(courses, coursePerPage)

  const layout = courseLayout.split(/-/)[1]
  const isList = layout === 'list'
  const isGrid = layout === 'grid'

  useEffect(() => {
    isList || isGrid || navigate('/errors/404')
  }, [])

  useEffect(() => {
    setConfig('isNavbarVerticalCollapsed', true)

    return () => {
      setConfig(
        'isNavbarVerticalCollapsed',
        coursesNavbarVerticalCollapsed.current
      )
    }
  }, [])

  return (
    <>
      <Row className="g-3">
        <Col xl={9}>
          {/* Courses */}
          <Row className="mb-3 g-3">
            <Col xs={12}>
              <PatientInfo />
            </Col>
          </Row>
          <Row className="mb-3 g-3">
            <Col md={6} xs={12}>
              <PatientSymptom />
            </Col>
            <Col md={6} xs={12}>
              <SymptomSite />
            </Col>
          </Row>
          <Row className="mb-3 g-3">
            <Col md={6} xs={12}>
              <TestResults />
            </Col>
            <Col md={6} xs={12}>
              <Row className="mb-3 g-3">
                <Col xs={12}>
                  <AdrHistory />
                </Col>
              </Row>
              <Row className="g-3">
                <Col xs={12}>
                  <AntibioticResistance />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col xl={3}>
          <CourseFilters />
        </Col>
      </Row>
    </>
  )
}

export default Courses
