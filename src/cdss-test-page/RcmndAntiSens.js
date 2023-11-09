import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'
import AdvanceTableWrapper from './advance-table/AdvanceTableWrapper'
import AdvanceTable from './advance-table/AdvanceTable'
import { Link } from 'react-router-dom'
import { faCapsules } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const columns = [
  {
    accessor: 'path',
    Header: '항생제 성분명',
    Cell: rowData => (
      <Link to="#!" className="text-primary fw-semi-bold">
        {rowData.row.original.path}
      </Link>
    )
  },
  {
    accessor: 'views',
    Header: '항생제 투약 방법',
    headerProps: {
      className: 'text-end'
    },
    cellProps: {
      className: 'text-end'
    }
  },
  {
    accessor: 'time',
    Header: '항생제 투약 약제',
    headerProps: {
      className: 'text-end'
    },
    cellProps: {
      className: 'text-end'
    }
  },
  {
    accessor: 'exitRate',
    Header: '처방 기간',
    headerProps: {
      className: 'text-end'
    },
    cellProps: {
      className: 'text-end'
    }
  }
]

const RcmndAntiSens = ({ title, tableData, perPage = 4 }) => {
  return (
    <AdvanceTableWrapper
      columns={columns}
      data={tableData}
      pagination
      perPage={perPage}
    >
      <Card className="border border-300 shadow-none">
        <Card.Header className="bg-200">
          {/* <Row> */}
          <h6 className="fs--1 mb-0 text-nowrap py-2 py-xl-0">
            <FontAwesomeIcon icon={faCapsules} />
            <span className="ps-2">{title}</span>
          </h6>
          {/* </Row> */}
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

RcmndAntiSens.propTypes = {
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      path: PropTypes.string.isRequired,
      views: PropTypes.number.isRequired,
      time: PropTypes.string.isRequired,
      exitRate: PropTypes.string.isRequired
    })
  ).isRequired,
  perPage: PropTypes.number,
  title: PropTypes.string.isRequired
}

export default RcmndAntiSens
