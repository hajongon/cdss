import React, { useState } from 'react'
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
import TestResults from 'components/cdss/TestResults'
import AdrHistory from 'components/cdss/AdrHistory'
import AntibioticResistance from 'components/cdss/AntibioticResistance'
import './index.css'
import DiagnosticResult from 'components/cdss/DiagnosticResult'
import { Button } from 'react-bootstrap'

const Dashboard = () => {
  const [showResult, setShowResult] = useState(false)
  return (
    <>
      {/* 
    
      <PatientInfo setShowResult={setShowResult} />
      {showResult ? <DiagnosticResult setShowResult={setShowResult} /> : null}
      <PatientSymptom />
      <SymptomSite />
      <TestResults />
      <AdrHistory />
      <AntibioticResistance />
      <BasicBarChart title="2023년 내복약 항생제 처방 순위" />
      <PackedBubble />
    
    */}

      <>
        <Row className="g-3 mb-3">
          <Col md={8} xxl={8}>
            <PatientInfo setShowResult={setShowResult} />
          </Col>
          <Col md={4} xxl={4}>
            <BasicBarChart title="2023년 내복약 항생제 처방 순위" />
          </Col>
        </Row>
      </>
    </>
  )
}

export default Dashboard
