import Treeview from '../cdss/Treeview'
import React from 'react'
import { Card } from 'react-bootstrap'
import { treeviewItems } from '../cdss/dummyData'
import PropTypes from 'prop-types'
import FalconCardHeader from '../cdss/utils/FalconCardHeader'

const CodeTree = ({ setSelectedItem }) => {
  const handleItemClick = item => {
    setSelectedItem(item)
  }
  return (
    <Card>
      <FalconCardHeader
        title="Code Tree"
        titleClass="fs-0 fw-semi-bold bg-light"
      />
      <Card.Body>
        <Treeview
          data={treeviewItems}
          expanded={['1', '2', '3', '7', '18']}
          handleItemClick={handleItemClick}
        />
      </Card.Body>
    </Card>
  )
}

export default CodeTree

CodeTree.propTypes = {
  setSelectedItem: PropTypes.func.isRequired
}
