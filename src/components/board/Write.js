import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReactQuill from 'react-quill'
import { Container, Row, Col, Card } from 'react-bootstrap'
import 'react-quill/dist/quill.snow.css'

const Write = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const location = useLocation()
  const { state } = location
  console.log(state)
  const { boardInfo, titleHeader, mod, articleInfo } = state
  const [selectedOption, setSelectedOption] = useState('0')
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ align: [] }, { color: [] }, { background: [] }],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' }
        ],
        ['link', 'image']
      ]
    }
  }

  const handleSelectChange = e => {
    setSelectedOption(e.target.value)
  }

  const handleUpload = () => {
    // 업로드 버튼 클릭 시 수행할 동작
    // 예: 서버로 데이터 전송 등
  }

  const handleCancel = () => {
    if (mod) {
      // 만약 mod가 true이면, 특별한 동작을 수행하도록 설정
      // 예: 편집 모드에서 취소 버튼을 눌렀을 때의 동작
      console.log('취소 - 편집 모드')
      // 추가로 수행할 동작을 여기에 추가하세요.
    } else {
      // mod가 false이면, 일반적인 취소 동작을 수행
      console.log('일반적인 취소 동작')
      // 추가로 수행할 동작을 여기에 추가하세요.
      const redirectUrl = `/board/main/${boardInfo.boardId}`

      // 리다이렉트
      window.location.href = redirectUrl
    }
  }
  return (
    <Container>
      <input type="hidden" id="board_id" value={boardInfo.boardId} />

      <Row className="g-5 g-xl-8">
        <Col xl={12}>
          <Card className="mb-xl-8">
            <Card.Header border="0" pt="6">
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
                    id="title"
                    name="title"
                    className="form-control"
                    value={mod ? articleInfo.articleTitle : title}
                    placeholder="제목을 입력하세요."
                    maxLength="100"
                    onChange={e => setTitle(e.target.value)}
                  />
                </Col>

                <Col className="text-end">
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    id="uploadButton"
                    onClick={handleUpload}
                  >
                    업로드
                  </button>

                  <button
                    type="button"
                    className="btn btn-warning"
                    id="cancelButton"
                    onClick={handleCancel}
                  >
                    취소
                  </button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {/* Document Editor */}
              <ReactQuill
                style={{ border: '1px solid #97a2ad', height: '450px' }}
                className="mt-1"
                modules={modules}
                onChange={setContent}
              />
              {/* {mod ? (
                  <span>{articleInfo.articleContent}</span>
                ) : (
                  <span>{content}</span>
                )} */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Write
