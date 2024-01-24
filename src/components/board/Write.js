import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import {
  addArticles,
  getArticle,
  getBoard,
  getCodeALL,
  selectCode,
  uploadImage
} from './apis/page'
import ReactQuill, { Quill } from 'react-quill'
import ImageResize from '@looop/quill-image-resize-module-react'
import 'react-quill/dist/quill.snow.css'
import loadingImg from './images/loading.gif'

const Write = () => {
  const { boardId, articleIdx } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [selectedOption, setSelectedOption] = useState('0')
  const [titleHeader, setTitleHeader] = useState([])
  const [boardInfo, setBoardInfo] = useState({})
  const [articleInfo, setArticleInfo] = useState({})
  const [searchParams] = useSearchParams()
  const mod = searchParams.get('mod')
  const [content, setContent] = useState('')
  const quillRef = useRef(null)

  const toolbarOptions = [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['blockquote'],
    [{ align: [] }]
  ]

  const formats = [
    'header',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'background',
    'color',
    'link',
    'image',
    'video',
    'width'
  ]

  Quill.register('modules/imageResize', ImageResize)

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: toolbarOptions
      },
      imageResize: {
        modules: ['Resize']
      }
    }
  }, [])

  const handleSelectChange = e => {
    setSelectedOption(e.target.value)
  }

  const handleUpload = async () => {
    if (!title) {
      alert('제목을 입력하세요.')
    } else if (!content) {
      alert('내용을 작성해주세요.')
    } else {
      const requestData = {
        articleIdx: mod ? articleInfo.articleIdx : 0,
        boardId: boardId,
        articleTitle: title,
        articleContent: content,
        articleHeaderCd: !selectedOption ? null : selectedOption
      }

      await addArticles(requestData)

      const redirectUrl = `/board/main/${boardId}`

      navigate(redirectUrl)
    }
  }

  const handleCancel = () => {
    if (mod) {
      const redirectUrl = `/board/main/${boardId}/view/${articleInfo.articleIdx}`
      navigate(redirectUrl)
    } else {
      const redirectUrl = `/board/main/${boardId}`

      navigate(redirectUrl)
    }
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
    if (mod) {
      setTitle(articleInfo.articleTitle)
      setContent(articleInfo.articleContent)
      setSelectedOption(articleInfo.articleHeaderCd)
    }
  }, [articleInfo])

  useEffect(() => {
    if (articleIdx) {
      const fetchArticleData = async () => {
        const fetchedArticle = await getArticle(boardId, articleIdx)
        if (fetchedArticle.status === 'success') {
          setArticleInfo(fetchedArticle.data)
        } else {
          console.log(fetchedArticle.error)
        }
      }

      fetchArticleData()
    }
  }, [articleIdx])

  useEffect(() => {
    const imageHandler = () => {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.click()

      input.onchange = async () => {
        const file = input.files

        // 현재 커서 위치 저장
        const range = quillRef.current?.getEditor().getSelection()

        // 서버에 올려질때까지 표시할 로딩 placeholder 삽입
        quillRef.current
          ?.getEditor()
          .insertEmbed(range.index, 'image', loadingImg)

        if (file !== null) {
          try {
            // S3에 업로드 한뒤 이미지 태그에 삽입할 url을 반환받도록 구현
            const formData = new FormData()
            formData.append('file', file[0])
            const result = await uploadImage(formData)
            const url = result.data.uploadPath
            // 정상적으로 업로드 됐다면 로딩 placeholder 삭제
            quillRef.current?.getEditor().deleteText(range.index, 1)
            // 받아온 url을 이미지 태그에 삽입
            quillRef.current?.getEditor().insertEmbed(range.index, 'image', url)

            // 사용자 편의를 위해 커서 이미지 오른쪽으로 이동
            quillRef.current?.getEditor().setSelection(range.index + 1)
          } catch (err) {
            quillRef.current?.getEditor().deleteText(range.index, 1)
            console.log(err)
          }
        }
      }
    }

    if (quillRef.current) {
      const toolbar = quillRef.current.getEditor().getModule('toolbar')
      toolbar.addHandler('image', imageHandler)
    }
  }, [])

  return (
    <Container>
      <input type="hidden" id="board_id" value={boardId} />

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
                    defaultValue={
                      mod && articleInfo ? articleInfo.articleTitle : title
                    }
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
              <div style={{ marginBottom: '37px' }}>
                <ReactQuill
                  ref={quillRef}
                  style={{ height: '450px' }}
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  value={content}
                  onChange={setContent}
                ></ReactQuill>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Write
