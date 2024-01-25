import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getArticle,
  getComments,
  deleteArticle,
  addComment,
  deleteComment,
  uploadImage
} from './apis/page'
import { Card, Col, Container, Row } from 'react-bootstrap'
import ReactQuill, { Quill } from 'react-quill'
import ImageResize from '@looop/quill-image-resize-module-react'
import 'react-quill/dist/quill.snow.css'
import * as DOMPurify from 'dompurify'
import loadingImg from './images/loading.gif'

const View = () => {
  const { boardId, articleIdx } = useParams()
  const [articleInfo, setArticleInfo] = useState({})
  const navigate = useNavigate()
  const [comments, setComments] = useState([])
  const [mod2, setMod2] = useState(false)
  const [commentInfo, setCommentInfo] = useState({})
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

  const handleCancel = () => {
    const redirectUrl = `/board/main/${boardId}`

    navigate(redirectUrl)
  }

  const handleDeleteArticle = () => {
    deleteArticle(articleIdx)

    const redirectUrl = `/board/main/${boardId}`

    navigate(redirectUrl)
  }

  const handleModifyArticle = () => {
    const redirectUrl = `/board/main/${boardId}/${articleIdx}/write?mod=true`
    navigate(redirectUrl)
  }

  const saveComments = () => {
    if (!content) {
      alert('코멘트 내용을 입력하세요.')
    } else {
      const result = confirm('코멘트를 저장하시겠습니까?')
      if (result) {
        const requestData = {
          articleIdx: articleInfo.articleIdx,
          commentIdx: mod2 ? commentInfo.commentIdx : 0,
          commentContent: content,
          publisherId: ''
        }

        addComment(requestData)
        const newComments = [...comments, requestData]
        setComments(newComments)
      }
    }
  }

  const handleDeleteComment = idx => {
    deleteComment(idx)
    const filteredComments = comments.filter(
      comment => comment.commentIdx !== idx
    )
    setComments(filteredComments)
  }

  const handleModifyComment = idx => {
    setMod2(true)
    const filteredComment = comments.filter(
      comment => comment.commentIdx === idx
    )
    setCommentInfo(filteredComment[0])
  }

  const cancelModify = () => {
    setMod2(false)
    setCommentInfo({})
  }

  useEffect(() => {
    const fetchArticleData = async () => {
      const fetchedArticle = await getArticle(boardId, articleIdx)
      if (fetchedArticle.status === 'success') {
        setArticleInfo(fetchedArticle.data)
      } else {
        console.log(fetchedArticle.error)
      }
    }

    fetchArticleData()
  }, [articleIdx])

  useEffect(() => {
    const fetchCommentData = async () => {
      const fetchedComments = await getComments(articleIdx)

      if (fetchedComments.status === 'success') {
        setComments(fetchedComments.data)
      } else {
        console.log(fetchedComments.error)
      }
    }

    fetchCommentData()
  }, [articleIdx])

  useEffect(() => {
    setContent(commentInfo.commentContent)
  }, [commentInfo])

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
      <Row className="g-5">
        <Col className="xl-12">
          <Card className="mb-2 mb-xl-3">
            <Card.Body>
              <div className="d-flex flex-wrap flex-sm-nowrap mt-1 mb-1">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center">
                    <div className="d-flex flex-column">
                      <h1 className="fw-bold">{articleInfo.articleTitle}</h1>
                      <div>
                        <span className="fw-bold text-muted me-6">
                          등록자:{' '}
                          <a href="#" className="text-muted text-hover-primary">
                            {articleInfo.publisherId}
                          </a>
                        </span>
                        <span className="fw-bold text-muted">
                          등록일시:{' '}
                          <span className="fw-bolder me-1">
                            {articleInfo.regTimeTxt}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-start flex-wrap">
                    <div className="d-flex mt-4 mb-2">
                      <a
                        onClick={handleModifyArticle}
                        className="btn btn-sm btn-warning btn-active-color-warning me-3 btn_modify"
                      >
                        수정
                      </a>
                      <a
                        onClick={handleDeleteArticle}
                        className="btn btn-sm btn-danger btn-active-color-danger me-3 btn_delete"
                      >
                        삭제
                      </a>
                      <a
                        onClick={handleCancel}
                        className="btn btn-sm btn-primary me-3"
                      >
                        목록
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="g-5">
        <Col className="xl-12">
          <Card className="mb-2 mb-xl-3">
            <Card.Body>
              <div
                className="fs-4 fw-normal mb-2"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(String(articleInfo.articleContent))
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="g-5">
        <Col className="xl-12">
          <Card className="mb-6 mb-xl-9">
            <Card.Body>
              {comments && (
                <div>
                  <p className="fw-bold fs-3">Comments</p>
                  {comments.map((item, index) => (
                    <div key={index} className="mb-1">
                      <div className="border rounded p-2 p-lg-3 mb-1">
                        <div className="mb-0">
                          <div className="d-flex flex-stack flex-wrap mb-1">
                            <div className="d-flex align-items-center py-1">
                              <div className="symbol symbol-35px me-2">
                                <div className="symbol-label bg-light-success fs-2 fw-bold text-success text-uppercase">
                                  AJ
                                </div>
                              </div>
                              <div className="d-flex flex-column align-items-start justify-content-center">
                                {/* <span className="text-gray-800 fs-7 fw-bold lh-1 mb-2">
                                  {publisher_id}
                                </span> */}
                                <span className="text-muted fs-1 fw-bold lh-1">
                                  {item.regTimeTxt}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            className="fs-2 fw-normal mb-2"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                String(
                                  item.commentContent ? item.commentContent : ''
                                )
                              )
                            }}
                          />
                        </div>
                        {/* 버튼 렌더링 부분 */}
                        <div className="d-flex mb-2">
                          <a
                            onClick={() => handleModifyComment(item.commentIdx)}
                            className="btn btn-sm btn-warning btn-active-color-warning me-3 btn_modify"
                          >
                            수정
                          </a>
                          <a
                            onClick={() => handleDeleteComment(item.commentIdx)}
                            className="btn btn-sm btn-danger btn-active-color-danger me-3 btn_delete"
                          >
                            삭제
                          </a>
                        </div>
                        {/* 버튼 렌더링 부분 */}
                        <div className="ps-10 mb-0"></div>
                      </div>
                      <hr></hr>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ marginBottom: '25px' }}>
                <ReactQuill
                  ref={quillRef}
                  style={{ height: '200px' }}
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  value={content}
                  onChange={setContent}
                ></ReactQuill>
              </div>
              <button
                className="btn btn-success me-2 mt-4 mb-2"
                onClick={saveComments}
              >
                저장
              </button>
              {mod2 ? (
                <button
                  className="btn btn-warning mt-4 mb-2"
                  onClick={cancelModify}
                >
                  취소
                </button>
              ) : null}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default View
