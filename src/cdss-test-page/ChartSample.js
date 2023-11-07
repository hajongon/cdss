import { chartJsDefaultTooltip } from 'helpers/chartjs-utils'
import { rgbaColor, getColor } from './utils'
import { Bar } from 'react-chartjs-2'
import { Card } from 'react-bootstrap'
import FalconCardHeader from './FalconCardHeader'

function ChartSample() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          rgbaColor(getColor('secondary'), 0.2),
          rgbaColor(getColor('warning'), 0.2),
          rgbaColor(getColor('info'), 0.2),
          rgbaColor(getColor('success'), 0.2),
          rgbaColor(getColor('info'), 0.2),
          rgbaColor(getColor('primary'), 0.2)
        ],
        borderColor: [
          getColor('secondary'),
          getColor('warning'),
          getColor('info'),
          getColor('success'),
          getColor('info'),
          getColor('primary')
        ],
        borderWidth: 1
      }
    ]
  }

  const options = {
    plugins: {
      tooltip: chartJsDefaultTooltip()
    },
    scales: {
      x: {
        grid: {
          color: rgbaColor(getColor('black'), 0.1)
        }
      },
      y: {
        grid: {
          color: rgbaColor(getColor('black'), 0.1),
          drawBorder: true
        }
      }
    }
  }

  return (
    <Card className="bg-transparent shadow-none">
      <FalconCardHeader
        title="감염 예상 부위"
        titleClass="fs--1 fw-light bg-transparent"
      />
      <Card.Body className="bg-transparent fs--2">
        <Bar data={data} options={options} height={1000} width={1618} />
      </Card.Body>
    </Card>
  )
}

export default ChartSample
