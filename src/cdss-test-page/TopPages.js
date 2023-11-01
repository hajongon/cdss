import React from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col } from 'react-bootstrap'
import AdvanceTableWrapper from './advance-table/AdvanceTableWrapper'
import AdvanceTable from './advance-table/AdvanceTable'
import { Link } from 'react-router-dom'

const columns = [
  {
    accessor: 'path',
    Header: 'Page Path',
    Cell: rowData => (
      <Link to="#!" className="text-primary fw-semi-bold">
        {rowData.row.original.path}
      </Link>
    )
  },
  {
    accessor: 'views',
    Header: 'Page Views',
    headerProps: {
      className: 'text-end'
    },
    cellProps: {
      className: 'text-end'
    }
  },
  {
    accessor: 'time',
    Header: 'Avg Time on Page',
    headerProps: {
      className: 'text-end'
    },
    cellProps: {
      className: 'text-end'
    }
  },
  {
    accessor: 'exitRate',
    Header: 'Exit Rate',
    headerProps: {
      className: 'text-end'
    },
    cellProps: {
      className: 'text-end'
    }
  }
]

const TopPages = ({ title, tableData, perPage = 4 }) => {
  return (
    <AdvanceTableWrapper
      columns={columns}
      data={tableData}
      pagination
      perPage={perPage}
    >
      <Card className="border border-300 shadow-none">
        <Card.Header className="bg-200">
          <Row className="flex-between-center">
            <Col xs="auto" sm={12} lg={12}>
              <h6 className="fs--1 mb-0 text-nowrap py-2 py-xl-0">{title}</h6>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="p-0">
          <AdvanceTable
            table
            headerClassName="bg-transparent text-900 text-nowrap align-middle"
            rowClassName="align-middle white-space-nowrap"
            tableProps={{
              className: 'fs--2 mb-0 overflow-hidden'
            }}
          />
        </Card.Body>
      </Card>
    </AdvanceTableWrapper>
  )
}

TopPages.propTypes = {
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      path: PropTypes.string.isRequired,
      views: PropTypes.number.isRequired,
      time: PropTypes.string.isRequired,
      exitRate: PropTypes.string.isRequired
    })
  ).isRequired,
  perPage: PropTypes.number
}

export default TopPages
