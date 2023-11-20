import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import AppContext from 'context/Context'
import BasicBarChart from './BasicBarChart'
import EChartsTreemap from './EChartsTreemap'

const CdssCharts = () => {
  const { barChartPersonalData } = useContext(AppContext)

  return (
    <div className="p-2">
      <Row className="g-3 mb-3">
        <Col xl={6} lg={6} xs={12} md={6}>
          <EChartsTreemap height={500} />
          {/* <Treemap data={allOrdCount} height={400} /> */}
        </Col>
        <Col xl={6} lg={6} xs={12} md={6}>
          <BasicBarChart title="처방 순위" chartData={barChartPersonalData} />
        </Col>
      </Row>
    </div>
  )
}

export default CdssCharts
