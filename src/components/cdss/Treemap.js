import PropTypes from 'prop-types'
import React from 'react'
import { useState, useRef, useEffect } from 'react'
import * as d3 from 'd3'
import FalconComponentCard from './utils/FalconComponentCard'
import './Treemap.css'

import { Card } from 'react-bootstrap'

function Treemap({ data, height }) {
  const svgRef = useRef(null)
  const legendRef = useRef(null)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  function renderTreemap(width) {
    const svg = d3.select(svgRef.current)
    svg.selectAll('g').remove()

    const legendContainer = d3.select(legendRef.current)
    legendContainer.selectAll('g').remove()

    svg.attr('width', '100%').attr('height', height)

    // create root node -- jsha
    const root = d3
      .hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value)

    // create treemap layout -- jsha
    const treemapRoot = d3.treemap().size([width, height]).padding(1)(root)

    // create 'g' element nodes based on data -- jsha

    const nodes = svg
      .selectAll('g')
      .data(treemapRoot.leaves())
      .join('g')
      .attr('transform', d => `translate(${d.x0},${d.y0})`)

    // create color scheme and fader -- jsha
    // const fader = color => d3.interpolateRgb(color, '#fff')(0.4) -- jsha
    const colorScale = d3.scaleOrdinal(['#2c7be5', '#1956A6'])

    // add treemap rects -- jsha
    nodes
      .append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => colorScale(d.data.category))

    const fontSize = 8
    const legendFontSize = 10

    // add text to rects -- jsha
    nodes
      .append('text')
      .text(d => `${d.data.name} ${d.data.value}`)
      .attr('data-width', d => d.x1 - d.x0)
      .attr('font-size', `${fontSize}px`)
      // 각 element에 패딩을 주려면 x, y 옆 param으로 숫자를 입력하면 됨 -- jsha
      .attr('x', 3)
      .attr('y', fontSize + 3)
      .style('fill', 'white') // Set font color to white -- jsha
      .style('font-weight', 'light') // Set font weight to bold (or any other desired value) -- jsha
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

    // pull out hierarchy categories -- jsha
    let categories = root.leaves().map(node => node.data.category)
    categories = categories.filter(
      (category, index, self) => self.indexOf(category) === index
    )

    legendContainer.attr('width', width).attr('height', height / 4)

    // create 'g' elements based on categories -- jsha
    const legend = legendContainer.selectAll('g').data(categories).join('g')

    // create 'rects' for each category -- jsha
    legend
      .append('rect')
      .attr('width', legendFontSize)
      .attr('height', legendFontSize)
      .attr('x', legendFontSize)
      .attr('y', (_, i) => legendFontSize * 2 * i)
      .attr('fill', d => colorScale(d))

    // add text to each category key -- jsha
    legend
      .append('text')
      .attr('transform', `translate(0, ${legendFontSize})`)
      .attr('x', legendFontSize * 2.5)
      .attr('y', (_, i) => legendFontSize * 2 * i - 2)
      .style('font-size', legendFontSize)
      .text(d => d)
  }

  useEffect(() => {
    if (svgRef.current.clientWidth) renderTreemap(svgRef.current.clientWidth)
  }, [data, height, windowWidth])

  // Add a window resize event listener to update windowWidth -- jsha
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Card className="mb-3 g-3 h-100">
      <FalconComponentCard.Header
        title="항생제 처방 차트"
        className="bg-light"
      />
      <Card.Body className="bg-white pb-2 pt-2">
        <svg ref={svgRef} className="custom-svg" />
        <svg ref={legendRef} />
      </Card.Body>
    </Card>
  )
}

// Add PropTypes validation for 'data' and 'height' props -- jsha
Treemap.propTypes = {
  data: PropTypes.object.isRequired, // Adjust the PropTypes type as needed -- jsha
  height: PropTypes.number.isRequired // Adjust the PropTypes type as needed -- jsha
}

export default Treemap
