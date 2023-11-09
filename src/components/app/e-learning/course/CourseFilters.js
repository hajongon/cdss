import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SimpleBarReact from 'simplebar-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Collapse, Form, Image, Card, Row } from 'react-bootstrap'
import { courseFilters } from 'data/elearning/courseData'
import { slugifyText } from 'helpers/utils'
import Flex from 'components/common/Flex'
import SoftBadge from 'components/common/SoftBadge'
import BasicBarChart from 'components/doc-components/charts-example/echarts/bar-charts/BasicBarChart'
import PackedBubble from 'components/doc-components/charts-example/d3/PackedBubble'

const CourseFilters = () => {
  return (
    <Card className="course-filter">
      <SimpleBarReact style={{ height: '100%' }}>
        <Card.Body className="py-0">
          <Row className="mb-3">
            <BasicBarChart title="2023년 항생제 처방 순위" />
          </Row>
          <Row className="mb-3">
            <PackedBubble />
          </Row>
        </Card.Body>
      </SimpleBarReact>
    </Card>
  )
}

export default CourseFilters
