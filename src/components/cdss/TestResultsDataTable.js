import React from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { formatDate } from './utils/timeDateFunction'

const TestResultsDataTable = ({ data, title, hasNoDataError }) => {
  return (
    <Col lg={6} xs={12} md={6} xl={6}>
      <Row className="g-3 mb-3">
        <Col xl={3} lg={3} xs={3}>
          <div
            className={
              window.innerWidth >= 576
                ? 'fs--1 badge badge-soft-info h-100'
                : 'fs--2 badge badge-soft-info h-100'
            }
            style={{ width: 'fit-content' }}
          >
            {title}
          </div>
        </Col>
        <Col
          xl={6}
          lg={6}
          xs={6}
          md={6}
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          {!hasNoDataError && (
            <>
              <div className="fs--1 me-3">검사일시</div>
              <div className="fs--1">
                {data[0] && formatDate(data[0].spcdate)}
              </div>
            </>
          )}
        </Col>
      </Row>
      <Row className="g-3">
        <div
          className="scrollbar"
          style={{
            overflow: 'auto',
            height: window.innerWidth >= 576 ? '30dvh' : '10rem',
            fontSize: window.innerWidth >= 576 ? '0.83333rem' : '0.6rem'
          }}
        >
          {hasNoDataError ? (
            <div>해당 환자의 검사 내역이 없습니다.</div>
          ) : (
            <Table borderless size="sm">
              <thead className="customFixedHeader text-600">
                <tr>
                  <th>검사명</th>
                  <th>결과</th>
                  <th>정상구분</th>
                  <th>단위</th>
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
                      <td className="text-info">{dataItem.examname}</td>
                      <td>{dataItem.rsltnum}</td>
                      <td>{dataItem.normalfg}</td>
                      <td>{dataItem.unit}</td>
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
