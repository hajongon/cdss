import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Card } from 'react-bootstrap'
import { getBoard, getCodeALL, selectCode } from './apis/page'

const BoardMain = () => {
  const { boardId } = useParams()

  const [selectedOption, setSelectedOption] = useState('0')

  const [, setTitleHeader] = useState([])

  const [boardInfo, setBoardInfo] = useState({})

  const handleSelectChange = e => {
    setSelectedOption(e.target.value)
  }

  useEffect(() => {
    const fetchBoardInfo = async () => {
      const fetchedBoard = await getBoard(boardId)

      if (fetchedBoard.status === 'success') {
        setBoardInfo(fetchedBoard.data)
      } else {
        console.log(fetchedBoard.error)
      }
    }

    fetchBoardInfo()
  }, [boardId])

  useEffect(() => {
    const fetchCodeInfo = async () => {
      const fetchedCodes = await getCodeALL()
      if (fetchedCodes.status === 'success') {
        const selectCodeData = selectCode(fetchedCodes.data)
        setTitleHeader(selectCodeData[boardInfo.titleHeaderGroupCd])
      } else {
        console.log(fetchedCodes.error)
      }
    }
    fetchCodeInfo()
  }, [boardInfo])

  return (
    <div className="contetnt">
      <input type="hidden" id="board_id" value={boardId} />

      <Row className="g-5" xl={8}>
        <Col xl={12}>
          <Card>
            <Card.Header className="border-0 pt-6">
              <Card.Title className="flex-wrap">
                <div className="d-flex align-items-center my-1 me-5">
                  <select value={selectedOption} onChange={handleSelectChange}>
                    <option value="0">전체</option>
                    {/* {titleHeader.map((item, index) => (
                    <option key={index} value={item.cd}>
                      {item.cdName}
                    </option>
                  ))} */}
                  </select>
                </div>
                <div className="d-flex align-items-center my-1">
                  <span className="svg-icon svg-icon-1 ms-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <rect
                        opacity="0.5"
                        x="17.0365"
                        y="15.1223"
                        width="8.15546"
                        height="2"
                        rx="1"
                        transform="rotate(45 17.0365 15.1223)"
                        fill="currentColor"
                      ></rect>
                      <path
                        d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="searchTxt"
                    data-kt-user-table-filter="search"
                    className="form-control form-control-solid w-400px ps-14"
                    placeholder="검색어를 입력하세요."
                  />
                </div>
              </Card.Title>
            </Card.Header>
            {boardInfo.userRud > 4 && (
              <Link
                to={`${boardId}/write`}
                className="btn btn-primary er fs-6 px-8 py-4"
              >
                글쓰기
              </Link>
            )}
          </Card>
          <p>{boardId}</p>
        </Col>
      </Row>
    </div>
  )
}

export default BoardMain
