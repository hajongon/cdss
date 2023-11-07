import { useRef, useEffect, useContext } from 'react'
import * as d3 from 'd3'
import FalconComponentCard from './FalconComponentCard'
import FalconCardBody from './FalconCardBody'
import AppContext from 'context/Context'

export default function Treemap({ data, width, height }) {
  const svgRef = useRef(null)
  const legendRef = useRef(null)

  const { noDataError } = useContext(AppContext)

  function renderTreemap() {
    const svg = d3.select(svgRef.current)
    svg.selectAll('g').remove()

    const legendContainer = d3.select(legendRef.current)
    legendContainer.selectAll('g').remove()

    svg.attr('width', width).attr('height', height)

    // create root node
    const root = d3
      .hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value)

    // create treemap layout
    const treemapRoot = d3.treemap().size([width, height]).padding(1)(root)

    // create 'g' element nodes based on data

    const nodes = svg
      .selectAll('g')
      .data(treemapRoot.leaves())
      .join('g')
      .attr('transform', d => `translate(${d.x0},${d.y0})`)

    // create color scheme and fader
    const fader = color => d3.interpolateRgb(color, '#fff')(0.4)
    const colorScale = d3.scaleOrdinal([
      '#1956A6',
      '#2A7BE4' // 한 단계 어둡게
    ])

    // add treemap rects
    nodes
      .append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => colorScale(d.data.category))

    const fontSize = 8
    const legendFontSize = 10

    // add text to rects
    nodes
      .append('text')
      .text(d => `${d.data.name} ${d.data.value}`)
      .attr('data-width', d => d.x1 - d.x0)
      .attr('font-size', `${fontSize}px`)
      // 각 element에 패딩을 주려면 x, y 옆 param으로 숫자를 입력하면 됨
      .attr('x', 3)
      .attr('y', fontSize + 3)
      .style('fill', 'white') // Set font color to white
      .style('font-weight', 'light') // Set font weight to bold (or any other desired value)
      .call(wrapText)

    function wrapText(selection) {
      selection.each(function () {
        const node = d3.select(this)
        const rectWidth = +node.attr('data-width')
        let word
        const words = node.text().split(' ').reverse()
        let line = []
        let lineNumber = 0
        const x = node.attr('x')
        const y = node.attr('y')
        let tspan = node.text('').append('tspan').attr('x', x).attr('y', y)
        while (words.length > 1) {
          word = words.pop()
          line.push(word)
          tspan.text(line.join(' '))
          const tspanLength = tspan.node().getComputedTextLength()
          if (tspanLength > rectWidth && line.length !== 1) {
            line.pop()
            tspan.text(line.join(' '))
            line = [word]
            tspan = addTspan(word)
          }
        }
        addTspan(words.pop())

        function addTspan(text) {
          lineNumber += 1
          return node
            .append('tspan')
            .attr('x', x)
            .attr('y', y)
            .attr('dy', `${lineNumber * fontSize}px`)
            .text(text)
        }
      })
    }

    // pull out hierarchy categories
    let categories = root.leaves().map(node => node.data.category)
    categories = categories.filter(
      (category, index, self) => self.indexOf(category) === index
    )

    legendContainer.attr('width', width).attr('height', height / 4)

    // create 'g' elements based on categories
    const legend = legendContainer.selectAll('g').data(categories).join('g')

    // create 'rects' for each category
    legend
      .append('rect')
      .attr('width', legendFontSize)
      .attr('height', legendFontSize)
      .attr('x', legendFontSize)
      .attr('y', (_, i) => legendFontSize * 2 * i)
      .attr('fill', d => colorScale(d))

    // add text to each category key
    legend
      .append('text')
      .attr('transform', `translate(0, ${legendFontSize})`)
      .attr('x', legendFontSize * 2.5)
      .attr('y', (_, i) => legendFontSize * 2 * i - 2)
      .style('font-size', legendFontSize)
      .text(d => d)
  }

  useEffect(() => {
    renderTreemap()
  }, [data])

  return (
    <FalconComponentCard className="h-100 ps-0 pe-0 shadow-none bg-transparent">
      <FalconComponentCard.Header
        title="항생제 처방 이력"
        light={false}
        charts={true}
        className="bg-transparent"
      />
      <FalconCardBody className="bg-transparent">
        {noDataError.hist ? (
          <div>해당 환자의 처방 이력이 없습니다.</div>
        ) : (
          <>
            <svg ref={svgRef} />
            <svg ref={legendRef} style={{ marginTop: '10px ' }} />
          </>
        )}
      </FalconCardBody>
    </FalconComponentCard>
  )
}
