import React from 'react'
import WeeklySales from './WeeklySales'
import { Row, Col } from 'react-bootstrap'
import {
  marketShare,
  totalOrder,
  totalSales,
  weeklySalesData,
  weather,
  products,
  storageStatus,
  files,
  users,
  topProducts,
  runningProjects
} from 'data/dashboard/default'

import TotalOrder from './TotalOrder'
import MarketShare from './MarketShare'
import TotalSales from './TotalSales'
import RunningProjects from './RunningProjects'
import StorageStatus from './StorageStatus'
import SpaceWarning from './SpaceWarning'
import BestSellingProducts from './BestSellingProducts'
import SharedFiles from './SharedFiles'
import ActiveUsers from './ActiveUsers'
import BandwidthSaved from './BandwidthSaved'
import TopProducts from './TopProducts'
import Weather from './Weather'
import BasicBarChart from 'components/doc-components/charts-example/echarts/bar-charts/BasicBarChart'
import PackedBubble from 'components/doc-components/charts-example/d3/PackedBubble'
import PatientInfo from 'components/cdss/PatientInfo'
import PatientSymptom from 'components/cdss/PatientSymptom'
import SymptomSite from 'components/cdss/SymptomSite'

const Dashboard = () => {
  return (
    <>
      <Row className="g-3 mb-3">
        <Col md={8} xxl={3}>
          <Row className="g-3 mb-3">
            <Col md={8} xxl={3}>
              <PatientInfo />
            </Col>
          </Row>
          <Row className="g-3 mb-3">
            <Col md={8} xxl={3}>
              <Row className="g-3 mb-3">
                <Col md={6} xxl={3}>
                  <PatientSymptom />
                </Col>
                <Col md={6} xxl={3}>
                  <SymptomSite />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md={4} xxl={3}>
          <Row className="g-3 mb-3">
            <Col md={8} xxl={3}>
              <BasicBarChart title="2023년 내복약 항생제 처방 순위" />
            </Col>
          </Row>
          <Row className="g-3 mb-3">
            <Col md={8} xxl={3}>
              <PackedBubble />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard
