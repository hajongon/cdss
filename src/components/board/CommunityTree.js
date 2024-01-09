import Treeview from './Treeview'
import React from 'react'
import { Card, Tooltip } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const CommunityTree = ({ setSelectedItem, data, selectedItem, setData }) => {
  const handleItemClick = item => {
    setSelectedItem(item)
  }

  // 데이터를 저장할 상태 변수
  const [treeData, setTree] = useState([
    {
      name: '',
      id: '1',
      children: [] // children을 빈 배열로 초기화
    }
  ])

  // useEffect 내에서 data를 업데이트하는 코드를 추가
  useEffect(() => {
    setTree([
      {
        name: '',
        id: '1',
        children: data
      }
    ])
  }, [data])

  return (
    <Card>
      <Card.Header
        style={{ color: '#b5b5c3' }}
        className="bg-light d-flex justify-content-between"
      >
        <div>
          <h5 className="fs-0 fw-semi-bold bg-light">Community Tree</h5>
        </div>
        <div className="d-flex align-items-center">
          <TriggerExample />
          <span className="fs-0 fw-semi-bold">항목을 우클릭하여 편집</span>
        </div>
      </Card.Header>

      <Card.Body>
        <Treeview
          data={treeData}
          expanded={['1', '2', '3', '7', '18']}
          handleItemClick={handleItemClick}
          setTree={setTree}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          setData={setData}
        />
      </Card.Body>
    </Card>
  )
}

function TriggerExample() {
  const renderTooltip = props => (
    <Tooltip id="button-tooltip" {...props}>
      항목에 마우스 이동 후 우클릭으로 추가, 삭제
    </Tooltip>
  )

  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <div className="d-flex align-items-center">
        <FontAwesomeIcon icon={faInfoCircle} className="fs-1 me-2" />
      </div>
    </OverlayTrigger>
  )
}

CommunityTree.propTypes = {
  setSelectedItem: PropTypes.func,
  data: PropTypes.array.isRequired,
  selectedItem: PropTypes.object,
  setData: PropTypes.func
}

export default CommunityTree
