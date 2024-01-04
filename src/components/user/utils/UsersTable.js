import React, { useEffect, useState } from 'react'
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper'
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox'
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter'
import AdvanceTable from 'components/common/advance-table/AdvanceTable'
import { Row, Col, Button } from 'react-bootstrap'
import { getUsersList } from '../apis/user'
import SignupModal from '../../authentication/SignupModal'

function UsersTable() {
  const [usersList, setUsersList] = useState([])
  useEffect(() => {
    const fetchUserList = async () => {
      const { data } = await getUsersList()
      if (data) setUsersList(data)
    }
    fetchUserList()
  }, [])
  const columns = [
    {
      accessor: 'userNm',
      Header: '사용자 ID'
    },
    {
      accessor: 'nickname',
      Header: '사용자 이름'
    },
    {
      accessor: 'email',
      Header: '이메일'
    },
    {
      accessor: 'isAdmin',
      Header: '유저 권한'
    },
    {
      accessor: 'createDate',
      Header: '등록일'
    }
  ]

  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <SignupModal show={show} setShow={setShow} />
      <AdvanceTableWrapper
        columns={columns}
        data={usersList}
        sortable
        pagination
        perPage={5}
      >
        <Row className="flex-end-center mb-3">
          <Col xs="auto" sm={6} lg={4}>
            <AdvanceTableSearchBox table />
          </Col>
          <Col xs="auto" sm={6} lg={4}>
            <Button
              variant="primary"
              className="px-4 ms-2"
              onClick={handleShow}
            >
              Add User
            </Button>
          </Col>
        </Row>
        <AdvanceTable
          table
          headerClassName="bg-200 text-900 text-nowrap align-middle"
          rowClassName="align-middle white-space-nowrap"
          tableProps={{
            bordered: true,
            striped: true,
            className: 'fs--1 mb-0 overflow-hidden'
          }}
        />
        <div className="mt-3">
          <AdvanceTableFooter
            rowCount={usersList.length || 0}
            table
            rowInfo
            navButtons
            rowsPerPageSelection
          />
        </div>
      </AdvanceTableWrapper>
    </>
  )
}

export default UsersTable
