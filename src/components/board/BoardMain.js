import React, { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import {
  Container,
  Table,
  Button,
  InputGroup,
  FormControl,
  Pagination,
  Overlay,
  Row,
  Col,
  Card
} from 'react-bootstrap'
import { getArticles, getBoard, getCodeALL, selectCode } from './apis/page'

const BoardMain = () => {
  const { boardId } = useParams()

  const location = useLocation()

  const newWritePath = `${location.pathname}/write`

  const [selectedOption, setSelectedOption] = useState('0')

  const [titleHeader, setTitleHeader] = useState([])

  const [boardInfo, setBoardInfo] = useState({})
  console.log(boardInfo)

  const [articles, setArticles] = useState([])

  const mod = true

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

  useEffect(() => {
    const fetchArticleData = async () => {
      const fetchedArticles = await getArticles(boardId)

      if (fetchedArticles.status === 'success') {
        setArticles(fetchedArticles.data)
      } else {
        console.log(fetchedArticles.error)
      }
    }

    fetchArticleData()
  }, [boardId])

  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지 상태
  const [inputPage, setInputPage] = useState('') // 입력된 페이지 번호
  const [showOverlay, setShowOverlay] = useState(false)
  const [target, setTarget] = useState(null)
  const itemsPerPage = 10 // 페이지당 아이템 수

  // 페이지 변경 이벤트 핸들러
  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber)
  }

  // 현재 페이지에 해당하는 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentData = articles.slice(indexOfFirstItem, indexOfLastItem)
  // 처음과 끝으로 이동하는 이벤트 핸들러
  const goToFirstPage = () => {
    setCurrentPage(1)
  }

  const goToLastPage = () => {
    setCurrentPage(Math.ceil(articles.length / itemsPerPage))
  }
  // 페이지 수 계산
  const pageCount = Math.ceil(articles.length / itemsPerPage)

  // 중간 페이지 범위 계산
  const middlePages = () => {
    const displayPages = 5 // 중앙에 표시할 페이지 수
    const middle = Math.ceil(displayPages / 2)
    let start = currentPage - middle + 1
    let end = currentPage + middle - 1

    if (start < 1) {
      start = 1
      end = Math.min(displayPages, pageCount)
    }

    if (end > pageCount) {
      start = Math.max(1, pageCount - displayPages + 1)
      end = pageCount
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index)
  }

  // 중앙 페이지 배열
  const middlePagesArray = middlePages()

  // 페이지 입력창 변경 이벤트 핸들러
  const handleInputChange = e => {
    setInputPage(e.target.value)
  }

  // 페이지 입력창에서 Enter 키 이벤트 핸들러
  const handleInputKeyDown = e => {
    if (e.key === 'Enter') {
      goToInputPage()
    }
  }

  // 입력된 페이지로 이동하는 함수
  const goToInputPage = () => {
    const inputPageNumber = parseInt(inputPage, 10)
    if (
      !isNaN(inputPageNumber) &&
      inputPageNumber >= 1 &&
      inputPageNumber <= pageCount
    ) {
      setCurrentPage(inputPageNumber)
    }
    setInputPage('')
    setShowOverlay(false)
  }

  const handleEllipsisClick = event => {
    // Toggle the visibility of InputGroup when Ellipsis is clicked
    setShowOverlay(!showOverlay)
    setTarget(event.target)
  }

  const handleClickOutside = event => {
    // Close the Overlay when clicking outside of it
    if (target && !target.contains(event.target)) {
      setShowOverlay(false)
    }
  }

  useEffect(() => {
    if (showOverlay) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showOverlay])

  const handleInputClick = e => {
    e.stopPropagation() // Input 클릭이벤트 전파 막기
  }

  return (
    <Container>
      <input type="hidden" id="board_id" value={boardId} />

      <Row>
        <Col lg={10} className="mx-auto">
          <Card>
            <Card.Header className="justify-content-start">
              <Row>
                <Col sm={2}>
                  <select
                    value={selectedOption}
                    onChange={handleSelectChange}
                    className="form-select form-select-md"
                    style={{ verticalAlign: 'middle' }}
                  >
                    <option value="0">전체</option>
                    {titleHeader !== undefined &&
                      titleHeader.map((item, index) => (
                        <option key={index} value={item.cd}>
                          {item.cdName}
                        </option>
                      ))}
                  </select>
                </Col>
                <Col sm={4}>
                  <input
                    type="text"
                    id="searchTxt"
                    data-kt-user-table-filter="search"
                    className="form-control form-control-solid"
                    placeholder="검색어를 입력하세요."
                  />
                </Col>
                <Col className="text-end">
                  {boardInfo.userRud > 3 && (
                    <Link
                      to={newWritePath}
                      state={{ boardInfo, titleHeader, mod: !mod }}
                      className="btn btn-primary"
                    >
                      글쓰기
                    </Link>
                  )}
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <div className="text-center">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>제목</th>
                      <th>작성자</th>
                      <th>작성일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map(item => (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <div className="d-flex justify-content-center">
                  <Pagination>
                    <Pagination.First onClick={goToFirstPage} />
                    <Pagination.Prev
                      onClick={() => handlePageChange(currentPage - 1)}
                    />

                    {currentPage > 1 && (
                      <>
                        {currentPage > 2 && (
                          <Pagination.Ellipsis onClick={handleEllipsisClick} />
                        )}
                      </>
                    )}

                    {middlePagesArray.map(number => (
                      <Pagination.Item
                        key={number}
                        active={number === currentPage}
                        onClick={() => handlePageChange(number)}
                      >
                        {number}
                      </Pagination.Item>
                    ))}

                    {currentPage < pageCount && (
                      <>
                        {currentPage < pageCount - 1 && (
                          <Pagination.Ellipsis onClick={handleEllipsisClick} />
                        )}
                      </>
                    )}

                    <Pagination.Next
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                    <Pagination.Last onClick={goToLastPage} />
                  </Pagination>

                  <Overlay
                    show={showOverlay}
                    target={target}
                    placement="bottom"
                    containerPadding={20}
                  >
                    <InputGroup
                      style={{
                        width: '200px',
                        backgroundColor: 'rgba(255, 255, 255, 1)'
                      }}
                    >
                      <FormControl
                        placeholder="페이지 번호"
                        value={inputPage}
                        onClick={handleInputClick}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        style={{ backgroundColor: 'white' }}
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={goToInputPage}
                      >
                        이동
                      </Button>
                    </InputGroup>
                  </Overlay>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default BoardMain
