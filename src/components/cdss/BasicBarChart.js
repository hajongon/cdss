import FalconComponentCard from './utils/FalconComponentCard'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import { BarChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { tooltipFormatter } from 'helpers/echart-utils'
import { getColor } from 'helpers/utils'
import PropTypes from 'prop-types'
import React from 'react'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  LegendComponent
])

const BasicBarChart = ({ title, chartData }) => {
  // barChartData를 배열로 변환하고 내림차순으로 정렬 -- jsha
  const sortedData = Object.entries(chartData).sort((a, b) => a[1] - b[1])

  // 정렬된 데이터에서 레이블과 카운트를 추출 -- jsha
  const antibioticLabels = JSON.stringify(sortedData.map(item => item[0]))
  const antibioticCounts = JSON.stringify(sortedData.map(item => item[1]))

  const chartCode = `function ChartOptions() {

    const getOption = () => ({
       tooltip: {
          trigger: 'axis',
          padding: [7, 10],
          backgroundColor: getColor('gray-100'),
          borderColor: getColor('gray-300'),
          textStyle: { color: getColor('dark') },
          borderWidth: 1,
          formatter: tooltipFormatter,
          transitionDuration: 0,
          axisPointer: {
            type: 'none'
          }
        },
        yAxis: {
          type: 'category',
          data: ${antibioticLabels},
          axisLine: {
            lineStyle: {
              color: getColor('gray-300'),
              type: 'solid'
            }
          },
          axisTick: { show: false },
          axisLabel: {
            color: getColor('gray-400'),
            formatter: value => value.substring(0, 3),
            margin: 15
          },
          splitLine: {
            show: false
          }
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            color: getColor('gray-400'),
            margin: 15
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: getColor('gray-200')
            }
          },
          axisTick: { show: false },
          axisLine: { show: false },
          min: 0
        },
        series: [
          {
            type: 'bar',
            name: 'Total',
            data: ${antibioticCounts},
            lineStyle: { color: getColor('primary') },
            itemStyle: {
              color: getColor('primary'),
              borderRadius: [3, 3, 0, 0]
            },
            showSymbol: false,
            symbol: 'circle',
            smooth: false,
            emphasis: {
              scale: true
            }
          }
        ],
        grid: { right: '3%', left: '15%', bottom: '10%', top: '5%' }
      });
      return (
        <ReactEChartsCore
          echarts={echarts}
          option={getOption()}
          style={{ height: '30.75rem' }}
        />
      );
    }
  `

  return (
    <FalconComponentCard className="mb-3 g-3 h-100">
      <FalconComponentCard.Header title={title} className="bg-light" />
      <FalconComponentCard.Body
        className="bg-white"
        code={chartCode}
        language="jsx"
        scope={{
          ReactEChartsCore,
          echarts,
          getColor,
          tooltipFormatter
        }}
      />
    </FalconComponentCard>
  )
}

BasicBarChart.propTypes = {
  title: PropTypes.string.isRequired,
  chartData: PropTypes.array.isRequired
}

export default BasicBarChart
