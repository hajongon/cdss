import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Form, Row, Col, Button } from 'react-bootstrap'
import FalconCardHeader from './utils/FalconCardHeader'
import communityMaps from 'routes/communityMaps'
import { addBoard, getTree } from './apis/page'

const CommunityDetail = ({ selectedItem, setData, setSelectedItem }) => {
  const [currentItem, setCurrentItem] = useState(selectedItem)
  const onChangeName = e => {
    setCurrentItem(prev => {
      let current = { ...prev }
      current.name = e.target.value
      return current
    })
  }

  const idCheck = () => {
    if (!selectedItem?.id || selectedItem?.id.startsWith('temp_')) {
      return '커뮤니티 아이디는 자동으로 부여됩니다.'
    }
    return selectedItem?.id
  }
  const { fetchComNavData } = communityMaps()

  const btnSave = async () => {
    if (currentItem?.name == '') {
      alert('커뮤니티 이름을 입력해주세요.')
      return
    }

    let isExist = false

    if (selectedItem?.id === '' || selectedItem?.id.startsWith('temp_')) {
      const checkName = async () => {
        const fetchedTree = await getTree()
        const fetchedTreeData = fetchedTree.data
        fetchedTreeData.map(item => {
          if (item.boardName == currentItem?.name) {
            isExist = true
            return
          }
        })

        if (fetchedTree.status !== 'success') {
          console.log(fetchedTree.error)
        }
      }

      await checkName()

      if (isExist) {
        alert('커뮤니티 이름이 중복되었습니다.')
        return false
      }
    }
    const saveBoard = async () => {
      const requestData = {
        boardId:
          selectedItem?.id === '' || selectedItem?.id.startsWith('temp_')
            ? ''
            : selectedItem?.id,
        boardName: currentItem?.name,
        isUseComment: isChecked ? 1 : 0,
        titleHeaderGroupCd: 'CBNTT',
        userRud: isCheckedr * 2 + isCheckedu * 4 + isCheckedd
      }

      await addBoard(requestData)
    }

    await saveBoard()

    const updateTree = async () => {
      const fetchedTree2 = await getTree()
      const fetchedTreeData2 = fetchedTree2.data
      const findArray = fetchedTreeData2.find(function (item) {
        return item.boardName === currentItem?.name
      })

      if (fetchedTree2.status !== 'success') {
        console.log(fetchedTree2.error)
      }

      setData(prevData => {
        const setArray = [...prevData]
        const findArray2 = setArray.findIndex(function (item) {
          return item.id === selectedItem?.id
        })
        setArray[findArray2] = {
          icon: 'file',
          id: findArray.boardId,
          name: currentItem?.name,
          usecomment: isChecked,
          rud: isCheckedr * 2 + isCheckedu * 4 + isCheckedd
        }
        setSelectedItem(setArray[findArray2])
        return setArray
      })

      fetchComNavData()
    }
    updateTree()
  }

  // 체크 스위치의 상태를 관리하는 useState 훅
  const [isChecked, setChecked] = useState(false) // false는 기본값으로 설정
  const [isCheckedr, setCheckedr] = useState(false) // false는 기본값으로 설정
  const [isCheckedu, setCheckedu] = useState(false) // false는 기본값으로 설정
  const [isCheckedd, setCheckedd] = useState(false) // false는 기본값으로 설정

  // 스위치가 변경될 때 실행되는 함수
  const handleSwitchChange = () => {
    setChecked(!isChecked) // 현재 상태의 반대값으로 업데이트
  }
  const handleCheckedrChange = () => {
    setCheckedr(!isCheckedr) // 현재 상태의 반대값으로 업데이트
  }
  const handleCheckeduChange = () => {
    setCheckedu(!isCheckedu) // 현재 상태의 반대값으로 업데이트
  }
  const handleCheckeddChange = () => {
    setCheckedd(!isCheckedd) // 현재 상태의 반대값으로 업데이트
  }

  useEffect(() => {
    setCurrentItem(selectedItem)
    setChecked(selectedItem?.usecomment)
    if (selectedItem?.rud == 7) {
      setCheckedr(true)
      setCheckedu(true)
      setCheckedd(true)
    } else if (selectedItem?.rud == 6) {
      setCheckedr(true)
      setCheckedu(true)
      setCheckedd(false)
    } else if (selectedItem?.rud == 5) {
      setCheckedr(false)
      setCheckedu(true)
      setCheckedd(true)
    } else if (selectedItem?.rud == 4) {
      setCheckedr(false)
      setCheckedu(true)
      setCheckedd(false)
    } else if (selectedItem?.rud == 3) {
      setCheckedr(true)
      setCheckedu(false)
      setCheckedd(true)
    } else if (selectedItem?.rud == 2) {
      setCheckedr(true)
      setCheckedu(false)
      setCheckedd(false)
    } else if (selectedItem?.rud == 1) {
      setCheckedr(false)
      setCheckedu(false)
      setCheckedd(true)
    } else if (selectedItem?.rud == 0) {
      setCheckedr(false)
      setCheckedu(false)
      setCheckedd(false)
    }
  }, [selectedItem])

  return (
    <Card>
      <FalconCardHeader
        title={selectedItem?.name || 'Community Detail'}
        titleClass="fs-0 fw-semi-bold bg-light"
      />
      <Card.Body className="fs--1">
        <Form.Group as={Row} className="mb-3" controlId="CommunityId">
          <Form.Label column sm="2">
            커뮤니티 ID
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Community ID"
              disabled
              value={idCheck()}
              className="fs--1"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="CommunityName">
          <Form.Label column sm="2">
            커뮤니티 이름
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Community Name"
              value={currentItem?.name || ''}
              className="fs--1"
              onChange={e => onChangeName(e)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="CommunityUseCommnet">
          <Form.Label column sm="2">
            코멘트 사용 여부
          </Form.Label>
          <Col sm="10" className="d-flex align-items-center">
            <Form.Check
              type="switch"
              checked={isChecked}
              className="fs--1 d-flex align-items-center"
              onChange={handleSwitchChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="CommunityAuth">
          <Form.Label column sm="2">
            사용자 권한
          </Form.Label>
          <Col sm="1">
            <Form.Check
              inline
              type="checkbox"
              checked={isCheckedr}
              id="item1Check"
              onChange={handleCheckedrChange}
            />
            <Form.Label className="mt-1">읽기</Form.Label>
          </Col>
          <Col sm="1">
            <Form.Check
              inline
              type="checkbox"
              checked={isCheckedu}
              id="item2Check"
              onChange={handleCheckeduChange}
            />
            <Form.Label className="mt-1">쓰기</Form.Label>
          </Col>
          <Col sm="1">
            <Form.Check
              inline
              type="checkbox"
              checked={isCheckedd}
              id="item3Check"
              onChange={handleCheckeddChange}
            />
            <Form.Label className="mt-1">삭제</Form.Label>
          </Col>
        </Form.Group>

        <Col lg={12} xl={12} className="text-end">
          <Button
            variant="primary"
            className="mt-2 me-0 mb-1 w-10"
            onClick={btnSave}
          >
            저장
          </Button>
        </Col>
      </Card.Body>
    </Card>
  )
}

export default CommunityDetail

CommunityDetail.propTypes = {
  selectedItem: PropTypes.object,
  setData: PropTypes.func,
  setSelectedItem: PropTypes.func
}
