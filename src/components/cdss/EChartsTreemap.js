import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { TreemapChart } from 'echarts/charts'
import { TooltipComponent, GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { Card } from 'react-bootstrap'
import FalconComponentCard from './utils/FalconComponentCard'
import AppContext from 'context/Context'

// ECharts 모듈 등록
echarts.use([TreemapChart, TooltipComponent, GridComponent, CanvasRenderer])

function EChartsTreemap({ data, height }) {
  const { eChartsTreemapData } = useContext(AppContext)
  const [option, setOption] = useState({})

  useEffect(() => {
    // ECharts 옵션 설정
    const echartOption = {
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'treemap',
          data: eChartsTreemapData,
          // 다른 ECharts 트리맵 설정
          label: {
            show: true, // 레이블 표시 여부
            formatter: function (params) {
              // params.name은 데이터 항목의 이름, params.value는 값(value)을 나타냄
              return `\n${params.name}\n\n${params.value}`
            }
          },
          // 브레드크럼 설정 비활성화
          breadcrumb: {
            show: false
          }
        }
      ]
    }
    setOption(echartOption)
  }, [data, height])

  return (
    <Card className="mb-3 g-3 h-100">
      <FalconComponentCard.Header
        title="항생제 처방 차트"
        className="bg-light"
      />
      <Card.Body className="bg-white pb-2 pt-2">
        <ReactEChartsCore
          echarts={echarts}
          option={option}
          style={{ height: height, width: '100%' }}
        />
      </Card.Body>
    </Card>
  )
}

EChartsTreemap.propTypes = {
  data: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired
}

export default EChartsTreemap
