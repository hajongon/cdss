import React, { useRef, useEffect } from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { formatDate } from './utils/timeDateFunction'

const TestResultsDataTable = ({ data, title, hasNoDataError }) => {
  const scrollRef = useRef(null)
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [data])
  return (
    <Col lg={4} xs={12} md={12} xl={4}>
      <Row className="g-3 mb-3">
        <Col xl={4} lg={4} xs={4}>
          <div
            className="fs--2 badge badge-soft-info h-100"
            style={{ width: 'fit-content' }}
          >
            {title}
          </div>
        </Col>
        <Col
          xl={8}
          lg={8}
          xs={8}
          md={8}
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          {!hasNoDataError && (
            <>
              <div className="fs--2 me-3">검사일시</div>
              <div className="fs--2">
                {data[0] && formatDate(data[0].spcdate)}
              </div>
            </>
          )}
        </Col>
      </Row>
      <Row className="g-3">
        <div className="scrollbar fs--2" ref={scrollRef}>
          {hasNoDataError ? (
            <div>해당 환자의 검사 내역이 없습니다.</div>
          ) : (
            <Table borderless size="sm">
              <thead className="customFixedHeader text-600">
                <tr>
                  <th>검사명</th>
                  <th>결과</th>
                  <th>단위</th>
                  <th>정상구분</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className={
                    window.innerWidth >= 576
                      ? 'sticky-border'
                      : 'sticky-border-sm'
                  }
                ></tr>
                {data.map((dataItem, idx) => {
                  return (
                    <tr key={idx}>
                      <td
                        className={
                          dataItem.examcode.length === 10
                            ? 'text-info ps-4'
                            : 'text-info'
                        }
                      >
                        {dataItem.examname}
                      </td>
                      <td>{dataItem.rsltnum}</td>
                      <td>{dataItem.unit}</td>
                      <td>{dataItem.normalfg}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          )}
        </div>
      </Row>
    </Col>
  )
}

TestResultsDataTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      spcdate: PropTypes.string, // Assuming spcdate is a string
      examname: PropTypes.string, // Assuming examname is a string
      rsltnum: PropTypes.number, // Assuming rsltnum is a number
      ordname: PropTypes.string, // Assuming ordname is a string
      unit: PropTypes.string // Assuming unit is a string
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  hasNoDataError: PropTypes.bool.isRequired
}

export default TestResultsDataTable
