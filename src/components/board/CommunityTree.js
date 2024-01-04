import Treeview from './Treeview'
import React from 'react'
import PropTypes from 'prop-types'
import { Card, Tooltip } from 'react-bootstrap'
import { useEffect, useState } from 'react'
// import { axiosInstance } from 'components/cdss/apis/instance'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const CommunityTree = ({ setSelectedItem, selectedItem, data, updateTree }) => {
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
          selectedItem={selectedItem}
          updateTree={updateTree}
          setSelectedItem={setSelectedItem}
        />
      </Card.Body>
    </Card>
  )
}

export default CommunityTree

CommunityTree.propTypes = {
  setSelectedItem: PropTypes.func.isRequired
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
  setSelectedItem: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
  data: PropTypes.array.isRequired,
  updateTree: PropTypes.func.isRequired
}
